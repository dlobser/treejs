
sc1 = {
    
    setup:function(){
        
        frameRate = 1;
        
        codeName = "starFish";
        
        tree = new TREE();
        
        tree.generate({
            joints:[100,10],
            angles:[0,.2],
            rads:[1],
            length:[1,1]
        })
        
        scene.add(tree);
        
        tree.rotation.y = pi;
        
        tree.position.y = -50;
        
        tree.makeDictionary();
        
        setSliders({"var1":0,"var2":0,"var3":.6,"var4":.2,"var5":.2,"var6":.5,"var7":.5})
        
        radialBranch = tree.makeList([0,-1,-2]);
        featherPieces = tree.makeList([0,-1,-1,-1,-2]);
        
    },
    
    draw:function(time){
        
        tree.applyFunc([
            radialBranch,   {rx:data.var1*.1},
            featherPieces,  {sc:1+(data.var3*.2),rx:data.var2,jOffset:data.var4,jOff:time*data.var7*2,jFreq:data.var5,jMult:data.var6}
        ],tree.transform)
        
    }
}


