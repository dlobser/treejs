sc1 = {
    
    setup:function(){

        amt = 500;
        moths = [];

        mothFlock = new THREE.Object3D();

        mat = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});
                mat2 = new THREE.MeshLambertMaterial({color:0xffffff});

        miniMoth = new THREE.Object3D();
        miniMoth.parts = [];
        wing = new THREE.CylinderGeometry( 0,1,3,3,1);

        miniWing = new THREE.Mesh(wing,mat2);
        miniWing.position.x = 1.75;
        miniWing.rotation.z = pi;
        // miniWing.rotation.z = .5;
        miniWing.scale.z = .1;
        miniWingRoot = new THREE.Object3D();
        miniWingRoot.add(miniWing);

        lminiWing = miniWingRoot.clone();
        lminiWing.rotation.z = -.3;
        lminiWing.scale.x=.8
        rWing = new THREE.Object3D();
        rWing.add(lminiWing);
        rWing.add(miniWingRoot);
        miniMoth.add(rWing);
        miniMoth.rWing = rWing;
        miniMoth.lWing = rWing.clone();
        miniMoth.lWing.rotation.y = pi*2;
        miniMoth.add(miniMoth.lWing);
        miniMoth.body = new THREE.Mesh(new THREE.SphereGeometry( .5,4,4), mat2);
        miniMoth.add(miniMoth.body);
        miniMoth.body.scale.y = 2;
        miniMoth.body.position.y=-.3

        miniMoth.add(miniWing);

        miniMoth.scale = new THREE.Vector3(.4,.4,.4);

        // scene.add(miniMoth);

        empty = new THREE.Geometry();


        empty2 = new THREE.Geometry();

        empty2.skinIndices = [];
        empty2.skinWeights = [];
        empty2.bones = [];

        miniMoth.traverse(function(o){o.updateMatrixWorld();if(o.geometry)miniMoth.parts.push(o)})

        console.log(miniMoth.parts);

        meshes = [];

        for(var i = 0 ; i < miniMoth.parts.length ; i++){
            miniMoth.parts[i].parent.updateMatrixWorld();
            miniMoth.parts[i].updateMatrixWorld();

            geo = miniMoth.parts[i].geometry.clone();
            console.log(geo);
            // THREE.SceneUtils.detach(geo,miniMoth.parts[i].parent,scene);
            geo.applyMatrix(miniMoth.parts[i].matrixWorld);
            THREE.GeometryUtils.merge(empty,geo);
        }

        // // miniMoth.traverse(function(o){o.updateMatrixWorld();o.updateMatrix();if(o.parent)o.parent.updateMatrix();if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});

        emp = new THREE.Mesh(empty,mat2);

        emp.position.y = 5;

        // scene.add(emp);

        for ( var i = 0 ; i < amt ; i++ ){
             
            // for(var j = 0 ; j < empty.vertices.length ; j++){
            //     empty2.vertices.push(empty.vertices[i]);
            // }
            // for(var j = 0 ; j < empty.faces.length ; j++){
            //     empty2.faces.push(empty.faces[j]);
            // }

            // emp.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty2,o.geometry)}});
           

            // console.log(miniMoth[i]);

            var mpty = empty.clone();

            for(var j = mpty.vertices.length ; j > 0  ; j--){
                empty2.skinIndices.push( new THREE.Vector4(i,0,0,0 ));
                empty2.skinWeights.push( new THREE.Vector4(1,0,0,0 ));
            }

            THREE.GeometryUtils.merge(empty2,mpty);

            var bone = {};
            bone.name="whatever";
            bone.pos = [0,0,0];
            bone.rot = [0,0,0];
            bone.scl = [1,1,1];
            bone.rotq = [0,0,0,1];
            bone.parent = -1;

            empty2.bones.push(bone);

        }

        thing = new THREE.SkinnedMesh(empty2,mat,true);

        console.log(thing);

        scene.add(thing);

    
        for(var i = 0 ; i < amt ; i++){
            thing.bones[i].position.x = (-.5+Math.random())*620;
            thing.bones[i].position.y = Math.random()*20;
            thing.bones[i].position.z = (-.5+Math.random())*620;

            thing.bones[i].rotation.y += noise(i*.1);


        }

        q=1;

    },

    draw:function(time){

        q+=.01;

        for(var i = 0 ; i < amt ; i++){
            thing.bones[i].position.x += noise(q+(i*.1));
            thing.bones[i].position.y += noise(q+1.2+(i*.1));
            thing.bones[i].rotation.y += .65+noise((i+q));
            thing.bones[i].rotation.x += noise((.3+i+q))*.013;

            thing.bones[i].rotation.z += noise((.5+i+q))*.01;



        }

    }
}

