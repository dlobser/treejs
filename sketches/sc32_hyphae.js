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
			newNode.position = new THREE.Vector3(50-Math.random()*100,50-Math.random()*100,50-Math.random()*100);
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
		tim.colorAimArray();

		g.position = tim.findAveragePosition();
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

fSPK = function(params){

	THREE.Object3D.call(this);

	this.acceleration = new THREE.Vector3(0,0,0);
	this.velocity = new THREE.Vector3(0,0,0);
	this.mass = 1;
	this.damp = .5;
	this.maxVelocity = 5;
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
}

fSPK.prototype.addToTrail = function(pos){

	this.trail.push(pos);
	if(this.trail.length>this.maxTrailSize)
		this.trail.shift();
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

	for (var i = 0; i < arr.length; i++) {
		var checked = this.checkAngle(arr[i]);
		if(checked<this.angle && checked>-this.angle)
			this.aimNodes.push(arr[i]);
	}
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


fSPK.prototype.construct = function(off){

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

