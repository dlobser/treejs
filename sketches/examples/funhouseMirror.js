sc1 = {
	
	//funhouse mirror

	setup:function(){

		/*
			demonstrates the use of a video texture, 
			a lofted solid surface, 
			and passing a function to makeTubes
		*/

		videoSetup();

		tree = new TREE();

		// scene.add(tree);

		tree.rotation.z=Math.PI/2;

		tree.generate({
			joints: [100,50],
			divs: 	[1,2],
			start: 	[0],
			angles: [0,Math.PI/2],
			length: [.001,2],
			rads: 	[1]
		});

		tree.passFunc(tree.makeInfo([
			[0,0,"all"],{rz:-Math.PI/49},
			[0,0,[0,49],0,[1,50]],{
				rx:0,
				jFreq:.5,
				jMult:.1,
				jOffset:Math.PI/49,
				jOff:3,
				jFract:0},
		]),tree.transform);

		var arr = tree.worldPositionsMultiArray(tree.reportLayers());
		var mirror = tree.solidSurface(arr[1]);
		mirror.material.map = videoTexture;
		mirror.position.z = 10;
		scene.add(mirror);

		scene.add(tree.makeTubes({minWidth:1,func:function(t){return Math.sin(t)*2}}));
	},

	draw:function(time){
		videoAnimate();
	}
}