var sc1 = {
	
	setup:function(){

		tree = new TREE();

		// tree.branch();

		tree.generate({joints:[90,30],divs:[1,10],length:[1]})

		report = (tree.report());

		// for (var i = 0; i < report[0].joints; i++) {
		// 	tree.setJointLength((tree.FIND([0,0,i])),2);
		// };
		// tree.FIND([0,0,0]).rotator.rotation.z=Math.PI;
		// scene.add(tree);



		// tree.position.z=550.5;

		console.log(report);

		balls = [];

		// balls = tree.worldPositionsArray(report);

		balls = tree.worldPositionsArray(report);
		var flatArray = [];
		for (var i = 0; i < balls.length; i++) {
			for (var j = 0; j < balls[i].length; j++) {
				flatArray.push(balls[i][j]);
			};
		};
		console.log(flatArray);
		

		console.log(balls);

		var bls = tree.metaBalls.init();
		// tree.metaBalls.effect.animate=true;
		// console.log(tree.metaBalls.effect);
		// tree.metaBalls.updateBalls(balls);
		tree.metaBalls.setSize(70);
		tree.metaBalls.setResolution(120);
		tree.metaBalls.ballSize = 1;
		// tree.metaBalls.updateBalls(balls);
		tree.metaBalls.showBox();
		scene.add(bls);
		console.log(bls);
		resolution = 220;
		numBlobs = 10;
		size = 100;

		// var box = cube(size*2);
		// // box.position.set( size/2,size/2,size/2 );
		// box.material.transparent=true;
		// box.material.opacity=.2;
		// scene.add(box);

		// effect = new THREE.MarchingCubes( resolution, new THREE.MeshLambertMaterial({color:0xffffff}) );
		// // effect.position.set( size/2,size/2,size/2 );
		// effect.scale.set( size,size,size );


		// // effect.enableUvs = false;
		// // effect.enableColors = false;

		// balls = tree.worldPositionsArray(report);
		// 		effect.animate=true;

		// this.updateCubes( effect, time, 30 );
		// bob = new THREE.Mesh(effect.generateGeometry(),new THREE.MeshLambertMaterial({color:0xffffff}));
		// // scene.add(bob);
		// scene.add(effect);
		// scene.add(bob.clone());
		// effect.animate=false;
		// // this.addToScene();
		// console.log(bob);
		

	},

	draw:function(time){

		tree.xform(tree.makeInfo([
			[0,0,"all"],{sc:.99,rz:omouseY*.1,rx:mouseY*.01,jFreq:.03,jMult:.05,jOff:mouseX*5},
			[0,0,[0,8],[0,1],"all"],{rz:.1},

		]),tree.transform);

		balls = tree.worldPositionsArray(report);

		var flatArray = [];

		for (var i = 0; i < balls.length; i++) {
			for (var j = 0; j < balls[i].length; j++) {
				flatArray.push(balls[i][j]);
			};
		};

		tree.metaBalls.updateBalls(flatArray);


		if(varW){
			// effect.animate=true;
			// this.updateCubes( effect, time, 30 );
			// this.addToScene();
			// varW = false;
			// effect.animate=false;
		}
		

	},	

	addToScene:function(){

		var bob = new THREE.Mesh(effect.generateGeometry(),new THREE.MeshLambertMaterial({color:0xffffff}));
		// bob.position.set( size/2,size/2,size/2 );
		bob.scale.set(    size,size,size );

		scene.add( bob );

	},

	updateCubes:function( object, time, numblobs, floor, wallx, wallz ) {

		object.reset();

		// fill the field with some metaballs

		var i, ballx, bally, ballz, subtract, strength;

		subtract = 10;
		strength = .005;//1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

		for ( i = 0; i < balls[0].length; i ++ ) {
			// console.log(balls[0][i]);
			ballx = (((balls[0][i].x+size)*  (1/size/2))); 
			bally = (((balls[0][i].y+size)*  (1/size/2)));//+(size*.000625); 
			ballz = (((balls[0][i].z+size)*  (1/size/2)));//+(size*.000625); 


			object.addBall(ballx, bally, ballz, strength, subtract);

		}

		if ( floor ) object.addPlaneY( 2, 12 );
		if ( wallz ) object.addPlaneZ( 2, 12 );
		if ( wallx ) object.addPlaneX( 2, 12 );

	}

}