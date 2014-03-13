sc1 = {
    
    setup:function(){
        
        tree = new TREE();
        
        pi = Math.PI/2;
        tree.generate({joints:[5,20,10,25],
            rads:[50,1],angles:[-pi,pi,-pi,pi],divs:[1],
            length:[7,8],
            start:[4,4,19,9]
        });
        
        spinea = tree.makeList([0,0,[1,19]])
       
        codeName="shroom";

        scene.add(tree);
            
        base = tree.makeList([0,-1,-1,-1,-2]);
        base2 = tree.makeList([0,-1,-1,-1,[10,19]]);
        gills = tree.makeList([0,-1,-1,-1,-1,-1,-2]);
        topper = tree.makeList([0,-1,-1,-1,-1,-1,-1,-1,-2]);
        topper2 = tree.makeList([0,-1,-1,-1,-1,-1,-1,-1,0]);
        
        base0 = tree.makeList([0,-1,-1,-1,0]);
        gills0 = tree.makeList([0,-1,-1,-1,-1,-1,0]);
        topper0 = tree.makeList([0,-1,-1,-1,-1,-1,-1,-1,0]);
        
       setSliders({"var1":-.1,"var2":-.35,
           var3:.43,
           var4:.86,
           var5:-.55,
           var6:.69,
           var7:-.26
       })
       
       tree.position.y=-150;
       
            tree.applyFunc([
                   
                base,{rz:-0.1*.1},
                gills,{rz:-0.35*.2},
                topper,{rz:0.43*.2},
                
                base0,{rz:0.86*2},
                gills0,{rz:-0.55*2},
                topper0,{rz:0.69*2},
                
                ],tree.transform);
                
            tree.applyFunc([
                   
                base,{radians:-0.26*.1},
                 base2,{radians:-0.26*-.1},
                gills,{radians:-0.26*-.041},
                topper2,{radians:-0.26*.2},
                // topper,{radians:-0.26*-.1},
               
            ],tree.axisRotate);  
      
        
        varT=true;

    },

    draw:function(time){

        if(varT){
        
            tree.applyFunc([
                   
                base,{rz:-0.1*.1},
                gills,{rz:-0.35*.2},
                topper,{rz:0.43*.2},
                
                base0,{rz:0.86*2},
                gills0,{rz:-0.55*2},
                topper0,{rz:0.69*2},
                
                ],tree.transform);
                
            tree.applyFunc([
                   
                base,{radians:-0.26*.1},
                base2,{radians:-0.26*-.1},
                gills,{radians:-0.26*-.041},
                topper2,{radians:-0.26*.2},
               
            ],tree.axisRotate);
            
            

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
            // tree.metaBalls.updateBalls(balls);
            tree.metaBalls.setSize(200);
            tree.metaBalls.setResolution(80);
            tree.metaBalls.ballSize = 5.5;
            tree.metaBalls.updateBalls();
            // tree.metaBalls.showBox();
            scene.add(bls);
            
            // var arr = tree.worldPositionsArray(tree.report());
            // console.log(arr);

            f = new fungus(3000);
            f.digestRadius=20;
            f.substrateRadius = .001;

            f.makeSubstrateFromArray(flatArray);

            f.addSPK();
            f.update();
            scene.add(f);
            
            scene.remove(tree);

            varT=false;
                

         }

        f.overflowCounter=0;
        f.overflow=1500;
        f.update();

        var arr = f.returnSubstratePositionsArray();

        tree.metaBalls.updateBalls(arr);

        if(varE){
            var thing = tree.metaBalls.generateGeo();
            scene.add(thing);
            console.log(scene);
            pause = true;
        }
         
     
    }
}

function appendtree(obj,args){
    tree.generate(args.tree,obj);   
}

