
sc1 = {
    
    setup:function(){
        
        frameRate=1;

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=-100;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])

        imagesToSave = (Math.PI*2)/.2;
        countUp=0;
    },

    draw:function(time){
        time=time*3;
        time=time*3;
        time=time*3;
        tree.applyFunc([
            rootBranch, {rz:(1+Math.sin(count*.2))*.005},
            // rootRoot, {rz:0,jFreq:.4,jMult:-.3,jOff:omouseX*5+time}

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


