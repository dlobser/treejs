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

		tree=new TREE();
		scene.add(tree);

		d = new Debug();
		d.overflow=100;

		tim = new fSPK();
		console.log(tim);
		tim.showGeo();
		scene.add(tim);

		fNodes = [];
		var nodeHolder = new THREE.Object3D();

		for (var i = 0; i < 500; i++) {
			var newNode = new fNode(new THREE.Color(0xffffff));
			newNode.construct();
			newNode.position = new THREE.Vector3(200-Math.random()*400,200-Math.random()*400,200-Math.random()*400);
			fNodes.push(newNode);
			nodeHolder.add(newNode);
		}

		scene.add(nodeHolder);

		g = sphere(10);
		scene.add(g);
		
		b = sphere(1);
		scene.add(b);

	},

	draw:function(time){

		b.position = new THREE.Vector3(omouseX*300,omouseY*-300,-omouseX*300);

		tim.checkAngle(b);

		if(varW)
			tim.aimAt(b.position);
		else
			tim.aimAt(g.position);

		whiteNodes(fNodes);

		tim.makeAimArray(fNodes);

		console.log(fNodes.length);

		tim.colorAimArray();

		if(tim.aimNodes.length>0)
			g.position = tim.findAveragePosition();
		else
			g.position = new THREE.Vector3(25-Math.random()*50,25-Math.random()*50,25-Math.random()*50);


		tim.moveToward(g);
		tim.update();

		var arr = [];
		arr.push(tim.trail);

		if(tree.params.tubeGeo.length>2){
			scene.remove(scene.children[scene.children.length-1]);
			tree.params.tubeGeo.shift();
		}

		var adder = tree.tubes(arr,{width:1,minWidth:1});
		scene.add(adder);
		
	}
}


fungus = function(){

	THREE.Object3D.call(this);

	this.tree = new TREE();

	this.substrate = [];
	this.substrateAmount = 500;
	this.substrateObj = new THREE.Object3D();
	this.substrateSpread = 500;
	this.add(substrateObj);

	this.SPKNodes = [];
	this.SPKAim = [];

	this.tubeGeo = [];
	this.tubeParent = new THREE.Object3D();

	var color = new THREE.Color(0xffffff);
	this.geo = new THREE.SphereGeometry(1);
	this.mat = new THREE.MeshLambertMaterial({color:color});
	// this.obj;
}

fungus.prototype = Object.create(THREE.Object3D.prototype);

fungus.prototype.makeSubstrate = function(amount){

	for (var i = 0; i < this.substrateAmount; i++) {

		var sp = this.substrateSpread;
		var newNode = new fNode(new THREE.Color(0xffffff));
		newNode.construct();
		newNode.position = new THREE.Vector3(sp/2-Math.random()*sp,sp/2-Math.random()*sp,sp/2-Math.random()*sp);
		this.substrate.push(newNode);
		this.substrateObj.add(newNode);
	}
}

fungus.prototype.makeSubstrateFromArray = function(arr){

	for (var i = 0; i < arr.length; i++) {

		var sp = this.substrateSpread;
		var newNode = new fNode(new THREE.Color(0xffffff));
		newNode.construct();
		newNode.position = new THREE.Vector3(sp/2-Math.random()*sp,sp/2-Math.random()*sp,sp/2-Math.random()*sp);
		this.substrate.push(newNode);
		this.substrateObj.add(newNode);
	}
}

fungus.prototype.addSPK = function(pos){

	var randInt = Math.floor(Math.random()*this.substrate.length-1);
	var randPos = this.substrate[randInt].position;
	var position = pos || randPos;

	randInt = Math.floor(Math.random()*this.substrate.length-1);
	randPos = this.substrate[randInt].position;
	position = pos2 || randPos;

	var newSPK = new fSPK();
	newSPK.showGeo();
	fSPK.position = pos;

	var newTarget = new THREE.Object3D();
	newTarget.position = pos2;

	this.SPKNodes.push(newSPK);
	this.SPKAim.push(newTarget);

}

fungus.prototype.update = function(amount){

	for (var i = 0; i < this.SPKNodes.length; i++) {

		var spk = this.SPKNodes[i];
		var target = this.SPKAim[i];
	
		spk.aimAt(target.position);
		// whiteNodes(fNodes);


		spk.makeAimArray(fNodes);

		// console.log(fNodes.length);

		// spk.colorAimArray();

		// if(spk.aimNodes.length>0)
		target.position = spk.findAveragePosition();
		// else
			// target.position = new THREE.Vector3(25-Math.random()*50,25-Math.random()*50,25-Math.random()*50);


		spk.moveToward(target);
		spk.update();

		// var arr = [];
		// arr.push(spk.trail);

		// if(tree.params.tubeGeo.length>2){
		// 	scene.remove(scene.children[scene.children.length-1]);
		// 	tree.params.tubeGeo.shift();
		// }

		// var adder = tree.tubes(arr,{width:1,minWidth:1});
		// scene.add(adder);
	}


}
fSPK = function(params){

	THREE.Object3D.call(this);

	this.acceleration = new THREE.Vector3(0,0,0);
	this.velocity = new THREE.Vector3(0,0,0);
	this.mass = .2;
	this.damp = .5;
	this.maxVelocity = 15;
	this.angle = .3;
	this.trail = [];
	this.maxTrailSize = 500;
	this.aimNodes = [];

	this.geo = new THREE.CylinderGeometry(.1,2,10);
	this.mat = new THREE.MeshLambertMaterial();

	var mat = new THREE.Matrix4();

	mat.makeRotationX( Math.PI/2 );
	this.geo.applyMatrix(mat);

	this.aim = new THREE.Object3D();
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

    this.velocity.add(this.acceleration);
    this.velocity.multiplyScalar(this.damp);

    if(this.velocity.length()>this.maxVelocity){
    	this.velocity.normalize();
    	this.velocity.multiplyScalar(this.maxVelocity);
    }
    this.position.add(this.velocity);

    this.acceleration.multiplyScalar(0);

    this.aim.position = this.position.clone();

    this.addToTrail(this.aim.position);
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
			this.trail[i].w = this.trail[i].age*.1;
	}
}

fSPK.prototype.checkAngle = function(other){

	thisRot = new THREE.Vector3(this.aim.rotation.x,this.aim.rotation.y,this.aim.rotation.z);
	var tempAimCheck = this.aimCheck.clone();
	tempAimCheck.position = this.position.clone();
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


fNode = function(){
	THREE.Object3D.call(this);

	var color = new THREE.Color(0xffffff);
	this.geo = new THREE.SphereGeometry(1);
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

