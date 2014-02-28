var sc1 = {
	
	setup:function(){

		count=0;

		tree = new TREE();

		tree.generate({
			joints: [100,5],
			divs:   [1,1],
			start:  [0,4],
			angles: [.2],
			length: [4],
			rads:   [1],
			width:  [1],
		});

		scene.add(tree);

		console.log(tree.reportLayers());

		tree.passFunc(tree.makeInfo([
			[0,0,"all"],{rz:0,jMult:.05,jFreq:.1,jFract:.2,jOff:time},
			[0,0,count,0,"all"],{rz:0,jMult:.05,jFreq:.1,jFract:.2,jOff:time},
		]),tree.transform);

		scene.add(tree.makeTubes());
		

	},

	draw:function(time){

		count++;
		if(count>99)
			count=0;
		time=time*.5;

		argss = {
			rz:0,
			jMult:.5,
			jFreq:.1,
			jFract:.2,
			jOff:time,
			offMult:.9,
			freq:.2,
			off:time
		};

		tree.passFunc(tree.makeInfo([
			[0,0,[1,40]],{rz:0,jMult:.05,jFreq:.1,jFract:.2,jOff:time},
			[0,0,count,0,"all"],argss,
			
		]),tree.transform);

		// tree.bob.rotation.z = 1;
		

		
	}
}