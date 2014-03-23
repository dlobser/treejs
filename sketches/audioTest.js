sc1 = {
    
    setup:function(){

        frameRate=1;

            // init the library
        var webaudio    = new WebAudio();
        sounds = [];
        objects = [];

        var sphere = new THREE.Mesh(new THREE.SphereGeometry(10),new THREE.MeshLambertMaterial());

        var lib = ["sine",1.0000,0.0480,0.4420,0.7020,0.1350,0.9440,89.0000,217.0000,2000.0000,-0.0700,0.2840,0.0000,7.9763,0.0003,0.0000,0.0000,0.1000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];
        var lib = ["sine",1.0000,0.0480,0.0640,0.0300,0.1350,0.0200,89.0000,217.0000,2000.0000,-0.0700,0.2840,0.0000,7.9763,0.0003,0.0000,0.0000,0.1000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];
        console.log(webaudio);
       
        

        for(var i = 0 ; i < 6 ; i++){
            console.log(i);
                    var lib = ["sine",1.0000,0.0480,Math.random()*4,Math.random()*4,Math.random()*4,Math.random()*4,89.0000,217.0000,2000.0000,-0.0700,0.2840,0.0000,7.9763,0.0003,0.0000,0.0000,0.1000,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000];

            // boing   = webaudio.createSound().generateWithJsfx(lib);
             boing   = webaudio.createSound();
              boing.tone((Math.random()*400)+200,30);
            obj = new THREE.AudioObject(boing);
            sounds.push(obj);
            objects.push(sphere.clone());
            // sounds.push(webaudio.createSound());
            // sounds[i].tone((Math.random()+1)*500,3);
            // sounds[i].loop(true).play();
            // sounds[i].volume(10);
            // scene.add(sounds[i].sph);
            // console.log(sounds);
            scene.add(objects[i]);
        }
        
    for(var i = 0 ; i < sounds.length ; i++){
            objects[i].position.x = Math.sin(i+time*2)*100;
            objects[i].position.z = Math.cos(i+time*2)*100;
            sounds[i].position.x = Math.sin(i+time*2)*100;
            sounds[i].position.z = Math.cos(i+time*2)*100;
            sounds[i].update(camera);
        }
       
        

    },

    draw:function(time){


        for(var i = 0 ; i < sounds.length ; i++){
            objects[i].position.x = Math.sin(i+time)*100;
            objects[i].position.z = Math.cos(i+time)*100;
            sounds[i].position.x = Math.sin(i+time)*100;
            sounds[i].position.z = Math.cos(i+time)*100;
            sounds[i].update(camera);
            // sounds[i].updateWithObject3dCam(objects[i],camera,time);
        }
       
    }
}