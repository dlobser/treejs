
setupDat();

function setupDat(args){
	
	if(!args) args = {};

	var sliders = args.sliders || 7;

	window.onload = function() {
	    initDat();
	};	
}

function initDat(args){
	
	if(!args) args = {};

	var sliders = args.sliders || 7;
	var values = args.values || {};

	gui=0;

    data = values;

    for (var i = 1; i <= sliders; i++) {
		data["var"+i]=0.0001
	}

	gui = new dat.GUI();
	GUI = gui;

	Object.keys(data).forEach(function (key) {
  		gui.add(data, key, -1.0, 1.0).listen();
	})
	gui.remember(data);
	for (var i in gui.__controllers) {
	    gui.__controllers[i].setValue(0);
	}
	gui.close();

}

function rebuildGui(args) {

	gui.destroy();
	initDat(args);
  
}



var camera, controls, scene, renderer, projector,objects,
	mouseX, mouseY, omouseX, omouseY, pmouseX, pmouseY, opmouseX, opmouseY, rmouseX, rmouseY, mousePressed,
	pmx, pmy,
	frameRate,pause,
	varW,varE,varR,varT,varY,
	var1,var2,var3,var4,var5,var6,var7,
	objectSelectable;

var tree;

var clock = new THREE.Clock();
clock.start();
var time = clock.getElapsedTime();
var count;

var thing = [];

init();

window.addEventListener('load', function() { animate();}, false)

function init() {

	frameRate = 1000/30;
	pause = false;
	objectSelectable = false;

	projector = new THREE.Projector();

	objects = [];

	count=0;

	pmx = pmy = [];

	varW = varE = varR = varT = varY = false;

	mouseX = mouseY = omouseX = omouseY = pmouseX = pmouseY = opmouseX = opmouseY = 0;
	mousePressed = false;

	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z = 650;

	controls = new THREE.OrbitControls( camera,container );
	// controls.addEventListener( 'change', render );

	reinit();

	renderer = new THREE.WebGLRenderer( { clearColor: 0xff0000, antialias: true ,alpha: true , preserveDrawingBuffer: true 
} );
	renderer.setClearColor( 0x000000, 0);

	renderer.setSize( window.innerWidth, window.innerHeight);
	
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );


}

function reinit() {

	scene = new THREE.Scene();

	sc1.setup();

	scene.traverse(function(t){if(t.geometry)objects.push(t)});
		
	light = new THREE.DirectionalLight( 0x4444444 ); light.position.set( 1, 1, .5 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x555555 ); light.position.set( -1, 1, .5 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x555555 ); light.position.set( 0, 1, 1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x666666 ); light.position.set( 0, 1, -1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x334477,1,0 ); light.position.set( -1, -1, -1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x556699,1,0 ); light.position.set( 1, -1, 1 ); scene.add( light );
	light = new THREE.AmbientLight( 0x222222 ); scene.add( light );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

	// console.log(data.var1);

	setTimeout(function(){

		var time = clock.getElapsedTime();

		render();

		count++;
		
		pm(4);

		if(!pause)
			sc1.draw(-time);


		setSpan("mouseInfoX","mouseX: " + truncateDecimals(mouseX,3) + " rmouseX: " + rmouseX + " omouseX: " + truncateDecimals(omouseX,3));
		setSpan("mouseInfoY","mouseY: " + truncateDecimals(mouseY,3) + " rmouseY: " + rmouseY + " omouseY: " + truncateDecimals(omouseY,3));

		requestAnimationFrame( animate );
		controls.update();

	},frameRate)
	
}



function render() {

	renderer.render( scene, camera );

}

function pm(length){

	len = length || 2;
	returner = [];

	pmx.push(mouseX);
	pmy.push(mouseY);

	pmouseX = (pmx[0]);
	pmouseY = (pmy[0]);

	if(pmx.length>len)
		pmx.shift();
	if(pmy.length>len)
		pmy.shift();

	opmouseX = pmouseX-.5;
	opmouseY = pmouseY-.5;

}

function setSpan(id, str) {
    document.getElementById(id).firstChild.nodeValue = str;
}

function setSliders(obj){
	Object.keys(obj).forEach(function (key) {
  		data[key] = obj[key];
  		// console.log(data[key]);
	});
}
	
window.onkeyup = onKeyUp;

function onKeyUp(evt) {

	// console.log(evt.keyCode);

	if(!editable){
		if(evt.keyCode == 40){
			tree.position.y -= 30;
		}
		if(evt.keyCode == 38){
			tree.position.y += 30;
		}
		if(evt.keyCode == 37){
			tree.position.x -= 30;
		}
		if(evt.keyCode == 39){
			tree.position.x += 30;
		}
	}

	if(evt.keyCode == 82 && evt.ctrlKey){
		findAndReplaceAce();
	}	
	if(evt.keyCode == 68 && evt.ctrlKey)
		objectSelectable = !objectSelectable;

	if(evt.keyCode == 67 && evt.ctrlKey){
		activateAce();
	}	
	if(evt.keyCode == 88 && evt.ctrlKey){
		updateCode();
	}	
	if(evt.keyCode == 32 && evt.ctrlKey){
		pause = !pause;
	}
	if(evt.keyCode == 188 && evt.ctrlKey){
		changeAceFontSize(-1);
	}
	if(evt.keyCode == 190 && evt.ctrlKey){
		changeAceFontSize(1);
	}
	if(evt.keyCode == 189 && evt.ctrlKey){
		changeAceWidth(-5);
	}
	if(evt.keyCode == 187 && evt.ctrlKey){
		changeAceWidth(5);
	}
	if(evt.keyCode == 73 && evt.ctrlKey && !evt.shiftKey){
		invertColor();
	}	
	if(evt.keyCode == 83 && evt.ctrlKey && evt.shiftKey){
		saveAce();
	}
	if(evt.keyCode == 73 && evt.ctrlKey && evt.shiftKey){
		aceBackground();
	}
	if(evt.keyCode == 87 && evt.ctrlKey){ varW = !varW;}
	if(evt.keyCode == 69 && evt.ctrlKey){ varE = !varE;}
	if(evt.keyCode == 82 && evt.ctrlKey){ varR = !varR;}
	if(evt.keyCode == 84 && evt.ctrlKey){ varT = !varT;}
	if(evt.keyCode == 89 && evt.ctrlKey){ varY = !varY;}
	// }
}

window.onmousedown = function(event) { // Mouse pressed

	mousePressed = true;
	moveMouse(this.handle, event);

	if(objectSelectable!=undefined){
		if(objectSelectable){
			scene.traverse(function(t){t.updateMatrixWorld()});

			var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
			projector.unprojectVector( vector, camera );
			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
			var intersects = raycaster.intersectObjects( objects,true );

			if(intersects.length>0){
				intersects[0].object.material = new THREE.MeshLambertMaterial({color:0x00ffff});
				reportParent(intersects[0].object);
			}
		}
	}
}

function reportParent(obj){
	if(obj.joint == undefined){
		reportParent(obj.parent);
	}
	else
		console.log(obj);
}
window.onmouseup = function(event) {   // Mouse released
	mousePressed = false;
}
window.onmousemove = function(event) { // Mouse moved
	moveMouse(this.handle, event);
}

function moveMouse(handle, event) {
	var x = event.clientX;
	var y = event.clientY;

	var rect = event.target.getBoundingClientRect();
	if ( rect.left <= x && x <= rect.right &&
	  	rect.top  <= y && y <= rect.bottom ) {
		rmouseX = x;
		rmouseY = y;
		mouseX = x / rect.right;
		mouseY = y / rect.bottom;
		omouseX = mouseX-.5;
		omouseY = mouseY-.5;

	}
}

// Get a reference to the image element
 
// Take action when the image has loaded
function saveIMG() {
	var ctx = renderer.domElement;
	// console.log(ctx);

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

// 	function onInitFs(fs) {
//   console.log('Opened file system: ' + fs.name);
// }
function errorHandler(fs){}
window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});
function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

// window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);

window.requestFileSystem(PERSISTENT, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);


// var c = $("#myCanvas");
// renderer = new THREE.CanvasRenderer({canvas: c.get(0)});
// renderer.setSize(700, 700);
    // var imgCanvas = document.createElement("canvas"),
    //     imgContext = imgCanvas.getContext("2d");

    // var elephant = document.getElementById("container");

 
    // // Make sure canvas is as big as the picture
    // imgCanvas.width = elephant.width;
    // imgCanvas.height = elephant.height;
 
    // // Draw image into canvas element
    // imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
 
    // // Get canvas contents as a data URL
    var imgAsDataURL = ctx.toDataURL("image/png");
 
    // Save image into localStorage
    try {
        localStorage.setItem("elephant", imgAsDataURL);
        console.log("heyhey");
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
}


		