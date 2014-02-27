var sc1 = {
	
	setup:function(){

		tree = new TREE();

		tree.generate({
			joints: [10,10],

		});

		var thingie = tree.FIND([0,0,4,0,5]);

		var sph = sphere(3);

		var arr = [];

		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,1],9],{array:arr},
		]),tree.utils.addToArray);

		console.log(arr);

		for (var i = 0; i < arr.length; i++) {
			var st = "thing"+i;
			tree[st] = arr[i];
		};

		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,1],9],{obj:sph,ty:5},
		]),tree.appendObj);


		scene.add(tree);

	},

	draw:function(time){



	}
}