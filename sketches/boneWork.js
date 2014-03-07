sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        tree = new TREE();
        tree.params.jointScale.y=1;
        // tree.position.y=-10;
        tree.branch(200);
        // scene.add(tree);

        var geo = tree.mergeMeshes(tree.FIND([0,0,0]));
       
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
            var bone = {};

            bone.name="bone"+i
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

        thing = new THREE.SkinnedMesh(geo,material,true);

        console.log(thing);
        scene.add(thing);

        //////////

        var geo2 = tree.mergeMeshes(tree.FIND([0,0,0]));
       
        var material2 = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});

        geo2.skinIndices = [];
        geo2.skinWeights = [];

        var q = 0;

        for(var i = 0 ; i < geo2.vertices.length ; i++){

            if(i%210==0)
                q++;
            var index = q ;
            geo2.skinIndices.push( new THREE.Vector4(index,index,0,0 ));
            geo2.skinWeights.push( new THREE.Vector4(1,1,0,0 ));

        }

        geo2.bones = [];

        for (var i = 0; i < tree.FIND([0,0,0]).joints+1; i++) {
            var bone = {};

            bone.name="bone"+i
            if(i==0)
                bone.pos = [0,-1,0];
            else
                bone.pos = [0,1,0];

            bone.rot = [0,0,0];
            bone.scl = [1,1,1];
            bone.rotq = [0,0,0,1];
            bone.parent = i-1;

            geo2.bones.push(bone);
        };

        thing2 = new THREE.SkinnedMesh(geo2,material2,true);

        console.log(thing2);
        scene.add(thing2);

    },

    draw:function(time){
        for(var i = 0 ; i < thing.bones.length ; i++){
            thing.bones[i]._rotation.z = Math.sin((time*data.var3,time,time)+i*.01)*omouseX*2;//*i*.0005*data.var6;
            thing.bones[i]._rotation.x = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var5;
            thing.bones[i]._rotation.y = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var4;

        }
       
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


