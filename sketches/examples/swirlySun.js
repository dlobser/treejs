sc1 = {
	
	setup:function(){
	    
	    frameRate = 1;

		tree = new TREE();

		tree.generate({
			joints: [10,30],
			rads:[1,3]

		});
        
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
		    [0,0,-1],{rz:data.var2},
			[0,0,-1,-1,-2],
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

		//trigger these with the key combos ctrl+e and ctrl+r

		if(varE){
		    scene.add(tree.makeTubes({lengthSegs:5}));
		    varE=false;
		}

		if(varR){
			scene.remove(tree);
			varR=false;
		}

	}
}