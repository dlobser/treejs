
sc1 = {
    
    setup:function(){

        //a sketch that demonstrates how to save an image sequence
                        
        tree = new TREE();
        
        tree.generate({
            joints:[100,10],
            angles:[pi,.2],
            rads:[3,1],
            start:[70],
            length:[1,2]
        })
        
        scene.add(tree);
        
        tree.rotation.x = pi;

        tree.makeDictionary();
        
        setSliders({"var1":.25,"var2":0,"var3":.6,"var4":.2,"var5":.2,"var6":.5,"var7":.3})
        
        radialBranch = tree.makeList([0,-1,-2]);
        featherPieces = tree.makeList([0,-1,-1,-1,-2]);

        countUp = 1000;

    },
    
    draw:function(time){

        //this value automatically sets the amount of images to a value that will loop
        imagesToSave = (1/(data.var7*.1))*Math.PI*2;
        
        tree.applyFunc([
            radialBranch,   {rx:data.var1*.1},
            radialBranch,   {rz:-.02,jMult:.1,jFract:.02,jFreq:.1,jOffset:data.var4,jOff:count*data.var7*-.1},
            featherPieces,  {sc:1+(data.var3*.2),rx:data.var2,jOffset:data.var4,jOff:count*data.var7*-.1,jFreq:data.var5,jMult:data.var6}
        ],tree.transform)

        //ctrl+e triggers varE to be true
        if(varE){
            saveIMG("fishStick_"+countUp+".png");
            countUp++;
            if(countUp>imagesToSave){
                countUp=1000;
                varE = false;
            }
        }

        
    }
}


