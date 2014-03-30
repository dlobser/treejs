sc1 = {
    
    setup:function(){
        
        tree = new TREE();

        frameRate = 1;

        tree.branch(500);
        tree.makeDictionary();

        thing = tree.makeSkinnedGeo();


        scene.add(thing);

        thee = tree.makeList([0,0,-2])

     

    },

    draw:function(time){
        
        tree.applyFunc([
            thee,{rz:omouseX*.1,sc:.999}],tree.transform,true);
       
    }
}