        noLights = true;

sc1 = {
    
    setup:function(){

        rift = true;

        // light = new THREE.DirectionalLight( 0x332211); light.position.set( 1, 1, -.5 ); scene.add( light );
        // light = new THREE.DirectionalLight( 0x113322 ); light.position.set( -1, 1, .5 ); scene.add( light );
        // // light = new THREE.DirectionalLight( 0x225533 ); light.position.set( 0, 1, 1 ); scene.add( light );
        light = new THREE.AmbientLight( 0x010203 ); scene.add( light );
        // webaudio = new WebAudio();
        // sounds = [];

        lightShader = {

            uniforms : {
                "camAngle": { type: "v3", value: new THREE.Vector3(0,0,0) },
            },

            vertexShader : [
           
               " varying vec3 vNormal;",
               "varying vec2 vUV; ",
               // "varying vec3 vecNormal;",

               " void main() {",
               "    vUV = uv;",
               "     vNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;",
               // "     vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

               "     gl_Position = projectionMatrix *",
               "                   modelViewMatrix *",
               "                   vec4(position,1.0);",
               " }",
            
            ].join("\n"),

            fragmentShader : [

               " // same name and type as VS",
               " varying vec3 vNormal;",
               " uniform vec3 camAngle;",
                 "varying vec2 vUV; ",
                // "varying vec3 vViewPosition;",
               // "vec3 viewPosition = normalize( vViewPosition );",
               " void main() {",
               "     // calc the dot product and clamp",
               "     // 0 -> 1 rather than -1 -> 1",
               "     vec3 light = vec3(0.5,0.2,1.0);",
               "     vec4 ramp = vec4(vUV.y);",
               "     // ensure it's normalized",
               "     light = normalize(light);",
              
               "     // calculate the dot product of",
               "     // the light to the vertex normal",
               "     float dProd = max(0.0, dot( vNormal, camAngle ));",
              
               // "     // feed into our frag colour",
               "     gl_FragColor = ramp*vec4(vec3(1.,.9,.5), pow(vNormal.z,2.));",
                  
                "}",

            ].join("\n")
                
        }

        // console.log()

        shaderMaterial = new THREE.ShaderMaterial({
            uniforms: lightShader.uniforms,
            vertexShader:   lightShader.vertexShader,
            fragmentShader: lightShader.fragmentShader,
            transparent:true
        });

         shaderMaterial2 = new THREE.ShaderMaterial({
            uniforms: lightShader.uniforms,
            vertexShader:   lightShader.vertexShader,
            fragmentShader: lightShader.fragmentShader,
            transparent:true
        });

        shaderMaterial2.side = THREE.BackSide;

        

        bob = new THREE.MeshLambertMaterial();
        // console.log(bob);

        var poles = [];
        lamp=true;


        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true,vertexColors:THREE.FaceColors});

        for ( i = 0 ; i < 3 ; i++){
            poles[i] = makePole();

            var geo = poles[i];
            for(var j = 0 ; j < geo.faces.length ; j++){
                geo.faces[j].color.setRGB((
                     geo.vertices[geo.faces[j].a].y/50)-.5,
                    (geo.vertices[geo.faces[j].a].y/50)-.35,
                    (geo.vertices[geo.faces[j].a].y/50)+.1);
            
            }
            
        }

        var mpoles = [];

        var lines = [];

        for (var i = 0 ; i < 4 ; i++){
            lines[i] = [];
        }

        var path = new TREE();
        path.generate({joints:[35],length:[400]});
        path.makeDictionary();

        var pathList = path.makeList([0,0,-1]);
        // console.log(path.parts[pathList[0]]);

        path.passFunc(path.makeInfo([
                [0,0,0],{rz:pi},
                [0,0,-2],{rx:1,sc:.99,nMult:2,nFreq:1.5}
            ]),path.transform)

        var empty = new THREE.Geometry();

        path.passFunc(path.makeInfo([
                [0,0,-1],{jointGeo:empty,ballGeo:empty,ballGeo2:empty}
            ]),path.setGeo)

        var t = path.worldPositionsArray(path.report());
        // console.log(t[0]);
        scene.add(path);

        balls = [];

        for( i = 0 ; i < t[0].length-1 ; i++){

            var poser;

            poser = new THREE.Vector3(0,-100,0);
            
            poser = t[0][i];
           
            var geo = poles[Math.floor(Math.random()*poles.length)];
            mpoles.push(new THREE.Mesh(geo,new THREE.MeshLambertMaterial({vertexColors:THREE.FaceColors})));
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

            for(var j = 0 ; j < geo.lamp.length ; j++){
                if(geo.lamp.length>0){
                    // console.log(geo.lamp[j].length)
                    var b = geo.lamp[j][geo.lamp[j].length-1];
                    var ob = new THREE.PointLight(0xffaa33,2,100);
                    var ob2 = new THREE.PointLight(0xffaa33,.2,500);

                    var lightCone2 = new THREE.Mesh(new THREE.CylinderGeometry(0,100,100,40,1,true),shaderMaterial);
                    var lightCone1 = new THREE.Mesh(new THREE.CylinderGeometry(0,100,100,40,1,true),shaderMaterial2);

                    var sph = lightCone1;  
                    var sph2 = lightCone2; 

                    sph.position = new THREE.Vector3(b.x,b.y,b.z);
                    sph2.position = new THREE.Vector3(b.x,b.y,b.z);
                    for(var k = 0 ; k < sph.geometry.vertices.length ; k++){
                        sph.geometry.vertices[k].y-=50;
                        sph2.geometry.vertices[k].y-=50;
                    }
                    sph.rotation.z=-.4;
                    sph2.rotation.z=-.4;

                    ob.position =new THREE.Vector3(b.x,b.y-2,b.z);
                    // ob.position.x=-30;
                    // sph.position.y = b.y-50;
                    spheres.add(ob);
                    spheres.add(ob2);
                    spheres.add(sph);
                    spheres.add(sph2);

                    balls.push(sph);
                }
            }  

            mpoles[i].add(spheres);
            mpoles[i].rotation.z = -pi;
            mpoles[i].insulators = [];
            spheres.updateMatrixWorld();

            for(var j = 0 ; j < spheres.children.length ; j++){
                var vec = new THREE.Vector3();
                mpoles[i].updateMatrixWorld();
                spheres.updateMatrixWorld();
                spheres.children[j].updateMatrixWorld();
                vec.setFromMatrixPosition(spheres.children[j].matrixWorld)
                mpoles[i].insulators.push(vec);
                if(j<4)
                    lines[j].push(vec);

                // if(j==0){
                //     sounds.push(makeSound(vec));
                // }
            }
          
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
        var c = b.tubes(brokenLines,{lengthSegs:5,width:.4});
        scene.add(c);
        console.log(c);

        var temp = new TREE();

        mover = new THREE.Object3D();

        // camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 500 );
        // camera.position.z = 100;
        // console.log(camera);
       
       controls = new THREE.FlyControls( camera );

                controls.movementSpeed = .1;
                controls.domElement = container;
                controls.rollSpeed = .001;//Math.PI / 24;
                controls.autoForward = true;
                controls.dragToLook = false;


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
        rgbEffect.uniforms[ 'amt1' ].value = 0.005;//0015;
        rgbEffect.uniforms[ 'amt2' ].value = 0.005;//0015;
        rgbEffect.uniforms[ 'amt3' ].value = 0.005;//0015;
        rgbEffect.uniforms[ 'amt4' ].value = 0.005;//0015;

        rgbEffect.uniforms[ 'far' ].value = .5;//0015;


        rgbEffect.renderToScreen = true;
        composer.addPass( rgbEffect );

         rebuildGui({sliders:1,values:{
            symmetry:0,
            speed1:0,
            speed2:0,
            focus:0,
            freq1a:1,
            freq1b:0,
            freq2a:1,
            freq2b:0,
            freq3a:1,
            freq3b:0,
            freq4a:1,
            freq4b:0,
            amt1:1,
            amt2:0,
            amt3:1,
            amt4:0,
        }});
        data.speed1 = 1;
        data.speed2 = .1;
        data.freq1a = 1;
        data.freq1b = 1;
        data.freq2a = 1;
        data.freq2b = 1;
        data.freq3a = 1;
        data.freq3b = 1;
        data.freq4a = 1;
        data.freq4b = 1;
        data.amt1 = .1;
        data.amt2 = .1;
        data.amt3 = .1;
        data.amt4 = .1;

        // console.log(controls);


    },

    draw:function(time){


        // console.log(camera);
        cr = new THREE.Vector3(camera.rotation.x,camera.rotation.y,camera.rotation.z);
        // cr.normalize();
        shaderMaterial.uniforms["camAngle"].value = new THREE.Vector3(cr.x,cr.y,cr.z);

        // console.log(camera.rotation.y);
        // for(var i = 0 ; i < balls.length ; i++){
        //     balls[i].position.x = -.189*200;
        //     balls[i].position.y = (.335*400)-(omouseX*10);
        // }

        rgbEffect.uniforms[ 'offer' ].value = count*data.speed1*data.speed2;//0015;
        rgbEffect.uniforms[ 'far' ].value = data.focus*.5;//0015;
        rgbEffect.uniforms[ 'freq1' ].value = data.freq1a*data.freq1b*256;//0015;
        rgbEffect.uniforms[ 'freq2' ].value = data.freq2a*data.freq2b*256;//0015;
        rgbEffect.uniforms[ 'freq3' ].value = data.freq3a*data.freq3b*256;//0015;
        rgbEffect.uniforms[ 'freq4' ].value = data.freq4a*data.freq4b*256;//0015;
        rgbEffect.uniforms[ 'amt1' ].value = data.amt1*.1;//0015;
        rgbEffect.uniforms[ 'amt2' ].value = data.amt2*.1;//0015;
        rgbEffect.uniforms[ 'amt3' ].value = data.amt3*.1;//0015;
        rgbEffect.uniforms[ 'amt4' ].value = data.amt4*.1;//0015;

        if(data.symmetry>0){
            rgbEffect.uniforms[ 'freq1' ].value = data.freq1a*data.freq1b*256;//0015;
            rgbEffect.uniforms[ 'freq2' ].value = data.freq2a*data.freq2b*256;//0015;
            rgbEffect.uniforms[ 'freq3' ].value = data.freq1a*data.freq1b*256;//0015;
            rgbEffect.uniforms[ 'freq4' ].value = data.freq2a*data.freq2b*256;//0015;
            rgbEffect.uniforms[ 'amt1' ].value = data.amt1*.1;//0015;
            rgbEffect.uniforms[ 'amt2' ].value = data.amt2*.1;//0015;
            rgbEffect.uniforms[ 'amt3' ].value = data.amt1*.1;//0015;
            rgbEffect.uniforms[ 'amt4' ].value = data.amt2*.1;//0015;

        }

        // for(var i = 0 ; i < sounds.length ; i++){
        //     sounds[i].update(camera);
        // }
        
        // camera.rotation.y-=omouseX*.1;
        // // camera.rotation.x=-omouseY;
        // camera.quaternion.setFromAxisAngle(camera.rotation,omouseY*10);

        // camera.position.z-=Math.cos(camera.rotation.y)*2;
        // camera.position.x-=Math.sin(camera.rotation.y)*2;
        // camera.position.y-=Math.sin(-camera.rotation.x);
        // mover.position.x+=omouseX;
       
 
       
        
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
        

        // //bark
        // sticks = new TREE();

        // sticks.generate({
        //     joints:[1,10],
        //     length:[3,2],
        //     rads:[6,2],
        //     width:[2],
        //     angles:[Math.PI/2]
        // })

        // sticks.makeDictionary();
        // stick = sticks.makeList([0,-1,-1,-1,-1]);

        // sticks.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        // ],sticks.transform)

        // sticks.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.9,nMult:.15,offsetter2:.001}
        // ],sticks.transform)

        // var sti = sticks.makeTubes();
        // // scene.add(sti);
        // sti.scale = new THREE.Vector3(.2,.08,.2);

        // var empty = new THREE.Geometry();

        // var stiGeo = sticks.mergeMeshes(sti);

        //top

        // topper = new TREE();

        // console.log(topper);

        // topper.generate({
        //     joints:[1,10],
        //     length:[5,2],
        //     rads:[12,1],
        //     width:[1],
        //     angles:[Math.PI/2]
        // });

        // topper.makeDictionary();
        // stick = topper.makeList([0,-1,-1,-1,-2]);

        // topper.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        // ],topper.transform)

        // topper.passFunc([
        //     stick,{sc:.9,rz:.1,nFreq:.9,nMult:.15,offsetter2:.001}
        // ],topper.transform)

        // var topperg = topper.makeTubes();
        // // scene.add(topperg);
        // topperg.scale = new THREE.Vector3(.2,.02,.2);

        // var topp = topper.mergeMeshes(topperg);



        // tree.passFunc(tree.makeInfo([
        //    [0,0,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
        //    [0,0,-1,-1,-1,-1,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
        //    [0,0,-3],{jointGeo:topp,ballGeo:empty,ballGeo2:empty},
        // ]),tree.setGeo)

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

          var lampArray = [];
          console.log(lamp);
        if(lamp==true){
        
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

             lamp=false;

             var lampPos = tree.makeList([0,0,3,0,0]);

            tree.passFunc([
                lampPos,{arr:lampArray},
            ],function(obj,args){args.arr.push(obj)})


        }



         tree.passFunc(tree.makeInfo([
          [0,0,-2],{rz:0,ry:0,rz:0,nMult:Math.random()*.5,nFreq:Math.random()},
          
        ]),tree.transform)

         var tempLamp = [];
         tempLamp.push(lampArray)
        var insulatorPositions = tree.worldPositionsArray(array);
        var lampPositions = tree.worldPositionsArray(lampArray);
                 console.log(lampPositions);

        meshes = tree.mergeMeshes(tree);
        meshes.insulatorPositions = insulatorPositions;
        meshes.lamp = lampPositions;



        // tree.passFunc(tree.makeInfo([
        //    [0,0,1,],{tree:{joints:[5,5],rads[1,10]}},
        // ]),tree.transform)
        return meshes;//new THREE.Mesh(meshes,tree.params.mat);

}

function makeSound(vec){
    boing   = webaudio.createSound();
    boing.tone((Math.random()*400)+200,30);
    obj = new THREE.AudioObject(boing);
    obj.position = vec;
    return obj;
}

