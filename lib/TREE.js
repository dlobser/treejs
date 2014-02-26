// TREE.js - requires THREE.js
/*

TODO:

setup search function so that "all" applies to limbs and branches
double check 'magic' edges on surface maker
figure out a good aim at and world orientation setup


*/

Joint = function(params){

	//Each joint looks like this:
	//Joint(Object3D).children[0]=rotator(Object3D)
	//Joint(Object3D).children[0].children[0]=ballGeo(Mesh)
	//Joint(Object3D).children[0].children[0].children[0]=ballGeo(Mesh)
	//Joint(Object3D).children[0].children[1]=scalar(Object3D)
	//Joint(Object3D).children[0].children[1].children[0]=jointGeo(Mesh)
	//Joint(Object3D).children[0].children[2]=Joint(Object3D) (the next joint, if there is one)

	THREE.Object3D.call(this);
	this.params = params;
	this.limbs = [];
}

Joint.prototype = Object.create(THREE.Object3D.prototype);

Joint.prototype.construct = function(off){

	// the argument off refers to the offset in y 

	var p = this.params;

	var ballMesh = new THREE.Mesh( p.ballGeo, p.mat );
	var ballMesh2 = new THREE.Mesh( p.ballGeo, p.mat );
	var jointMesh = new THREE.Mesh( p.jointGeo, p.mat );
	ballMesh.scale = new THREE.Vector3(p.jointScale.x,p.jointScale.x,p.jointScale.x);
	jointMesh.position.y = .5;

	// ballMesh.matrixAutoUpdate = true;		
	// jointMesh.matrixAutoUpdate = true;	

	this.scalar = new THREE.Object3D();
	this.rotator = new THREE.Object3D();

	this.scalar.add(jointMesh);
	this.scalar.scale = p.jointScale;

	this.rotator.add(ballMesh);
	ballMesh2.position.y = p.jointScale.y/p.jointScale.x;
	ballMesh.add(ballMesh2);

	this.rotator.add(this.scalar);

	this.add(this.rotator);
	var offset = p.jointScale.y;

	if(off!=undefined)
		var offset = off;

	this.position.y = offset;
}

TREE = function(params){

	//TREE is an object3D so it can be transformed

	if(!params) params = {};

	THREE.Object3D.call(this);
	this.limbs = [];
	this.name = 0;

	var zero = new THREE.Vector3(0,0,0);
	var one = new THREE.Vector3(1,1,1);
	var colour = params.color || 0xFFFFFF;

	this.params = {
		name : 0,
		jointScale : new THREE.Vector3(1,1,1),
		ballGeo :  new THREE.SphereGeometry(1,12,6),
		jointGeo : new THREE.CylinderGeometry( 1,1,1,12,1),
		color : colour,
		mat : new THREE.MeshLambertMaterial({ color:colour, shading: THREE.SmoothShading }),
		offset : 0,
		scalar : new THREE.Object3D(),
		rotator : new THREE.Object3D(),
		poser : new THREE.Object3D(),
		num : 100,
		tubeGeo : []
	}
}

TREE.prototype = Object.create(THREE.Object3D.prototype);

//create

TREE.prototype.branch = function(amt,obj,params){

	//Create one branch, a collection of linked limbs

	var p = this.params;
	var parent = obj || this;
	var amount = amt || p.num;
	var countUp = 0;

	var joint = new Joint(parent.params);

	if(!parent.offset)
		parent.offset=0;
	if(!parent.joint)
		parent.joint=0;

	var offsetOffset = parent!=undefined ? parent.offset+parent.limbs.length : 0;
	joint.offset = parent.joint+offsetOffset || 0;
	joint.offset2 = offsetOffset;

	joint.joint = countUp;
	joint.joints = amount-1;
	joint.parentJoint = parent; 
	joint.name = Math.floor(Math.random()*1e9);
	parent.limbs.push(joint);
	countUp++;

	//start weird

	var keys = (Object.keys(joint.params));

	var tempParams = {};

	for(var i = 0 ; i < keys.length ; i++){
		tempParams[keys[i]] = joint.params[keys[i]];
	}

	joint.params = tempParams;

	if(params){
		var keys = (Object.keys(params));
		for(var i = 0 ; i < keys.length ; i++){
			joint.params[keys[i]] = params[keys[i]];
		}
	}
	////// end weird

	if(parent!=this){
		joint.construct(parent.params.jointScale.y);
		parent.children[0].add(this.recursiveAdd(amount, countUp++, joint));
	}
	else{
		joint.construct(0);
		parent.add(this.recursiveAdd(amount, countUp++, joint));
	}

	return joint;
}

TREE.prototype.recursiveAdd = function(amt,counter,obj){

	//helper function for branch
	
	var joint = new Joint(obj.params);
	joint.offset = obj.offset;
	joint.offset2 = obj.offset2;
	joint.parentJoint = obj.parentJoint;
	joint.name = obj.name;
	joint.construct();
	joint.joint = counter;
	
	if(amt>1)
		obj.children[0].add(joint);

	amt--;
	counter++;

	if(amt>0){
		this.recursiveAdd(amt,counter++,joint);
	}

	return obj;
}

TREE.prototype.generate = function(genome, parent){

	//e.g. genome = {joints:[15,3,2],divs:[2,3,1],angles:[.78,.05,.03],rads:[2,1,1]}

	var parent = parent || this;

	var g = this.utils.generateFixedParams(genome);

	if(g.joints.length!=g.divs.length || g.joints.length!=g.angles.length || g.divs.length!=g.angles.length){
		alert("arrays must be the same length");
		return;
	}

	var tempRoot = new Joint(this.params);
	tempRoot.construct();
	tempRoot.name = "0";

	for (var i = 0; i < g.rads[0]; i++) {

		//for offsetting
		var altLength = tempRoot.params.jointScale.clone();
		altLength.y = g.length[0];
		altLength.x = altLength.z = g.width[0];
		var root = this.branch(g.joints[0],tempRoot,{jointScale:altLength});

		root.rotator.rotation.z = g.angles[0];
		root.rotator.rotation.y = i * ((2*Math.PI)/g.rads[0]);
		this.recursiveBranch(g,1,root);
		parent.add(root);
		parent.limbs.push(root);
	}
}

TREE.prototype.recursiveBranch = function(genome,counter,joint){

	//helper for generate
	
	var g = genome;	
	var newBranch,kidJoint;	

	//loop through all the joints in the current branch
	for (var i = g.start[counter]; i < joint.joints+1; i+=g.divs[counter]) {
	
		//loop through the 'rads' - the number of branches from each joint
		for (var j = 0; j < g.rads[counter]; j++) {

			kidJoint = this.findJoint(joint,i);
			var altLength = kidJoint.params.jointScale.clone();
			altLength.y = g.length[counter];

			altLength.x = altLength.z = g.width[counter];

			newBranch = this.branch(g.joints[counter],kidJoint,{jointScale:altLength});

			newBranch.rotator.rotation.z = g.angles[counter];
			newBranch.rotator.rotation.y = j * ((2*Math.PI)/g.rads[counter]);
		}
		if(counter<g.joints.length){
			for (var k = 0; k < kidJoint.limbs.length; k++) {
				this.recursiveBranch(genome,counter+1,kidJoint.limbs[k]);
			}
		}
	}
}

TREE.prototype.appendBranch = function(obj,args){

	if(!args) args = {};

	var amt = args.amount || 10;

	var x = args.rx || 0;
	var y = args.ry || 0;
	var z = args.rz || 1;

	var sc = args.sc || 1;

	//making a tempTree to get access to the 'branch' function
	var tempTree = new TREE();

	var tempRoot = new Joint(tempTree.params);
	var altLength = tempRoot.params.jointScale.clone();
	altLength.y = sc;
	tempRoot.construct();

	var root = tempTree.branch(amt,obj,{jointScale:altLength});
	
	root.position.y=root.parent.parent.params.jointScale.y;	

	root.rotator.rotation.x = x;
	root.rotator.rotation.y = y;
	root.rotator.rotation.z = z;

	return root;
}

//utility



TREE.prototype.makeInfo = function(args){

	//helper function for xform
	//applies argument object to each array

	var info = [];
	
	var q = 0;

	for (var i = 0; i < args.length/2; i++) {
		info.push(this.utils.makeList(args[q]));
		info[i].args=args[q+1];
		q+=2;
	};

	return info;
}

TREE.prototype.utils = {

	makeList : function(range) {

		//by Andrew Magill
		
		var result = [];

		for (var i = range.length-1; i >= 0; i--) {
			var min, max;
			var newResult = [];
			if (range[i] instanceof Array) {
				min = range[i][0];
				max = range[i][1];
			} else {
				min = max = range[i];
			}
	        if (result.length == 0) {
	            for (var j = min; j <= max; j++)
	                newResult.push([j]);
	        } else {
	            for (var j = min; j <= max; j++) {
	                for (var k = 0; k < result.length; k++)
	                    newResult.push([j].concat(result[k]));
	            }
	        }
			result = newResult;
		}
	    
	    return result;
	},

	generateFixedParams : function(params){

		//helper function for generate

		var counter = 0;

		var keys = (Object.keys(params));
		for(var i = 0 ; i < keys.length ; i++){
			if(counter < params[keys[i]].length){
				counter = params[keys[i]].length;
			}
		}

		var amt = counter;

		var tempParams = this.generateDefaultParams(amt);
		
		var keys = (Object.keys(params));
		for(var i = 0 ; i < keys.length ; i++){
			tempParams[keys[i]] = params[keys[i]];
			if(tempParams[keys[i]].length<amt){
				for (var j = tempParams[keys[i]].length - 1 ; j < amt-1; j++) {
					tempParams[keys[i]].push(tempParams[keys[i]][tempParams[keys[i]].length-1]);
				}
			}
		}
		
		return tempParams;
	},

	generateDefaultParams : function(amt){

		//helper function for generate

		var params = {
			joints:[],
			divs:[],
			start:[],
			angles:[],
			length:[],
			rads:[],
			width:[],
		};

		for (var i = 0; i < amt; i++) {

			params.joints.push(5);
			params.divs.push(1);
			params.start.push(0);
			params.angles.push(1);
			params.length.push(5);
			params.rads.push(2);
			params.width.push(1);

			if(i==0){
				params.rads[0] = 1;
				params.angles[0] = 0;
				params.joints[0] = 10;
			}
		};

		return params;
	}

}

//find and report

TREE.prototype.findJoint = function(obj,num){

	//Return a particular joint on a branch
	//where obj is the root 

	if(num>obj.joints)
		num=obj.joints;

	var returner;

	if(num>0){
		num--
		returner = this.findJoint(obj.children[0].children[2],num);
	}
	else{
		returner = obj;
	}

	return returner;
}

TREE.prototype.Move = function(selector,func,args,counter,branch){

	//apply a function to a selected joint
	//e.g. Move([0,1,0,1,1],function,{rx:3})
	//no need to supply counter or branch on fist call

	var root = branch || this;
	var count = counter || 0;

	var returner;
	// console.log(root);
	// console.log(selector[count]);
	//selector:[limb with branches, branch, limb, branch, etc, etc, which joint]

	//count up through items in selector; an array
	if( count < selector.length-1 ){

		//create an empty array that we'll fill up with the locations
		//of all the joints that have limbs
		var j = [];
		this.findLimbs(root,j);
		//make sure we're not going past the end of the array
		var c;
		if(selector[count] > j.length-1){
			c=j.length-1;
			console.warn("array is too big: " + selector[count] + " " + selector);
		}
		else
			c=selector[count];

		//use the selected joint for the next recursion
		var joint = j[c];
		returner = this.Move(selector,func,args,count+2,joint.limbs[selector[count+1]]);
	}
	else{
		if( selector[count] == "all" ){
			for (var i = 0; i < root.joints+1; i++) {
				returner = func(this.findJoint(root,i),args);
			}
		}
		else{
			returner = func(this.findJoint(root,selector[count]),args);
		}

	}
	return returner;
}

TREE.prototype.FIND = function(selector,counter,branch){

	//idential to MOVE but instead of applying a function it just returns an object

	var root = branch || this;
	var count = counter || 0;

	var returner;
	
	//count up through items in selector; an array
	if( count < selector.length-1 ){

		//create an empty array that we'll fill up with the locations
		//of all the joints that have limbs
		var j = [];
		this.findLimbs(root,j);
		
		//make sure we're not going past the end of the array
		var c;
		if(selector[count] > j.length-1){
			c=j.length-1;
		}
		else
			c=selector[count];

		//use the selected joint for the next recursion
		var joint = j[c];
		returner = this.FIND(selector,count+2,joint.limbs[selector[count+1]]);
	}
	else{
		if( selector[count] == "all" ){
			console.log(root.joints);
			for (var i = 1; i < root.joints+1; i++) {
				returner = this.findJoint(root,i);
			}
		}
		else{
			returner = this.findJoint(root,selector[count]);

		}

	}
	return returner;
}

TREE.prototype.findLimbs = function(branch,array){

	//utility function
	//fills an array with a list of the joints that branch from a limb

	var returner;

	if(branch){
		if(branch.limbs){
			// if(branch.children[0].children.length>3 || branch.joint==branch.joints){
			if(branch.limbs.length>0){
				array.push(branch);
			}}
			if(branch.children[0].children[2]!=undefined && branch.children[0].children[2].name==branch.name){
				returner = this.findLimbs(branch.children[0].children[2],array);
			}
		
		
	}

	return returner;
}

TREE.prototype.report = function(array,obj){

	//returns a one dimensional array with all root joints

	var arr = array || [];
	var joint = obj || this;

	for(var j = 0 ; j < joint.limbs.length ; j++){
		arr.push(joint.limbs[j]);

		var jarr = [];
		this.findLimbs(joint.limbs[j],jarr);


		for(var i = 0 ; i < jarr.length ; i++){

			this.report(arr,jarr[i]);

		}
	}
	return arr;
}

TREE.prototype.reportLayers = function(array,obj,count){

	//makes a multi dimensional array where the first dimension
	//refers to the depth of the indexed branches

	var arr = array || [];
	var joint = obj || this;
	var c = count+1 || 0;

	var larr =  [];

	for(var j = 0 ; j < joint.limbs.length ; j++){

		larr.push(joint.limbs[j]);

		var jarr = [];
		this.findLimbs(joint.limbs[j],jarr);

		for(var i = 0 ; i < jarr.length ; i++){
			this.reportLayers(arr,jarr[i],c);
		}
	}

	if(!arr[c]){
		arr[c] = [];
		for (var i = 0; i < larr.length; i++) {
			arr[c].push(larr[i]);
		};
	}
	else{
		for (var i = 0; i < larr.length; i++) {
			arr[c].push(larr[i]);
		};
	}

	return arr;
}

TREE.prototype.worldPositions = function(obj){

	//returns the world positions of all the joints on a branch

	var arr = [];

	this.updateMatrixWorld();

	for(var i = 0 ; i <= obj.joints ; i++){

		var tempObj1 = this.findJoint(obj,i);
		tempObj = tempObj1;
		tempObj.updateMatrixWorld();
		if(tempObj1.children[0].children[0]!=undefined)
			tempObj = tempObj1.children[0].children[0];

		
		

		var vector = new THREE.Vector3();
		vector.setFromMatrixPosition( tempObj.matrixWorld );

		var vecScale = new THREE.Vector3();
		vecScale.setFromMatrixScale( tempObj.matrixWorld );

		var vec4 = new THREE.Vector4(vector.x,vector.y,vector.z,(vecScale.z));//+Math.sin((tempObj.joint/l)*Math.PI));

		arr.push(vec4);

		if(i==obj.joints){

			vector.setFromMatrixPosition( tempObj1.children[0].children[0].children[0].matrixWorld );
			// vecScale.setFromMatrixScale( tempObj1.children[0].children[0].children[0].matrixWorld );

			var vec4 = new THREE.Vector4(vector.x,vector.y,vector.z,(vecScale.z));//+Math.sin((tempObj.joint/l)*Math.PI));
			
			arr.push(vec4);
		}

	}
	return arr;
}

TREE.prototype.worldPositionsArray = function(arr){

	//good for working working with the output of tree.report()
	//which returns a one dimensional array of all joints

	var masterArray = [];

	for(var i = 0 ; i < arr.length ; i++){
		masterArray.push(tree.worldPositions(arr[i]));
	}

	return masterArray;
}

TREE.prototype.worldPositionsMultiArray = function(arr){

	//best for working with the output of reportLayers()
	//which returns a 2 dimensional array

	var masterArray = [];

	for(var i = 0 ; i < arr.length ; i++){
		var smallArray = [];
		for(var j = 0 ; j < arr[i].length ; j++){
			smallArray.push(this.worldPositions(arr[i][j]));
		}
		masterArray.push(smallArray);
	}

	return masterArray;
}

//model

TREE.prototype.tubes = function(arr,args){

	//takes a 2 dimensional array where the first dimension
	//use this.worldPositionsArray(tree.report()) - 
	//a one dimensional array of joints

	if(!args) args = {};

	var width = args.width || 1;
	var minWidth = args.minWidth || 0;
	var seg = args.lengthSegs || 1;
	var wseg = args.widthSegs || 6;
	var func = args.func || function(t){return 0};

	var geoObj = new THREE.Object3D();

	
	for(var i = 0 ; i < arr.length ; i++){

		//Building a duplicate curve to offset curve parameterization issue

		var dataCurveArray = [];
		var addX = 0;

		for (var j = 0; j < arr[i].length; j++) {
			var worldWide = arr[i][j].w + func(j);
			addX+=arr[i][j].w;
			if(worldWide<minWidth)
				worldWide=minWidth;
			dataCurveArray.push(new THREE.Vector3(worldWide,addX,0));
		}

		var dataCurve = new THREE.SplineCurve3(dataCurveArray);
		var curve = new THREE.SplineCurve3(arr[i]);
		curve.data = arr[i];
		curve.dataCurve = dataCurve;
		var geo = new THREE.TubeGeometry2(curve, arr[i].length * seg , width, wseg);
		var tube = new THREE.Mesh(geo,this.params.mat);
		geoObj.add(tube);
		this.params.tubeGeo.push(tube);

	}

	return geoObj;
}

TREE.prototype.nurbsishSurface = function(arr,divs){

	//WIP

	var curvesX = [];
	var curvesY = [];

	var pointsY = [];

	for (var i = 0; i < arr.length; i++) {
		curvesX.push(new THREE.SplineCurve3(arr[i]));
		for (var j = 0; j < arr[i].length; j++) {
			pointsY.push();
		}
	}

	var curve = new THREE.SplineCurve3(arr[i]);	
	pos = path.getPointAt( u );//doesn't work yet
}

TREE.prototype.animateTubes = function(w,sc){

	// Rebuilds tube geometry and deletes the old geo
	// Kinda crappy but whaddya gonna do - throws errors too - meh

	var obj;

	for (var i = 0; i < this.params.tubeGeo.length; i++) {

		obj = this.params.tubeGeo[i];

		obj.geometry.dispose();

		sc.remove(obj);
	};

	this.params.tubeGeo=[];
	sc.add(this.makeTubes(w));
}

TREE.prototype.makeTubes = function(args){

	//simplifies the process of making tubes
	//args = {
	// width - argument passed to tube geometry
	// minWidth - in world space, tube won't get smaller than this
	// widthSegs - radial subdivisions
	// lengthSegs - length subdivisions - multiplier of control points (not total)
	// func - a function which takes an input from a loop based on joint #s
	//}

	var arrayToSort = this.report();
	// arrayToSort.sort(function(a,b){return a.id-b.id});
	return this.tubes(this.worldPositionsArray(arrayToSort),args);
}

TREE.prototype.openSurface = function(points){

	//points is a 2 dimensional array of vectors
	//generate a parametric surface where each vertex is the position of each joint

	function makeSheet(u,v){
		var c = points;

		var tempU = Math.round(u*(c.length));
		var tempV = Math.round(v*(c[0].length));
		
		if(u*(c.length)>c.length-1){
			tempU = c.length-1;
		}
		if(v*(c[0].length)>c[0].length-1){
			tempV = c[0].length-1;
		}

		return(c[tempU][tempV]);
	}


	var geo = new THREE.ParametricGeometry( makeSheet, points.length, points[0].length );

	geo.computeVertexNormals();

	return geo;
}

TREE.prototype.solidify = function(geo,offset,w,h){

	//works with parametric geometry
	//extrudes along the normals and stitches the edges

	var width = w || 10;
	var height = h || 10;

	var vertsize = geo.vertices.length;
	var facesize = geo.faces.length;

	var tempVerts = [];
	var tempFaces = [];

	for (var i = 0; i < vertsize; i++) {
		geo.vertices.push(geo.vertices[i].clone());
	}
	for (var i = 0; i < facesize; i++) {
		geo.faces.push(geo.faces[i].clone());
	}
	for (var i = facesize; i < geo.faces.length; i++) {

		geo.faces[i].a = geo.faces[i].a + vertsize;
		geo.faces[i].b = geo.faces[i].b + vertsize;
		geo.faces[i].c = geo.faces[i].c + vertsize;

		if(geo.vertices[geo.faces[i].a].off!=true){
			geo.vertices[geo.faces[i].a].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].a].off=true;
		}
		if(geo.vertices[geo.faces[i].b].off!=true){
			if(i==facesize)//don't know why I have to do this - looks messy
				geo.vertices[geo.faces[i].b].sub(geo.faces[i].normal.multiplyScalar(offset/offset));
			else
			geo.vertices[geo.faces[i].b].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].b].off=true;
		}	
		if(geo.vertices[geo.faces[i].c].off!=true){
			if(i==facesize)
				geo.vertices[geo.faces[i].c].sub(geo.faces[i].normal.multiplyScalar(offset/offset));
			else
			geo.vertices[geo.faces[i].c].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].c].off=true;
		
		}
			
		
	}

	for (var i = 0; i < (geo.vertices.length); i++) {

		if(i<width-1){

			var a = i;
			var b = i+1;
			var c = i+vertsize;
			var d = i+1+vertsize;
			geo.faces.push(new THREE.Face3(a,b,c));
			geo.faces.push(new THREE.Face3(d,c,b));

			// var a = i+((width*height)-width);
			// var b = i+1+((width*height)-width);
			// var c = i+vertsize+((width*height)-width);
			// var d = i+1+vertsize+((width*height)-width);
			// geo.faces.push(new THREE.Face3(a,b,c));
			// geo.faces.push(new THREE.Face3(d,c,b));

		}
		if(i<height-1){

			var a = i*(width+1);
			var b = (i+1)*(width+1);
			var c = (i*(width+1))+vertsize;
			var d = (i*(width+1))+(width+1)+vertsize;
			geo.faces.push(new THREE.Face3(c,b,a));
			geo.faces.push(new THREE.Face3(b,c,d));

			// var a = width-1+(i*width);
			// var b = width-1+((i+1)*width);
			// var c = width-1+((i*width)+vertsize);
			// var d = width-1+((i*width)+width+vertsize);
			// geo.faces.push(new THREE.Face3(a,b,c));
			// geo.faces.push(new THREE.Face3(d,c,b));
		
		}
	};
}

TREE.prototype.solidSurface = function(points,offset){

	var w = points.length;
	var h = points[0].length;
	var off = offset || 1;

	var geometry;
	geometry = this.openSurface(points);
	this.solidify(geometry,off,w,h);

	geometry.mergeVertices();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var mesh = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({side:THREE.DoubleSide}))

	return mesh;
}

//modify

TREE.prototype.setGeo = function(obj,args){

	//swap out the geometry for the specified joint

	var jointGeo = args.jointGeo || obj.params.jointGeo;
	var ballGeo = args.ballGeo || obj.params.ballGeo;
	var ballGeo2 = args.ballGeo2 || ballGeo;

	obj.children[0].children[0].geometry = ballGeo;
	obj.children[0].children[0].children[0].geometry = ballGeo2;
	obj.children[0].children[1].children[0].geometry = jointGeo;
}

TREE.prototype.aimAt = function(obj,args){

	//aims selected joints at a target in world space
	//ugly solution, runs slowly

	var target = args.target || new THREE.Vector3(0,0,0);
	
	var tempParent = obj.parent;

	THREE.SceneUtils.detach(obj,tempParent,scene); //*ergh

	obj.lookAt(target);
	obj.rotation.y+=Math.PI/2;

	obj.parent.updateMatrixWorld();

	THREE.SceneUtils.attach(obj,scene,tempParent); //*ick
}

TREE.prototype.axisRotate = function(obj,args) { 

	//rotate a joint in world space
	//runs well but strange jiggling with long joint chains and large transformations

	if(!args) args = {};

	var axis = args.axis || new THREE.Vector3(0,0,1);
	var radians = args.radians || 0;

	var parent;

	if(!obj.parent){
		console.warn("axisRotate missing parent");
		parent = this;
	}
	else
		parent = obj.parent;

	var tempMatrix = new THREE.Matrix4();
	var inverse = new THREE.Matrix4();
	var multed = new THREE.Matrix4();

	var quat = new THREE.Quaternion();

	inverse.getInverse(parent.matrixWorld);

    tempMatrix.makeRotationAxis(axis, radians);
  
    multed.multiplyMatrices(inverse,tempMatrix); // r56

    quat.setFromRotationMatrix(multed);

    var rot = new THREE.Vector3(axis.x,axis.y,axis.z);
    
    rot.applyQuaternion(quat);

	obj.quaternion.setFromAxisAngle(rot,radians);
}

TREE.prototype.setJointLength = function (obj,len){


	var len = len || obj.scalar.scale.y;

	obj.scalar.scale.y = len;
	obj.children[0].children[0].children[0].position.y = len;
	obj.children[0].children[2].position.y = len;

}

TREE.prototype.passFunc = function (array,func){

	//this takes an array
	//and applies a function to the joint that's found with that array
	//using the specified arguments

	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
		 	var process = makeList(array[i][j]);
		 	for (var k = 0; k < process.length; k++) {
				this.Move(process[k],func,array[i].args);
			};
		 }; 
	};
}

TREE.prototype.xform = function (array,func){

	//deprecated, use passFunc

	this.passFunc(array,func);
}

TREE.prototype.appendObj = function (obj,args){

	//hmmmm - wtf

	var amt = args.amount || 10;

	var x = args.rx || 0;
	var y = args.ry || 0;
	var z = args.rz || 0;

	var root = args.tree.clone();
	root.limbs = args.tree.limbs;
	root.rotator = args.tree;
	
	obj.children[0].add(root);
	obj.limbs.push(root);

	root.rotation.x = x;
	root.rotation.y = y;
	root.rotation.z = z;

	return root;
}

TREE.prototype.appendTree = function (obj,args){

	// just a little helper function for if you want
	// to grow a tree from a tree

	//e.g
	// tree.generate({
	// 		joints: [90,20],
	// 		divs:   [1,5],
	// 		start:  [0],
	// 		angles: [0,Math.PI/2],
	// 		length: [1],
	// 		rads:   [1],
	// });


	this.generate(args.tree,obj);	
}

TREE.prototype.transform = function (obj,args){


	var rx,ry,rz,sc,scx,scy,scz,tx,ty,tz,
	off,offMult,freq,
	jOff,jMult,jFreq,
	jFract, jOffset,
	offsetter,offsetter2,
	jointOff,scoff,
	sinScaleMult,sinScale;

	if(args){
		sc = args.sc || 1;

		if(args.sc){
			scx = scy = scz = args.sc;
		}
		else{
			scx = args.scx || 1 ;
			scy = args.scy || 1 ;
			scz = args.scz || 1 ;
			
		}
		rx = args.rx || 0 ;
		ry = args.ry || 0 ;
		rz = args.rz || 0 ;
		tx = args.tx || 0 ;
		ty = args.ty || 0 ;
		tz = args.tz || 0 ;

		off = args.off || 0;
		offMult = args.offMult || 0;
		freq = args.freq || 0;
		jOff = args.jOff || 0;
		jMult = args.jMult || 0;
		jFreq = args.jFreq || 0;
		jFract = args.jFract * obj.joint || 1;
		jOffset = args.jOffset || 0;
		offsetter = args.offsetter || 0;
		offsetter2 = args.offsetter2 || 0;
		sinScale = args.sinScale || 1;
		sinScaleMult = args.sinScaleMult || 1;

	}
	else{

		rx = ry = rz = tx = ty = tz = 0;
		sc = scx = scy = scz = freq = jFreq = jFract  = 1;
		off = offMult = jOff = jMult = jOffset = offsetter = offsetter2 = sinScale = sinScaleMult = 0;

	}
	
	var objOffset = obj.offset;
	var objOffsetter = offsetter;
	
	if(offsetter2){
		objOffset = obj.offset2;
		objOffsetter = offsetter2;
	}

	if(jMult||jOff||jMult||offMult||offsetter||offsetter2){

		var off1 = jFract * Math.sin( (jOffset * objOffset) + jOff + ( ( jFreq * obj.joint + 1 ) ) ) * jMult;
		var off2 = Math.sin( off + ( freq * objOffset ) ) * offMult;
		var off3 = objOffset * objOffsetter;
		jointOff = off3 + off2 + off1;

	}
	else
		jointOff = 0;

	if(args.sinScale||args.sinScaleMult){
		scoff = ( Math.sin ( obj.joint * sinScale ) ) * sinScaleMult;
	}
	else
		scoff = 0;

	if(args.rx != undefined)
		obj.rotator.rotation.x=rx+jointOff;
	if(args.ry != undefined) 
		obj.rotator.rotation.y=ry+jointOff;
	if(args.rz != undefined)
		obj.rotator.rotation.z=rz+jointOff;
	
	if(args.tx != undefined)
		obj.rotator.position.x=tx+jointOff;
	if(args.ty != undefined) 
		obj.rotator.position.y=ty+jointOff;
	if(args.tz != undefined)
		obj.rotator.position.z=tz+jointOff;

	if(args.sc || args.scx || args.scy || args.scz);
		obj.rotator.scale = new THREE.Vector3(scx,scy,scz).addScalar(scoff);

	return obj;
}

TREE.prototype.setScale = function (sc){
	this.scale.x = sc;
	this.scale.y = sc;
	this.scale.z = sc;
}

//needs to prototype

function append(obj,args){

	if(!args) args = {};

	var amt = args.amount || 10;

	var x = args.rx || 0;
	var y = args.ry || 0;
	var z = args.rz || 1;

	var sc = args.sc || 1;

	//making a tempTree to get access to the 'branch' function
	var tempTree = new TREE();

	var tempRoot = new Joint(tempTree.params);
	var altLength = tempRoot.params.jointScale.clone();
	altLength.y = sc;
	tempRoot.construct();

	var root = tempTree.branch(amt,tempRoot,{jointScale:altLength});
	
	obj.children[0].add(root);
	obj.limbs.push(root);
	root.position.y=root.parent.parent.params.jointScale.y;	

	root.rotator.rotation.x = x;
	root.rotator.rotation.y = y;
	root.rotator.rotation.z = z;

	return root;
}

function pushNoRepeat(array,child){
	var temp = child;
	var push = true;
	for (var i = 0; i < array.length; i++) {
		if(array[i]==child)
			push=false;
	};
	if(push)
		array.push(child);
}

function makeList(range) {

	//by Andrew Magill
	
	var result = [];

	for (var i = range.length-1; i >= 0; i--) {
		var min, max;
		var newResult = [];
		if (range[i] instanceof Array) {
			min = range[i][0];
			max = range[i][1];
		} else {
			min = max = range[i];
		}
        if (result.length == 0) {
            for (var j = min; j <= max; j++)
                newResult.push([j]);
        } else {
            for (var j = min; j <= max; j++) {
                for (var k = 0; k < result.length; k++)
                    newResult.push([j].concat(result[k]));
            }
        }
		result = newResult;
	}
    
    return result;
}

function xform(array,obj,func){
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
		 	var process = makeList(array[i][j]);
		 	for (var k = 0; k < process.length; k++) {
				obj.Move(process[k],func,array[i].args);
				// console.log(obj.FIND(process[k]));
				// var tempObj = obj.FIND(process[k]);
				// func(tempObj,array[i].args);
			};
		 }; 
	};
}

function go3(obj,args){

	var rx,ry,rz,sc,scx,scy,scz,tx,ty,tz,
	off,offMult,freq,
	jOff,jMult,jFreq,
	jFract, jOffset,
	offsetter,
	jointOff;

	if(args){
		sc = args.sc || 1;

		if(args.sc){
			scx = scy = scz = args.sc;
		}
		else{
			scx = args.scx || 1 ;
			scy = args.scy || 1 ;
			scz = args.scz || 1 ;
			
		}
		rx = args.rx || 0 ;
		ry = args.ry || 0 ;
		rz = args.rz || 0 ;
		tx = args.tx || 0 ;
		ty = args.ty || 0 ;
		tz = args.tz || 0 ;

		off = args.off || 0;
		offMult = args.offMult || 0;
		freq = args.freq || 0;
		jOff = args.jOff || 0;
		jMult = args.jMult || 0;
		jFreq = args.jFreq || 0;
		jFract = args.jFract * obj.joint || 1;
		jOffset = args.jOffset * obj.offset || 0;
		offsetter = args.offsetter || 0;

	}
	else{
		rx = ry = rz = tx = ty = tz = 0;
		sc = scx = scy = scz = freq = jFreq = jFract = 1;
		off = offMult = jOff = jMult = jOffset = offsetter = 0;
	}

	if(jMult||jOff||jMult||offMult||offsetter){
		var off1 = (jFract) * Math.sin(jOffset+jOff+( ( jFreq * obj.joint+1)))*jMult;
		var off2 = Math.sin(off+(freq*obj.offset))*offMult;
		var off3 = obj.offset*offsetter;
		jointOff = off3+off2+off1;
	}
	else
		jointOff = 0;

	if(args.rx != undefined)
		obj.rotator.rotation.x=rx+jointOff;//(Math.sin(off+(obj.offset*offMult))) + (idMult*obj.id);
	if(args.ry != undefined) 
		obj.rotator.rotation.y=ry+jointOff;//(Math.sin(off+(obj.offset*offMult)))+Math.sin((ioff+(iMult*(obj.joint-1)))) + (idMult*obj.id);
	if(args.rz != undefined)
		obj.rotator.rotation.z=rz+jointOff;//(Math.sin(off+(obj.offset*offMult)))+(ioff+(iMult*(obj.joint-1))) + (idMult*obj.id);
	
	if(args.tx != undefined)
		obj.rotator.position.x=tx+jointOff;//(Math.sin(off+(obj.offset*offMult))) + (idMult*obj.id);
	if(args.ty != undefined) 
		obj.rotator.position.y=ty+jointOff;//(Math.sin(off+(obj.offset*offMult)))+Math.sin((ioff+(iMult*(obj.joint-1)))) + (idMult*obj.id);
	if(args.tz != undefined)
		obj.rotator.position.z=tz+jointOff;//(Math.sin(off+(obj.offset*offMult)))+(ioff+(iMult*(obj.joint-1))) + (idMult*obj.id);

	if(args.sc || args.scx || args.scy || args.scz);
		obj.rotator.scale = new THREE.Vector3(scx,scy,scz);

	return obj;
}

function makeInfo(args){

	var info = [];
	
	var q = 0;
	for (var i = 0; i < args.length/2; i++) {

		info.push(makeList(args[q]));
		info[i].args=args[q+1];
		q+=2;
	};
	// console.log(args);
	return info;
}

function looker(obj,args){

	var vx = args.x || 0;
	var vy = args.y || 0;
	var vz = args.z || 0;

	var vec = new THREE.Vector3(vx,vy,vz);

	var tempParent = obj.parent;

	obj.updateMatrixWorld();

	THREE.SceneUtils.detach(obj,tempParent,scene);

	// obj.lookAt(vec);
	obj._rotation = vec;
	// console.log(obj);

	obj.updateMatrixWorld();
	tempParent.updateMatrixWorld();

	THREE.SceneUtils.attach(obj,scene,tempParent);
}

function makeSurface(points,x,y){

	//points is a 2 dimensional array of vectors

	function makeSheet(u,v){
		var c = points;
		var tempU = Math.round(u*(c.length));
		var tempV = Math.round(v*(c[0].length-1));
		
		if(u*(c.length)>c.length-1){
			tempU = 0;
		}
		return(c[tempU][tempV]);
	}

	var geo = new THREE.ParametricGeometry( makeSheet, x,y );
	geo.mergeVertices();
	geo.computeVertexNormals();

	return geo;
}

function makeOpenSurface(points){

	//points is a 2 dimensional array of vectors

	function makeSheet(u,v){
		var c = points;

		var tempU = Math.round(u*(c.length));
		var tempV = Math.round(v*(c[0].length));
		
		if(u*(c.length)>c.length-1){
			tempU = c.length-1;
		}
		if(v*(c[0].length)>c[0].length-1){
			tempV = c[0].length-1;
		}

		return(c[tempU][tempV]);
	}


	var geo = new THREE.ParametricGeometry( makeSheet, points.length, points[0].length );

	// console.log(geo.vertices.length);
	// // geo.mergeVertices();
	// console.log(geo.vertices.length);

	geo.computeVertexNormals();

	return geo;
}

function closeVerts(geo,dist){

	var distance = dist || .0001;

	for (var i = 0; i < geo.vertices.length; i++) {
		var tempi = new THREE.Vector3(geo.vertices[i].x,geo.vertices[i].y,geo.vertices[i].z);
		for (var j = 0; j < geo.vertices.length; j++) {
			var tempj = new THREE.Vector3(geo.vertices[j].x,geo.vertices[j].y,geo.vertices[j].z);
			if(j==i)
				j++;
			else{
				if(tempi.distanceTo(tempj)<distance){
					geo.vertices[i].x = geo.vertices[j].x;
					geo.vertices[i].y = geo.vertices[j].y;
					geo.vertices[i].z = geo.vertices[j].z;

				}
			}

		}
	}
}

function solidify(geo,offset,w,h){

	var width = w || 10;
	var height = h || 10;

	var vertsize = geo.vertices.length;
	var facesize = geo.faces.length;

	var tempVerts = [];
	var tempFaces = [];

	for (var i = 0; i < vertsize; i++) {
		geo.vertices.push(geo.vertices[i].clone());
	}
	for (var i = 0; i < facesize; i++) {
		geo.faces.push(geo.faces[i].clone());
	}
	for (var i = facesize; i < geo.faces.length; i++) {

		geo.faces[i].a = geo.faces[i].a + vertsize;
		geo.faces[i].b = geo.faces[i].b + vertsize;
		geo.faces[i].c = geo.faces[i].c + vertsize;

		if(geo.vertices[geo.faces[i].a].off!=true){
			geo.vertices[geo.faces[i].a].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].a].off=true;
		}
		if(geo.vertices[geo.faces[i].b].off!=true){
			if(i==facesize)//don't know why I have to do this - looks messy
				geo.vertices[geo.faces[i].b].sub(geo.faces[i].normal.multiplyScalar(offset/offset));
			else
			geo.vertices[geo.faces[i].b].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].b].off=true;
		}	
		if(geo.vertices[geo.faces[i].c].off!=true){
			if(i==facesize)
				geo.vertices[geo.faces[i].c].sub(geo.faces[i].normal.multiplyScalar(offset/offset));
			else
			geo.vertices[geo.faces[i].c].sub(geo.faces[i].normal.multiplyScalar(offset));
			geo.vertices[geo.faces[i].c].off=true;
		
		}
			
		
	}

	for (var i = 0; i < (geo.vertices.length); i++) {

		if(i<width-1){

			var a = i;
			var b = i+1;
			var c = i+vertsize;
			var d = i+1+vertsize;
			geo.faces.push(new THREE.Face3(a,b,c));
			geo.faces.push(new THREE.Face3(d,c,b));

			// var a = i+((width*height)-width);
			// var b = i+1+((width*height)-width);
			// var c = i+vertsize+((width*height)-width);
			// var d = i+1+vertsize+((width*height)-width);
			// geo.faces.push(new THREE.Face3(a,b,c));
			// geo.faces.push(new THREE.Face3(d,c,b));

		}
		if(i<height-1){

			var a = i*(width+1);
			var b = (i+1)*(width+1);
			var c = (i*(width+1))+vertsize;
			var d = (i*(width+1))+(width+1)+vertsize;
			geo.faces.push(new THREE.Face3(c,b,a));
			geo.faces.push(new THREE.Face3(b,c,d));

			// var a = width-1+(i*width);
			// var b = width-1+((i+1)*width);
			// var c = width-1+((i*width)+vertsize);
			// var d = width-1+((i*width)+width+vertsize);
			// geo.faces.push(new THREE.Face3(a,b,c));
			// geo.faces.push(new THREE.Face3(d,c,b));
		
		}
	};
}

function solidSurface(points,offset){


	var w = points.length;
	var h = points[0].length;

	var geometry;
	geometry = makeOpenSurface(points);
	solidify(geometry,offset,w,h);

	geometry.mergeVertices();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	return geometry;
}

// old


/*

TREE.prototype.axisRotate = function(obj,args) { 

	if(!args) args = {};

	var axis = args.axis || new THREE.Vector3(0,0,1);
	var radians = args.radians || 0;

	// obj.updateMatrixWorld();

	var parent;

	if(!obj.parent){
		console.warn("axisRotate missing parent");
		parent = this;
	}
	else
		parent = obj.parent;

	var tempMatrix = new THREE.Matrix4();
	var inverse = new THREE.Matrix4();
	var multed = new THREE.Matrix4();

	inverse.getInverse(parent.matrixWorld);

    tempMatrix.makeRotationAxis(axis, radians);
  
    multed.multiplyMatrices(inverse,tempMatrix); // r56

    obj.rotation.setFromRotationMatrix(multed);//, this.eulerOrder ); 
}

// TREE.prototype.generateFixedParams = function(params){

// 	//helper function for generate

// 	var counter = 0;

// 	var keys = (Object.keys(params));
// 	for(var i = 0 ; i < keys.length ; i++){
// 		if(counter < params[keys[i]].length){
// 			counter = params[keys[i]].length;
// 		}
// 	}

// 	var amt = counter;

// 	var tempParams = this.utils.generateDefaultParams(amt);
	
// 	var keys = (Object.keys(params));
// 	for(var i = 0 ; i < keys.length ; i++){
// 		tempParams[keys[i]] = params[keys[i]];
// 		if(tempParams[keys[i]].length<amt){
// 			for (var j = tempParams[keys[i]].length - 1 ; j < amt-1; j++) {
// 				tempParams[keys[i]].push(tempParams[keys[i]][tempParams[keys[i]].length-1]);
// 			}
// 		}
// 	}
	
// 	return tempParams;
// }

// TREE.prototype.generateDefaultParams = function(amt){

// 	//helper function for generate

// 	var params = {
// 		joints:[],
// 		divs:[],
// 		start:[],
// 		angles:[],
// 		length:[],
// 		rads:[],
// 		width:[],
// 	};

// 	for (var i = 0; i < amt; i++) {

// 		params.joints.push(5);
// 		params.divs.push(1);
// 		params.start.push(0);
// 		params.angles.push(1);
// 		params.length.push(5);
// 		params.rads.push(2);
// 		params.width.push(1);

// 		if(i==0){
// 			params.rads[0] = 1;
// 			params.angles[0] = 0;
// 			params.joints[0] = 10;
// 		}
// 	};

// 	return params;
// }

*/

