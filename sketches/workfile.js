// convert -alpha opaque -resize 300 -delay 4 moth_*.png moh_02_300.gif

sc1 = {
    
    setup:function(){

        // Moth.setup();

        head = Head.setup();
        
        scene.add(head);
        
        countUp = 0;
    },

    draw:function(time){

        // Moth.draw(time);
        // Head.draw(head);


        if(varE){
            saveIMG("bob_"+count+".png");
            countUp++;
            if(countUp>20)
                varE=false;
        }

        if(varT){
            console.log('t')
            scene.add(lwing.makeTubes({lengthSegs:5}));
            console.log(scene);
            varT=false;
        }
                    // pause = true;

    }

}

Moth = {

    setup:function(){

        lwing = Wing.setup();
        rwing = Wing.setup();

        llwing = LowerWing.setup();
        lrwing = LowerWing.setup();

        // lfLeg = 0;
        legs = [];

        legs[0] = Leg.setup();
        legs[1] = Leg.setup();
        legs[2] = Leg.setup();

        legs[3] = Leg.setup();
        legs[4] = Leg.setup();
        legs[5] = Leg.setup();

        body = Body.setup();

        // connect(lwing,scene,body.tips[1]);

        body.tips[3].rotator.add(lwing);
        lwing.position.y = body.tips[1].params.jointScale.y;
        body.tips[3].rotator.add(llwing);
        // llwing.position.y = body.tips[1].params.jointScale.y;

        legs[0].setScale(.3);
        legs[0].rotation.y = -Math.PI/2;
        legs[1].setScale(.5);
        legs[1].rotation.y = -Math.PI/2;
        legs[2].setScale(.6);
        legs[2].rotation.y = -Math.PI/2;

        legs[3].setScale(.3);
        legs[3].rotation.y = -Math.PI/2;
        legs[4].setScale(.5);
        legs[4].rotation.y = -Math.PI/2;
        legs[5].setScale(.6);
        legs[5].rotation.y = -Math.PI/2;

        body.tips[1].rotator.add(legs[2]);
        body.tips[5].rotator.add(legs[1]);
        body.tips[7].rotator.add(legs[0]);

        body.tips[0].rotator.add(legs[5]);
        body.tips[4].rotator.add(legs[4]);
        body.tips[6].rotator.add(legs[3]);

        body.tips[2].rotator.add(rwing);
        rwing.position.y = body.tips[1].params.jointScale.y;
        body.tips[2].rotator.add(lrwing);
        // llwing.position.y = body.tips[1].params.jointScale.y;

        moth = new THREE.Object3D();
        console.log(body);

        // moth.add(lwing);
        // moth.add(rwing);
        // moth.add(llwing);
        // moth.add(lrwing);
        moth.add(body);

        scene.add(moth);

    },

    draw:function(time){

        for(var i = 0 ; i < legs.length ; i++){
            Leg.draw(legs[i],1,.274);
            legs[i].position.y = legs[i].parent.parent.params.jointScale.y;
        }

        body.position.y=-15;
        body.setScale(.8);

        Wing.draw(lwing,1,Math.cos(count*12*Math.PI*.05)*.05);
        Wing.draw(rwing,-1,Math.cos(count*Math.PI*.05)*.05);
        LowerWing.draw(llwing,1);
        LowerWing.draw(lrwing,-1);

        body.tips[3].rotation.x = -0.414*2;
        body.tips[3].rotation.y = 0.17*2;
        body.tips[3].rotation.z = -0.739*2;

        body.tips[2].rotation.x = -0.414*2;
        body.tips[2].rotation.y = -0.17*2;
        body.tips[2].rotation.z = 0.739*2;



        // THREE.sceneUtils.attach(lwing,scene,body.tips[1]);

        // console.log(body.tips[1]);

        Body.draw(body,1);


    }
}


Head = {

    setup:function(){

        var head = new TREE();
        
        head.branch(4);
        
        // scene.add(head);
        
        headRootAll = head.makeList([0,0,-1]);


        head.passFunc([
            headRootAll,{amount:10,sc:10,rz:Math.PI/2},
            headRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],head.appendBranch);

        headVeins1 =        head.makeList([0,0,2,0,4]);
        headVeins2 =        head.makeList([0,0,1,1,7]);
        headVeins2bb =      head.makeList([0,0,1,[0,1],-2]);
        headVeins2bbo =     head.makeList([0,0,1,[0,1],0]);
        headVeins1b =       head.makeList([0,0,2,[0,1],-2]);
        headVeins1bo =      head.makeList([0,0,2,[0,1],0]);
        headVeins1bos =     head.makeList([0,0,2,1,[5,9]]);
        headVeins1boso =    head.makeList([0,0,2,1,4]);
        headVeins2b =       head.makeList([0,0,[1,2],1,-2]);
        //costal veins
        headVeins3 =        head.makeList([0,0,3,0,0]);//costal
        headVeins3b =       head.makeList([0,0,3,1,0]);//costal
        headVeins3bo =      head.makeList([0,0,3,0,[6,9]]);//costal

        headVeinsCostal =   head.makeList([0,0,3,[0,1],-2]);//costal

        //jugum vein offset
        headVeins4 =        head.makeList([0,0,0,1,2]);
        headVeins4o =        head.makeList([0,0,0,1,[3,9]]);

        headVeinsJugum =    head.makeList([0,0,0,[0,1],[1,4]]);
        headVeinsJugumBase = head.makeList([0,0,0,[0,1],0]);
        headVeinsJugumBase2 = head.makeList([0,0,0,0,0]);

        headVeinsAll = head.makeList([0,0,-1,-1,-2]);

        head.makeDictionary();


        return head;

    },

    draw:function(head,mult,anim){

        head.rotation.z=mult*.5;


        head.applyFunc([
            headVeinsAll,           {rx:anim},
            headRootAll,            {rz: -mult*.18},
            headVeins1b,            {rz: mult*.065},
            headVeins1bo,           {rz: mult*1.4},
            headVeins1bos,          {rz: -mult*.08},
            headVeins1,             {rz: -mult*(.2*.25), },
            headVeins2bb,           {rz:  mult*.04},
            headVeins2bbo,          {sc:.915,rz:mult*(1+.21*2)},
            headVeins2,             {sc:.579*2,rz:  mult*-.2},
            headVeins1boso,         {rz: mult*.4},
            headVeins3,             {sc:.98, rz:mult*.529*3},
            headVeins3b,            {sc:.96, rz:mult*.52*3},
            headVeinsCostal,        {rz:mult*.04},
            headVeinsJugum,         {rz:mult*-.075},
            headVeins4o,            {rz:mult*.058},
            headVeins4,             {rz:mult*(.048-.5)},
            headVeinsJugumBase,     {sc:.9,rz: mult*1.734},    
            headVeinsJugumBase2,    {sc:.845-.02,rz: mult*1.734},      
            headVeins3bo,           {sc:1.01,rz:  mult*.062},

        ],head.transform)

        head.applyFunc([
        ],head.transform)


    }
}

Wing = {

    setup:function(){

        var wing = new TREE();
        
        wing.branch(4);
        
        // scene.add(wing);
        
        wingRootAll = wing.makeList([0,0,-1]);


        wing.passFunc([
            wingRootAll,{amount:10,sc:10,rz:Math.PI/2},
            wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],wing.appendBranch);

        wingVeins1 =        wing.makeList([0,0,2,0,4]);
        wingVeins2 =        wing.makeList([0,0,1,1,7]);
        wingVeins2bb =      wing.makeList([0,0,1,[0,1],-2]);
        wingVeins2bbo =     wing.makeList([0,0,1,[0,1],0]);
        wingVeins1b =       wing.makeList([0,0,2,[0,1],-2]);
        wingVeins1bo =      wing.makeList([0,0,2,[0,1],0]);
        wingVeins1bos =     wing.makeList([0,0,2,1,[5,9]]);
        wingVeins1boso =    wing.makeList([0,0,2,1,4]);
        wingVeins2b =       wing.makeList([0,0,[1,2],1,-2]);
        //costal veins
        wingVeins3 =        wing.makeList([0,0,3,0,0]);//costal
        wingVeins3b =       wing.makeList([0,0,3,1,0]);//costal
        wingVeins3bo =      wing.makeList([0,0,3,0,[6,9]]);//costal

        wingVeinsCostal =   wing.makeList([0,0,3,[0,1],-2]);//costal

        //jugum vein offset
        wingVeins4 =        wing.makeList([0,0,0,1,2]);
        wingVeins4o =        wing.makeList([0,0,0,1,[3,9]]);

        wingVeinsJugum =    wing.makeList([0,0,0,[0,1],[1,4]]);
        wingVeinsJugumBase = wing.makeList([0,0,0,[0,1],0]);
        wingVeinsJugumBase2 = wing.makeList([0,0,0,0,0]);

        wingVeinsAll = wing.makeList([0,0,-1,-1,-2]);

        wing.makeDictionary();


        return wing;

    },

    draw:function(wing,mult,anim){

        wing.rotation.z=mult*.5;


        wing.applyFunc([
            wingVeinsAll,           {rx:anim},
            wingRootAll,            {rz: -mult*.18},
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

        ],wing.transform)

        wing.applyFunc([
        ],wing.transform)


    }
}

LowerWing = {

    setup:function(){

        var wing = new TREE();


        wing.branch(4);
        
        // scene.add(wing);
        
        wingRootMiddle = wing.makeList([0,0,[1,2]]);
        wingRootAll = wing.makeList([0,0,-1]);
        wingRoot00 = wing.makeList([0,0,0]);
        wingRoot30 = wing.makeList([0,0,3]);

        // console.log(wingRootMiddle);

        wing.passFunc([
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRootMiddle,{amount:10,sc:9,rz:Math.PI/2},
            wingRoot00,{amount:10,sc:8,rz:Math.PI/2},
            wingRoot30,{amount:10,sc:10,rz:Math.PI/2},

        ],wing.appendBranch);

        rootMiddleRootsAll =    wing.makeList([0,0,[1,2],[0,2],-2]);
        rootRootsAll =          wing.makeList([0,0,-1,-1,0]);

        root1limbsall =         wing.makeList([0,0,1,[0,2],-2]);
        root1limbsallbase =         wing.makeList([0,0,1,[0,2],0]);

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
       

        wing.makeDictionary();


        return wing;

    },

    draw:function(wing,mult){

        wing.rotation.z=(mult*(-.327+2));
        // wing.position.y = -.023*100;


        wing.applyFunc([

            rootRootsAll,         {rz:mult*Math.PI/2},

            wingRootAll,          {rz: -mult*.365, sc:1.05},
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
  
  
            root2limb27,          {sc:0.56*2,rz:mult*-0.371},
            root2limb27up,        {rz:mult*0.148},
            wingRoot00,           {sc:.76},


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


        // bodyRootEnd = body.makeList([0,0,0]);


        // body.passFunc([
        //     bodyRootEnd,{amount:10,sc:5,rz:Math.PI,ty:0.01},
        //     // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        // ],body.appendBranch);

        bodyThorax = body.makeList([0,1,0]);

        bodyThoraxAll =  body.makeList([0,1,-2]);
        bodyThoraxRoot = body.makeList([0,1,0]);

        bodyAbdomenAll = body.makeList([0,0,-2]);
        bodyAbdomenRoot = body.makeList([0,0,0]);


        bodySpineAll = body.makeList([0,-1,-1]);
        // bodySpineAll = body.makeList([0,-1,-1]);

         bodySpineConnectors = body.makeList([0,0,[1,4]]);


        body.passFunc([
            bodySpineAll,{amount:5,sc:3,rz:Math.PI/2},
            bodySpineConnectors,{amount:8,sc:3.2,rz:-Math.PI/2},
            bodySpineConnectors,{amount:8,sc:3.2,rz:Math.PI/2},
        ],body.appendBranch);

        bodyVertAll = body.makeList([0,-1,-1,0,-3]);


        body.passFunc([
            bodyVertAll,{amount:10,sc:5,rz:Math.PI/2},
            bodyVertAll,{amount:10,sc:5,rz:Math.PI/2},

            // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],body.appendBranch);

        body.passFunc([
            bodyThorax,{rz:Math.PI},
            // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

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


        connectorsLeftRoot =  body.makeList([0,0,[1,4],1,0]);
        connectorsLeftAll =   body.makeList([0,0,[1,4],1,-2]);
        connectorsRightRoot = body.makeList([0,0,[1,4],2,0]);
        connectorsRightAll =  body.makeList([0,0,[1,4],2,-2]);

        connectorsLeftWingRoot =    body.makeList([0,0,2,2,0]);
        connectorsRightWingRoot =  body.makeList([0,0,2,1,0]);


        upperRibsLeftAll =      body.makeList([0,0,-1,-1,-1,0,-2]);
        upperRibsLeftRoot =     body.makeList([0,0,-1,-1,-1,0,0]);
        upperRibsRightAll =     body.makeList([0,0,-1,-1,-1,1,-2]);
        upperRibsRightRoot =    body.makeList([0,0,-1,-1,-1,1,0]);

        lowerRibsLeftAll =      body.makeList([0,1,-1,-1,-1,0,-2]);
        lowerRibsLeftRoot =     body.makeList([0,1,-1,-1,-1,0,0]);
        lowerRibsRightAll =     body.makeList([0,1,-1,-1,-1,1,-2]);
        lowerRibsRightRoot =    body.makeList([0,1,-1,-1,-1,1,0]);




        body.makeDictionary();

         body.passFunc([
            bodyThoraxRoot,{length:3},
            bodyAbdomenRoot,{length:3},

            // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],body.setJointLength);


        return body;


    },

    draw:function(body, mult){

        // sjoff = ( Math.sin ( (obj.parentJoint.joint * offScale) + offScaleOff ) ) * offScaleMult;


        body.applyFunc([

            upperVertsRoot,         {rz:Math.PI,rx:-Math.PI/2},
            lowerVertsRoot,         {rz:Math.PI,rx:-Math.PI/2},

            // upperVertsAll,         {rx:data.var2,offMult:data.var3,freq:data.var4,off:data.var5*3},
            upperVertsAll,         {rx:0.018,offMult:0.062,freq:0.69,off:-0.067*3},
            // lowerVertsAll,         {rx:data.var2,offMult:data.var3,freq:data.var4,off:data.var5*3},
            lowerVertsAll,         {rx:0,offMult:-0.111,freq:-0.436,off:0.04*3},


            upperRibsLeftAll,    {rx:mult*.34},
            upperRibsRightAll,   {rx:-mult*.34},
            upperRibsLeftRoot,   {ry: mult*(Math.PI/2+ -.51)*3, rx:-Math.PI/2 },//offScale:.625,offScaleMult:.265},
            upperRibsRightRoot,  {ry:-mult*(-Math.PI/2+-.51)*3,rx:-Math.PI/2},//offScale:.625,offScaleMult:.265},

            // upperRibsLeftAll,    {ry:mult*data.var2,offMult:data.var3,freq:-mult*data.var4*3,off:data.var5*3,offsetter4:-mult*data.var6},
            // upperRibsRightAll,   {ry:-mult*data.var2,offMult:data.var3,freq:data.var4*3,off:data.var5*3,offsetter4:data.var6},

            upperRibsLeftAll,    {ry:mult*-.05},
            upperRibsRightAll,   {ry:-mult*-.05},

            lowerRibsLeftAll,    {ry:-mult*data.var2,rx:mult*.34},
            lowerRibsRightAll,   {rx:-mult*.34},

            // lowerRibsLeftAll,    {ry:mult*data.var2,offMult:-mult*data.var3,freq:data.var4*3,off:data.var5*3,offsetter4:-mult*data.var6*.01},
            // lowerRibsRightAll,   {ry:-mult*data.var2,offMult:data.var3,freq:data.var4*3,off:data.var5*3,offsetter4:data.var6*.01},

            lowerRibsLeftAll,    {ry:mult*0,offMult:-mult*-0.046,freq:0.083*3,off:0.062*3,offsetter4:-mult*1*.01},
            lowerRibsRightAll,   {ry:-mult*0,offMult:-0.046,freq:0.083*3,off:0.062*3,offsetter4:1*.01},


            // lowerRibsRightAll,   {ry:-mult*-0.024,offMult:0.343,freq:0.018*3,off:-0.176*3,offsetter4:data.var6},

            lowerRibsLeftRoot,   {ry:mult*(Math.PI/2+ -.51)*3,rx:-Math.PI/2},
            lowerRibsRightRoot,  {ry:-mult*(-Math.PI/2+ -.51)*3,rx:-Math.PI/2},

            bodyThoraxRoot,     {sc:.9},
            // bodyThoraxAll,        {sinScale:data.var1,sinScaleMult:data.var2,sinOff:data.var3*9},    
            bodyThoraxAll,        {sinScale:-0.197,sinScaleMult:0.148,sinOff:0.755*9},

            // bodyAbdomenRoot,    {sc:data.var4},
            // bodyAbdomenAll,     {sinScale:data.var1,sinScaleMult:data.var2,sinOff:data.var3*9},
            bodyAbdomenRoot,    {sc:0.885},
            bodyAbdomenAll,     {sc:.94,sinScale:0.582,sinScaleMult:0.192,sinOff:0.127*9},
            // bodyAbdomenAll,     {sinScale:-0.067,sinScaleMult:0.755,sinOff:-0.002*9},
            // upperVertsRoot,     {sc:data.var4,offScale:data.var1,offScaleMult:data.var2,offScaleOff:data.var3*9}
            // upperVertsRoot,     {sc:0.3,offScale:0.343,offScaleMult:0.907,offScaleOff:0.148*9}

            connectorsLeftRoot, {ry:.47*3},
            connectorsLeftAll,  {rx:.37},
            connectorsRightRoot,{ry:-mult*.47*3},
            connectorsRightAll, {rx:.37},

            connectorsLeftWingRoot, {ry:-mult},
            connectorsRightWingRoot, {ry:mult},



        ],body.transform);

       

    }
}

Leg = {

    setup:function(){

        var leg = new TREE();

        leg.params.jointScale.y=5;
        
        leg.branch(18);
        
        // scene.add(wing);
        
        trochanter = leg.makeList([0,0,[0,1]]);
        femur = leg.makeList([0,0,[2,5]]);
        tibia = leg.makeList([0,0,[6,9]]);
        utarsis = leg.makeList([0,0,[10,13]]);
        ltarsis = leg.makeList([0,0,[14,17]]);

        lParts = {};

        for(var i = 0 ; i < 18 ; i++){
            lParts[i] = leg.makeList([0,0,i]);
        }

         leg.passFunc([
            ltarsis,{length:10},
            // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],leg.setJointLength);



        leg.passFunc([
            ltarsis,{amount:5,sc:2,rz:.2},
            ltarsis,{amount:5,sc:2,rz:-.2},
            // wingRootAll,{amount:10,sc:10,rz:Math.PI/2}

        ],leg.appendBranch);

        tarsishairLeft =        leg.makeList([0,0,-1,0,-2]);
        tarsishairRight =        leg.makeList([0,0,-1,1,-2]);


        return leg;

    },

    draw:function(leg,mult,anim){

        la = anim*3;

        leg.passFunc([
            lParts[0], {sc:2,rz:la},
            lParts[1], {sc:1,rz:la},
            lParts[2], {sc:1,rz:la},
            lParts[3], {sc:1.5,rz:-la*.1},
            lParts[4], {sc:.75,rz:-la*.1},
            lParts[5], {sc:.75,rz:-la*.1},

            lParts[6], {sc:1,rz:-la*2.8},
            lParts[7], {sc:1.5,rz:-la*.05},
            lParts[8], {sc:.75,rz:-la*.05},
            lParts[9], {sc:.75,rz:-la*.05},

            lParts[10], {sc:1,rz:la*2.9},
            lParts[11], {sc:1.5,rz:la*.1},
            lParts[12], {sc:.75,rz:la*.1},
            lParts[13], {sc:.75,rz:la*.1},

            lParts[14], {sc:1,rz:-la*.1},
            lParts[15], {sc:1.5,rz:-la*.1},
            lParts[16], {sc:.75,rz:-la*.1},
            lParts[17], {sc:.75,rz:-la*.2},

            tarsishairLeft,  {sc:.8,rz:.2},
            tarsishairRight,  {sc:.8,rz:-.2},



        ],leg.transform);

    }
}
