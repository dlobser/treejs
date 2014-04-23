sc1 = {
    
    setup:function(){

        /*
            A fairly complicated tree structure
            which uses a second tree as the geometry
            for the joints of the first
        */

        tree = new TREE();

        tree.generate({
            joints: [1,4,40],
            rads: [2,2,1],
            angles:[Math.PI/2,Math.PI/2,-Math.PI/2],
            length:[10,1,5],
        });
        
        tree.passFunc(tree.makeInfo([
            [0,[0,1],0,0,[0,3],0,"all"],
            {length:3},
            [0,[0,1],0,0,2,0,"all"],
            {length:2.5},
            [0,[0,1],0,0,3,0,"all"],
            {length:1.5},
        ]),tree.setJointLength);

        ///***** add fur

        var fur = new TREE();

        fur.generate({
            joints: [5,5],
            rads: [1,1],
            angles:[Math.PI/2],
            length:[3,8],
        });

        fur.passFunc(fur.makeInfo([
            [0,0,[0,4],0,[1,9]],
            {sc:.7,rz:.03,rx:.1},
            [0,0,[0,4],0,[1,9]],
            {rx:-.2,offMult:.4,freq:.9,offsetter:.01,sc:.7},
            [0,0,"all"],
            {rz:-.2},
        ]),fur.transform);

        var empty = new THREE.Geometry();

        fur.passFunc(fur.makeInfo([
            [0,0,[0,8]],
            {ballGeo:empty,jointGeo:empty},
        ]),fur.setGeo);

        fur.rotation.z=-Math.PI/2+.75;
        fur.position.x=-20;
        fur.updateMatrixWorld();

        var geo = fur.mergeMeshes(fur.FIND([0,0,0]));
        var empty = new THREE.Geometry();
        
        var thing = new THREE.Mesh(geo,new THREE.MeshLambertMaterial());
        
        tree.passFunc(tree.makeInfo([
            [0,[0,1],0,0,[0,3],0,"all"],
            {ballGeo:geo,jointGeo:empty},
            [0,[0,1],0,1,[0,3],0,"all"],
            {ballGeo:geo,jointGeo:empty},
        ]),tree.setGeo);

        tree.passFunc(tree.makeInfo([
            [0,[0,1],0,0,[0,3],0,"all"],
            {ballGeo:geo},
            [0,[0,1],0,1,[0,3],0,"all"],
            {ballGeo:geo},
        ]),function(obj,args){
            obj.ballMesh.rotation.z=Math.random()*.8;
            var sc = obj.joint+1;
            var sc2 = sc *.06;
            obj.ballMesh.scale = new THREE.Vector3(sc2,sc2,sc2);
        });

        rebuildGui({sliders:1,values:{timer:0.5}})
        
        scene.add(tree);
   
        codeName = "mothCode";
        
    },

    draw:function(time){
        
        time=time*data.timer*10;
        
        if(varE){
            scene.add(tree.makeTubes());
            varE=false;
            console.log(varE);
        }

        tree.passFunc(tree.makeInfo([
            
        [0,[0,1],0],
        {rz:2},
        
         //upper wing root

        [0,[0,1],0,1,"all"],
        {rz:.191},
        
        [0,[0,1],0,1,0],
        {rz:1.7},
        
         //lower wing root
        
        [0,[0,1],0,0,0],
        {rz:.732*2},
        
        //upper wings
        [0,[0,1],0,1,[0,3],0,"all"],
        {rz:.017*.1,
            offsetter3:-.09*.1,
            jMult:.3*.1,
            jFreq:-.09,
            jOff:.7*3
        },
        [0,[0,1],0,1,[0,3],0,0],
        {rz:-0.9*2,
            offsetter3:0.06,
            jMult: 0.342,
            jFreq: 0.234,
            jOff:-0.588
        },
       
       //lower wings
        [0,[0,1],0,0,[0,3],0,"all"],
        {rz:-0.155*.1,
            offsetter3:0.017*.1,
            jMult:-0.003,
            jFreq:0.147,
            jOff:0.191
        },
        
        //FLAPPING
        //lower wings
         [0,1,0,0,[0,3],0,"all"],
        {rx:0,
            offsetter3:-0.001,
            jMult:.02,
            jFreq:.05,
            jOff:time*3
        },
         [0,0,0,0,[0,3],0,"all"],
        {rx:0,
            offsetter3:0.001,
            jMult:-.02,
            jFreq:.05,
            jOff:time*3
        },
        [0,1,0,0,0],
        {   
            rx:0,
            jMult:.5,
            jFreq:.05,
            jOff:0+time*3
        },
        
        [0,0,0,0,0],
        {   
            rx:0,
            jMult:.5,
            jFreq:.05,
            jOff:Math.PI+time*3
        },
        
        [0,1,0,1,0],
        {   
            rx:-.3,
            offsetter3:-0.001,
            jMult:.5,
            jFreq:.05,
            jOff:-.5+time*3,
         
        },

        [0,0,0,1,0],
        {   
            rx:.3,
            offsetter3:0.001,
            jMult:.5,
            jFreq:.05,
            jOff:-.5+Math.PI+time*3
        },
        //END FLAPPING
        
        [0,[0,1],0,0,[0,3],0,0],
        {   
            rz:-.74*1.5,
            offsetter3:.27,
            jMult:-.67,
            jFreq:.12,
            jOff:-.2
        },
        
        ]),tree.transform);
        
        var axis2 = new THREE.Vector3(0,1,0);
        
        tree.passFunc(tree.makeInfo([
            [0,1,0,1,[0,3],0,"all"],
            {axis:axis2,radians:Math.sin(1.5+time*3)*.02},
            [0,0,0,1,[0,3],0,"all"],
            {axis:axis2,radians:-Math.sin(1.5+time*3)*.02},
        ]),tree.axisRotate);

    }
}