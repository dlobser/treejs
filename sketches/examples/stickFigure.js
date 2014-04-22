sc1 = {

    //stick figure

    setup:function(){

        videoSetup();

        tree = new TREE();
        scene.add(tree);

        var phere = sphere(25,20);
        phere.material.map = videoTexture;
        scene.add(phere);
        phere.rotation.y=-Math.PI/2

        tree.position.y=-50;

        tree.generate({
                joints: [100,100,10],
                divs:   [1,50],
                start:  [0,0,99],
                angles: [0,Math.PI/2],
                length: [2,1,2],
                rads:   [1,2,5],
        });

        console.log(tree);

        //add head
        tree.xform(tree.makeInfo([
            [0,0,59],{obj:phere},
        ]),
        function(obj,args){obj.add(args.obj);args.obj.position.y=27;args.obj.position.x=2});
        
    },

    draw:function(time){

        videoAnimate();

        tree.xform(tree.makeInfo([
            //head and body
            [0,0,59],{sc:2,rz:-Math.PI/2},
            [0,0,[1,58]],{rz:omouseX*.1,jFract:omouseX,jMult:.01},
            [0,0,[60,99]],{rz:Math.PI/21},
            //arms
            [0,0,0,0,10],{rz:Math.PI/2},
            [0,0,0,1,10],{rz:Math.PI/2},
            [0,0,1,0,10],{rz:-.5,jMult:.3,jFreq:3,jOff:time*8},
            [0,0,1,1,10],{rz:1+(omouseX*10)},
            [0,0,1,0,50],{rz:0,jMult:.5,jFreq:3,jOff:.2+(time*8)},
            [0,0,1,1,50],{rz:.2},
            //fingers
            [0,0,1,0,0,[0,4],[0,9]],{rz:-.1},
            [0,0,1,1,0,[0,4],[0,9]],{rz:-.1},
            //feet
            [0,0,0,0,0,[0,4],[0,9]],{ry:-4},
            [0,0,0,1,0,[0,4],[0,9]],{ry:4},
            //fingers
            [0,0,1,1,0,[0,4],0],{rz:.4},
            [0,0,1,1,0,[0,4],[1,9]],{rz:0,jMult:.1,jFreq:.2,jOff:time*3,jOffset:.5},
            //thumb
            [0,0,1,1,0,0,[1,9]],{sc:.9},

        ]),
        tree.transform);

        tree.xform(tree.makeInfo([
            //rotate fingers in world axis
            [0,0,1,0,0,[0,4],0],{radians:Math.sin(1+(time*8))},
            [0,0,1,0,0,[0,4],5],{radians:Math.sin(1+(time*8))},

        ]),
        tree.axisRotate);
        
    }
}