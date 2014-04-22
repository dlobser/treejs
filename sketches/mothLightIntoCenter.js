sc1 = {
    
    setup:function(){

        gradMap = THREE.ImageUtils.loadTexture('assets/textures/particle.png');

        var geo = new THREE.PlaneGeometry(4000,4000,10,10);
        ball = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color:0xFFFFFF,transparent:true,opacity:1, map:gradMap,emissive:0xffeebb}));
        scene.add(ball);
        ball.rotation.x=-pi;

        var geo = new THREE.PlaneGeometry(1000,1000,10,10);
        ball2 = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({color:0xFFFFFF,transparent:true,opacity:1, map:gradMap,emissive:0xffffff}));
        ball.position.y=10;
        ball2.rotation.x=-pi;
        scene.add(ball2);


        noLights = true;

        mth = new gMoth();
        mth.construct();
        console.log(mth.children);
        // scene.add(mth);

        mth.position.x = 10;
        mth.position.y = 30;

        lgt = new THREE.PointLight(new THREE.Color(0x99eeff),2,1500);
        lgt.position.y=1500;
        lgt2 = new THREE.PointLight(new THREE.Color(0xff9900),2,3000);
        lgt2.position.y=3000;
        scene.add(lgt)
        scene.add(lgt2);
        
        // rift = true;

        mth.traverse(function(obj){

                if(obj.geometry){
                    var geo = obj.geometry;

                    for(var i = 0 ; i < geo.faces.length ; i++){
                        geo.faces[i].color.setRGB(
                            // (geo.vertices[geo.faces[i].a].y/20)+.5,
                            // (geo.vertices[geo.faces[i].a].y/20)+.35,
                            // (geo.vertices[geo.faces[i].a].y/20)+.1
                            (Math.random()/6)+.5 + (geo.vertices[geo.faces[i].a].y/200),
                            (Math.random()/6)+.45 + (geo.vertices[geo.faces[i].a].y/220),
                            (Math.random()/6)+.4
                        );
                    }
                }

                // if(obj.material && obj.geometry){
                //     if(obj.bones)
                //         obj.material = material;
                //     else
                //         obj.material = material2;
                // }
            }


        )

        moths = [];
        parents = [];
        parents2= [];

        for(var i = 0 ; i < 50 ; i++){
            parents[i] = new THREE.Object3D();
            parents2[i] = new THREE.Object3D();

            moths[i] = cloner(mth);
            parents[i].add(moths[i]);
            parents2[i].add(parents[i]);

            scene.add(parents2[i]);
            moths[i].position.z = 500;//(1.12-(Math.random()))*-2000;
            // moths[i].position.y = (Math.random()-.5)*1000;
            // moths[i].rotation.x = -pi;
            parents[i].position.z = 500;


        }

        webaudio = new WebAudio();
        sound = makeSound(new THREE.Vector3(),440);
        sound2 = makeSound(new THREE.Vector3(),880);
        sound3 = makeSound(new THREE.Vector3(),220);

        console.log(sound);

    },

    draw:function(time){

        sound.update(camera);
        speed = mouseX*50;
        // console.log(mth);
        sc = Math.sin(time*speed)+1;
        sc2 = Math.sin(time*speed*2)+1;
        ball.scale = new THREE.Vector3(sc,sc,sc);
        lgt2.intensity = sc;//ball.scale*10;
        lgt.intensity = sc2;

        // sound.position.z = 

        sc3 = Math.sin(time*speed*.5)+1;
        sc4 = Math.cos(.5*time*speed*2.3)+1;
        sound.dryGainNode.gain.value = sc*200;
        sound2.dryGainNode.gain.value = sc2*100;
        sound3.dryGainNode.gain.value = sc3*100;



        for(var i = 0 ; i < moths.length ; i++){

            // moths[i].rotation.x += Math.random()*.06;// = new THREE.Vector3(Math.random()*pi,Math.random()*pi,Math.random()*pi);
            // moths[i].rotation.y += Math.random()*.06;
            // moths[i].rotation.z += Math.random()*.06;

            // parents[i].rotation.y+=speed*(.5+(noise(i*.3)*.2))*-.01;

            parents2[i].rotation.y = ((i*pi*4)/50);
            parents[i].rotation.x -= speed*i*.001;//*(.5+(noise(i*.3)*.2))*-.01;

            moths[i].position.y = Math.cos(1+i+time*speed)*13;
            moths[i].p.ULWing.bones[1].rotation.y =     Math.cos(i+time*speed)*.5;
            moths[i].p.ULWing.bones[0].rotation.y =     Math.sin(i+time*speed);
            moths[i].p.URWing.bones[1].rotation.y =    -Math.cos(i+time*speed)*.5;
            moths[i].p.URWing.bones[0].rotation.y =    -Math.sin(i+time*speed);
            moths[i].p.LLWing.bones[1].rotation.y =( Math.cos(.2+i+time*speed)*.95)*.5;
            moths[i].p.LLWing.bones[0].rotation.y =( Math.sin(.2+i+time*speed)*.95)-.2;
            moths[i].p.LRWing.bones[1].rotation.y =(-Math.cos(.2+i+time*speed)*.95)*.5;
            moths[i].p.LRWing.bones[0].rotation.y =(-Math.sin(.2+i+time*speed)*.95)+.2;

            moths[i].p.body.bones[1].rotation.z = Math.sin(1+time*speed*2)*.1;
            moths[i].p.body.bones[1].rotation.x = Math.sin(time*speed)*.5;

        }

        // // mth.ULWing.position.y = omouseY*100;

        // mth.leg1.bones[1].rotation.z = omouseX*3;
        // mth.body.bones[1].rotation.z = omouseY*3;

        // rightAnt.bones[0].rotation.z = -omouseX*10;


    }
}

Head = {

    setup:function(){

        var head = new TREE();

        head.params.jointScale.y = 3;
        head.params.mat.vertexColors=THREE.FaceColors;

        
        head.generate({
            joints:[4,17],
            rads:[2,1],
            angles:[Math.PI/2],
            length:[2]
        })

        eye1 = sphere(5);
        eye2 = sphere(5);


        eye1.position.x = -.1*30;
        eye1.position.z = -.24*30;
        eye1.position.y = .43*5;
        eye1.scale = new THREE.Vector3(.69,.69,.69);

        eye2.position.x = .1*30;
        eye2.position.z = -.24*30;
        eye2.position.y = .43*5;
        eye2.scale = new THREE.Vector3(.69,.69,.69);

        head.add(eye1);
        head.add(eye2);

        head.passFunc(head.makeInfo([
            [0,-1,0],{length:1}]),
        head.setJointLength);

        head.passFunc(head.makeInfo([
            [0,-1,0],{amount:18,rz:-Math.PI/2},
            [0,-1,0],{amount:28,rz:-Math.PI/2},
            // [0,-1,2,0,3],{sc:5,amount:18,rz:-Math.PI/2},
        ]),head.appendBranch);
        
        headRoot = head.makeList([0,-1,0]);
        headRootLeft = head.makeList([0,0,-2]);
        headRootRight = head.makeList([0,1,-2]);

        //labial palps

        palpLeftRoot =      head.makeList([0,0,0,1,0]);
        palpLeftAll =       head.makeList([0,0,0,1,-2]);
        palpLeftBig =       head.makeList([0,0,0,1,12]);
        palpLeftSmall =     head.makeList([0,0,0,1,[15,17]]);

        palpRightRoot =     head.makeList([0,1,0,1,0]);
        palpRightAll =      head.makeList([0,1,0,1,-2]);
        palpRightBig =      head.makeList([0,1,0,1,12]);
        palpRightSmall =    head.makeList([0,1,0,1,[15,17]]);

        //proboscus

        probLeftRoot =      head.makeList([0,0,0,2,0]);
        probLeftAll =       head.makeList([0,0,0,2,-2]);
        probLeftBig =       head.makeList([0,0,0,2,12]);
        probLeftSmall =     head.makeList([0,0,0,2,[15,17]]);

        probRightRoot =     head.makeList([0,1,0,2,0]);
        probRightAll =      head.makeList([0,1,0,2,-2]);
        probRightBig =      head.makeList([0,1,0,2,12]);
        probRightSmall =    head.makeList([0,1,0,2,[15,17]]);

        //antennae [0,-1,2,0,3]

        // antLeftRoot =      head.makeList([0,0,2,0,0,0,0]);
        // antLeftAll =       head.makeList([0,0,2,0,0,0,-2]);
        // // antLeftBig =       head.makeList([0,0,0,1,12]);
        // // antLeftSmall =     head.makeList([0,0,0,1,[15,17]]);

        // antRightRoot =     head.makeList([0,1,2,0,0,0,0]);
        // antRightAll =      head.makeList([0,1,2,0,0,0,-2]);
        // antRightBig =      head.makeList([0,1,0,1,12]);
        // antRightSmall =    head.makeList([0,1,0,1,[15,17]]);


        headScalpLeftRoot = head.makeList([0,0,-1,0,0]);
        headScalpLeftAll =  head.makeList([0,0,-1,0,-2]);
        headScalpLeftBrow =  head.makeList([0,0,-1,0,[6,16]]);

        headScalpCenterLeftBrow =  head.makeList([0,0,0,0,[12,16]]);

        headScalpRightRoot = head.makeList([0,1,-1,0,0]);
        headScalpRightAll =  head.makeList([0,1,-1,0,-2]);
        headScalpRightBrow =  head.makeList([0,1,-1,0,[6,16]]);

        headScalpCenterRightBrow =  head.makeList([0,1,0,0,[12,16]]);

        head.rotation.x = -Math.PI;

        head.makeDictionary();
        console.log(head);

        return head;

    },

    draw:function(head,mult,args){

        var geepeeyou = false;

        if(count>20){
            geepeeyou = true;
        }

        if(!args) args = makeArgs();

        if(args.symmetry>0){
            args.leftAntRootrx  =  -args.rightAntRootrx;
            args.leftAntRootry  =  args.rightAntRootry;
            args.leftAntRootrz  =  args.rightAntRootrz;
            args.leftAntAllrx =    -args.rightAntAllrx;
            args.leftAntAllry =    -args.rightAntAllry;
            args.leftAntAllrz =    args.rightAntAllrz;
           
        }

        head.applyFunc([

            headRootLeft, {rx:-0.132*3,sc:.96},
            headRootRight, {rx:0.132*3,sc:.96},

            headScalpLeftAll, {rx:-.12*3},
            headScalpRightAll, {rx:.12*3},

            headScalpLeftAll,  {rz:-0.067*3,offMult:0.647,off:0.105*3,freq:-0.197,offsetter3:.0001},
            headScalpRightAll, {rz:-0.067*3,offMult:0.647,off:0.105*3,freq:-0.197,offsetter3:.0001},

            headScalpLeftBrow,  {ry:0.04*3,offMult:-0.089,freq:0.972,offsetter3:.0001,sc:0.972},
            headScalpRightBrow, {ry:-0.04*3,offMult:0.089,freq:0.972,offsetter3:.0001,sc:0.972},

            headScalpCenterRightBrow, {rz:-.3},
            headScalpCenterLeftBrow,  {rz:-.3},

            palpLeftRoot, {ry:.27*3},
            palpLeftAll,  {rx:-.01,jMult:.1,jFract:-.2},
            palpLeftBig,   {sc:1.5,rx:-.5},
            palpLeftSmall,  {sc:.75},

            palpRightRoot, {ry:-.27*3},
            palpRightAll,  {rx:.01,jMult:-.1,jFract:-.2},
            palpRightBig,   {sc:1.5,rx:.5},
            palpRightSmall,  {sc:.75},

            probLeftAll,    {sc:.97,rx:args.proballrx,jMult:.1,  jFract:.27},
            probRightAll,   {sc:.97,rx:-args.proballrx,jMult:-.1,jFract:.27},
            probLeftAll,    {ry: args.proballry,rz:args.proballrz},
            probRightAll,   {ry: args.proballry,rz:-args.proballrz},
            probLeftRoot,    {ry:( .005*10)+args.probrootry,tz:(-.37*20)+args.probrootrz,ty:(-.17*10)},
            probRightRoot,   {ry:(-.005*10)-args.probrootry,tz:( .37*20)-args.probrootrz,ty:(-.17*10)},

            // antLeftAll,      {rz:omouseX,nMult:-.4,nFreq:.17*3,sc:.95},
            // antLeftAll,      {rx:args.leftAntAllrx,ry:args.leftAntAllry,rz:args.leftAntAllrz,offsetter2:0.0001,sc:.95},
            // antLeftRoot,     {rx:args.leftAntRootrx,ry:args.leftAntRootry,rz:args.leftAntRootrz},

            // // antRightAll,      {rz:omouseX,nMult:-.4,nFreq:.17*3,sc:.95},
            // antRightAll,      {rx:args.rightAntAllrx,ry:args.rightAntAllry,rz:args.rightAntAllrz,offsetter2:0.0001,sc:.95},
            // antRightRoot,     {rx:args.rightAntRootrx,ry:-args.rightAntRootry,rz:args.rightAntRootrz},

        ],head.transform)

        // head.applyFunc([
        //     antRightAll,      {rx:0,rz:0,rz:0.0001,nMult:args.nmultRight,nFreq:args.nfreqRight,rotator:true,sc:.95},
        //     antLeftAll,       {rx:0,rz:0,rz:0.0001,nMult:args.nmultLeft,nFreq:args.nfreqLeft,rotator:true,sc:.95},

        // ],head.transform,geepeeyou)

      
    }
}

function makeArgs(){
  var args = {
        rootrx:0,
        rootry:0,
        rootrz:0,
        allrx:0,
        allry:0,
        allrz:0,
        veinsrx:0,
        veinsry:0,
        veinsrz:0,
        femur :0,
        tibia :0,
        utarsis:0,
        ltarsis:0,
        leftAntRootrx:0,
        leftAntRootry :0,
        leftAntRootrz :0,
        rightAntRootrx:0,
        rightAntRootry:0,
        rightAntRootrz:0,
        leftAntAllrx:0,
        leftAntAllry:0,
        leftAntAllrz:0,
        rightAntAllrx :0,
        rightAntAllry :0,
        rightAntAllrz :0,
        proballrx:0,
        proballry:0,
        proballrz:0,
        probrootrx :0,
        probrootry :0,
        probrootrz :0,
    }
    return args;
}

function weave(wng,args){

    obj = new THREE.Object3D();

    if(!args) args={};

    var lay = args.layer || 1;
    var xy = args.xy || 0;
    var zero = args.zero || .1;

    var divx = args.divx || 50;
    var divy = args.divy || 10;

    var tubeArgs = {lengthSegs:2,width:1,minWidth:1.5};
    if(args.tubeArgs) tubeArgs = args.tubeArgs;

    // console.log(args);

    if(!args.off) args.off={};


    var array = [];

    var pnts;

    var tempTree = new TREE();

    if(wng.limbs)
        pnts = wng.worldPositionsArray(wng.reportLayers()[lay]);
    else
        pnts = wng;
   
    for(var i = 0 ; i < pnts.length-1 ; i++){
        var pnts2 = [];
        pnts2.push(pnts[i]);
        pnts2.push(pnts[i+1]);

        var ngeo = tempTree.nurbsishSurface(pnts2,divx,divy);
       
        surf = tempTree.removeZeroLength(ngeo[xy],zero);

        args.off.parentI = i;
      
        surf = tempTree.insertLerpVerts(surf,args.off);

        var tubeGeo = tempTree.tubes(surf,tubeArgs);
        
        obj.add(tubeGeo);

    }

    return obj;
}

function skin(geo,_dir,_low,_high){

    low = _low || 10;
    high = _high || 20;
    dir = _dir || "Y";

    // var geo = new THREE.BoxGeometry(10,20,10,100,100,100);

    var material = new THREE.MeshLambertMaterial({color:0xffffff,skinning:true});
    material.vertexColors=THREE.FaceColors;


    geo.skinIndices = [];
    geo.skinWeights = [];

    for(var i = 0 ; i < geo.vertices.length ; i++){

        if(dir=="Y")
            q = (low+geo.vertices[i].y)/high;
        else if(dir=="X")
            q = (low+geo.vertices[i].x)/high;
        else if(dir=="Z")
            q = (low+geo.vertices[i].z)/high;

        g = -q+1;

        geo.skinIndices.push( new THREE.Vector4(1,0,0,0 ));
        geo.skinWeights.push( new THREE.Vector4(q,g,0,0 ));

    }

    geo.computeVertexNormals();

    geo.bones = [];

    var bone = {};

    bone.name="root";
    bone.pos = [0,0,0];
    bone.rot = [0,0,0];
    bone.scl = [1,1,1];
    bone.rotq = [0,0,0,1];
    bone.parent = -1;

    geo.bones.push(bone);

    var bone = {};

    bone.name="tip";
    bone.pos = [0,0,0];
    bone.rot = [0,0,0];
    bone.scl = [1,1,1];
    bone.rotq = [0,0,0,1];
    bone.parent = 0;

    geo.bones.push(bone);

    return new THREE.SkinnedMesh(geo,material,false);
}

function cloner(obj){

    var returner;

    returner = mth.clone();
    returner.p = {};
    returner.p.ULWing = returner.children[0];
    returner.p.URWing = returner.children[1];
    returner.p.LLWing = returner.children[2];
    returner.p.LRWing = returner.children[3];
    returner.p.legs = [];

    for(var j = 0 ; j < 6 ; j++){
        returner.p.legs[j] = returner.children[j+4];
    }
    returner.p.body = returner.children[10];
    returner.p.head = returner.children[11];
    returner.p.leftAnt =  returner.children[11].children[16];
    returner.p.rightAnt = returner.children[11].children[17];

  
    returner.p.rightAnt.bones[0].rotation.x = 1;
    returner.p.rightAnt.bones[0].position.x = 2;


    for(var j = 1 ; j < returner.p.rightAnt.bones.length ; j++){
        returner.p.rightAnt.bones[j].rotation.x = .1;
        returner.p.rightAnt.bones[j].scale = new THREE.Vector3(.9,.9,.9);
    }

    returner.p.leftAnt.bones[0].rotation.x = 1;
    returner.p.leftAnt.bones[0].position.x = -2;


    for(var j = 1 ; j <  returner.p.rightAnt.bones.length ; j++){
         returner.p.leftAnt.bones[j].rotation.x = .1;
         returner.p.leftAnt.bones[j].scale = new THREE.Vector3(.9,.9,.9);
    }

    return returner;
}

function makeSound(vec,tone){
    var tn = tone || Math.random()*400+200;
    boing   = webaudio.createSound();
    boing.tone(tone,30);
    obj = new THREE.AudioObject(boing);
    obj.position = vec;
    return obj;
}

Wing = {

    setup:function(){

        var wing = new TREE();


        wing.branch(4);
                
        wingRootAll = wing.makeList([0,0,-1]);
        wingRootRoot = wing.makeList([0,0,0]);

        wing.passFunc([
            wingRootAll,{amount:10,sc:10,rz:Math.PI/2},
            wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],wing.appendBranch);

        wingVeins2 =             wing.makeList([0,0,1,1,7]);
        wingVeins2bb =           wing.makeList([0,0,1,[0,1],-2]);
        wingVeins2bbo =          wing.makeList([0,0,1,[0,1],0]);

        wingVeins1 =             wing.makeList([0,0,2,1,4]);
        wingVeins1b =            wing.makeList([0,0,2,[0,1],-2]);
        wingVeins1bo =           wing.makeList([0,0,2,[0,1],0]);
        wingVeins1bos =          wing.makeList([0,0,2,0,[5,9]]);
        wingVeins1boso =         wing.makeList([0,0,2,0,4]);

        wingVeins2b =            wing.makeList([0,0,[1,2],1,-2]);

        //costal veins      
        wingVeins3 =             wing.makeList([0,0,3,0,0]);//costal
        wingVeins3b =            wing.makeList([0,0,3,1,0]);//costal
        wingVeins3bo =           wing.makeList([0,0,3,0,[6,9]]);//costal
        wingVeinsCostal =        wing.makeList([0,0,3,[0,1],-2]);//costal

        //jugum vein offset
        wingVeins4 =             wing.makeList([0,0,0,1,2]);
        wingVeins4o =            wing.makeList([0,0,0,1,[3,9]]);
     
        wingVeinsJugum =         wing.makeList([0,0,0,[0,1],[1,4]]);
        wingVeinsJugumBase =     wing.makeList([0,0,0,[0,1],0]);
        wingVeinsJugumBase2 =    wing.makeList([0,0,0,0,0]);

        wingVeinsAll = wing.makeList([0,0,-1,-1,-2]);

        wing.makeDictionary();

        return wing;

    },

    draw:function(wing,mult,args){

        if(!args) var args = makeArgs();

        wing.rotation.z=mult*.5;

        wing.applyFunc([
            wingVeinsAll,           {rx:args.veinsrx,ry:args.veinsry,rz:args.veinsrz},
            wingRootRoot,           {rx:args.rootrx,ry:args.rootry,rz:args.rootrz},
            wingRootAll,            {rz: (-mult*.18)+args.allrz, rx:args.allrx, ry:args.allry},
            wingVeins1b,            {rz: mult*.065},
            wingVeins1bo,           {rz: mult*1.4},
            wingVeins1bos,          {rz: -mult*.08},
            wingVeins1,             {rz: -mult*(.2*.25), },
            wingVeins2bb,           {rz:  mult*.04},
            wingVeins2bbo,          {sc:.915,rz:mult*(1+.21*2)},
            wingVeins2,             {sc:.579*2,rz:  mult*-.2},
            wingVeins1boso,         {rz: mult*.4},
            wingVeins3,             {sc:.98, rz:mult*.529*3},
            wingVeins3b,            {sc:.96, rz:mult*.52*3},
            wingVeinsCostal,        {rz:mult*.04},
            wingVeinsJugum,         {rz:mult*-.075},
            wingVeins4o,            {rz:mult*.058},
            wingVeins4,             {rz:mult*(.048-.5)},
            wingVeinsJugumBase,     {sc:.9,rz: mult*1.734},    
            wingVeinsJugumBase2,    {sc:.845-.02,rz: mult*1.734},      
            wingVeins3bo,           {sc:1.01,rz:  mult*.062},
            wingRootRoot,           {rx:args.rootrx,ry:args.rootry,rz:args.rootrz},


        ],wing.transform)

        wing.applyFunc([
        ],wing.transform)


    }
}

Leg = {

    setup:function(){

        var leg = new TREE();

        leg.params.jointScale.y=5;
        
        leg.branch(18);
                
        trochanter = leg.makeList([0,0,[0,1]]);
        femur = leg.makeList([0,0,[2,5]]);
        tibia = leg.makeList([0,0,[6,9]]);
        utarsis = leg.makeList([0,0,[10,13]]);
        ltarsis = leg.makeList([0,0,[14,17]]);

        lParts = {};

        for(var i = 0 ; i < 18 ; i++){
            lParts[i] = leg.makeList([0,0,i]);
        }

        leg.passFunc([ltarsis,{length:10},],leg.setJointLength);

        leg.passFunc([
            ltarsis,{amount:5,sc:2,rz:.2},
            ltarsis,{amount:5,sc:2,rz:-.2},
        ],leg.appendBranch);

        leg.passFunc([
            lParts[0],     {length:1},
            lParts[1],  {length:1},
        ],leg.setJointLength);

        tarsishairLeft =        leg.makeList([0,0,-1,0,-2]);
        tarsishairRight =        leg.makeList([0,0,-1,1,-2]);

        return leg;

    },

    draw:function(leg,mult,args){

        if(!args) args = makeArgs();
        la = args.rootrx;

        leg.passFunc([
            lParts[0], {sc:8, rz:args.rootrz,rx:mult*args.rootrx,ry:mult*args.rootry},
            lParts[1], {sc:.5,rz:args.rootrz*.2,rx:mult*args.rootrx*.2,ry:mult*args.rootry*.2},
            lParts[2], {sc:.5,rz:args.femur},
            lParts[3], {sc:1.5,rz:-args.femur*.1},
            lParts[4], {sc:.75,rz:-args.femur*.1},
            lParts[5], {sc:.75,rz:-args.femur*.1},

            lParts[6],   {sc:1,rz:args.tibia*2.8},
            lParts[7], {sc:1.5,rz:args.tibia*.05},
            lParts[8], {sc:.75,rz:args.tibia*.05},
            lParts[9], {sc:.75,rz:args.tibia*.05},

            lParts[10],   {sc:1,rz:args.utarsis*2.9},
            lParts[11], {sc:1.5,rz:args.utarsis*.1},
            lParts[12], {sc:.75,rz:args.utarsis*.1},
            lParts[13], {sc:.75,rz:args.utarsis*.1},

            lParts[14],   {sc:1,rz:args.ltarsis*.2},
            lParts[15], {sc:1.5,rz:args.ltarsis*.2},
            lParts[16], {sc:.75,rz:args.ltarsis*.2},
            lParts[17], {sc:.75,rz:args.ltarsis*.4},

            tarsishairLeft,  {sc:.8,rz:.2},
            tarsishairRight,  {sc:.8,rz:-.2},

        ],leg.transform);

    }
}

LowerWing = {

    setup:function(){

        var wing = new TREE();


        wing.branch(4);
                
        wingRootMiddle = wing.makeList([0,0,[1,2]]);
        wingRootAll = wing.makeList([0,0,-1]);
        wingRoot00 = wing.makeList([0,0,0]);
        wingRoot30 = wing.makeList([0,0,3]);

        wing.passFunc([
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRoot00,{amount:10,sc:8,rz:Math.PI/2},
            wingRoot30,{amount:10,sc:10,rz:Math.PI/2},

        ],wing.appendBranch);

        rootMiddleRootsAll =    wing.makeList([0,0,[1,2],[0,2],-2]);
        rootRootsAll =          wing.makeList([0,0,-1,-1,0]);
        allVeins =              wing.makeList([0,0,-1,-1,-2]);

        root1limbsall =         wing.makeList([0,0,1,[0,2],-2]);
        root1limbsallbase =     wing.makeList([0,0,1,[0,2],0]);

        root1limb0all =         wing.makeList([0,0,1,0,-2]);
        root1limb0base =        wing.makeList([0,0,1,0,0]);
        root1limb03 =           wing.makeList([0,0,1,0,3]);
        root1limb03up =         wing.makeList([0,0,1,0,[4,9]]);
        root1limb07 =           wing.makeList([0,0,1,0,6]);
        root1limb07up =         wing.makeList([0,0,1,0,[7,9]]);

        root1limb1all =         wing.makeList([0,0,1,1,-2]);
        root1limb1base =        wing.makeList([0,0,1,1,0]);
        root1limb13 =           wing.makeList([0,0,1,1,3]);
        root1limb13up =         wing.makeList([0,0,1,1,[4,9]]);

        root1limb2all =         wing.makeList([0,0,1,2,-2]);
        root1limb27 =           wing.makeList([0,0,1,2,6]);
        root1limb27up =         wing.makeList([0,0,1,2,[7,9]]);
        root1limb23 =           wing.makeList([0,0,1,2,3]);
        root1limb23up =         wing.makeList([0,0,1,2,[4,9]]);

        root2limbsall =         wing.makeList([0,0,2,[0,2],-2]);
        root2limbsallbase =     wing.makeList([0,0,2,[0,2],0]);

        root2limb0all =         wing.makeList([0,0,2,0,-2]);
        root2limb0base =        wing.makeList([0,0,2,0,0]);
        root2limb03 =           wing.makeList([0,0,2,0,3]);
        root2limb03up =         wing.makeList([0,0,2,0,[4,9]]);
        root2limb07 =           wing.makeList([0,0,2,0,6]);
        root2limb07up =         wing.makeList([0,0,2,0,[7,9]]);

        root2limb1all =         wing.makeList([0,0,2,1,-2]);
        root2limb1base =        wing.makeList([0,0,2,1,0]);
        root2limb13 =           wing.makeList([0,0,2,1,3]);
        root2limb13up =         wing.makeList([0,0,2,1,[4,9]]);

        root2limb2all =         wing.makeList([0,0,2,2,-2]);
        root2limb27 =           wing.makeList([0,0,2,2,6]);
        root2limb27up =         wing.makeList([0,0,2,2,[7,9]]);
        root2limb23 =           wing.makeList([0,0,2,2,3]);
        root2limb23up =         wing.makeList([0,0,2,2,[4,9]]);

        root1limb0all =         wing.makeList([0,0,1,0,-2]);
        root1limb0base =        wing.makeList([0,0,1,0,0]);
        root1limb03 =           wing.makeList([0,0,1,0,3]);

        root0root =             wing.makeList([0,0,0,0,0]);
        root3root =             wing.makeList([0,0,3,0,0]);
        root0all =              wing.makeList([0,0,0,0,-2]);
        root3all =              wing.makeList([0,0,3,0,-2]);

        root0root3 =             wing.makeList([0,0,0,0,[2,4]]);
        root0root7 =             wing.makeList([0,0,0,0,[5,7]]);

        root3root3 =             wing.makeList([0,0,3,0,[2,3]]);
        root3root7 =             wing.makeList([0,0,3,0,[6,9]]);

        wingRootRoot =          wing.makeList([0,0,0]);
       

        wing.makeDictionary();


        return wing;

    },

    draw:function(wing,mult,args){


        if(!args) var args = makeArgs();

        wing.rotation.z=(mult*(-.327+2));
        // wing.position.y = -.023*100;


        wing.applyFunc([

            rootRootsAll,         {rz:mult*(Math.PI/2+args.allrz)},
            allVeins,             {rx:args.veinsrx,ry:args.veinsry,rz:args.veinsrz},

            wingRootAll,          {rz: -mult*(.365+args.allrz), rx:args.allrx,ry:args.allry,sc:1.05},
            root0all,             {sc:0.018+1,rz:-mult*.022},
            root3all,             {sc:-0.024+1,rz:mult*.03},

            root1limbsall,        {rz:mult*-.02*2},
            root1limbsallbase,    {rz:mult*(.36*2+1)},
            root1limb07,          {sc:-0.046+1,rz:mult*0.517},
            root1limb07up,        {rz:mult*-.17},
  
  
            root1limb23,          {sc:0.062+1,rz:mult*-0.544},
            root1limb23up,        {rz:mult*0.067},

            root2limbsall,        {rz:mult*(.04)},
            root2limbsallbase,    {sc:0.495*2,rz:mult*(1+.4)},
            root2limb03,          {rz:mult*0.343},
            root2limb03up,        {rz:mult*-0.002},
            root2limb1all,         {sc:1.01},
  
            root2limb27,          {sc:0.56*2,rz:mult*-0.371},
            root2limb27up,        {rz:mult*0.148},
            wingRoot00,           {sc:.76,rx:args.rootrx,ry:args.rootry,rz:(-mult*.22)+args.rootrz},
            root0root3,          {rz:mult*.02,sc:1.01},
            root0root7,          {rz:-mult*.12,sc:1.01},
            root3root3,          {rz:mult*.01,sc:.98},
            root3root7,          {rz:-mult*-.13,sc:.98},


        ],wing.transform)

        wing.applyFunc([
        ],wing.transform)


    }
}

Body = {

    setup:function(){

        var body = new TREE();

        body.params.jointScale.y=5;
        
        body.branch(8);

        body.params.jointScale.y=7;

        body.branch(12);

        bodyThorax = body.makeList([0,1,0]);

        bodyThoraxAll =  body.makeList([0,1,-2]);
        bodyThoraxRoot = body.makeList([0,1,0]);
        bodyThoraxTip = body.makeList([0,1,-3]);


        bodyAbdomenAll = body.makeList([0,0,-2]);
        bodyAbdomenRoot = body.makeList([0,0,0]);


        bodySpineAll = body.makeList([0,-1,-1]);

        bodySpineConnectors = body.makeList([0,0,[1,4]]);


        body.passFunc([
            bodySpineAll,{amount:5,sc:3,rz:Math.PI/2},
            bodySpineConnectors,{amount:6,sc:3.2,rz:-Math.PI/2},
            bodySpineConnectors,{amount:6,sc:3.2,rz:Math.PI/2},
        ],body.appendBranch);

        bodyVertAll = body.makeList([0,-1,-1,0,-3]);


        body.passFunc([
            bodyVertAll,{amount:10,sc:5,rz:Math.PI/2},
            bodyVertAll,{amount:10,sc:5,rz:Math.PI/2},
        ],body.appendBranch);

        body.passFunc([
            bodyThorax,{rz:Math.PI},
        ],body.transform);

        upperVertsRoot = body.makeList([0,0,-1,0,0]);
        upperVertsAll =  body.makeList([0,0,-1,0,-2]);

        lowerVertsRoot = body.makeList([0,1,-1,0,0]);
        lowerVertsAll =  body.makeList([0,1,-1,0,-2]);

        connectorTips = body.makeList([0,0,[1,4],[1,2],-3]);

        body.tips = [];

        body.passFunc([
            connectorTips,{}
        ],function(obj,args){body.tips.push(obj)})

        neck = body.makeList([0,0,-3]);

        body.passFunc([
            neck,{}
        ],function(obj,args){body.neck = obj})

        connectorsLeftRoot =  body.makeList([0,0,[1,4],1,0]);
        connectorsLeftAll =   body.makeList([0,0,[1,4],1,-2]);
        connectorsRightRoot = body.makeList([0,0,[1,4],2,0]);
        connectorsRightAll =  body.makeList([0,0,[1,4],2,-2]);

        connectorsLeftWingRoot =  body.makeList([0,0,2,2,0]);
        connectorsRightWingRoot = body.makeList([0,0,2,1,0]);
        connectorsLeftWingAll =   body.makeList([0,0,2,2,-2]);
        connectorsRightWingAll =  body.makeList([0,0,2,1,-2]);

        connectorsLeftBackLegAll =   body.makeList([0,0,1,2,-2]);
        connectorsRightBackLegAll =  body.makeList([0,0,1,1,-2]);

        body.passFunc([connectorsRightWingAll,{length:3.7}],body.setJointLength);
        body.passFunc([connectorsLeftWingAll,{length:3.7}],body.setJointLength);
        body.passFunc([connectorsLeftBackLegAll,{length:4.3}],body.setJointLength);
        body.passFunc([connectorsRightBackLegAll,{length:4.3}],body.setJointLength);

        upperRibsLeftAll =      body.makeList([0,0,-1,-1,-1,0,-2]);
        upperRibsLeftRoot =     body.makeList([0,0,-1,-1,-1,0,0]);
        upperRibsRightAll =     body.makeList([0,0,-1,-1,-1,1,-2]);
        upperRibsRightRoot =    body.makeList([0,0,-1,-1,-1,1,0]);

        body.upperRibsLeft = [];
        body.upperRibsRight = [];
        body.lowerRibsLeft = [];
        body.lowerRibsRight = [];

        lowerRibsLeftAll =      body.makeList([0,1,-1,-1,-1,0,-2]);
        lowerRibsLeftRoot =     body.makeList([0,1,-1,-1,-1,0,0]);
        lowerRibsRightAll =     body.makeList([0,1,-1,-1,-1,1,-2]);
        lowerRibsRightRoot =    body.makeList([0,1,-1,-1,-1,1,0]);

        body.passFunc([lowerRibsLeftRoot,{}],function(obj,args) {body.upperRibsLeft.push(obj)})
        body.passFunc([lowerRibsRightRoot,{}],function(obj,args){body.upperRibsRight.push(obj)})
        body.passFunc([upperRibsLeftRoot,{}],function(obj,args) {body.upperRibsLeft.unshift(obj)})
        body.passFunc([upperRibsRightRoot,{}],function(obj,args){body.upperRibsRight.unshift(obj)})


        body.makeDictionary();

         body.passFunc([
            bodyThoraxRoot,{length:3},
            bodyThoraxAll,{length:10}, 
            bodyAbdomenRoot,{length:3},
        ],body.setJointLength);

        return body;

    },

    draw:function(body, mult, args){

        body.applyFunc([

            bodyThoraxAll,       {ry:args.allry,rx:args.allrx,rz:args.allrz},
        
            upperVertsRoot,      {rz:Math.PI,rx:-Math.PI/2},
            lowerVertsRoot,      {rz:Math.PI,rx:-Math.PI/2},

            // upperVertsAll,         {rx:data.var2,offMult:data.var3,freq:data.var4,off:data.var5*3},
            upperVertsAll,       {rx:0.018,offMult:0.062,freq:0.69,off:-0.067*3},
            // lowerVertsAll,         {rx:data.var2,offMult:data.var3,freq:data.var4,off:data.var5*3},
            lowerVertsAll,       {rx:0,offMult:-0.111,freq:-0.436,off:0.04*3},


            upperRibsLeftAll,    {rx:-mult*.35},
            upperRibsRightAll,   {rx: mult*.35},
            upperRibsLeftRoot,   {ry: mult*(-Math.PI/2+ -.53)*3, rx:-Math.PI/2 },//offScale:.625,offScaleMult:.265},
            upperRibsRightRoot,  {ry:-mult*(Math.PI/2+-.53)*3,rx:-Math.PI/2},//offScale:.625,offScaleMult:.265},

            upperRibsLeftAll,    {ry:mult*0.039,offMult:0.082,freq:-mult*0*.3,off:data.var5*3,offsetter4:-mult*0.169*.1},
            upperRibsRightAll,   {ry:-mult*0.039,offMult:0.082,freq:0*3,off:-data.var5*3,offsetter4:0.169*.1},

            // upperRibsLeftAll,    {ry:mult*data.var2,offMult:data.var3,freq:-mult*data.var4*.3,off:data.var5*3,offsetter4:-mult*data.var6*.1},
            // upperRibsRightAll,   {ry:-mult*data.var2,offMult:data.var3,freq:data.var4*3,off:-data.var5*3,offsetter4:data.var6*.1},

            // upperRibsLeftAll,    {ry:mult*-.05},
            // upperRibsRightAll,   {ry:-mult*-.05},

            lowerRibsLeftAll,    {ry:-mult*data.var2,rx:mult*.34},
            lowerRibsRightAll,   {rx:-mult*.34},

            // lowerRibsLeftAll,    {ry:mult*data.var2,offMult:-mult*data.var3,freq:data.var4*3,off:data.var5*3,offsetter4:-mult*data.var6*.01},
            // lowerRibsRightAll,   {ry:-mult*data.var2,offMult:data.var3,freq:data.var4*3,off:data.var5*3,offsetter4:data.var6*.01},

            lowerRibsLeftAll,    {ry:mult*0,offMult:-mult*-0.046,freq:0.083*3,off:0.062*3,offsetter4:-mult*1*.01},
            lowerRibsRightAll,   {ry:-mult*0,offMult:-0.046,freq:0.083*3,off:0.062*3,offsetter4:1*.01},


            // lowerRibsRightAll,   {ry:-mult*-0.024,offMult:0.343,freq:0.018*3,off:-0.176*3,offsetter4:data.var6},

            lowerRibsLeftRoot,   {ry:mult*(Math.PI/2+ -.51)*3,rx:-Math.PI/2},
            lowerRibsRightRoot,  {ry:-mult*(-Math.PI/2+ -.51)*3,rx:-Math.PI/2},

            bodyThoraxRoot,     {sc:.8},
            // bodyThoraxAll,        {sinScale:data.var1,sinScaleMult:data.var2,sinOff:data.var3*9},    
            bodyThoraxAll,        {sinScale:-0.197,sinScaleMult:0.148,sinOff:0.755*9},

            // bodyAbdomenRoot,    {sc:data.var4},
            // bodyAbdomenAll,     {sinScale:data.var1,sinScaleMult:data.var2,sinOff:data.var3*9},
            bodyAbdomenRoot,    {sc:0.885},
            bodyAbdomenAll,     {rx:args.rootrx,ry:args.rootry,rz:args.rootrz,sc:.94,sinScale:0.582,sinScaleMult:0.192,sinOff:0.127*9},
            // bodyAbdomenAll,     {sinScale:-0.067,sinScaleMult:0.755,sinOff:-0.002*9},
            // upperVertsRoot,     {sc:data.var4,offScale:data.var1,offScaleMult:data.var2,offScaleOff:data.var3*9}
            // upperVertsRoot,     {sc:0.3,offScale:0.343,offScaleMult:0.907,offScaleOff:0.148*9}

            // connectorsLeftRoot, {ry:.47*3},
            // connectorsLeftAll,  {rx:.37},
            // connectorsRightRoot,{ry:-mult*.47*3},
            // connectorsRightAll, {rx:.37},

            connectorsLeftRoot, {ry:.44*5},
            connectorsLeftAll,  {rx:.28*2},
            connectorsRightRoot,{ry:-mult*.44*5},
            connectorsRightAll, {rx:.28*2},

            connectorsLeftWingRoot, {rz:.2+Math.PI/2,ry:-mult*.18*3},
            connectorsLeftWingAll, {rx:-mult*-.11*3},
            connectorsRightWingRoot,{rz:-.2-Math.PI/2,ry:mult*.18*3},
            connectorsRightWingAll, {rx:-mult*-.11*3},

            bodyThoraxTip,  {sc:.7},
            // connectorsRightWingRoot, {ry:mult},



        ],body.transform);

    }
}

var gMoth = function(params){

    THREE.Object3D.call(this);
    this.params = params;

    this.limbs = [];
    this.parts = [];
    this.nameArray = [];
}

gMoth.prototype = Object.create(THREE.Object3D.prototype);

gMoth.prototype.construct = function(){

    this.p = {};


    //////////Upper wing

    ULWing = Wing.setup();
    ULWingArgs = makeArgs();
    Wing.draw(ULWing,1);
    ULWing.rotation.z = .3;
    // this.add(ULWing);

    uLWing = ULWing.makeTubes({lengthSegs:1,widthSegs:4,minWidth:.5,func:
                    function(t){return Math.sin(t/2)}});

    uLWingWeave = weave(ULWing,{divx:24,divy:2,zero:4,off:{skip:true},tubeArgs:{lengthSegs:3,widthSegs:4,minWidth:.2,width:.5,
        func:function(t){return Math.sin(t*2)}
    }});

    // console.log(uLWingWeave);

    // this.add(uLWingWeave);

    empty = new THREE.Geometry();
    uLWing.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});
    uLWingWeave.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});

    wingGeo = skin(empty,"X",0,-200);

    this.add(wingGeo);

    this.p.ULWing = wingGeo;
    this.p.URWing = wingGeo.clone();

    this.add(this.p.URWing);

    this.p.URWing.rotation.y=pi*2;



     //////////Lower wing

    LLWing = LowerWing.setup();
    LLWingArgs = makeArgs();
    LowerWing.draw(LLWing,1);
    // LLWing.rotation.z = 1;

    // this.add(ULWing);

    lLWing = LLWing.makeTubes({lengthSegs:1,widthSegs:4,minWidth:.5,func:
                    function(t){return Math.sin(t/2)}});

    lLWingWeave = weave(LLWing,{divx:8,divy:2,zero:4,off:{skip:true},tubeArgs:{lengthSegs:3,widthSegs:4,minWidth:.2,width:.5,
        func:function(t){return Math.sin(t*2)}
    }});

    empty = new THREE.Geometry();
    lLWing.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});
    lLWingWeave.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});

    wingGeo = skin(empty,"X",0,-200);

    this.add(wingGeo);

    this.p.LLWing = wingGeo;
    this.p.LRWing = wingGeo.clone();

    this.add(this.p.LRWing);

    this.p.LRWing.rotation.y=pi*2;



    ///////////Leg

    leg = Leg.setup();
    legArgs = makeArgs();

    legArgs.rootrz = pi;
    legArgs.femur = -2.5;
    legArgs.tibia = .8;
    legArgs.utarsis = -.3;
    legArgs.ltarsis = -.5;

    Leg.draw(leg,1,legArgs);

    Lg = leg.makeTubes({width:1,minWidth:0});

    empty = new THREE.Geometry();
    Lg.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});

    legGeo = skin(empty,"X",0,-200);

    this.p.legs = [];

    for(var i = 0 ; i < 6 ; i++){
        this.p.legs[i] = legGeo.clone();
        this.add(this.p.legs[i]);
        if(i>2){
            this.p.legs[i].rotation.y=pi*2;
        }
    }
  

    ///////////Body


    body = Body.setup();
    bodyArgs = makeArgs();


    Body.draw(body,1,bodyArgs);

        var bod =  body.worldPositionsArray(body.upperRibsLeft);
        var bod2 = body.worldPositionsArray(body.upperRibsRight);
        var bod3 = body.worldPositionsArray(body.lowerRibsLeft);
        var bod4 = body.worldPositionsArray(body.lowerRibsRight);

        var ob = {zero:1,xy:0,divx:10,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:1,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:-4,tipLength:4,tipPoint:0.01},
        tubeArgs:{lengthSegs:3,widthSegs:3,minWidth:0.01,width:1}};
        var ob2 = {zero:1,xy:0,divx:10,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:1,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:4,tipLength:4,tipPoint:0.01},
        tubeArgs:{lengthSegs:3,widthSegs:3,minWidth:0.01,width:1}};

        leftBod = (weave(bod,ob));
        rightBod = (weave(bod2,ob2));



    // Bod = body.makeTubes({width:1,minWidth:0});

    empty = new THREE.Geometry();
    leftBod.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});
    rightBod.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});



    bodGeo = skin(empty,"Y",0,-200);

    for(var i = 0 ; i < empty.vertices.length ; i++){
        if(empty.vertices[i].y>0){
            empty.skinWeights[i].x = 0;
            empty.skinWeights[i].y = 1;
        }

        // geo.skinIndices.push( new THREE.Vector4(1,0,0,0 ));
        // geo.skinWeights.push( new THREE.Vector4(q,g,0,0 ));

    }

    this.p.body = bodGeo;
    // this.leg1 = legGeo;
    this.add(bodGeo);

    // console.log(leg);





    ant = new TREE();
    ant.params.jointScale.y=8;

    ant.branch(10);

    // ant.passFunc(ant.makeInfo([
    //     [0,0,-1],{sc:.9}
    // ]),ant.transform);

    ant.makeDictionary();

    leftAnt = ant.makeSkinnedGeo();
    leftAnt.material.vertexColors=THREE.FaceColors;

    rightAnt = leftAnt.clone();

    leftAnt.bones[0].position.x = -.08*30;
    leftAnt.bones[0].position.z = .146*30;
    leftAnt.bones[0].position.y = .1*30;

    rightAnt.bones[0].position.x = .08*30;
    rightAnt.bones[0].position.z = .146*30;
    rightAnt.bones[0].position.y = .1*30;

    rightAnt.bones[0].rotation.x = 1;

    for(var i = 1 ; i < rightAnt.bones.length ; i++){
        rightAnt.bones[i].rotation.x = .1;
        rightAnt.bones[i].scale = new THREE.Vector3(.9,.9,.9);
    }

    leftAnt.bones[0].rotation.x = 1;

    for(var i = 1 ; i < rightAnt.bones.length ; i++){
        leftAnt.bones[i].rotation.x = .1;
        leftAnt.bones[i].scale = new THREE.Vector3(.9,.9,.9);
    }

    
    head = Head.setup();
    headArgs = makeArgs();
    Head.draw(head,1,headArgs);

    tubeHead = head.makeTubes();
    // scene.add(tubeHead);
    eye1 = sphere(5);
    eye2 = sphere(5);

    eyeMat = new THREE.MeshPhongMaterial({color:0x222222});
    eye1.material = eyeMat;
    eye2.material = eyeMat;

    eye1.position.x = .1*30;
    eye1.position.z = .24*30;
    eye1.position.y = -.43*5;
    eye1.scale = new THREE.Vector3(.69,.69,.69);

    eye2.position.x = -.1*30;
    eye2.position.z = .23*30;
    eye2.position.y = -.43*5;

    eye2.scale = new THREE.Vector3(.69,.69,.69);
    tubeHead.add(eye1);
    tubeHead.add(eye2);
    tubeHead.add(leftAnt);
    tubeHead.add(rightAnt);

    this.p.head=tubeHead;
    this.p.leftAnt = leftAnt;
    this.p.rightAnt = rightAnt;

    this.add(tubeHead);

    this.p.body.scale = new THREE.Vector3(.65,.65,.65);
    this.p.ULWing.position.x=-.11*100;
    this.p.ULWing.position.y=.08*100;
    this.p.ULWing.position.z=3;
    this.p.LLWing.position.x=-.11*100;
    this.p.LLWing.position.y=.08*100;
    this.p.LLWing.rotation.z=.18*-1;

    this.p.LLWing.scale = new THREE.Vector3(.9,.9,.9);

    this.p.URWing.position.x=.11*100;
    this.p.URWing.position.y=.08*100;
    this.p.URWing.position.z=3;

    this.p.LRWing.position.x=.11*100;
    this.p.LRWing.position.y=.08*100;
    this.p.LRWing.rotation.z=.18*-1;

    this.p.LRWing.scale = new THREE.Vector3(.9,.9,.9);

    this.p.head.rotation.y=pi*2;
    this.p.head.rotation.x=pi;

    this.p.head.scale = new THREE.Vector3(.8,.8,.8);

    this.p.head.position.y=.2*100;

    for(var i = 0 ; i < mth.p.legs.length ; i++){
        this.p.legs[i].rotation.z=pi/2;
        this.p.legs[i].rotation.x=pi;
        this.p.legs[i].position.z=-10;
        this.p.legs[i].scale = new THREE.Vector3(.4,.4,.4);

        if(i==0||i==3){
            this.p.legs[i].position.y=12;
            this.p.legs[i].scale = new THREE.Vector3(.2,.2,.2);
            this.p.legs[0].rotation.y = pi-.433*6;
            this.p.legs[3].rotation.y = pi-.433*-6;

        }
        if(i==1||i==4){
            this.p.legs[i].position.y=7;
            this.p.legs[i].scale = new THREE.Vector3(.3,.3,.3);
        }
    }

    this.p.legs[0].rotation.y = pi-.433*6;
    this.p.legs[3].rotation.y = pi-.433*-6;
    this.p.legs[1].rotation.y = pi-.3*6;
    this.p.legs[4].rotation.y = pi-.3*-6;
    this.p.legs[2].rotation.y = pi+.07*6;
    this.p.legs[5].rotation.y = pi+.07*-6;

}

