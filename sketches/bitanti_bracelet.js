


sc1 = {
    
    setup:function(){

        holder = new THREE.Object3D();
        scene.add(holder);

        tree = new TREE();
        scene.add(tree);
  
        tree.generate({
            joints:[50],
            angles:[pi],
            rads:  [2],
            length:[1],
            width: [1],
            divs:  [1],
            start: [1],
        })
        
        holder.add(tree);

        // tree.position.y=-50;
        
        // tree.rotation.x = pi;
        
        tree.makeDictionary();
        
        // setSliders({"var1":.21,"var2":.34,"var3":.4,"var4":.32})
        
        radialBranch1 = tree.makeList([0,0,-2]);
        radialBranch2 = tree.makeList([0,1,-2]);
        radialBranch3 = tree.makeList([0,0,[20,40]]);
        radialBranch4 = tree.makeList([0,1,[20,40]]);


        // topBranch = tree.makeList([0,-1,[12,20]]);

        // featherPieces = tree.makeList([0,-1,-1,0,-2]);
        // featherPieces2 = tree.makeList([0,-1,-1,1,-2]);
        // tipPieces = tree.makeList([0,-1,-1,-1,-1,-1,-2]);
        // tipPieces2 = tree.makeList([0,-1,-1,-1,-1,-1,0]);
        // tippyPieces = tree.makeList([0,-1,-1,-1,-1,-1,-1,-1,-2]);
        
        // setSliders({"var1":0,"var2":-0.0028789161727349466,"var3":-0.1112616426756986,"var4":-0.1112616426756986,"var5":0.17053344623200672});  

        // var empty = new THREE.Geometry();
        //  tree.applyFunc([
        //     radialBranch,   {jointGeo:empty,ballGeo:empty,ballGeo2:empty},
        //     featherPieces,  {jointGeo:empty,ballGeo:empty,ballGeo2:empty},
        //     featherPieces2, {jointGeo:empty,ballGeo:empty,ballGeo2:empty},
        //     // tipPieces2,     {jointGeo:empty},
        //     // tipPieces,      {jointGeo:empty},
        //     // tippyPieces,    {jointGeo:empty},
        // ],tree.setGeo)

        preData = {};
        rebuild = false;
        
    },
    
    draw:function(time){

        // console.log(rebuild);
         if(rebuild){
            // console.log(holder);

            holder.traverse(
                function(obj){
                    if(obj.geometry){
                        obj.geometry.vertices=[];
                        obj.geometry.faces=[];
                        obj.geometry.dispose();
                    }
                }
            );


            var amt = holder.children.length;
            // console.log(holder.children);
            for(var i = 0 ; i < amt ; i++){
                holder.children[i].traverse(
                    function(obj){
                        if(obj.geometry){
                            obj.geometry.vertices=[];
                            obj.geometry.faces=[];
                            obj.geometry.dispose();
                        }
                    }
                );
            }

           var lngth = holder.children.length

            for(var i = 0 ; i < lngth ; i++){
                
                 if(holder.children[0]){
                    if(holder.children[0].geometry)
                        holder.children[0].geometry.dispose();
                }
                holder.remove(holder.children[0]);
                // console.log(holder.children);
            }
            // for(var i = 0 ; i < amt ; i++){
            //     holder.remove(holder.children[i]);
            // }
            // if(holder.children[1])
            // console.log(holder.children[1].children.length);

            varE = true;
        }
        
        tree.applyFunc([
            radialBranch1,   {rx: data.var2*.3},
            radialBranch2,   {rx:-data.var2*.3},
            radialBranch3,   {rx: data.var2*.3+data.var3*.1},
            radialBranch4,   {rx:-data.var2*.3-data.var3*.1},

            // featherPieces,  {rz:data.var2,rx:data.var5},
            // featherPieces2,  {rz:data.var2,rx:-data.var5},
            // tipPieces2, {rz:-pi},
            // tipPieces,  {rz:data.var3},
            // tippyPieces,    {rz:data.var4},
            // topBranch,  {rx:data.var6}
        ],tree.transform)

        if(varE){
            curve = tree.worldPositionsArray(tree.report());

            var amt = 50;
            
            for(var i = 0 ; i < amt ; i++){
                curve[0].unshift(curve[1].shift());
                // console.log(curve[0]);
            }
            curve.pop();

            curve2 = [];
            curve2[0] = [];

            for(var i = 0 ; i < curve[0].length ; i++){
                curve2[0][i] = curve[0][i].clone();
                curve2[0][i].y+=10;
            }
            curve.push(curve2[0]);

            spline1 = new THREE.SplineCurve3(curve[0]);
            spline2 = new THREE.SplineCurve3(curve[1]);
            // console.log(spline1.getPointAt(Math.random()));
            noodles = [];
            subnoodles = [];

            off = 0;
            for(var i = 0 ; i < 1+data.var6*90 ; i++){

                if(i>(data.var6*90-1))
                    off=1;

                thisNoodle = [];
                thisSubNoodle = [];
                off2 = off+noise(.333+i*data.var5)*.15;
                if(off2<0)
                    off2=0;
                if(off2>1)
                    off2=1;

                off3 = off+noise(.633+i*data.var5*.9)*.1;
                if(off3<0)
                    off3=0;
                if(off3>1)
                    off3=1;

                off4 = off+noise(.533+i*data.var5*.7)*.1;
                if(off4<0)
                    off4=0;
                if(off4>1)
                    off4=1;


                thisNoodle.push(spline1.getPointAt(off));
                // thisNoodle.push(spline1.getPointAt(off));
                // thisNoodle[1].y+=5;
                // thisNoodle[1].x+=Math.random()-.5;
                // thisNoodle[1].z+=Math.random()-.5;

                thisNoodle.push(spline2.getPointAt(off2));

                thisSpline = new THREE.SplineCurve3(thisNoodle);

                thisNoodler = [];

                for(var j = 0 ; j < 12 ; j++){
                    var vec = thisSpline.getPointAt(j/11);
                    if(j>0&&j<11){
                        vec.x+=Math.random()*.5;
                        vec.z+=Math.random()*.5;

                    }
                    thisNoodler.push(vec);
                }

                // thisNoodle.shift();
                // thisNoodle.shift();

                noodles.push(thisNoodler);


                thisSpline = new THREE.SplineCurve3(thisNoodler);

                thisSubNoodle = [];

                thisSubNoodle.push(thisSpline.getPointAt(off));
                thisSubNoodle.push(spline2.getPointAt(off3));

                thisSpline2 = new THREE.SplineCurve3(thisSubNoodle);

                thisSubNoodler = [];

                for(var j = 0 ; j < 5 ; j++){
                    var vec = thisSpline2.getPointAt(j/4);
                    if(j>0&&j<4)
                        vec.x+=Math.random()*.3;
                    thisSubNoodler.push(vec);
                }

                subnoodles.push(thisSubNoodler);




                thisSubNoodle = [];


                thisSubNoodle.push(thisSpline.getPointAt(off4));
                thisSubNoodle.push(spline1.getPointAt(off3));

                thisSpline2 = new THREE.SplineCurve3(thisSubNoodle);

                thisSubNoodler = [];

                for(var j = 0 ; j < 5 ; j++){
                    var vec = thisSpline2.getPointAt(j/4);

                    if(j>0&&j<4)
                        vec.x+=Math.random()*.3;
                    thisSubNoodler.push(vec);
                }

                subnoodles.push(thisSubNoodler);


                thisSubNoodle = [];


                thisSubNoodle.push(thisSpline.getPointAt(.5));
                thisSubNoodle.push(spline1.getPointAt(off4));

                thisSpline2 = new THREE.SplineCurve3(thisSubNoodle);

                thisSubNoodler = [];

                for(var j = 0 ; j < 7 ; j++){
                    var vec = thisSpline2.getPointAt(j/6);
                    var vec2 = thisSpline2.getPointAt(1);

                    if(j>0&&j<7)
                        vec.x+=Math.random()*.3;

                    if(j>3){
                        vec.x = vec2.x;
                    }
                    thisSubNoodler.push(vec);
                }

                subnoodles.push(thisSubNoodler);


                // subnoodles.push(thisSubNoodle);
                // console.log(thisNoodle);
                off=(.5+noise(i*data.var5*33)*.5+noise(i*data.var5));
                // console.log(off);
                if(off<0)
                    off=0;
                if(off>1)
                    off=1;

               
            }

            // console.log(noodles);

            // console.log(curve);
            // scene.add(tree.makeTubes());
            // holder.traverse(function(obj){if(obj.geometry){obj.geometry.vertices=[];obj.geometry.faces=[];obj.geometry.dispose();}});

            holder.add(tree.tubes(curve))
            holder.add(tree.tubes(noodles,{width:.5,lengthSegs:3}))
            holder.add(tree.tubes(subnoodles,{width:.3,lengthSegs:2}))

            // holder.remove(tree);
            varE=false;


            // preData = data.clone();
        }

        if( preData.var1!=data.var1||
            preData.var2!=data.var2||
            preData.var3!=data.var3||
            preData.var4!=data.var4||
            preData.var5!=data.var5||
            preData.var6!=data.var6||
            preData.var7!=data.var7)
            rebuild = true;
        else
            rebuild = false;



        preData=JSON.parse(JSON.stringify(data));
        
    }
}

function checkData(d1,d2){
    truthy = false;
    Object.keys(d1).forEach(function (key) {
        if(d1.key==d2.key)
            truthy=true;
    })
    return truthy;
}
function copyData(d1,d2){
    Object.keys(d2).forEach(function (key) {
        // console.log(key);
        d1.key=key;
        // console.log(d1);
    })
}
/*
        if(varE){
            curve = tree.worldPositionsArray(tree.report());

            var amt = curve[0].length;
            
            for(var i = 0 ; i < amt ; i++){
                curve[0].unshift(curve[1].shift());
            }
            curve.pop();
            console.log(curve);

            // curve2 = [];
            // curve2[0] = [];

            // for(var i = 0 ; i < curve[0].length ; i++){
            //     curve2[0][i] = curve[0][i].clone();
            //     curve2[0][i].y+=10;
            // }
            // curve.push(curve2);
            // scene.add(tree.makeTubes());
            scene.add(tree.tubes(curve));
            scene.remove(tree);
            varE=false;
        }
        */
TREE.prototype.generate2 = function(genome, parent){

    console.log(genome);
    //e.g. genome = {joints:[15,3,2],divs:[2,3,1],angles:[.78,.05,.03],rads:[2,1,1]}

    var parent = parent || this;

    var g = this.generateFixedParams(genome);
    g.jointFunc = genome.jointFunc;

    if(g.joints.length!=g.divs.length || g.joints.length!=g.angles.length || g.divs.length!=g.angles.length){
        alert("arrays must be the same length");
        return;
    }

    var tempRoot = new Joint(this.params);
    tempRoot.construct();
    tempRoot.name = "0";

    var numJoints = g.joints[0];

    console.log(g);

    for (var i = 0; i < g.rads[0]; i++) {

        //for offsetting
        var altLength = tempRoot.params.jointScale.clone();
        altLength.y = g.length[0];
        altLength.x = altLength.z = g.width[0];
        var root = this.branch(numJoints,tempRoot,{jointScale:altLength});

        root.rotator.rotation.z = g.angles[0];
        root.rotator.rotation.y = i * ((2*Math.PI)/g.rads[0]);
        this.recursiveBranch2(g,1,root);
        parent.add(root);
        parent.limbs.push(root);
    }

    this.makeDictionary();
}


TREE.prototype.recursiveBranch2 = function(genome,counter,joint){

    //helper for generate
    
    var g = genome;
    var end = g.end[counter];

    if(end==-1)
        end = joint.joints+1;

    var newBranch,kidJoint; 

    //loop through all the joints in the current branch
    for (var i = g.start[counter]; i < end; i+=g.divs[counter]) {
    
        //loop through the 'rads' - the number of branches from each joint
        for (var j = 0; j < g.rads[counter]; j++) {

            kidJoint = this.findJoint(joint,i);
            var altLength = kidJoint.params.jointScale.clone();
            altLength.y = g.length[counter];

            altLength.x = altLength.z = g.width[counter];

            console.log(g.jointFunc[counter](i));

            if(g.jointFunc)
                var numJoints = g.jointFunc[counter](i);
            else
                var numJoints = g.joints[counter];

            newBranch = this.branch(numJoints,kidJoint,{jointScale:altLength});

            newBranch.rotator.rotation.z = g.angles[counter];
            newBranch.rotator.rotation.y = j * ((2*Math.PI)/g.rads[counter]);
        }
        if(counter<g.joints.length){
            for (var k = 0; k < kidJoint.limbs.length; k++) {
                this.recursiveBranch2(genome,counter+1,kidJoint.limbs[k]);
            }
        }
    }
}

