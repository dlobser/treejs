sc1 = {
	
	setup:function(){

		tree = new TREE();

		tree.generate({
			joints: [10,80],

		});

		var thingie = tree.FIND([0,0,4,0,5]);

		var sph = sphere(3);

		var arr = [];
        varE=false;
		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,1],9],{array:arr},
		]),tree.utils.addToArray);

// 		console.log(arr);

		for (var i = 0; i < arr.length; i++) {
			var st = "thing"+i;
			tree[st] = arr[i];
		};

		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,1],9],{obj:sph,ty:5},
		]),tree.appendObj);
        
        data.var1=-.2;

		scene.add(tree);

	},

	draw:function(time){

		tree.passFunc(tree.makeInfo([
		    [0,0,"all"],{rz:data.var2},
			[0,0,[0,9],[0,1],"all"],{rz:data.var1},
			[0,0,[0,9],[0,1],"all"],{rx:data.var3+time*.2},
		]),tree.transform);
		
		if(varE){
		    scene.add(tree.makeTubes());
		    varE=false;
		    console.log(varE);
	}

	}
}