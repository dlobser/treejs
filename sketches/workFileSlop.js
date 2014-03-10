sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        tree = new TREE();

        tree.params.jointScale.y=5;

        // tree.position.y=-10;
        // tree.branch(100);

        tree.generate({joints:[5,5,5],});

        scene.add(tree);

        var ml = (tree.reportMirrorLayers());

        // console.log(tree.parts["0,0,0"]);
        console.log(ml);
        console.log(tree.parts);

        // var bob = (tree.parts["0,0,0,0,0"]);
        // bob.rotation.z = 1;


        // tree.xform(tree.makeInfo([
        //     [0,0,"all"],{rz:0,amount:10,sc:10},
        //     // [0,0,[0,99]],{rz:0,amount:20,sc:10},
        // ]),tree.appendBranch);

        // thing = tree.GPUaccelerate();


        // var geo = new THREE.Geometry();
       
        // geo.skinIndices = [];
        // geo.skinWeights = [];

        // geo.bones = [];

        // var reportArray = tree.report();

        // var mirrorJointArray = [];

        // for (var k = 0; k < reportArray.length; k++) {

        //     var parentJoint = reportArray[k];

        //     for (var i = 0; i < parentJoint.joints+1; i++) {

        //         var thisJoint = tree.findJoint(parentJoint,i);
                
        //         mirrorJointArray.push(thisJoint);

        //         var mergedGeo = thisJoint.mergeGeo();

        //         THREE.GeometryUtils.merge(geo,mergedGeo);

        //          var len = geo.bones.length;

        //         for(var j = 0 ; j < mergedGeo.vertices.length ; j++){

        //             geo.skinIndices.push( new THREE.Vector4(len,len,0,0 ));
        //             geo.skinWeights.push( new THREE.Vector4(1,1,0,0 ));

        //         }

        //         var bone = {};

        //         bone.name="bone"+len;

        //         bone.pos = [thisJoint.position.x,thisJoint.position.y,thisJoint.position.z];
        //         bone.rot = [thisJoint.rotation.x,thisJoint.rotation.y,thisJoint.rotation.z];
        //         bone.scl = [thisJoint.scale.x,thisJoint.scale.y,thisJoint.scale.z];
        //         bone.rotq = [0,0,0,1];
        //         bone.joints = thisJoint.joints;
        //         bone.joint = thisJoint.joint;
        //         bone.offset = thisJoint.offset;
        //         bone.offset2 = thisJoint.offset2;

        //         console.log(thisJoint.nameArray);

        //         if(k>0 && i==0)
        //             bone.parent = findParentInMirrorArray(thisJoint,mirrorJointArray);
        //         else
        //             bone.parent = geo.bones.length-1;

        //         geo.bones.push(bone);
        //     }
        // }

        // function findParentInMirrorArray(obj,arr){
        //     var count = 0;
        //     for (var i = 0; i < arr.length; i++) {
        //         if(obj.parentJoint == arr[i]){
        //             count = i;
        //         }
        //     }
        //     return count;
        // }

        // console.log(geo);

        // var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});
        // thing = new THREE.SkinnedMesh(geo,material,true);

        // console.log(thing);
        scene.add(thing);

        //            // console.log(thing.bones[5].scale);

        // tree.passFunc(tree.makeInfo([
        //     [0,[0,2],"all"],{rz:omouseX},
        // ]),
        // function(obj,args){
        //     obj._rotation.z=1;
        //     // console.log(obj);
        // }
        // ,true);

        // var mx = {};
        // mx.mouseX = mouseX;
        // console.log(mx.mouseX);
        // allofit = tree.utils.processInfo(tree.makeInfo([[0,[0,2],"all"],{rz:omouseX}]));

        // console.log(tree.FIND(allofit[0][0]));

        // allofit.things = [];

        // for (var i = 0; i < allofit[0].length; i++) {
        //     allofit.things[allofit[0][i].toString()]=tree.FIND(allofit[0][i]);
        // };

        // allofit.things[allofit[0][0].toString()]=tree.FIND(allofit[0][0]);

        // console.log(allofit.things[allofit[0][0].toString()]);

        // tree.passFunc(tree.makeInfo([
        //     [0,[0,2],"all"],{rz:omouseX},
        // ]),
        // function(obj,args){
        //     obj._rotation.z=1;
        //     // console.log(obj);
        // }
        // ,true);
    // chuck = [];
    // var chuck;
    chuck = tree.utils.makeFlatList([0,0,[0,2],[0,1],"all"]);
        bill = tree.utils.makeFlatList([0,0,[2,3],0,"all"]);

    // bill = tree.utils.makeListAll([0,0,[0,2],[0,1],"all"]);
    //     chuck = [];

    // //     console.log(bill);

    // for(var i = 0 ; i < bill.length ; i++){
    //     var t = tree.utils.makeList(bill[i]);
    //     console.log(t.length);
    //     for(var j = 0 ; j < t.length ; j++){
    //         console.log(i + " " + j);
    //         var th = tree.utils.makeList(t[j]);
    //         console.log(th.toString());
    //         chuck.push(tree.utils.makeList(t[j]));
    //     }
    // }

    // var nordstrom = [];

    // // chuck = tree.utils.makeList(bill);

    // console.log(chuck.toString());

    // // allofit = tree.utils.processInfo(tree.makeInfo([[0,0,[0,2],[0,1],"all"],{rz:omouseX}]));
    // console.log(tree.FIND([0,0,0,1,0]))
    //  console.log(tree.parts);

    },

    draw:function(time){
       //  for(var i = 0 ; i < thing.bones.length ; i++){
       //      thing.bones[i]._rotation.z = Math.sin((time*data.var3)+i*.1)*omouseX*2;//*i*.0005*data.var6;
       //      thing.bones[i]._rotation.x = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var5;
       //      thing.bones[i]._rotation.y = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var4;
       //      // thing.bones[i].scale = new THREE.Vector3(.9,.9,.9);
       //  }


        // for(var i = 0 ; i < tree.mirrorJointArray.length ; i++){

        //     var thisTree = allofit.things["0,0,"+i];//tree.FIND([0,0,i]);
        //     tree.transform(thisTree,{rz:mouseX});
        //     // thisTree.rotation.z = Math.sin((time*data.var3)+i*.1)*omouseX*3;//*i*.0005*data.var6;
        //     // thisTree.rotation.x = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var5;
        //     // thisTree.rotation.y = Math.sin((time*data.var3)+i*.01)*omouseY;//*i*.0005*data.var4;
        //     // thing.bones[i].scale = new THREE.Vector3(.9,.9,.9);
        // }

       //  tree.passFunc(tree.makeInfo([
       //      [0,0,"all"],{rz:mouseY,jFreq:.2,jMult:mouseX},
       //  ]),
       // tree.transform
       //  ,true);
        // tree.transform(tree.parts["0,0,0,0,3"],{rz:mouseX})
        tree.applyFunc(
            [bill,{rx:mouseY},
            chuck,{rz:mouseX}],
        tree.transform);
        //  tree.passFunc2(
        //     bill,{rz:mouseY},
        // tree.transform);
        // for (var i = 0; i < allofit[0].length; i++) {
        //     tree.transform(tree.FIND(allofit[0][i]),{rz:mouseX});
        // };
        // tree.transform()
       
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
    // this.traverse(function(t){t.updateMatrixWorld()});

    meshes[0] = this.ballMesh.geometry.clone();
    meshes[1] = this.jointMesh.geometry.clone();
    meshes[2] = this.ballMesh2.geometry.clone();

    meshes[0].applyMatrix(this.matrixWorld);
    meshes[1].applyMatrix(this.children[0].children[1].children[0].matrixWorld);
    meshes[2].applyMatrix(this.children[0].children[0].children[0].matrixWorld);

    THREE.GeometryUtils.merge(meshes[0],meshes[1]);
    THREE.GeometryUtils.merge(meshes[0],meshes[2]);

    return meshes[0];
}

TREE.prototype.GPUaccelerate = function(){


    var geo = new THREE.Geometry();
       
    geo.skinIndices = [];
    geo.skinWeights = [];

    geo.bones = [];
   
    var reportArray = tree.report();

    this.mirrorJointArray = [];

    for (var k = 0; k < reportArray.length; k++) {

        var parentJoint = reportArray[k];

        for (var i = 0; i < parentJoint.joints+1; i++) {

            var thisJoint = tree.findJoint(parentJoint,i);
            
            this.mirrorJointArray.push(thisJoint);

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
            bone.rotator = bone;
            bone.scalar = bone;


            // console.log(thisJoint.nameArray);

            if(k>0 && i==0){
                bone.parent = this.utils.findParentInMirrorArray(thisJoint,this.mirrorJointArray);
            }
            else
                bone.parent = geo.bones.length-1;


            geo.bones.push(bone);
        }
    }


    this.params.skinMaterial = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});
    var skinned = new THREE.SkinnedMesh(geo,this.params.skinMaterial,true);

    for (var i = 0; i < skinned.bones.length; i++) {
        skinned.bones[i].joint = geo.bones[i].joint;
        skinned.bones[i].joints = geo.bones[i].joints;
        skinned.bones[i].offset = geo.bones[i].offset;
        skinned.bones[i].offset2 = geo.bones[i].offset2;
        skinned.bones[i].rotator = geo.bones[i].rotator;
        skinned.bones[i].scalar = geo.bones[i].scalar;
    };
    // console.log(skinned.bones);
    this.bones = skinned.bones;



    return skinned;

}

