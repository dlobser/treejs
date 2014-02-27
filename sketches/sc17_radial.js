var sc1 = {

	//basil twist

	setup:function(){

		tree = new TREE({color:new THREE.Color(0x55ee22)});
		// tree.params.jointGeo = new THREE.Geometry();
		tree.params.color = new THREE.Color(0x55ee22);
		tree.branch();
		tree.position.x=-16;
		scene.add(tree);

		for (var i = 0; i <= tree.FIND([0,0,0]).joints; i+=2) {
			var thing = tree.FIND([0,0,i]);
			tree.appendBranch(thing,{amount:30,rz:Math.PI/2,sc:5});
		};

		var things = tree.worldPositionsMultiArray(tree.reportLayers());
		stuff = tree.report();

		thingies = tree.report();
		var doodads = tree.reportLayers();

		var h = new THREE.CylinderGeometry(.02,.1,20);

		console.log(h);

		for (var i = 0; i < doodads[0][0].joints; i++) {
			// doodads[0][i]
			var thing = tree.findJoint(doodads[0][0],i);
			console.log(thing);
			tree.setJointLength(tree.findJoint(doodads[0][0],i),0.0001);


		}


		for (var i = 0; i < thingies.length; i++) {
			for (var j = 0; j < thingies[i].joints; j++) {
				var hi = thingies[i];
				// console.log(hi);
				// tree.setGeo(tree.findJoint(thingies[i],j),{jointGeo:h});
			};
			// tree.setGeo(thingies[i],{ballGeo2:h});
		};

		console.log(tree);

	},

	draw:function(time){

		tree.xform(makeInfo([

			[0,0,"all"],{rz:Math.PI*-.02},
			// [0,0,[0,49],0,[1,30]],{rx:.01,jMult:.5,jFreq:omouseX,jFract:omouseY*.3,jOff:-time*1,jOffset:Math.PI*.02},
			[0,0,[0,49],0,[1,30]],{sc:1,rz:omouseX*.1,jMult:.3,jFreq:omouseX*3,jFract:omouseY*.3,jOff:-time*1,jOffset:Math.PI*.12},
			[0,0,[0,49],0,[20,30]],{sc:.9},

			[0,0,[0,49],0,0],{ry:0,jMult:2.3,jFreq:omouseX,jFract:omouseY*.5,jOff:-time*1,jOffset:Math.PI*.01},
			// [0,0,[0,49],0,0],{ry:time,jMult:.3,jFreq:omouseX,jFract:omouseY*.5,jOff:-time*1,jOffset:Math.PI*8.08},


		]),
		tree.transform);

		tree.xform(makeInfo([	
			[0,0,[0,49],0,[1,30]],{},
		]),
		function(obj,args){
			// obj.children[0].children[0].position.y=10;
			// if(obj.children[0].children[0].position.y>9)
			// 	obj.children[0].children[0].position.y=0;
			});
		
	}
}