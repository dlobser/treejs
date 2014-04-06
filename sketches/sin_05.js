
sc1 = {
    
    setup:function(){

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=-150;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])
    },

    draw:function(time){
        time=time*3;
        tree.applyFunc([
            rootBranch, {rz:0,jFreq:.05,jMult:.3,jOff:count*.2,jFract:.001},
            // rootRoot, {rz:0,jFreq:.4,jMult:-.3,jOff:omouseX*5+time}

        ],tree.transform)
        
    }
}


