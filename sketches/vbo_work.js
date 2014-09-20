


sc1 = {
    
    setup:function(){

        frameRate = 1;


lightShader = {

    uniforms : {
        "time": { type: "f", value: 1 },
        "alpha": { type: "f", value: 1 },
        "weight": { type: "f", value: 1 },
        "tExplosion": { type: "t", value: null },
        "uVec3Array" : { type: "v3v", value: [ new THREE.Vector3( 0.1, 0.2, 0.3 ), 
                                               new THREE.Vector3( 0.4, 0.5, 0.6 ) ] }, // Vector3 array

    },

    vertexShader : ["\
    varying vec4 vColor;\
    attribute float displacement;\
        uniform float time;\
       varying float dx;\
       varying float dy;\
       varying vec3 vPosition;\
       varying vec3 vNormal;\
       float disp = 1.;\
       void main() {\
          vColor = vec4(1.);\
          dx = 2. * uv.x - 1.;\
          dy = 2. * uv.y - 1.;\
          vNormal = (modelViewMatrix * vec4(normal, 0.)).xyz;\
          vPosition = position*.03;\
            disp+=1.;\
        gl_PointSize = 10. * ( 150.0 / length( vPosition.xyz ) );\
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vec3(displacement)*vec3(disp) * position+vec3(sin(time)), 1.);\
       }\
    "].join("\n"),

    fragmentShader : [
   "\
   vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\
   vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\
   vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\
   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\
   vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\
   float noise(vec3 P) {\
      vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));\
      vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);\
      vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);\
      vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;\
      vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);\
      vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\
      vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\
      gx0 = fract(gx0); gx1 = fract(gx1);\
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));\
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));\
      gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);\
      gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);\
      vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),\
           g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),\
           g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),\
           g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);\
      vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));\
      vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));\
      g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;\
      g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;\
      vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),\
                         dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),\
                    vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),\
                         dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);\
      return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);\
   }\
   float noise(vec2 P) { return noise(vec3(P, 0.0)); }\
   float fractal(vec3 P) {\
      float f = 0., s = 1.;\
      for (int i = 0 ; i < 9 ; i++) {\
         f += noise(s * P) / s;\
         s *= 2.;\
         P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);\
      }\
      return f;\
   }\
   float turbulence(vec3 P) {\
      float f = 0., s = 1.;\
      for (int i = 0 ; i < 9 ; i++) {\
         f += abs(noise(s * P)) / s;\
         s *= 2.;\
         P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);\
      }\
      return f;\
   }\
   uniform float alpha;\
   varying float dx;\
   varying float dy;\
   uniform float mx;\
   uniform float my;\
   uniform float time;\
   uniform float selectedIndex;\
   varying vec3 vNormal;\
   varying vec3 vPosition;\
   uniform float x;\
   uniform float y;\
   uniform float z;\
   uniform vec3 color;\
    uniform sampler2D texture;\
    varying vec4 vColor;\
    void main() {\
        vec4 outColor = texture2D( texture, gl_PointCoord );\
        if ( outColor.a < 0.001 ) discard;\
        gl_FragColor = outColor * vec4( color * vColor.xyz, 1.0 );\
        float depth = gl_FragCoord.z / gl_FragCoord.w;\
        const vec3 fogColor = vec3( 0.0 );\
        float fogFactor = smoothstep( 200.0, 600.0, depth );\
        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\
    }\
    "
    ].join("\n")
}

var attributes = {
    displacement: {
        type: 'f', // a float
        value: [] // an empty array
    }
};
 


// now populate the array of attributes



        shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                texture:   { type: "t", value: THREE.ImageUtils.loadTexture( "assets/textures/particle.png" ) },
                tExplosion: {
                    type: "t",
                    value: 0,
                    texture: THREE.ImageUtils.loadTexture('http://www.bpsd.mb.ca/naci/nordstrom/samples/web/portfolio_lowhar/images/splosion.png')
                },
                time: {
                    type: "f",
                    value: 0.0
                },
                alpha: {
                    type: "f",
                    value: 1.0
                },
                weight: {
                    type: "f",
                    value: 10.0
                }
            },
            attributes:     attributes,
            vertexShader:   lightShader.vertexShader,
            fragmentShader: lightShader.fragmentShader,
        });



        var sph = new THREE.Mesh(new THREE.SphereGeometry(1,200,200),shaderMaterial);
        // scene.add(sph);
        sph.shaderMaterial = shaderMaterial;
        sph.material = shaderMaterial;

        var vertices = sph.geometry.vertices;
        values = attributes.displacement.value;
        for(var v = 0; v < vertices.length; v++) {
            values.push(Math.random() * 30);
        }

        scene.add(sph);


      
        // rift=true;
        // controls = new THREE.OculusRiftControls( camera );
        //         scene.add( controls.getObject() );
        // camera.position.z = 50;

// document.getElementById('container').innerHTML =
                        // effect.getInterpupillaryDistance().toFixed(3);

        tree = new TREE(); 
        tree.branch(); 
        scene.add(tree);
        codeName="treeMaker";
        
        tree.setScale(2);
        
        tree.position.y=-80;
        
        root = tree.makeList([0,0,-2]);

        //add branches
        
        var p = 20;
        
        for(var i = 30 ; i < 99 ; i++){
            var t = tree.FIND([0,0,i]);
            var amt = p;
            var b = (Math.round(Math.random()))+1;
            for(var j = 0 ; j < b ; j++){
             tree.appendBranch(t,{amount:amt,ry:Math.random()*pi*4,rz:Math.random()+.4,sc:4})
            }
            i+=1+Math.round(Math.random()*(i/2));
            p-=1;
        }

        //add twigs

        var lay = tree.reportLayers();

        for(var i = 0 ; i < lay[1].length ; i++){
           
            for(var j = 0 ; j < lay[1][i].joints ; j++){
                var t = tree.findJoint(lay[1][i],j);//Math.floor(Math.random()*lay[1][i].joints));
                var amt = -j+lay[1][i].joints;//1+Math.round(Math.random()*10);
                tree.appendBranch(t,{amount:amt,sc:3,ry:Math.random()*6});
                j+=Math.round(Math.random()+1)*2;
            }
        }
        
        branches1 = [];
        branches2 = [];
        

        tree.makeDictionary();
        
        var limbsArray = tree.report();

        for(var i = 0 ; i < limbsArray.length ; i++){
            for(var j = 0 ; j <= limbsArray[i].joints ; j++){
                
                // console.log(limbsArray[i][j]);

                var tempObj1 = tree.findJoint(limbsArray[i],j);
                // console.log(tempObj1);
                var name = (tempObj1.dictionaryName.split(","));
                var names = [];
                for(var k = 0 ; k < name.length ; k++){
                    names[k] = parseInt(name[k]);
                }
                // console.log(names);
                if(names.length==5 && names[names.length-1]!=0)
                    branches1.push(names);
                if(names.length==7 && names[names.length-1]!=0){
                    branches2.push(names);
                }
                
            }
        }
        

        setSliders({"var1":0.5,"var2":0.232,"var3":Math.random()*12.3,"var4":-.64,"var5":-0.3,"var6":0.2,"var7":-0.08});  
       
         tree.passFunc(tree.makeInfo([
            // [0,0,-1,-1,-1,-1,-2], {fract:.1},  
            [0,0,-1], {fract:0.0021,freq:.04,off:Math.random()*100}, 
            // [0,0,-1,[0,5],-2], {fract:.005},  
        ]),function(obj,args){
            obj.rotation.z+=noise(args.off+obj.joint*args.freq)*(obj.joint*args.fract);
            obj.rotation.x+=noise(.3+args.off+obj.joint*args.freq)*(obj.joint*args.fract);
        });
                vrstate = new vr.State();

        console.log(shaderMaterial);
        
    },
    
    draw:function(time){

        values = shaderMaterial.attributes.displacement.value;
        shaderMaterial.attributes.displacement.needsUpdate = true;

        for(var i = 0 ; i < values.length ; i++){
            shaderMaterial.attributes.displacement.value[i] = 10+noise(time*1+(i*.1));
        }

        // console.log(values[0]);

         shaderMaterial.uniforms[ 'time' ].value = time;//0015;

    

        // vr.requestAnimationFrame(animate);

        //         controls.isOnObject( false );

        //         var polled = vr.pollState(vrstate);
                // controls.update( Date.now() - time, polled ? vrstate : null );
        
        tree.applyFunc([
            branches1, {sc:.95,nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(.2),sc:.95},  
            root, {rx:0,rz:0,nMult:data.var1,nFreq:data.var2,nOff:data.var3-(.2),nFract:.03,sc:.99}, 
            branches2, {sc:.95,nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(.2),sc:.95},  
        ],tree.transform);
        
       
        
        if(varE){
            var lines = tree.worldPositionsArray(tree.report());
        
            lines2 = (tree.worldPositionsArray(tree.reportLayers()[0]));
            lines3 = (tree.worldPositionsArray(tree.reportLayers()[1]));
            lines4 = (tree.worldPositionsArray(tree.reportLayers()[2]));
            
            tubers = tree.tubes(lines2,{width:1,lengthSegs:3,widthSegs:13,minWidth:0,func:function(t){return 1/((t*.1)+1)*8}});
            for(t in tubers.children[0].geometry.vertices){
                var p = tubers.children[0].geometry.vertices[t];
                p.x+=noise(p.y*.2)*1;
                p.z+=noise(10+p.y*.2)*1;
                p.y+=noise(p.x*.2);
            }
            console.log(tubers);
            // tubers2 = tree.tubes(lines3,{});
            tubers3 = tree.tubes(lines4,{});

            tubers2 = tree.tubes(lines3,{width:1,lengthSegs:3,widthSegs:13,minWidth:0,func:function(t){return 1/((t*.1)+1)}});
           
            scene.add(tubers);
            scene.add(tubers2);
            scene.add(tubers3);
            scene.remove(tree);
            varE=false;
        }

    }
}

