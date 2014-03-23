sc1 = {
    
    setup:function(){

        var poles = [];

        for ( i = 0 ; i < 1 ; i++){
            poles[i] = makePole();
            // scene.add(poles[i]);
        }

        var mpoles = [];

        var lines = [];

        for (var i = 0 ; i < 4 ; i++){
            lines[i] = [];
        }

        var path = new TREE();
        path.generate({joints:[75],length:[200]});
        path.makeDictionary();

        var pathList = path.makeList([0,0,-1]);
        // console.log(path.parts[pathList[0]]);

        path.passFunc(path.makeInfo([
                [0,0,0],{rz:pi},
                [0,0,-2],{rx:.5,sc:.99,nMult:2,nFreq:1.5}
            ]),path.transform)

        var t = path.worldPositionsArray(path.report());
        // console.log(t[0]);
        scene.add(path);

        for( i = 0 ; i < t[0].length-1 ; i++){

            var poser;

            // if(i==0){
                poser = new THREE.Vector3(0,-100,0);
                    // -500+Math.random()*1000,
                    // -100,
                    // -500+Math.random()*1000
                    
                    // );
            // }
            // else{
            //     poser  = new THREE.Vector3(
            //   mpoles[i-1].position.x+(-.5+Math.random())*420,
            //    -100,
            //   mpoles[i-1].position.z+(-.5+Math.random())*420
             
            //     );
            // }
            // if(t[0][i].position)
            poser = t[0][i];
            // console.log(t[0][i].position);

            var geo = poles[Math.floor(Math.random()*poles.length)];
            mpoles.push(new THREE.Mesh(geo,new THREE.MeshLambertMaterial()));
            scene.add(mpoles[i]);

            var spheres = new THREE.Object3D();

            path.parts[pathList[i]].add(mpoles[i]);

            for(var j = 0 ; j < geo.insulatorPositions.length ; j++){
                var b = geo.insulatorPositions[j];
                var c = b[b.length-1];
                var ob = new THREE.Object3D();
                ob.position = c;

                spheres.add(ob);
            }  
            mpoles[i].add(spheres);
            // mpoles[i].position = poser;
            mpoles[i].rotation.z = -pi;
            mpoles[i].insulators = [];

            // mpoles[i].updateMatrixWorld();
            spheres.updateMatrixWorld();
            for(var j = 0 ; j < 4 ; j++){
                // console.log(spheres);
                var vec = new THREE.Vector3();
                mpoles[i].updateMatrixWorld();
                spheres.updateMatrixWorld();
                spheres.children[j].updateMatrixWorld();
                vec.setFromMatrixPosition(spheres.children[j].matrixWorld)
                mpoles[i].insulators.push(vec);
                lines[j].push(vec);
            }
          
            // console.log(mpoles[i].position);
            // console.log(mpoles[i].insulatorPositions[0][8]);
        }

        var brokenLines = [];

        for(var i = 0 ; i < lines.length ; i++){
            for(var j = 0 ; j < lines[i].length-1 ; j++){
                var tempLine = [];
                tempLine.push(lines[i][j]);
                lerpVec = lines[i][j].clone();
                lerpVec.lerp(lines[i][j+1],.5);
                tempLine.push(lerpVec);
                lerpVec.y-=25;
                tempLine.push(lines[i][j+1]);
                brokenLines.push(tempLine);
            }
        }

        console.log(lines);
        var line = [];
        line.push(lines);
        var b = new TREE();
        var c = b.tubes(brokenLines,{lengthSegs:5,width:.1});
        scene.add(c);
        console.log(c);

        var temp = new TREE();

        // var all = temp.mergeMeshes(path);
        // console.log(all);
        // scene.add(new THREE.Mesh(all,path.params.mat));

        mover = new THREE.Object3D();

        camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 100000 );
        camera.position.z = 1000;
        console.log(camera);
        // mover.add(camera);
        // console.log(mover);


        useComposer = true;
        useDepth = true;
        composer = new THREE.EffectComposer( renderer );
        composer.addPass( new THREE.RenderPass( scene, camera ) );

        depthShader = THREE.ShaderLib[ "depthRGBA" ];
        depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );
        depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms} );
        depthMaterial.blending = THREE.NoBlending;
        depthTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
    
        rgbEffect = new THREE.ShaderPass( THREE.depthNoiseShader );
        
        rgbEffect.uniforms['tDepth'].value = depthTarget;
        rgbEffect.uniforms[ 'amount' ].value = 0.0;//0015;
        rgbEffect.uniforms[ 'offer' ].value = 0.0;//0015;
        rgbEffect.uniforms[ 'far' ].value = .5;//0015;


        rgbEffect.renderToScreen = true;
        composer.addPass( rgbEffect );

    },

    draw:function(time){
        rgbEffect.uniforms[ 'offer' ].value = time;//0015;

        // camera.position.set(0,0,-time);

        // camera.lookAt(new THREE.Vector3(camera.position.x+omouseX*12,camera.position.y+omouseY*12,camera.position.z+100))
        camera.rotation.y-=omouseX*.1;
        camera.rotation.x=-omouseY;
        camera.position.z-=Math.cos(camera.rotation.y)*2;
        camera.position.x-=Math.sin(camera.rotation.y)*2;
        camera.position.y-=Math.sin(-camera.rotation.x);
        mover.position.x+=omouseX;
        // tree.passFunc(tree.makeInfo([
        //   [0,0,-2],{rz:0,ry:0,rz:0,nMult:omouseX,nFreq:omouseY*3},
          
        // ]),tree.transform)

 
       
        
    }
}


function makePole(){

        tree = new TREE();
        // scene.add(tree);

        tree.generate({
            joints:[10,1,5,8],
            rads:[1,1,2,1],
            divs:[1],
            start:[7,7,0,4],
            angles:[0,Math.PI/2],
            length:[13,4,4,4],
            width:[3,2,2,4],
            end:[9,9],

        })

       joints = tree.makeList([0,0,-1,-1,0])
       insulatorsRootLeft  = tree.makeList([0,0,-1,0,-1,0,0,-1,0]);
       insulatorsRootRight = tree.makeList([0,0,-1,0,-1,1,0,-1,0]);

       var array = [];

       tree.passFunc([
        insulatorsRootLeft,{arr:array},
        insulatorsRootRight,{arr:array}
        ],function(obj,args){args.arr.push(obj)})



       // insulatorsRootRight = tree.makeList([0,0,-1,1,-1,1,1,-1,0])

       insulatorsAll = tree.makeList([0,0,-1,-1,-1,-1,-1,-1,-2])

        tree.passFunc([
            joints, {rx:Math.PI/2},
            insulatorsRootLeft,  {rz:0,rx:-Math.PI/2,      sc:.15},
            insulatorsRootRight, {rz:Math.PI,rx:-Math.PI/2,sc:.15},

            insulatorsAll,  {sinScale:1,sinScaleMult:.21,sinScaleFreq:2}
        ],tree.transform)

        tree.passFunc([
            insulatorsAll,  {sinScale:Math.PI/2,sinScaleMult:.1*2}
        ],function(obj,args){if(obj.joint%2==0){obj.jointMesh.scale.z=2;obj.jointMesh.scale.x=2}})
        

        //bark
        sticks = new TREE();

        sticks.generate({
            joints:[1,10],
            length:[3,2],
            rads:[6,2],
            width:[2],
            angles:[Math.PI/2]
        })

        sticks.makeDictionary();
        stick = sticks.makeList([0,-1,-1,-1,-1]);

        sticks.passFunc([
            stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        ],sticks.transform)

        sticks.passFunc([
            stick,{sc:.9,rx:0,nFreq:.9,nMult:.15,offsetter2:.001}
        ],sticks.transform)

        var sti = sticks.makeTubes();
        // scene.add(sti);
        sti.scale = new THREE.Vector3(.2,.08,.2);

        var empty = new THREE.Geometry();

        var stiGeo = sticks.mergeMeshes(sti);

        //top

        topper = new TREE();

        console.log(topper);

        topper.generate({
            joints:[1,10],
            length:[5,2],
            rads:[12,1],
            width:[1],
            angles:[Math.PI/2]
        });

        topper.makeDictionary();
        stick = topper.makeList([0,-1,-1,-1,-2]);

        topper.passFunc([
            stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        ],topper.transform)

        topper.passFunc([
            stick,{sc:.9,rz:.1,nFreq:.9,nMult:.15,offsetter2:.001}
        ],topper.transform)

        var topperg = topper.makeTubes();
        // scene.add(topperg);
        topperg.scale = new THREE.Vector3(.2,.02,.2);

        var topp = topper.mergeMeshes(topperg);



        tree.passFunc(tree.makeInfo([
           [0,0,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
           [0,0,-1,-1,-1,-1,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
           [0,0,-3],{jointGeo:topp,ballGeo:empty,ballGeo2:empty},
        ]),tree.setGeo)

        tree.passFunc(tree.makeInfo([
           [0,0,-1],{},
           [0,0,-1,-1,-1,-1,-1],{}
        ]),function(obj,args){obj.jointMesh.rotation.y=Math.random()*3})

        tree.passFunc(tree.makeInfo([
           [0,0,6],{length:10},
           [0,0,6],{length:10},
           [0,0,7],{length:10},
           [0,0,7],{length:10},
        ]),tree.appendBranch)
        
        tree.passFunc(tree.makeInfo([
            [0,0,0,1,0],{scy:2,rz:.5,ry:Math.PI/2-.3},
            [0,0,0,0,0],{scy:2,rz:.5,ry:-Math.PI/2+.3},
            [0,0,0,1,-2],{rz:.1},
            [0,0,0,0,-2],{rz:.1},
            [0,0,1,2,0],{scy:2,rz:.5,ry:Math.PI/2-.3},
            [0,0,1,1,0],{scy:2,rz:.5,ry:-Math.PI/2+.3},
            [0,0,1,2,-2],{rz:.1},
            [0,0,1,1,-2],{rz:.1},
        ]),tree.transform)

        tree.passFunc(tree.makeInfo([
           [0,0,7],{tree:{joints:[5,5],rads:[1,10],angles:[1],length:[3,4],start:[4],angles:[pi],width:[1,3]}},
        ]),tree.appendTree)

         tree.passFunc(tree.makeInfo([
           [0,0,1,3,0],{rz:1,ry:pi+pi/2},
           [0,0,1,3,0,-1,-2],{rz:-.04},
           [0,0,1,3,0,-1,1],{rz:-pi},
           [0,0,1,3,0,-1,4],{rz:-pi},
           [0,0,1,3,-2],{rz:.55},
        ]),tree.transform)
        
         tree.passFunc(tree.makeInfo([
           [0,0,9],{tree:{joints:[15,5],rads:[1,10],angles:[1],length:[3,1],start:[14],angles:[.5,pi],width:[1,1]}},
        ]),tree.appendTree)

         tree.passFunc(tree.makeInfo([
          [0,0,3,0,0],{rz:.3},
          [0,0,3,0,0,-1,-2],{rz:-.04},
          [0,0,3,0,0,-1,3],{rz:-1},
          [0,0,3,0,0,-1,4],{rz:-1},
          [0,0,3,0,-2],{rz:.1},
          [0,0,3,0,14],{rz:1},
        ]),tree.transform)

         tree.passFunc(tree.makeInfo([
          [0,0,-2],{rz:0,ry:0,rz:0,nMult:Math.random()*.5,nFreq:Math.random()},
          
        ]),tree.transform)


        var insulatorPositions = tree.worldPositionsArray(array);

                 // console.log(insulatorPositions);


        meshes = tree.mergeMeshes(tree);
        meshes.insulatorPositions = insulatorPositions;



        // tree.passFunc(tree.makeInfo([
        //    [0,0,1,],{tree:{joints:[5,5],rads[1,10]}},
        // ]),tree.transform)
        return meshes;//new THREE.Mesh(meshes,tree.params.mat);

}