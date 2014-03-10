sc1 = {
    
    setup:function(){
        
        tree = new TREE();

        tree.generate({joints:[20,10],
            rads:[2,2],angles:[Math.PI/2],
            length:[7,8]
        });

        tree.rotation.z = 1;
        tree.rotation.y = 1;
        
        mf = tree.utils.makeFlatList;
        
        ends = tree.utils.makeFlatList([0,[0,1],19]);
        enda = tree.utils.makeFlatList([0,0,18]);
        endb = tree.utils.makeFlatList([0,1,18]);
        
        spinea = mf([0,0,[1,19]])
        spineb = mf([0,1,[1,19]])

        
        spine1 = mf([0,0,[0,19],0,[1,9]])
        spine2 = mf([0,0,[0,19],1,[1,9]])
        spine3 = mf([0,1,[0,19],0,[1,9]])
        spine4 = mf([0,1,[0,19],1,[1,9]])
        
        spinea1 = mf([0,0,[0,19],0,3])
        spinea2 = mf([0,0,[0,19],1,3])
        spinea3 = mf([0,1,[0,19],0,3])
        spinea4 = mf([0,1,[0,19],1,3])
        
        spineb1 = mf([0,0,[0,19],0,7])
        spineb2 = mf([0,0,[0,19],1,7])
        spineb3 = mf([0,1,[0,19],0,7])
        spineb4 = mf([0,1,[0,19],1,7])

        tree.passFunc(tree.makeInfo([[0,0,0],{tx:10}]),tree.transform);
        
        // 
        console.log(ends);
        
        tree.applyFunc([
            ends,{tree:{
                joints:[30],
                rads:[30],
                angles:[Math.PI/2]
                
            }}],
            appendtree
        );
        
        tree.makeDictionary();
        
        muffs = mf([0,[0,1],19,[0,29],"all"])
        muffRoot = mf([0,[0,1],19,[2,31],0])
        muffTop = mf([0,[0,1],19,[2,31],[1,19]])
        muffFlange = mf([0,[0,1],19,[2,31],20])
        muffDangle = mf([0,[0,1],19,[2,31],10])

        muffEar = mf([0,[0,1],19,[2,31],[21,29]])

        
        tree.applyFunc([
            spine1,{rx:.2},
            muffRoot,{rz:Math.PI/2},
            muffFlange,{rz:-0.804},
            muffTop,{rz:-.1},
            muffEar,{rz:-.2}
            ],
            tree.transform
        );
        
        codeName="phone";
        
        setSliders({
           var1:0.17,
           var2:.5,
           var3:-0.111
         
            
        })
        
        console.log(tree);
        // scene.add(tree);
        
        tree.applyFunc([
             
            spinea,{rx:data.var1*.2},
            spineb,{rx:-data.var1*.2},

            
            spine1,{rx:0.241},
            spine2,{rx:-0.241},
            spine3,{rx:-0.241},
            spine4,{rx:0.241},
            
            spinea1,{rx:0.716},
            spinea2,{rx:-0.716},
            spinea3,{rx:-0.716},
            spinea4,{rx:0.716},
        
            spineb1,{rx:0.749},
            spineb2,{rx:-0.749},
            spineb3,{rx:-0.749},
            spineb4,{rx:0.749},
            
            enda,{rx:data.var2*2},
            endb,{rx:-data.var2*2},
        
            muffRoot,{rz:0.582*3},
            muffFlange,{rz:-0.804*2},
            muffTop,{rz:data.var3},
            muffEar,{rz:0.062},
            muffDangle,{rz:-0.262}

            ],
            tree.transform
        );
        
        report = (tree.report());

        
        balls = tree.worldPositionsArray(report);

        var flatArray = [];

        for (var i = 0; i < balls.length; i++) {
            for (var j = 0; j < balls[i].length; j++) {
                flatArray.push(balls[i][j]);
            }
        }
        
        bls = tree.metaBalls.init();
        // tree.metaBalls.effect.animate=true;
        // console.log(tree.metaBalls.effect);
        // tree.metaBalls.updateBalls(balls);
        tree.metaBalls.setSize(200);
        tree.metaBalls.setResolution(80);
        tree.metaBalls.ballSize = 3.5;
        tree.metaBalls.updateBalls();
        // tree.metaBalls.showBox();
        scene.add(bls);
        
        // var arr = tree.worldPositionsArray(tree.report());
        // console.log(arr);

        f = new fungus(3000);
        f.digestRadius=15;
        f.substrateRadius = .001;

        f.makeSubstrateFromArray(flatArray);

        f.addSPK();
        f.update();
        scene.add(f);

    },

    draw:function(time){

        f.overflowCounter=0;
        f.overflow=1500;
        f.update();

        var arr = f.returnSubstratePositionsArray();

        tree.metaBalls.updateBalls(arr);
         
     
    }
}

function appendtree(obj,args){
    tree.generate(args.tree,obj);   
}

