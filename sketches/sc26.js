var sc1 = {
	
	//funhouse mirror

	setup:function(){


		// videoSetup();

		tree = new TREE();

		tree.generate({
				joints: [2,2,2,2,2,2],
				divs:   [1],
				start:  [1],
				angles: [.2],
				length: [5],
				rads:   [3],
		});

		scene.add(tree);

		console.log(tree);

		// tree.xform(tree.makeInfo([
		// 	[0,0,"all"],{amount:2,sc:5},
		// ]),tree.appendBranch);

		

		// scene.add(tree.makeTubes({minWidth:1,func:function(t){return Math.sin(t)*2}}));
	},

	draw:function(time){

		var time = time*.5;
		var parms = {rx:.01,rz:omouseX,jMult:.1,jFreq:.2,jOff:time*3,jFract:omouseY*.01,jOffset:.4}
		// videoAnimate();
		tree.xform(tree.makeInfo([
			[0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],0,[0,2],0,[0,2],"all"],parms,
		]),tree.transform);

		var parms = {radians:omouseX}

		tree.xform(tree.makeInfo([
			[0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],0,[0,2],"all"],parms,
			[0,[0,2],0,[0,2],0,[0,2],0,[0,2],0,[0,2],"all"],parms,
		]),tree.axisRotate);
	}
}