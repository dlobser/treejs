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

		tree = new TREE({color:new THREE.Color(0x886622)});

		tree.params.color = new THREE.Color(0x886622);

		tree.position.y=-70;

		tree.generate({
			joints: [1,20,5],
			divs:   [1,1],
			start:  [0],
			angles: [0,Math.PI/2],
			length: [0.0001,10,5],
			rads:   [1,10,2],
			width:  [.1,.1,.1]
		});

		tree.setScale(2);

		scene.add(tree);

		tree.xform(tree.makeInfo([
			[0,0,0,[0,9],"all"],{rz:.3,jMult:.3,jFreq:.6},
			[0,0,0,[0,9],0],{rz:-2},

			[0,0,0,[0,9],[0,19],[0,1],"all"],{sc:.85,rz:Math.PI*.21},
			[0,0,0,[0,9],[7,9],[0,1],"all"],{sc:.7,rz:Math.PI*.11},

			[0,0,0,[0,9],[0,9],0,0],{ry:Math.PI/2},
			[0,0,0,[0,9],[0,9],1,0],{ry:-Math.PI/2},

		]),tree.transform);

		var arr = tree.worldPositionsArray(tree.report());
		// console.log(arr);

		f = new fungus(3000);
		f.digestRadius=20;
		f.substrateRadius = 1;

		f.makeSubstrateFromArray(flatten(arr));
		f.addSPK();
		f.update();
		scene.add(f);

		

	},

	draw:function(time){
		f.overflowCounter=0;
		f.overflow=1500;
		f.update();
		
	}
}




