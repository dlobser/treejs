sc1 = {

	//spider tentacles

	setup:function(){

		/*
			Demonstrates offset values using
			jOff, jMult, jFract etc
		*/

		tree = new TREE();

		tree.params.mat = new THREE.MeshPhongMaterial({color:0x111111,specular:0x888888});
		tree.params.color = new THREE.Color(0x111111);

		tree.position.y=-70;

		tree.generate({
			joints: [1,10,5],
			divs:   [1,1],
			start:  [0],
			angles: [0,Math.PI/2],
			length: [0.1,10,5],
			rads:   [1,10,1],
			width:  [2,2,2]
		});

		tree.setScale(3);

		scene.add(tree);

		tree.passFunc(tree.makeInfo([
			[0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,offMult:.2,freq:1.4,jFract:1,jFreq:.8,jMult:.1},
			[0,0,0,[0,9],[0,9],0,"all"],{sc:.7,rz:Math.PI*.11,offMult:.2,freq:1.4,jOffset:2.3},
		]),tree.transform);

		// scene.add(tree.makeTubes({widthSegs:12,lengthSegs:3,minWidth:1.5}));
		
		
	},

	draw:function(time){

		tree.rotation.y+=.01;

		tree.passFunc(tree.makeInfo([
			[0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,off:mouseY,offMult:.2,freq:1.4,jFract:1,jFreq:pmouseY,jMult:.1,jOff:time},
			[0,0,0,[0,9],[0,9],0,[1,9]],{sc:.8,rz:Math.PI*omouseX,offMult:0,freq:1.4,jOffset:2.3,jOff:time*3,off:time*3,jFreq:.7,jMult:.5},
		]),tree.transform);

		
	}
}