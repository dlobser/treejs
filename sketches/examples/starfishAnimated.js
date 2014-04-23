
sc1 = {
    
    setup:function(){
        
        frameRate = 1;
        
        // when codeName is set the use of (ctrl+shift+s)
        // will save a .js file with that name
        
        codeName = "starFish";
        
        tree = new TREE();
        
        tree.generate({
            joints:[10,10],
            angles:[pi,.2],
            rads:[5,2],
            length:[10,1]
        })
        
        scene.add(tree);
        
        tree.rotation.x = pi;
        
        tree.makeDictionary();
        
        setSliders({"var1":.36,"var2":.1,"var3":0,"var4":.35,"var5":.2,"var6":.5,"var7":.5})
        
        radialBranch = tree.makeList([0,-1,-2]);
        featherPieces = tree.makeList([0,-1,-1,-1,-2]);
        
    },
    
    draw:function(time){
        
        tree.applyFunc([
            radialBranch,   {rx:data.var1,sc:data.var4*3},
            featherPieces,  {sc:1+(data.var2),rx:data.var3,freq:.001,jOffset:1,jOff:time*data.var7*2,jFreq:data.var5,jMult:data.var6}
        ],tree.transform)
        
    }
}


