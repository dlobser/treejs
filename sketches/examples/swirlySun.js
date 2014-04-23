sc1 = {
	
	setup:function(){
	    
	    frameRate = 1;

		tree = new TREE();

		tree.generate({
			joints: [10,30],
			rads:[1,3]

		});

		// You can use this command in the console to print slider values as an object,
		// then pass that into setSliders to set these values when the sketch runs.
		// console.log(JSON.stringify(data));

		setSliders({"var1":-0.025,"var2":-0.6,"var3":-0.3,"var4":0.04,"var5":-0.3,"var6":0.86,"var7":0.8});

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