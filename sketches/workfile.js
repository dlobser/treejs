sc1 = {
    
    setup:function(){

        tree = new TREE();
        
        // scene.add(new THREE.AmbientLight({intensity:10}))

        tree.params.ballGeo =  new THREE.SphereGeometry(1,3,6),
        tree.params.jointGeo = new THREE.CylinderGeometry( 1,1,1,5,1),
        tree.params.mat = new THREE.MeshLambertMaterial({ color:0xffffff, shading: THREE.SmoothShading,vertexColors:THREE.FaceColors }),

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
            thing.position.z = -thing.position.y*.1;
            thing.position.y-=80;


            scene.add(thing);
            things.push(thing);
        }

        // console.log(thing);
        // scene.add(thing);

        // postprocessing
        useComposer = true;
        composer = new THREE.EffectComposer( renderer );
        composer.addPass( new THREE.RenderPass( scene, camera ) );

        // var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
        // dotScreenEffect.uniforms[ 'scale' ].value = 4;
        // composer.addPass( dotScreenEffect );

        rgbEffect = new THREE.ShaderPass( THREE.testShader );
        rgbEffect.uniforms[ 'amount' ].value = 0.0;//0015;
        rgbEffect.uniforms[ 'offer' ].value = 0.0;//0015;

        rgbEffect.renderToScreen = true;
        composer.addPass( rgbEffect );
        

    },

    draw:function(time){
        rgbEffect.uniforms[ 'offer' ].value = time;//0015;


        offset = count*omouseX*.1;
        
        for(var i = 0 ; i < things.length ; i++){
            // things[i].bones[1]._rotation.z = noise(.1+things[i].id+count*.1);
            things[i].bones[1]._rotation.z = omouseY*4*noise(things[i].position.x/100+offset,things[i].position.y/100,things[i].position.z/100);

        }


      
    }
}