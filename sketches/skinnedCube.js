sc1 = {
    
    setup:function(){

        frameRate = 1;

        var geo = new THREE.BoxGeometry(10,20,10,100,100,100);

        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});

        geo.skinIndices = [];
        geo.skinWeights = [];

        for(var i = 0 ; i < geo.vertices.length ; i++){

            geo.vertices[i].x+=Math.random()*.3;
            geo.vertices[i].z+=Math.random()*.3;

            q = (10+geo.vertices[i].y)/20;
            g = -q+1;

            geo.skinIndices.push( new THREE.Vector4(1,0,0,0 ));
            geo.skinWeights.push( new THREE.Vector4(q,g,0,0 ));

        }

        geo.computeVertexNormals();

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
        bone.pos = [0,0,0];
        bone.rot = [0,0,0];
        bone.scl = [1,1,1];
        bone.rotq = [0,0,0,1];
        bone.parent = 0;

        geo.bones.push(bone);

        thing = new THREE.SkinnedMesh(geo,material,false);

        console.log(thing);
        scene.add(thing);

         //   thing.pose();
        // thing.normalizeSkinWeights();


    },

    draw:function(time){
        thing.bones[0].position.y = omouseX*50;
        // thing.bones[0]._rotation.z = 4*omouseY;
        thing.bones[1]._rotation.z = 4*omouseY;
        thing.bones[1].position.y = omouseX*10;
    }
}
