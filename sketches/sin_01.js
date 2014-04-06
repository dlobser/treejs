
sc1 = {
    
    setup:function(){

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=-100;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])
    },

    draw:function(time){
        time=time*3;
        tree.applyFunc([
            rootBranch, {rz:0,jFreq:.3,jMult:.3,jOff:time},
            rootRoot, {rz:0,jFreq:.3,jMult:-.3333*3,jOff:.15+time+pi}

        ],tree.transform)
        
    }
}


