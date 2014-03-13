sc1 = {
    
    setup:function(){
        
        frameRate = 1;

        lwing = 0;
        rwing = 0;

        lwing = Wing.setup();
        rwing = Wing.setup();

        llwing = 0;
        lrwing = 0;

        llwing = LowerWing.setup();
        lrwing = LowerWing.setup();

        moth = new THREE.Object3D();

        moth.add(lwing);
        moth.add(rwing);
        moth.add(llwing);
        moth.add(lrwing);

        scene.add(moth);

        countUp = 0;
    },

    draw:function(time){

        lwing.rotation.y = Math.cos(count*Math.PI*.05);
        rwing.rotation.y = -Math.cos(count*Math.PI*.05);

        lwing.position.x = -5;
        rwing.position.x = 5;
        llwing.position.x = -5;
        lrwing.position.x = 5;


        Wing.draw(lwing,1);
        Wing.draw(rwing,-1);
        LowerWing.draw(llwing,1);
        LowerWing.draw(lrwing,-1);

        // moth.rotation.x = Math.PI/2;


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

    draw:function(wing,mult){

        wing.rotation.z=mult*.5;


        wing.applyFunc([
            wingVeinsAll,           {rx:0},
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

        console.log(wingRootMiddle);

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

        // console.log(rootlimbsall);
       

        wing.makeDictionary();


        return wing;

    },

    draw:function(wing,mult){

        wing.rotation.z=(mult*(-.4+2));
        wing.position.y = -.025*100;


        wing.applyFunc([
            rootRootsAll,         {rz:mult*Math.PI/2},

            // // rootMiddleRootsAll,   {rz:mult*mouseY},
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

