
sc1 = {
    
    setup:function(){
        
        frameRate=1;

        tree = new TREE();
        tree.branch(300);
        tree.branch(300);
        tree.branch(300);
        tree.branch(300);
        tree.branch(300);
        tree.branch(300);


        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=pi;
        // tree.position.x=-100;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])
        rootBranch2 = tree.makeList([0,1,-2])
          rootRoot2 = tree.makeList([0,1,0])
        rootBranch3 = tree.makeList([0,2,-2])
          rootRoot3 = tree.makeList([0,2,0])
        rootBranch4 = tree.makeList([0,3,-2])
          rootRoot4 = tree.makeList([0,3,0])
        rootBranch5 = tree.makeList([0,4,-2])
          rootRoot5 = tree.makeList([0,4,0])
        rootBranch6 = tree.makeList([0,5,-2])
          rootRoot6 = tree.makeList([0,5,0])

        imagesToSave = (Math.PI*2)/.2;
        countUp=0;
    },

    draw:function(time){
        time=time*3;
        time=time*3;
        time=time*3;
        tree.applyFunc([
            rootBranch,  {rz:(Math.sin(count*.2))*.02},
            rootBranch2, {rz:(Math.sin(count*.2))*-.02},
              rootRoot2, {rz:pi*2},
            rootBranch3, {rz:(Math.sin(.2+count*.2))*.02},
              // rootRoot3, {rz:pi*2},
            rootBranch4, {rz:(Math.sin(.2+count*.2))*-.02},
              rootRoot4, {rz:pi*2},
            rootBranch5, {rz:(Math.sin(.4+count*.2))*.02},
              // rootRoot5, {rz:pi*2},
            rootBranch6, {rz:(Math.sin(.4+count*.2))*-.02},
              rootRoot6, {rz:pi*2},

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


