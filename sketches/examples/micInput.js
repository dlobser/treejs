
sc1 = {
    
    setup:function(){

        frameRate = 1;
        
        invertColor();
        
        noLights = true;

        lgts = new THREE.Object3D();

        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),2,200));
        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),2,200));
        lgts.add(new THREE.PointLight(new THREE.Color(0x99eeff),2,200));

        lgts.position.z=100;
        lgts.children[0].position.z=10

        scene.add(lgts);

        enableAudioInput();

        tree = new TREE();

        tree.rotation.x = pi;
     
        tree.generate({
            joints:[1],
            rads:[1024],
            angles:[pi],
            length:[120],
            })

        tree.passFunc(tree.makeInfo([
            [0,-1,0]
            ]),function(o){
            o.ballMesh2.scale = new THREE.Vector3(5,5,5);
            o.jointMesh.scale = new THREE.Vector3(.1,1,.1);
        })

        scene.add(tree);

    },
    
    draw:function(time){

        for (var i = 0; i < audioValues.length; i++) {
            var value = audioValues[i];
            var j = tree.FIND([0,i,0]);
            if(Math.abs(value-127.5) > .4)
            j.rotator.rotation.z = (pi)+(Math.abs(value)-126)*.2;
        }
    }
}
