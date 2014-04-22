
sc1 = {
    
    setup:function(){
        
        frameRate=1;

        tree = new TREE();
        tree.branch(1000);
        scene.add(tree);
        tree.makeDictionary();
        tree.rotation.z=-pi;
        tree.position.x=0;

        rootBranch = tree.makeList([0,0,-2])
        rootRoot = tree.makeList([0,0,0])

        imagesToSave = (Math.PI*2)/.2;
        countUp=0;
    },

    draw:function(time){
        time=time*3;
        tree.applyFunc([
            rootBranch, {rx:0,rz:0,jFreq:.1,jMult:mouseX*.1,jOff:count*-.2,jFract:mouseY*.1,sc:.9999},

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


