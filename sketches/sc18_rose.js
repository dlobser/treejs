var sc1 = {

	setup:function(){

		tree = new TREE({color:0x00ff00});

		// tree.params.jointGeo = new THREE.Geometry();
		// tree.params.ballGeo = new THREE.SphereGeometry(.3);
		tree.params.color=0x00ff00;
		
		scene.add(tree);
		tree.position.y=-80;

		tree.generate({
			joints: [100,1,10],
			divs:   [1,1],
			start:  [0,90,0],
			angles: [0,0,Math.PI/2],
			length: [1,1,3],
			rads:   [1,1,10],
		});

		tree.xform(makeInfo([

			[0,0,[0,9],0],{off:0},
			[0,0,[0,9],0,0,0,[0,10]],{off:0},
			[0,0,[0,9],0,0,1,[0,10]],{off:1},
			[0,0,[0,9],0,0,2,[0,10]],{off:2},
			[0,0,[0,9],0,0,3,[0,10]],{off:3},
			[0,0,[0,9],0,0,4,[0,10]],{off:4},
			[0,0,[0,9],0,0,5,[0,10]],{off:5},
			[0,0,[0,9],0,0,6,[0,10]],{off:6},
			[0,0,[0,9],0,0,7,[0,10]],{off:7},
			[0,0,[0,9],0,0,8,[0,10]],{off:8},
			[0,0,[0,9],0,0,9,[0,10]],{off:9},

		]),
		function(obj,args){obj.offset2=args.off;});

		tree.xform(makeInfo([

		
			[0,0,[0,9],0,0,[0,9],0],{ry:0,offsetter2:Math.PI*.1,off:-.1},
			[0,0,[0,9],0,0,[0,9],[1,10]],{rz:-.2},//,offsetter2:0,freq:.04,offMult:-.1,off:.4},
			[0,0,[0,9],0,0,[0,9],[1,10]],{rx:0,offsetter2:0.0001,freq:.1,offMult:-.5,off:-.5},
			[0,0,[90,100]],{ry:1.9,sc:.94},
			[0,0,0,0,0],{rx:.1},
			[0,0,1,0,0],{rx:-0},
			[0,0,2,0,0],{rx:-.1},
			[0,0,3,0,0],{rx:-.2},
			[0,0,4,0,0],{rx:-.3},
			[0,0,5,0,0],{rx:-.4},
			[0,0,6,0,0],{rx:-.7},
			[0,0,7,0,0],{rx:-.8},
			[0,0,8,0,0],{rx:-1.0},
			[0,0,9,0,0],{rx:-1.2},


		]),
		tree.transform);

		tree.xform(makeInfo([

			[0,0,10],{},
			[0,0,20],{},
			[0,0,30],{},
			[0,0,40],{},
			[0,0,50],{},
			[0,0,60],{},
			[0,0,70],{},
			[0,0,80],{},

		]),
		tree.appendBranch);

		tree.xform(makeInfo([

			[0,0,[1,89]],{ry:.2},
			[0,0,[1,89]],{sc:.99,rx:.01,jFreq:.5,jMult:.1},
			[0,0,[0,9],0,"all"],{rz:.1,sc:.9},
				[0,0,0],{sc:12},
			
		]),
		tree.transform);


		var newMat = new THREE.MeshLambertMaterial({color:0xff0000})

		tree.xform(makeInfo([

			
			[0,0,[8,17],0,0,[0,9],[1,10]],{newMat:newMat},

		]),
		function(obj,args){
			obj.children[0].children[1].children[0].material = args.newMat;
			obj.children[0].children[0].material = args.newMat;
			obj.children[0].children[0].children[0].material = args.newMat;
		});

		// scene.add(tree.makeTubes());

	},

	draw:function(time){

		var waver = Math.sin(time*10)*.01;

		tree.xform(makeInfo([

			[0,0,[50,89]],{rx:.01,jFreq:.5,jMult:.1,jOff:time},
			[0,0,[8,17],0,0],{rz:waver,freq:2,offMult:.1,off:time*3},
			[0,0,[8,17],0,0,[0,9],[9,10]],{rz:0,freq:1,offMult:.5,off:time*3},

		]),
		tree.transform);
		
		
	}
}