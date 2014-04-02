sc1 = {

    //telephone poles
    
    setup:function(){

        tree = new TREE();
        // tree.position.y=-100;

        tree.generate({
            joints: [16,20,10,5],
            divs:   [1,1,2,4],
            start:  [0,10,16,9],
            angles: [0,2,Math.PI/2,-Math.PI/2],
            length: [10,10,3,1],
            rads:   [1,1,2,1],
            width:  [4,3,2,1]
        });

        scene.add(tree);


        tree.passFunc(tree.makeInfo([
            [0,0,0], {rx:-.3},
            [0,0,-1], {ry:.5,rz:.2,sc:1.1},
            [0,0,[12,15]], {sc:.9},
            [0,0,-1,0,-2], {rx:0,offMult:.0,freq:1,jMult:.02,jFract:4.5,jOffset:.2,offsetter3:0.01,jFreq:.02},
            // [0,0,-1,0,-2], {rz:0.01},//,freq:.1,offMult:-1,offsetter3:1},
            [0,0,-1,0,-1,-1,0], {rz:.1},

            [0,0,-1,0,-1,-1,-2], {rz:.2},

            [0,0,-1,0,0], {rz:0},
            [0,0,-1,0,1], {ry:Math.PI/2},

        ]),
        tree.transform);

        
        

    },

    draw:function(time){
        if(var1){
            var poles = tree.reportLayers();

             var stuff = (tree.worldPositionsMultiArray(poles));
            
            var Lines = [];
            

            for(var j = 0 ; j < 4 ; j++){
                
                for(var i = 0 ; i < stuff[3].length-3 ; i+=4){
                    var lines = [];
                    lines.push(stuff[3][i+j][4]);
                    // lines.push(stuff[3][i+j][4]);
                    if(i+j+1 < stuff[3].length-3){
                        var v = stuff[3][i+j][4].clone();
                        v.y-=160;
                        lines.push(v.lerp(stuff[3][i+j+4][4],.5));
                        lines.push(stuff[3][i+j+4][4]);


                    }
                    Lines.push(lines);

                }
            }

        
            scene.add(tree.tubes(Lines,{lengthSegs:14,minWidth:2,width:2}));
            bargles = tree.makeTubes({widthSegs:12,lengthSegs:5,minWidth:1,width:2});
            scene.add(bargles);
            scene.remove(tree);
            saver("pole.obj");
            var1=false;
        }

    
    }
}