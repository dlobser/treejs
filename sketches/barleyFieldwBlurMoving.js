sc1 = {
    
    setup:function(){

        tree = new TREE();
        
        // scene.add(new THREE.AmbientLight({intensity:10}))

        tree.params.ballGeo =  new THREE.SphereGeometry(1,3,6),
        tree.params.jointGeo = new THREE.CylinderGeometry( 1,1,1,5,1),
        tree.params.mat = new THREE.MeshLambertMaterial({ color:0xffffff, shading: THREE.SmoothShading,vertexColors:THREE.FaceColors }),

        document.body.style.cursor = 'url("assets/textures/dot.png"), auto';


        tree.generate({
            joints: [40,5],
            length: [5,2],
            width: [1,2],
            rads:[1,2],
            start:[1,30],
            angles:[0,.6]
        });
        
        tree.position.y=-10;
        tree.setScale(.1);
        tree.updateMatrixWorld();

        budsAll = tree.makeList([0,0,-1,-1,-2]);
        budsRoot = tree.makeList([0,0,-1,-1,0]);
        budsEnd =  tree.makeList([0,0,-1,-1,-3]);
        rootRoot = tree.makeList([0,0,0]);
        rootAll = tree.makeList([0,0,-2]);
        tipScale = tree.makeList([0,0,[35,39]])
        tipScaleBuds = tree.makeList([0,0,[7,9],-1,0])

        tree.makeDictionary();
        
        codeName = "barley";

        // scene.add(tree);
        
        counter = 0;

        counter-=.5+noise(count*.05);
        
        tree.applyFunc([
            budsAll, {rz:-.05,sinScaleMult:1,sinOff:Math.PI,sinScale:0.2,sc:1.3},
            budsEnd, {scy:8,scx:.2,scz:.2},
            rootAll, {rz:0,jFreq:.1,jMult:.01+noise(count*.01)*.2,jOff:counter*.3,jFract:.01},
            tipScale, {sc:.9},
            tipScaleBuds, {rz:0,offsetter3:0.001,freq:.37,offMult:.655,off:.323*3}
        ],tree.transform)

        // tree.applyFunc([
        //     budsRoot, {color:new THREE.Color(0xff0000)}],
        //     function(obj,args){for(var i = 0 ; i < obj.jointMesh.geometry.faces.length ; i++){obj.jointMesh.geometry.faces[i].color.setRGB(1,0,0)};console.log(obj.jointMesh.geometry.faces[0].color)})

        var geo = tree.mergeMeshes(tree);

        // scene.add(new THREE.Mesh(new THREE.CubeGeometry(20,20,20),new THREE.MeshLambertMaterial({transparent:true,opacity:.1})));
      

        // frameRate = 1;

        // var geo = new THREE.BoxGeometry(10,20,10,100,100,100);

        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true,vertexColors:THREE.FaceColors});

        geo.skinIndices = [];
        geo.skinWeights = [];

        for(var i = 0 ; i < geo.faces.length ; i++){
            geo.faces[i].color.setRGB((geo.vertices[geo.faces[i].a].y/20)+.5,(geo.vertices[geo.faces[i].a].y/20)+.35,(geo.vertices[geo.faces[i].a].y/20)+.1);
            if(i<5){
                console.log(geo.faces[i]);
            }
        }

        for(var i = 0 ; i < geo.vertices.length ; i++){

            // geo.vertices[i].color.setRGB(i,0,0);
            // if(i<10);
            // console.log(geo.vertices[i])
            // geo.vertices[i].z+=Math.random()*.3;

            q = (10+geo.vertices[i].y)/20;
            g = -q+1;

            geo.skinIndices.push( new THREE.Vector4(1,0,0,0 ));
            geo.skinWeights.push( new THREE.Vector4(q,g,0,0 ));

        }

        // geo.computeVertexNormals();

        geo.bones = [];

        var bone = {};

        bone.name="whatever";
        bone.pos = [0,0,0];
        bone.rot = [0,0,0];
        bone.scl = [1,1,1];
        bone.rotq = [0,0,0,1];
        bone.parent = -1;

        geo.bones.push(bone);

        var bone = {};

        bone.name="whatever2";
        bone.pos = [0,-1,0];
        bone.rot = [0,0,0];
        bone.scl = [1,1,1];
        bone.rotq = [0,0,0,1];
        bone.parent = 0;

        geo.bones.push(bone);

        things = [];

        for(var i = 0 ; i < 200 ; i++){
            var thing = new THREE.SkinnedMesh(geo,material,false);
            thing.scale = new THREE.Vector3(5,5,5);
            thing.id=i;
            thing.position.x = 250-Math.random()*500;
            thing.position.y = (50-Math.random()*100);
            thing.position.z = 100+-thing.position.y*3;
            thing.position.y-=80;
            scene.add(thing);
            things.push(thing);
        }

        useComposer = true;
        useDepth = true;
        composer = new THREE.EffectComposer( renderer );
        composer.addPass( new THREE.RenderPass( scene, camera ) );

        depthShader = THREE.ShaderLib[ "depthRGBA" ];
        depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );
        depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, skinning:true } );
        depthMaterial.blending = THREE.NoBlending;
        depthTarget = new THREE.WebGLRenderTarget( window.innerWidth*2, window.innerHeight*2, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
    
        rgbEffect = new THREE.ShaderPass( THREE.depthNoiseShader );
        
        rgbEffect.uniforms['tDepth'].value = depthTarget;
        rgbEffect.uniforms[ 'amount' ].value = 0.0;//0015;
        rgbEffect.uniforms[ 'offer' ].value = 0.0;//0015;

        rgbEffect.renderToScreen = true;
        composer.addPass( rgbEffect , "tDepth");

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

        
        countUp=0;
        imagesToSave = 900;
    },

    draw:function(time){
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

         if(varE){
            saveIMG("seq_"+countUp+".png");
            countUp++;
            if(countUp>imagesToSave){
                countUp=0;
                varE = false;
            }
        }

        /*painterly
         rgbEffect.uniforms[ 'offer' ].value = count*0.083*data.var7;//0015;
        rgbEffect.uniforms[ 'far' ].value = 0.213*.5;//0015;
        rgbEffect.uniforms[ 'freq1' ].value = 0.235*256;//0015;
        rgbEffect.uniforms[ 'freq2' ].value = -0.002*256;//0015;
        rgbEffect.uniforms[ 'freq3' ].value = 0.885*256;//0015;
        rgbEffect.uniforms[ 'freq4' ].value = 0.04*256;//0015;
        */

        /*watery
          rgbEffect.uniforms[ 'far' ].value = 0.105*.5;//0015;
        rgbEffect.uniforms[ 'freq1' ].value = 0.018*0.257*256;//0015;
        rgbEffect.uniforms[ 'freq2' ].value = 0.148*data.var9*256;//0015;
        rgbEffect.uniforms[ 'freq3' ].value = 0.56*0.1050*256;//0015;
        rgbEffect.uniforms[ 'freq4' ].value = data.var6*0.1051*256;//0015;
    */
/*
         rgbEffect.uniforms[ 'offer' ].value = count*0.04*data.var7;//0015;
        rgbEffect.uniforms[ 'far' ].value = 0.474*.5;//0015;
        rgbEffect.uniforms[ 'freq1' ].value = 0.192*0.17*256;//0015;
        rgbEffect.uniforms[ 'freq2' ].value = 0.56*data.var9*256;//0015;
        rgbEffect.uniforms[ 'freq3' ].value = 0.539*0.4740*256;//0015;
        rgbEffect.uniforms[ 'freq4' ].value = 0*0.4741*256;//0015;

*/
/*OK PAINTING
  rgbEffect.uniforms[ 'offer' ].value = count*-0.005*0;//0015;
        rgbEffect.uniforms[ 'far' ].value = -0.048*.5;//0015;
        rgbEffect.uniforms[ 'freq1' ].value = 0.383*data.var8*256;//0015;
        rgbEffect.uniforms[ 'freq2' ].value = 1*data.var9*256;//0015;
        rgbEffect.uniforms[ 'freq3' ].value = data.var5*-0.0480*256;//0015;
        rgbEffect.uniforms[ 'freq4' ].value = 0.34*-0.0481*256;//0015;
*/

        offset = count*.216*.1;
        
        for(var i = 0 ; i < things.length ; i++){
            // things[i].bones[1]._rotation.z = noise(.1+things[i].id+count*.1);
            things[i].bones[1]._rotation.z = .216*4*noise(things[i].position.x/100+offset,things[i].position.y/100,things[i].position.z/100);
            things[i].position.x-=1;
            if(things[i].position.x<-250){
                things[i].position.x=250;
            }
        }


      
    }
}