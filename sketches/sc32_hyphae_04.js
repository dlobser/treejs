var sc1 = {

	//create a substrate cloud
	//create a dynamic object
	//which leaves behind a trail of points which know the angle of their creation
	//	or just the position of the following point so it can figure it out
	//	this point will have an age and after a certain age it will spawn a new dynamic object
	//	this will only happen if it has no available substrate around
	//the original object will aim in a random direction and it will store the points that are
	//	within a certain angle of it's direction
	//points that are not stored by an object will be stored in a 'fair game' array
	//once a point that's been left behind is surrounded by enough 'fair game' points - it will
	//	spawn another forager
	
	setup:function(){

		f = new fungus(3000);

		tree = new TREE();

		tree.params.mat = new THREE.MeshPhongMaterial({color:0x111111,specular:0x888888});
		tree.params.color = new THREE.Color(0x111111);

		tree.position.y=-70;

		tree.generate({
			joints: [1,10,5],
			divs:   [1,1],
			start:  [0],
			angles: [0,Math.PI/2],
			length: [0.0001,10,5],
			rads:   [1,10,1],
			width:  [2,2,2]
		});

		tree.setScale(5);

		// scene.add(tree);

		tree.xform(tree.makeInfo([
			[0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,offMult:.2,freq:1.4,jFract:1,jFreq:.8,jMult:.1},
			[0,0,0,[0,9],[0,9],0,"all"],{sc:.7,rz:Math.PI*.11,offMult:.2,freq:1.4,jOffset:2.3},
		]),tree.transform);

		var arr = tree.worldPositionsArray(tree.report());
		// console.log(arr);
		f.makeSubstrate(50);

		f.addSPK(new THREE.Vector3(0,0,0));
		f.update();
		f.showInfoBall();

		scene.add(f);

		// tree=new TREE();
		// scene.add(tree);



		// d = new Debug();
		// d.overflow=100;

		// tim = new fSPK();
		// console.log(tim);
		// tim.showGeo();
		// scene.add(tim);

		// fNodes = [];
		// var nodeHolder = new THREE.Object3D();

		// for (var i = 0; i < 500; i++) {
		// 	var newNode = new fNode(new THREE.Color(0xffffff));
		// 	newNode.construct();
		// 	newNode.position = new THREE.Vector3(200-Math.random()*400,200-Math.random()*400,200-Math.random()*400);
		// 	fNodes.push(newNode);
		// 	nodeHolder.add(newNode);
		// }

		// scene.add(nodeHolder);

		// g = sphere(10);
		// scene.add(g);
		
		// b = sphere(1);
		// scene.add(b);

	},

	draw:function(time){

		
		if(f.substrate.length>10)
			f.update();
		// console.log(f);

		// b.position = new THREE.Vector3(omouseX*300,omouseY*-300,-omouseX*300);

		// tim.checkAngle(b);

		// if(varW)
		// 	tim.aimAt(b.position);
		// else
		// 	tim.aimAt(g.position);

		// whiteNodes(fNodes);

		// tim.makeAimArray(fNodes);

		// console.log(fNodes.length);

		// tim.colorAimArray();

		// if(tim.aimNodes.length>0)
		// 	g.position = tim.findAveragePosition();
		// else
		// 	g.position = new THREE.Vector3(25-Math.random()*50,25-Math.random()*50,25-Math.random()*50);


		// tim.moveToward(g);
		// tim.update();

		// var arr = [];
		// arr.push(tim.trail);

		// if(tree.params.tubeGeo.length>2){
		// 	scene.remove(scene.children[scene.children.length-1]);
		// 	tree.params.tubeGeo.shift();
		// }

		// var adder = tree.tubes(arr,{width:1,minWidth:1});
		// scene.add(adder);
		// pause = true;
		
	}
}


fungus = function(num){

	THREE.Object3D.call(this);

	this.tree = new TREE();

	this.substrate = [];
	this.substrateAmount = num || 500;
	this.substrateObj = new THREE.Object3D();
	this.substrateSpread = 500;
	this.add(this.substrateObj);

	this.SPKNodes = [];
	this.SPKAim = [];

	this.tubeGeo = [];
	this.tubeParent = new THREE.Object3D();

	this.add(this.tubeParent);

	var color = new THREE.Color(0xffffff);
	this.geo = new THREE.SphereGeometry(1);
	this.mat = new THREE.MeshLambertMaterial({color:color});
	this.infoBall = new THREE.Mesh(new THREE.SphereGeometry(20),this.mat);

	// this.obj;
}

fungus.prototype = Object.create(THREE.Object3D.prototype);

fungus.prototype.makeSubstrate = function(amount){

	for (var i = 0; i < this.substrateAmount; i++) {

		var sp = this.substrateSpread;
		var newNode = new fNode(new THREE.Color(0xffffff));
		newNode.construct();
		newNode.position = new THREE.Vector3(sp/2-Math.random()*sp,sp/2-Math.random()*sp,sp*.1/2-Math.random()*sp*.1);
		if(newNode.position.distanceTo(new THREE.Vector3(0,0,0))<sp/2){
			this.substrate.push(newNode);
			this.substrateObj.add(newNode);
		}
		else
			i--;
	}
}

fungus.prototype.showInfoBall = function(show){
	this.add(this.infoBall);
	if(show)
		this.remove(this.infoBall);
}

fungus.prototype.makeSubstrateFromArray = function(arr){

	for (var i = 0; i < arr.length; i++) {

		var sp = this.substrateSpread;
		var newNode = new fNode(new THREE.Color(0xffffff));
		newNode.construct();
		newNode.position = new THREE.Vector3(arr[i].x,arr[i].y,arr[i].z);
		this.substrate.push(newNode);
		this.substrateObj.add(newNode);
		console.log("hi");

	}

}

fungus.prototype.digest = function(pos,dist){

	for (var i = 0; i < this.substrate.length; i++) {
		if(pos.distanceTo(this.substrate[i].position)<dist){
			if(this.substrateObj.children)
				this.substrateObj.remove(this.substrate[i]);
			if(this.substrate.length>0){
				this.substrate.splice(i,1);
			}
		}
	}
}

fungus.prototype.addSPK = function(pos,pos2){

	if(this.substrate.length>0){

		var randInt = Math.floor(Math.random()*this.substrate.length-1);
		if(randInt<0||randInt>this.substrate.length-1){randInt=0};

		var randPos = this.substrate[randInt].position;
		var position = pos || randPos;

		var randInt2 = Math.floor(Math.random()*this.substrate.length-1);
		if(randInt2<0||randInt2>this.substrate.length-1){randInt2=0};
		var randPos2 = this.substrate[randInt2].position;

		var position2 = pos2 || randPos2;

		// position2.x+=500;
		if(this.SPKNodes.length>0){
			position = this.findNearestTrailPoint(position2);
		}

		var newSPK = new fSPK();
		// newSPK.showGeo();
		newSPK.position = position;//new THREE.Vector3(position.x,position.y,position.z);

		var newTarget = new THREE.Object3D();
		newTarget.position = position2;

		this.SPKNodes.push(newSPK);
		this.SPKAim.push(newTarget);
	}
	else
		console.warn("wtf");
}

fungus.prototype.cleanSPKNodes = function(){
	for (var i = 0; i < this.SPKNodes.length; i++) {
		if(this.SPKNodes[i].trail.length<1 && this.SPKNodes[i].age>1){
			this.SPKNodes.splice(i,1);
		}
	};
}

fungus.prototype.findNearestTrailPoint = function(pos){

	var dist = 1000000;
	var index = [];

	for (var i = 0; i < this.SPKNodes.length; i++) {
		// if(this.SPKNodes[i].trail.length>2){
			for (var j = 0; j < this.SPKNodes[i].trail.length; j++) {
				var trailPos = this.SPKNodes[i].trail[j];
				if(trailPos.distanceTo(pos)<dist){
					dist=trailPos.distanceTo(pos);
					index[0] = i;
					index[1] = j;
				}
			}
		// }
	}

	return this.SPKNodes[index[0]].trail[index[1]];
}

fungus.prototype.update = function(amount){

	// this.tubeParent.children = [];
	// console.log(this.tubeParent.children.length);

	if(this.substrate.length>1){

		if(this.tubeParent.children.length>this.SPKNodes.length){
			this.tubeParent.remove(this.tubeParent.children[this.tubeParent.children.length-1]);
			this.tree.params.tubeGeo.shift();
		}

		whiteNodes(this.substrate);

		for (var i = 0; i < this.SPKNodes.length; i++) {

			var spk = this.SPKNodes[i];

			if(spk.done){
				spk.age++;
				continue;
			}

			var target = this.SPKAim[i];

			spk.aimAt(target.position);
			this.infoBall.position = target.position;

			spk.makeAimArray(this.substrate);

			var arr = [];
			arr.push(spk.trail);

			this.digest(spk.position,30);

			redNodes(spk.aimNodes);

			spk.moveToward(target);
			// spk.applyForce(new THREE.Vector3(noise(time*.01)*50000000,noise(time*.01+.2),noise(time+.3)));
			// spk.applyForce(new THREE.Vector3(1000,0,0));
			spk.update();

			if(spk.aimNodes.length>0){
				target.position = spk.findAveragePosition();
			}
			else{
				spk.done=true;
				if(spk.trail.length>3)
					var emergePos=(spk.trail[2]);
				else
					var emergePos=(spk.trail[0]);


				var trailPoint = this.findNearestTrailPoint(spk.position);
				// console.log("spk trail length: " + spk.trail.length);
				this.addSPK();
			}

			var adder = this.tree.tubes(arr,{width:1,minWidth:1});
			this.tubeParent.add(adder);
		}
	}
	this.cleanSPKNodes();
}

/////////////

fSPK = function(params){

	THREE.Object3D.call(this);

	this.acceleration = new THREE.Vector3(0,0,0);
	this.velocity = new THREE.Vector3(0,0,0);
	this.mass = .01;
	this.damp = .01;
	this.maxVelocity = 25;
	this.angle = .3;
	this.trail = [];
	this.maxTrailSize = 500;
	this.aimNodes = [];
	this.age = 0;

	this.geo = new THREE.CylinderGeometry(.1,2,10);
	this.mat = new THREE.MeshLambertMaterial();

	var mat = new THREE.Matrix4();

	mat.makeRotationX( Math.PI/2 );
	this.geo.applyMatrix(mat);

	this.aim = new THREE.Object3D();
	this.aim.up = new THREE.Vector3(0,100,0);
	this.aimCheck = new THREE.Object3D();

	scene.add(this.aim);
	this.add(this.aimCheck);
}

fSPK.prototype = Object.create(THREE.Object3D.prototype);

fSPK.prototype.applyForce = function(force){

    this.acceleration.add(force.clone().divideScalar(this.mass));
}

fSPK.prototype.moveToward = function(obj){

	var pos = new THREE.Vector3().subVectors(this.position,obj.position);
	this.applyForce(pos.negate());
}

fSPK.prototype.update = function() {

	this.aim.position = this.position.clone();
    this.addToTrail(this.aim.position);

    this.velocity.add(this.acceleration);
    this.velocity.multiplyScalar(this.damp);

    if(this.velocity.length()>this.maxVelocity){
    	this.velocity.normalize();
    	this.velocity.multiplyScalar(this.maxVelocity);
    }

    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
    this.ageTrail();
}

fSPK.prototype.addToTrail = function(pos){

	this.trail.push(pos);
	pos.age = 0;
	if(this.trail.length>this.maxTrailSize)
		this.trail.shift();
}

fSPK.prototype.ageTrail = function(){

	for (var i = 0; i < this.trail.length; i++) {
		this.trail[i].age++;
		if(this.trail[i].age<50)
			this.trail[i].w = this.trail[i].age*.5;
	}
}

fSPK.prototype.checkAngle = function(other){

	thisRot = new THREE.Vector3(this.aim.rotation.x,this.aim.rotation.y,this.aim.rotation.z);
	var tempAimCheck = this.aimCheck.clone();
	tempAimCheck.position = this.position.clone();
	tempAimCheck.up = new THREE.Vector3(0,1,0);
	tempAimCheck.lookAt(other.position);

	var checkRot = new THREE.Vector3(tempAimCheck.rotation.x,tempAimCheck.rotation.y,tempAimCheck.rotation.z);

	return checkRot.angleTo(thisRot);
}

fSPK.prototype.makeAimArray = function(arr){


	this.aimNodes = [];

	this.finishedIndex = [];
	// var newArray = [];


	for (var i = 0; i < arr.length; i++) {
		var checked = this.checkAngle(arr[i]);
		// this.finishedIndex.push(true);
		if(checked<this.angle && checked>-this.angle){
			this.aimNodes.push(arr[i]);
			// this.finishedIndex.push(false);
		}
	}
	// for (var i = 0; i < arr.length; i++) {
	// 	if(this.finishedIndex[i])
	// 		newArray.push(arr[i]);
	// }

	// arr = newArray;
	// return arr;
}

fSPK.prototype.aimAt = function(other){

	// thisRot = this.clone();//new THREE.Vector3(this.aim.rotation.x,this.aim.rotation.y,this.aim.rotation.z);
	// // thisRot.position = this.position.clone();
	// thisRot.lookAt(other);
	this.aim.lookAt(other);
}

fSPK.prototype.colorAimArray = function(arr){

	for (var i = 0; i < this.aimNodes.length; i++) {
		this.aimNodes[i].makeRed();
	};
}

fSPK.prototype.findAveragePosition = function(){
	var arr = this.aimNodes;
	var x = y = z = 0;
	for (var i = 0; i < arr.length; i++) {
		x+=arr[i].position.x;
		y+=arr[i].position.y;
		z+=arr[i].position.z;
	}
	return new THREE.Vector3(x/arr.length,y/arr.length,z/arr.length);
}

fSPK.prototype.showGeo = function(){
	this.aim.add(new THREE.Mesh(this.geo,this.mat));
	this.aimCheck.add(new THREE.Mesh(this.geo,this.mat));
}

///////////

fNode = function(size){

	var scale = size || 1;
	THREE.Object3D.call(this);

	var color = new THREE.Color(0xffffff);
	this.geo = new THREE.SphereGeometry(3);
	this.mat = new THREE.MeshLambertMaterial({color:color});
	// this.obj;
}

fNode.prototype = Object.create(THREE.Object3D.prototype);

fNode.prototype.construct = function(off){
	this.add(new THREE.Mesh(this.geo,this.mat));
}

fNode.prototype.makeRed = function(){
	this.mat.color = new THREE.Color(0xff0000);
}

fNode.prototype.makeWhite = function(){
	this.mat.color = new THREE.Color(0xffffff);
}

function findAveragePosition(arr){
	var x = y = z = 0;
	for (var i = 0; i < arr.length; i++) {
		x+=arr[i].position.x;
		y+=arr[i].position.y;
		z+=arr[i].position.z;
	}
	return new THREE.Vector3(x/arr.length,y/arr.length,z/arr.length);
}

function whiteNodes(arr){
	for (var i = 0; i < arr.length; i++) {
		arr[i].makeWhite();
	};
}

function redNodes(arr){
	for (var i = 0; i < arr.length; i++) {
		arr[i].makeRed();
	};
}

function flatten(arr){

	var tempArr = []

	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			tempArr.push(arr[i][j]);
		}
	}
	return tempArr;
}




