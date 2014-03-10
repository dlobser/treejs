sc1 = {
    
    setup:function(){
        
        tree = new TREE();

        tree.generate({joints:[5,1,6],
            rads:[3]});

                console.log(tree);


        thing = tree.checkForAll(["all","all","all","all","all","all","all"]);

        var p = tree.makeSkinnedGeo();
        scene.add(p);
        // thing = tree.utils.makeFlatList([0,[0,1],[0,1],[0,1],[0,1],[0,1],"all"]);
        // thing = tree.checkForAll([0,[0,1],[0,1],[0,1],[0,1],[0,1],"all"]);


        // scene.add(tree);

        // var otherThing = tree.checkForAll(thing);

        console.log(tree);
        console.log(thing);
        // console.log(tree.FIND([0,0,1]))
    },

    draw:function(time){

        tree.applyFunc([
            thing,{rz:mouseX}],
            tree.transform,true);
     
    }
}
