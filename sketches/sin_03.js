
sc1 = {
    
    setup:function(){
        
        frameRate=1;

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=pi;
        tree.position.x=-100;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])

        imagesToSave = (Math.PI*2)/.2;
        countUp=0;
    },

    draw:function(time){
        time=time*3;
        time=time*3;
        tree.applyFunc([
            rootBranch, {rz:0,jFreq:.05,jMult:.3,jOff:count*.2},
            rootRoot, {rz:0,jFreq:.4,jMult:-2*3,jOff:.025+(count*.2)+pi}

        ],tree.transform)
        

        if(varE){
            saveIMG("sine_"+count+".png");
            countUp++;
            if(countUp>imagesToSave){
                countUp=0;
                varE = false;
            }
        }
        
    }
}


