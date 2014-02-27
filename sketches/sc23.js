var sc1 = {

	//jiggle world orient example

	setup:function(){

		tree = new TREE();
		tree.branch();
		scene.add(tree);
		// tree.setScale(3);

		tree.position.y=-50;

		tree.xform(tree.makeInfo([
			[0,0,0],{rx:.51},
			[0,0,[45,55]],{rz:-.1},
			[0,0,[45,99]],{rx:-.03}
		]),
		tree.transform);

		axis = new THREE.Vector3(0,0,1);

		tree.traverse(function(obj){obj.updateMatrixWorld();obj.updateMatrix()})
		
	},

	draw:function(time){

		axis.x=mouseY;



		tree.xform(tree.makeInfo([
			[0,0,[70,99]],{axis:axis.normalize(),radians:omouseX}
		]),
		tree.axisRotate);

		
		
		
	}
}