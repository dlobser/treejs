sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        //select joint
        //make empty geo
        //merge child geo into empty geo
        //make a bone with attributes from joint
        //for all vertices

        // frameRate = 1;

        // var geo = new THREE.BoxGeometry(10,20,10,10,10,10);
        // var newGeo = geo.clone();

        // tree = new TREE();
        // var joint = new Joint();
        // joint.params = tree.params;
        // joint.params.jointScale.y = 20;
        // joint.construct(-20);

        // var merged = new THREE.Mesh(joint.mergeGeo(),new THREE.MeshLambertMaterial());
        // scene.add(merged);
        // console.log(joint);
        // scene.add(joint);

        tree = new TREE();
        tree.params.jointScale.y=1;
        // tree.position.y=-10;
        tree.branch(2000);
        // scene.add(tree);



        var geo = tree.mergeMeshes(tree.FIND([0,0,0]));
        // scene.add(new THREE.Mesh(smorg,new THREE.MeshLambertMaterial()));
        // console.log(geo.vertices.length/10);
        // THREE.GeometryUtils.merge(geo,newGeo);

        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});

        geo.skinIndices = [];
        geo.skinWeights = [];

        var q = 0;

        for(var i = 0 ; i < geo.vertices.length ; i++){

            if(i%210==0)
                q++;
            var index = q ;
            geo.skinIndices.push( new THREE.Vector4(index,index,0,0 ));
            geo.skinWeights.push( new THREE.Vector4(1,1,0,0 ));

        }

        geo.bones = [];

        for (var i = 0; i < tree.FIND([0,0,0]).joints+1; i++) {
            // var jnt = tree.FIND([0,0,i]);
            var bone = {};

            bone.name="bone"+i
            // console.log(jnt.position.y);
            if(i==0)
                bone.pos = [0,-1,0];
            else
                bone.pos = [0,1,0];

            bone.rot = [0,0,0];
            bone.scl = [1,1,1];
            bone.rotq = [0,0,0,1];
            bone.parent = i-1;

            geo.bones.push(bone);
        };

        // geo.computeVertexNormals();

        // geo.bones = [];

        // var bone = {};

        // bone.name="whatever";
        // bone.pos = [0,0,0];
        // bone.rot = [0,0,0];
        // bone.scl = [1,1,1];
        // bone.rotq = [0,0,0,1];
        // bone.parent = -1;

        // geo.bones.push(bone);

        // var bone = {};

        // bone.name="whatever2";
        // bone.pos = [0,0,0];
        // bone.rot = [0,0,0];
        // bone.scl = [1,1,1];
        // bone.rotq = [0,0,0,1];
        // bone.parent = 0;

        // geo.bones.push(bone);

        // var newGeo = geo.clone();
        // newGeo.skinIndices = cloneVec4Array(geo.skinIndices);
        // newGeo.skinWeight = cloneVec4Array(geo.skinWeights);

        // newGeo.skinIndices[0].x = 10000;


        // // THREE.GeometryUtils.merge(geo,newGeo);
        // // console.log(newGeo);
        // // console.log(geo);

        thing = new THREE.SkinnedMesh(geo,material,true);

        console.log(thing);
        scene.add(thing);

         //   thing.pose();
        // thing.normalizeSkinWeights();


    },

    draw:function(time){
        for(var i = 0 ; i < thing.bones.length ; i++){
            thing.bones[i]._rotation.z = Math.sin((time*data.var3,time,time)+i*.01)*omouseX*2;//*i*.0005*data.var6;
            thing.bones[i]._rotation.x = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var5;
            thing.bones[i]._rotation.y = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var4;

        }
        // thing.bones[0].position.y = omouseX*50;
        // // thing.bones[0]._rotation.z = 4*omouseY;
        // thing.bones[1]._rotation.z = 4*omouseY;
        // thing.bones[1].position.y = omouseX*10;


        // for(var i = 0 ; i < 2000 ; i++){
        //     var t = tree.FIND([0,0,i]);
        //     t.rotator.rotation.z = Math.sin((time*omouseY)+i*.1*omouseX);
        // }
    }
}

function cloneVec4Array(arr){
    function cloneVec4(val){
        var tempVec = new THREE.Vector4();
       tempVec.x = val.x;
       tempVec.y = val.y;
       tempVec.z = val.z;
       tempVec.w = val.w;
       return tempVec;
    }
    var tempArray = [];
    for (var i = 0; i < arr.length; i++) {
        tempArray[i] = cloneVec4(arr[i]);
    }
    return tempArray;
}

Joint.prototype.mergeGeo = function(){

    var meshes = [];
   
    this.updateMatrixWorld();
    this.traverse(function(t){t.updateMatrixWorld()});

    meshes[0] = this.ballMesh.geometry.clone();
    meshes[1] = this.jointMesh.geometry.clone();
    meshes[2] = this.ballMesh2.geometry.clone();

    meshes[0].applyMatrix(this.matrixWorld);
    meshes[1].applyMatrix(this.children[0].children[1].children[0].matrixWorld);
    meshes[2].applyMatrix(this.children[0].children[0].children[0].matrixWorld);

    THREE.GeometryUtils.merge(meshes[0],meshes[1]);
    THREE.GeometryUtils.merge(meshes[0],meshes[2]);

    // var bob = new THREE.CubeGeometry(10,10,10);
    // this.children[0].children.pop();
    // this.children[0].children[0].geometry = meshes[0];
    // this.children[0].children[0].children.pop();

    return meshes[0];
}


