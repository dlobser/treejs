sc1 = {
	
	setup:function(){
	    
	    frameRate = 1;

		tree = new TREE();

		tree.generate({
			joints: [10,30],
			rads:[1,3]

		});

		var thingie = tree.FIND([0,0,4,0,5]);

		var sph = sphere(3);

		var arr = [];

		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,2],9],{array:arr},
		]),tree.utils.addToArray);

		for (var i = 0; i < arr.length; i++) {
			var st = "thing"+i;
			tree[st] = arr[i];
		};

		tree.passFunc(tree.makeInfo([
			[0,0,[0,9],[0,2],9],{obj:sph,ty:5},
		    [0,0,[0,9],[0,2],29],{obj:sph,ty:5},
		]),tree.appendObj);
        
       data.var1 = -0.025530620603356757;
       data.var2 = -0.6318671233390458;
       data.var3 = -0.3286988719712013;
       data.var4 = 0.03943400468975278;
       data.var5 = -0.328;
       data.var6 = 0.8623192584024739;
       data.var7 = 0.7973546331093644;
 

	scene.add(tree);

	},

	draw:function(time){

		tree.passFunc(tree.makeInfo([
		    [0,0,"all"],{rz:data.var2},
			[0,0,[0,9],[0,2],[1,29]],
			{
    			rz:data.var1,
    			rx:data.var1,
    			jMult:data.var5,
    			jFreq:data.var7,
    			jOff:time*data.var6,
    			jFract:.1,
    			sc:1.1
			},
		]),tree.transform);

		if(varE){
		     scene.add(tree.makeTubes({lengthSegs:5}));
		    varE=false;
		    console.log(varE);
		}

	}
}