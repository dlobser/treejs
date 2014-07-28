
sc1 = {
    
    setup:function(){
        
        tree = new TREE();
        
        tree.generate({
            joints:[1],
            angles:[1],
            rads:[3,3,3,3,3,3],
            length:[10]
        })
        
        scene.add(tree);
       
    },
    
    draw:function(time){
        
        tree.applyFunc(tree.makeInfo([
            [0,-1,-1],                              {rz:mouseX},
            [0,-1,-1,-1,-1],                        {rz:mouseX+data.var1},
            [0,-1,-1,-1,-1,-1,-1],                  {rz:mouseX+data.var2},
            [0,-1,-1,-1,-1,-1,-1,-1,-1],            {rz:mouseX+data.var3},
            [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],      {rz:mouseX+data.var4},
            [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],{rz:mouseX+data.var5},
        ]),tree.transform)
        
    }
}


