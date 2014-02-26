var sc1 = {


	setup:function(){

		video = document.createElement('video');
		video.width = 320;
		video.height = 240;
		video.autoplay = true;
		video.loop = true;

		//make it cross browser
		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		//get webcam
		navigator.getUserMedia({
			video: true
		}, function(stream) {
			//on webcam enabled
			video.src = window.URL.createObjectURL(stream);
			prompt.style.display = 'none';
			title.style.display = 'inline';
			container.style.display = 'inline';
			gui.domElement.style.display = 'inline';
		}, function(error) {
			prompt.innerHTML = 'Unable to capture WebCam. Please reload the page.';
		});

		videoTexture = new THREE.Texture(video);


		tree = new TREE();

		tree.params.mat = new THREE.MeshPhongMaterial({color:0xffffff,specular:0x888888});
		// tree.params.color = new THREE.Color(0x111111);
		tree.params.mat.map = videoTexture

		console.log(tree.params.mat);

		tree.position.y=-70;

		tree.generate({
			joints: [1,10,5],
			divs:   [1,1],
			start:  [0],
			angles: [0,Math.PI/2],
			length: [0.0001,10,5],
			rads:   [1,10,1],
			width:  [2,2,2]
		});

		tree.setScale(5);

		scene.add(tree);

		tree.xform(tree.makeInfo([
			[0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,offMult:.2,freq:1.4,jFract:1,jFreq:.8,jMult:.1},
			[0,0,0,[0,9],[0,9],0,"all"],{sc:.7,rz:Math.PI*.11,offMult:.2,freq:1.4,jOffset:2.3},
		]),tree.transform);


		// scene.add(tree.makeTubes({widthSegs:12,lengthSegs:3,minWidth:1.5}));
		
		
	},

	draw:function(time){

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
		videoTexture.needsUpdate = true;
	}

		tree.rotation.y+=.01;

		tree.xform(tree.makeInfo([
			[0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,off:mouseY,offMult:.2,freq:1.4,jFract:1,jFreq:pmouseY,jMult:.1,jOff:time},
			[0,0,0,[0,9],[0,9],0,[1,9]],{sc:.8,rz:Math.PI*omouseX,offMult:0,freq:1.4,jOffset:2.3,jOff:time*3,off:time*3,jFreq:.7,jMult:.5},
		]),tree.transform);

		
	}
}