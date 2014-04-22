sc1 = {

    //spider tentacles

    setup:function(){


        tree = new TREE();

        // tree.params.mat = new THREE.MeshPhongMaterial({color:0x111111,specular:0x888888});
        // tree.params.color = new THREE.Color(0x111111);

        // tree.position.y=-70;

        tree.generate({
            joints: [20],
            divs:   [1],
            start:  [0],
            angles: [0],
            length: [1],
            rads:   [1],
            width:  [2],
        });

        tree.applyFunc(tree.makeInfo([
            [0,0,13],{sc:.9,amount:5,rz:pi,ry:1},
            [0,0,13],{sc:.9,amount:5,rz:-pi,ry:-1},
            [0,0,15],{sc:.9,amount:5,rz:pi,ry:1},
            [0,0,15],{sc:.9,amount:5,rz:-pi,ry:-1},
            [0,0,11],{sc:.9,amount:5,rz:pi,ry:1},
            [0,0,11],{sc:.9,amount:5,rz:-pi,ry:-1},
            [0,0,19],{sc:1,amount:1,rz:0,ry:0},
        ]),tree.appendBranch);

        tree.makeDictionary();

        tree.applyFunc(tree.makeInfo([
            [0,0,3,-1,-1],{sc:.9,amount:15,rz:0},
            [0,0,3,-1,-1],{sc:.9,amount:15,rz:0},
            [0,0,3,-1,-1],{sc:.2,amount:1,rz:0},
            [0,0,3,-1,-1],{sc:.2,amount:1,rz:0},
        ]),tree.appendBranch);

        tree.applyFunc(tree.makeInfo([
            // [0,0,3,-1,-1],{ry:1},
            // [0,0,3,-1,-1],{ry:-1},
        ]),tree.transform);

        tree.makeDictionary();

        tree.applyFunc(tree.makeInfo([
            [0,0,[0,2],-1,0],{ty:0},
            [0,0,[0,2],-1,-2],{sc:.9,rx:0},
            [0,0,3,-1,-1],{sc:2.5},
            [0,0,3,0,0,0,0],{sc:.4,tz:0,rx:.6,rz:pi,ry:1},
            [0,0,3,0,0,1,0],{sc:.4,tz:0,rx:.6,rz:-pi,ry:-1},
            [0,0,3,0,0,0,-2],{sc:.8,rx:.2},
            [0,0,3,0,0,1,-2],{sc:.8,rx:.2},
            [0,0,3,0,0,2,-1],{tz:.5,ty:.5,tx:-.5,sc:.2,rx:.2},
            [0,0,3,0,0,3,-1],{tz:.5,ty:.5,tx:.5,sc:.2,rx:.2},
        ]),tree.transform);

        tree.applyFunc(tree.makeInfo([
            [0,0,-1],{},
        ]),function(obj,args){obj.ballMesh2.scale=new THREE.Vector3(1.1,1.1,1.1)});

        tree.makeDictionary();

        tree.setScale(5);

        worm = tree.makeSkinnedGeo();

        scene.add(worm);

        legsL = tree.makeList([0,0,[0,2],0,-2]);
        legsR = tree.makeList([0,0,[0,2],1,-2]);
        body = tree.makeList([0,0,-2]);


        // tree.applyFunc(tree.makeInfo([
        //     [0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,offMult:.2,freq:1.4,jFract:1,jFreq:.8,jMult:.1},
        //     [0,0,0,[0,9],[0,9],0,"all"],{sc:.7,rz:Math.PI*.11,offMult:.2,freq:1.4,jOffset:2.3},
        // ]),tree.transform);


        // scene.add(tree.makeTubes({widthSegs:12,lengthSegs:3,minWidth:1.5}));
        
        
    },

    draw:function(time){

        tree.applyFunc([
            legsL,  {rz:omouseX},
            legsR,  {rz:-omouseX},

            body,   {rz:omouseY*.1}
        ],tree.transform,true)

        // tree.rotation.y+=.01;

        // tree.xform(tree.makeInfo([
        //     [0,0,0,[0,9],[0,9]],{rz:Math.PI*-.11,sc:.9,jOffset:2.3,off:mouseY,offMult:.2,freq:1.4,jFract:1,jFreq:pmouseY,jMult:.1,jOff:time},
        //     [0,0,0,[0,9],[0,9],0,[1,9]],{sc:.8,rz:Math.PI*omouseX,offMult:0,freq:1.4,jOffset:2.3,jOff:time*3,off:time*3,jFreq:.7,jMult:.5},
        // ]),tree.transform);

        
    }
}