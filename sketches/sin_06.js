
sc1 = {
    
    setup:function(){
        
        frameRate=1;

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=-50;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])
    },

    draw:function(time){
        time=time*3;
        tree.applyFunc([
            rootBranch, {rx:0,rz:0,jFreq:.072,jMult:.04,jOff:count*-.1,jFract:.02,sc:1.001},
            // rootRoot, {rz:0,jFreq:.4,jMult:-.3,jOff:omouseX*5+time}

        ],tree.transform)
        
    }
}


