var sc1 = {

	//telephone poles
	
	setup:function(){

		tree = new TREE();
		// tree.position.y=-100;

		tree.generate({
			joints: [20,20,10,5],
			divs:   [1,1,2,4],
			start:  [0,0,16,9],
			angles: [0,-Math.PI/2,Math.PI/2,-Math.PI/2],
			length: [100,10,3,1],
			rads:   [1,1,2,1],
			width: 	[1,3,2,1]
		});

				scene.add(tree);

		// tree.position.x=-30;
		tree.rotation.z=-Math.PI/2;

		tree.xform(makeInfo([
			// [0,0,0], {rx:Math.PI/2},
			[0,0,"all"], {rx:Math.PI/10},
			[0,0,[0,19],0,[1,20]], {rz:0,offMult:.0,freq:1,jMult:.01,jFract:3.5,jOffset:Math.PI/10,jFreq:1},
			[0,0,[0,19],0,[0,1],[0,1],[1,20]], {rz:.01},//0,offMult:.0,freq:1,jMult:.01,jFract:3.5,jOffset:Math.PI/10,jFreq:1},

			[0,0,[0,19],0,0], {rz:Math.PI/2},
			[0,0,[0,19],0,1], {ry:Math.PI/2},

		]),
		tree.transform);

		for (var i = 0; i < 20; i++) {
			var thing = tree.FIND([0,0,i]);
			thing.rotation.x =noise(i*Math.random())*2;
		};

		xform(makeInfo([
			[0,0,"all"], {jointGeo:new THREE.Geometry(),ballGeo:new THREE.Geometry()},
		]),
		tree,
		tree.setGeo);

		var poles = tree.reportLayers();
		console.log(poles);

		var stuff = (tree.worldPositionsMultiArray(poles));
		// tree.makeTubes(5);
		console.log(stuff);
		var Lines = [];
		

		for(var j = 0 ; j < 4 ; j++){
			
			for(var i = 0 ; i < stuff[3].length-3 ; i+=4){
				var lines = [];
				lines.push(stuff[3][i+j][4]);
				// lines.push(stuff[3][i+j][4]);
				if(i+j+1 < stuff[3].length-3){
					var v = stuff[3][i+j][4].clone();
					v.y-=30;
					lines.push(v.lerp(stuff[3][i+j+4][4],.5));
									lines.push(stuff[3][i+j+4][4]);


				}
							Lines.push(lines);

			}
		}

		
		scene.add(tree.tubes(Lines,{lengthSegs:3}));
		
		console.log(scene);


	},

	draw:function(time){


	
	}
}