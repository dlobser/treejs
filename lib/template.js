var camera, controls, scene, renderer, 
	mouseX, mouseY, omouseX, omouseY, pmouseX, pmouseY, opmouseX, opmouseY, rmouseX, rmouseY, mousePressed,
	pmx, pmy,
	frameRate,pause,
	varW,varE,varR,varT,varY;

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

	count=0;

	pmx = pmy = [];

	varW = varE = varR = varT = varY = true;

	mouseX = mouseY = omouseX = omouseY = pmouseX = pmouseY = opmouseX = opmouseY = 0;
	mousePressed = false;

	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 650;

	controls = new THREE.OrbitControls( camera );
	// controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	// scene.fog = new THREE.FogExp2( 0x000000, 0.0004 );

	sc1.setup();
		
	light = new THREE.DirectionalLight( 0x4444444 ); light.position.set( 1, 1, .5 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x555555 ); light.position.set( -1, 1, .5 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x555555 ); light.position.set( 0, 1, 1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x666666 ); light.position.set( 0, 1, -1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x334477,1,0 ); light.position.set( -1, -1, -1 ); scene.add( light );
	light = new THREE.DirectionalLight( 0x556699,1,0 ); light.position.set( 1, -1, 1 ); scene.add( light );
	light = new THREE.AmbientLight( 0x222222 ); scene.add( light );

	renderer = new THREE.WebGLRenderer( { clearColor: 0xff0000, antialias: true ,alpha: true } );
	renderer.setClearColor( 0x000000, 0);

	renderer.setSize( window.innerWidth-20, window.innerHeight-70);
	
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

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
	
window.onkeyup = onKeyUp;

function onKeyUp(evt) {
	console.log(evt.keyCode);

	if(evt.keyCode == 65){
		tree.position.y -= 30;
	}
	if(evt.keyCode == 81){
		tree.position.y += 30;
	}
	if(evt.keyCode == 32){
		pause = !pause;
	}
	if(evt.keyCode == 87){ varW = true;}
	if(evt.keyCode == 69){ varE = true;}
	if(evt.keyCode == 82){ varR = true;}
	if(evt.keyCode == 84){ varT = true;}
	if(evt.keyCode == 89){ varY = true;}
}

window.onmousedown = function(event) { // Mouse pressed
	mousePressed = true;
	moveMouse(this.handle, event);
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
};

		