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

		g = sphere(1);
		g = new THREE.Mesh(new THREE.CylinderGeometry(.1,1,1),new THREE.MeshLambertMaterial());

		scene.add(sphere(2));
		scene.add(g);
		g.acceleration = new THREE.Vector3();
		g.velocity = new THREE.Vector3();
		g.damp = .01;
		g.maxVelocity=.1;


		b = sphere(1);
				scene.add(b);


		d = new THREE.Mesh(new THREE.CylinderGeometry(.1,2),new THREE.MeshLambertMaterial());
		dp = new THREE.Object3D();
		d.rotation.x=Math.PI/2;
		dp.add(d);
		scene.add(dp);

		t = new THREE.Mesh(new THREE.CylinderGeometry(.1,2),new THREE.MeshLambertMaterial());
		tp = new THREE.Object3D();
		t.rotation.x=Math.PI/2;
		tp.add(t);
		scene.add(tp);


	},

	draw:function(time){

		pos2 = new THREE.Vector3(0,0,0);

		b.position = new THREE.Vector3(omouseX*300,omouseY*-300,0);

		pos = new THREE.Vector3().subVectors(b.position,g.position);
		pos3 = pos.clone().normalize();

		dist = b.position.distanceTo(g.position);
		// console.log(dist);

		// if(dist>100)
		// 	dist=g.damp;
		dp.updateMatrixWorld();
		dp.position = g.position;
		tp.position = g.position;
		tp.lookAt(pos2);
		dp.lookAt(b.position);


		// g.aimAt(pos);
		g.acceleration.add(pos);
		g.velocity.add(g.acceleration);
		g.velocity.multiplyScalar(g.damp);
		g.position.add(g.velocity);
		// g.rotation.x=pos3.y;
		// g.rotation.y=pos3.z;
		// g.rotation.z=pos3.x;
		g.acceleration.multiplyScalar(0);

		rot = new THREE.Vector3(dp.rotation.x,dp.rotation.y,dp.rotation.z);
		rot2 = new THREE.Vector3(tp.rotation.x,tp.rotation.y,tp.rotation.z);

		col = (rot.angleTo(rot2));

		console.log(dp);

		if(col<.1)
			dp.children[0].material.color=(new THREE.Color(0xff0000))
		else
			dp.children[0].material.color=(new THREE.Color(0xffffff))

		
	}
}