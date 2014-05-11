
sc1 = {
    
    setup:function(){
        
        frameRate=1000/48;

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=0;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])

        up=20;
        data.var7=-1;
        varT=true;
        scaler = tree.makeList([0,0,[20,21]]);
        
        grow=0.0001;
        
    },

    draw:function(time){
        grow+=.0001;
        up = Math.floor((((data.var7+1)/2)*900));
        
        if(varT){
            if(data.var7<1)
                data.var7+=grow;
            scaler = tree.makeList([0,0,[up+1,up+2]]);
        }

        time=time*3;
        tree.applyFunc([
            rootBranch, {rx:data.var1*.1,rz:data.var2*.1,jFreq:.1,jMult:.5*.1,jOff:count*-.1,jFract:.3*.1,sc:.9999},
            scaler, {sc:0.1}

        ],tree.transform)

        
    }
}


