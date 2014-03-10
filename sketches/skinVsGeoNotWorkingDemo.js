sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        tree = new TREE();

        tree.params.jointScale.y=5;

        tree.generate({joints:[5,5,5]});

        thing = tree.makeSkinnedGeo();

        thing.position.x = 100;

        console.log(tree);

        scene.add(thing);
        scene.add(tree);

        console.log(tree.parts);
        console.log(tree.boneDictionary);

        var ml = (tree.makeDictionary());

        chuck = tree.utils.makeFlatList([0,0,2,[0,1],0]);
        // bill = tree.utils.makeFlatList([0,0,[2,3],0,"all"]);
        // tendrils = tree.utils.makeFlatList([0,0,[0,4],[0,1],[0,4],[0,1],"all"]);

    },

    draw:function(time){
       
        tree.applyFunc(
            [
            // bill,{rx:omouseY},
            chuck,{rz:omouseX},
            // tendrils,{rx:omouseY}
            ],
        tree.transform,true
        );
        tree.applyFunc(
            [
            // bill,{rx:omouseY},
            chuck,{rz:omouseX},
            // tendrils,{rx:omouseY}
            ],
        tree.transform
        );
    }
}


