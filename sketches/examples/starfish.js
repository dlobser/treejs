
sc1 = {
    
    setup:function(){
        
        codeName = "starFish";
        
        tree = new TREE();
        
        tree.generate({
            joints:[20,10],
            angles:[pi,.2],
            rads:[5,2],
            length:[10,1]
        })
        
        scene.add(tree);
        
        tree.rotation.x = pi;
        
        tree.makeDictionary();
        
        setSliders({"var1":.21,"var2":.34,"var3":.4,"var4":.32})
        
        radialBranch = tree.makeList([0,-1,-2]);
        featherPieces = tree.makeList([0,-1,-1,-1,-2]);
        
    },
    
    draw:function(time){
        
        tree.applyFunc([
            radialBranch,   {rx:data.var1,sc:data.var4*3},
            featherPieces,  {rx:data.var2,sc:data.var3*3}
        ],tree.transform)
        
    }
}


