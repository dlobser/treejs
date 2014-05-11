
sc1 = {
    
    setup:function(){

        enableAudioInput();

        amt = 150;

        invertColor();

        frameRate = 1;

        // setupDepthEffect();

        tree = new TREE();
        
        tree.generate({
            joints:[amt,13],
            angles:[0,pi],
            rads:[1,1],
            length:[1,2]
        })

        noLights = true;

        lgts = new THREE.Object3D();

        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),1,200));
        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),1,200));
        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),1,200));

        lgts.position.y=0;

        scene.add(lgts);

        scene.add(new THREE.AmbientLight(0x886644));

        empty = new THREE.Geometry();

        aveges = [];

        for(var i = 0 ; i < amt ; i++){
            j = tree.FIND([0,0,i]);
            tree.setJointLength(j,{length:i*1.5});
            tree.setGeo(j,{jointGeo:empty,ballGeo:empty,ballGeo2:empty});
            aveges.push(new Average(5));

            for(var j = 0 ; j < 5 ; j++){
                aveges[i].avg(0);
            }
        }
        tree.makeDictionary();
        skin = tree.makeSkinnedGeo();

        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true,vertexColors:THREE.FaceColors});

       
        for(var i = 0 ; i < skin.geometry.faces.length ; i++){
            var geo = skin.geometry;
            geo.faces[i].color.setRGB(
                (geo.vertices[geo.faces[i].a].x/-40),//+.5,
                (geo.vertices[geo.faces[i].a].x/-36),//+.35,
                (geo.vertices[geo.faces[i].a].x/-30));//+.1);
        }

        skin.material = material;

        skin.rotation.z = -pi;
        
        scene.add(skin);

        console.log(tree.boneDictionary["0,0,0"]);
        
        // tree.position.y = -30;
        rebuildGui({sliders:8})
        setSliders({"var1":.4,"var2":0,"var3":.6,"var4":.4,"var5":.2,"var6":.4,"var7":-.6,"var8":-1})

        tm = 0;

        vals = [];

        for(var i = 0 ; i < amt ; i++){
            vals[i] = 0;
        }

        // setupDepthEffect(true);   

        grow = 0;  
    
        
    },
    
    draw:function(time){

        var avg = 0;

        skin.rotation.y+=.001;


        if(audioValues[0]>1){
            for (var i = 0 ; i < audioValues.length ; i++){
                if(audioValues[i]>128){
                    avg+=audioValues[i]-128;
                }
            }

            // avg/=audioValues.length;

            // avg-= 127.5;

            // avg = audioValues[0]-128;
        }

        data.var3=avg*.00003;

        // console.log(avg);
        
        tm+=Math.abs(avg);

        vals[0] = avg;

        for(var k = 0 ; k < 3 ; k++){

            for(var i = amt-1 ; i > 0 ; i--){
                vals[i] = vals[i-1];
            }
        }
        ave = 0;
        if(audioValues[0]>1){
            for(var i = 0 ; i < amt-3 ; i++){
                var aver = audioValues[i*8] + audioValues[(i*8)+1] + audioValues[(i*8)+2];
                aver/=3;
                if(aver>0 || aver<=0)
                    ave = aveges[i].avg(Math.abs(aver));

                if(varY)
                console.log(ave);

                for(var j = 1 ; j < 13 ; j++){
                    // var g = tree.FIND([0,0,i,0,j]);
                    // g.rotation.z = audioValues[i];
                    var st = "0,0,"+i+",0,"+j;
                    tree.boneDictionary[st]._rotation.z = (Math.abs(ave)-153)*(Math.abs(ave)-153)*.0005*Math.sin(j*.5+(time));//*(1+(i/amt));
                    tree.boneDictionary[st]._rotation.y = (Math.abs(ave)-153)*(Math.abs(ave)-153)*.0003*Math.sin(j*.5+(time));//*(1+(i/amt));

                    // tree.boneDictionary[st]._rotation.z = vals[i]*vals[i]*.000000003*j;//(Math.abs(audioValues[i])-127.5)*(Math.abs(audioValues[i])-127.5)*.01;
                    // tree.boneDictionary[st]._rotation.y = vals[i]*vals[i]*.000000001*j;//(Math.abs(audioValues[i])-127.5)*(Math.abs(audioValues[i])-127.5)*.01;

                }
            }
        }

        if(varT){
            grow=0;
            varT=false;
        }

        if(grow<1){
            if(varR)
                grow+=.003;
            data.var8 = THREE.Math.smoothstep(grow,0,1)-1;
            data.var1 = THREE.Math.smoothstep(grow,0,1)-.38;

        }

        tree.passFunc(tree.makeInfo([
            [0,-1,-2],   {rx:data.var1,sc:.99},
            [0,-1,-1,-1,0],  {sc:1+data.var8},

            [0,-1,-1,-1,-2],  {sc:1+(data.var3*.1)}//,rx:data.var2,jOffset:data.var4,jOff:-time*data.var7,jFreq:data.var5,jMult:data.var6,jFract:.1}
        ]),tree.transform,true)

        // animateDepthEffect({offer:count*.01,amt1:.02,amt2:.02});

    }
}


