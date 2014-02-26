var sc1 = {
	
	//funhouse mirror

	setup:function(){


		// videoSetup();

		tree = new TREE();

		tree.generate({
				joints: [5,3,1,10],
				divs:   [1],
				start:  [0,0,2,0],
				angles: [0,Math.PI/2,1],
				length: [20,15,4,1],
				rads:   [1,2,1,3],
				width:  [1,2,2,1]
		});

		scene.add(tree);

		tree.position.y=-50;

		console.log(tree);

		var ball = new THREE.SphereGeometry(15,15,15);
		var ball2 = new THREE.Geometry();



		tree.xform(tree.makeInfo([
			[0,0,"all"],{ballGeo:ball,ballGeo2:ball2},
		]),tree.setGeo);

		tree.xform(tree.makeInfo([
			[0,0,"all"],{ty:-15},
		]),function(obj,args){obj.children[0].children[0].position.y=7.5;});


		// scene.add(tree.makeTubes({minWidth:1,func:function(t){return Math.sin(t)*2}}));
	},

	draw:function(time){

		

		time=time*3;

		tree.position.y = -40+Math.sin(omouseY*Math.PI*4)*3;

		tree.xform(tree.makeInfo([
			[0,0,[1,5]],{rz:omouseX,ry:omouseY,sc:.9},

			//legs
			[0,0,0,[0,1],1],{rz:Math.PI/2},

			[0,0,0,[0,1],1],{ry:omouseX*3},
			[0,0,0,[0,1],2],{rx:omouseY*3},

			//feet
			[0,0,0,[0,1],0,0,0],{rz:0},
			[0,0,0,[0,1],0,0,0],{rx:omouseY*3},

			[0,0,[0,4],[0,1],0],{ty:-10},

			[0,0,[1,4],[0,1],[1,2]],{rz:mouseY,freq:1,offMult:.2,off:time},


			//fingers
			[0,0,[1,4],[0,1],0,0,0,[0,2],"all"],{rz:0,freq:1,offMult:.2,off:time},
			[0,0,[1,4],[0,1],0,0,0],{rz:0,freq:1,offMult:.3,off:time+.2},

			//feet
			[0,0,0,[0,1],0,0,0,[0,2],"all"],{ry:0,rz:omouseY*.1,sc:.9},

			[0,0,0,0,0,0,0,[0,2],0],{sc:2,ry:-2*omouseY+1.5,rz:1},
			[0,0,0,1,0,0,0,[0,2],0],{sc:2,ry:-2*omouseY-1.5,rz:1},

			//toes
			[0,0,0,0,0,0,0,[0,2],0],{sc:2,ry:0,freq:1,offMult:.2 ,offsetter2:.5},
			[0,0,0,1,0,0,0,[0,2],0],{sc:2,ry:Math.PI-.3,freq:1,offMult:.2,offsetter2:.5},



		]),tree.transform);
		
			

	}
}