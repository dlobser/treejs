sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        tree = new TREE();
        tree.params.jointScale.y=5;


      

        // tree.position.y=-10;
        tree.branch(100);

        tree.xform(tree.makeInfo([
            [0,0,"all"],{rz:0,amount:20,sc:10},
            [0,0,[0,99]],{rz:0,amount:20,sc:10},
        ]),tree.appendBranch);

        // scene.add(tree);

        var geo = new THREE.Geometry();

        // tree.passFunc(tree.makeInfo([
        //     [0,0,"all"],{rz:.1,sc:.9},
        // ]),tree.transform);

        // for (var i = 0; i < tree.FIND([0,0,0]).joints+1; i++) {
        //     Things[i]
        // };

        // var geo = tree.mergeMeshes(tree.FIND([0,0,0]));
       
        geo.skinIndices = [];
        geo.skinWeights = [];

        // var q = 0;
       
        // for(var i = 0 ; i < geo.vertices.length ; i++){

        //     if(i%210==0)
        //         q++;

        //     var index = q ;
        //     geo.skinIndices.push( new THREE.Vector4(index,index,0,0 ));
        //     geo.skinWeights.push( new THREE.Vector4(1,1,0,0 ));

        // }

        geo.bones = [];

        var reportArray = tree.report();

        var mirrorJointArray = [];

        for (var k = 0; k < reportArray.length; k++) {

            var parentJoint = reportArray[k];

            for (var i = 0; i < parentJoint.joints+1; i++) {

                var thisJoint = tree.findJoint(parentJoint,i);
                
                mirrorJointArray.push(thisJoint);

                var mergedGeo = thisJoint.mergeGeo();

                THREE.GeometryUtils.merge(geo,mergedGeo);

                 var len = geo.bones.length;

                for(var j = 0 ; j < mergedGeo.vertices.length ; j++){

                    geo.skinIndices.push( new THREE.Vector4(len,len,0,0 ));
                    geo.skinWeights.push( new THREE.Vector4(1,1,0,0 ));

                }

                var bone = {};

                bone.name="bone"+len;

                bone.pos = [thisJoint.position.x,thisJoint.position.y,thisJoint.position.z];
                bone.rot = [thisJoint.rotation.x,thisJoint.rotation.y,thisJoint.rotation.z];
                bone.scl = [thisJoint.scale.x,thisJoint.scale.y,thisJoint.scale.z];
                bone.rotq = [0,0,0,1];
                bone.joints = thisJoint.joints;
                bone.joint = thisJoint.joint;
                bone.offset = thisJoint.offset;
                bone.offset2 = thisJoint.offset2;

                console.log(thisJoint.nameArray);

                if(k>0 && i==0)
                    bone.parent = findParentInMirrorArray(thisJoint,mirrorJointArray);
                else
                    bone.parent = geo.bones.length-1;

                geo.bones.push(bone);
            }
        }

        function findParentInMirrorArray(obj,arr){
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                if(obj.parentJoint == arr[i]){
                    count = i;
                }
            }
            return count;
        }

        console.log(geo);

        var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});
        thing = new THREE.SkinnedMesh(geo,material,true);

        console.log(thing);
        scene.add(thing);

                   console.log(thing.bones[5].scale);


     

    },

    draw:function(time){
        for(var i = 0 ; i < thing.bones.length ; i++){
            thing.bones[i]._rotation.z = Math.sin((time*data.var3)+i*.1)*omouseX*2;//*i*.0005*data.var6;
            thing.bones[i]._rotation.x = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var5;
            thing.bones[i]._rotation.y = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var4;
            // thing.bones[i].scale = new THREE.Vector3(.9,.9,.9);
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


