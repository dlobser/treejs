sc1 = {
    
    setup:function(){
         head = Head.setup();

         // head.makeDictionary();
         // console.log(head);
         // scene.add(head);
         headArgs = makeArgs();
         console.log(headArgs);
         // headArgs.proballrx = 1;
         Head.draw(head,1,headArgs);
         skinHead = head.makeSkinnedGeo();
         scene.add(skinHead);
        

    },

    draw:function(time){
        headArgs.proballrx = mouseX*100;
        Head.draw(head,1,headArgs);

    }
}

Head = {

    setup:function(){

        var head = new TREE();

        head.params.jointScale.y = 3;
        
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
            [0,-1,2,0,3],{sc:5,amount:18,rz:-Math.PI/2},
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

        antLeftRoot =      head.makeList([0,0,2,0,0,0,0]);
        antLeftAll =       head.makeList([0,0,2,0,0,0,-2]);
        // antLeftBig =       head.makeList([0,0,0,1,12]);
        // antLeftSmall =     head.makeList([0,0,0,1,[15,17]]);

        antRightRoot =     head.makeList([0,1,2,0,0,0,0]);
        antRightAll =      head.makeList([0,1,2,0,0,0,-2]);
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
            antLeftAll,      {rx:args.leftAntAllrx,ry:args.leftAntAllry,rz:args.leftAntAllrz,offsetter2:0.0001,sc:.95},
            antLeftRoot,     {rx:args.leftAntRootrx,ry:args.leftAntRootry,rz:args.leftAntRootrz},

            // antRightAll,      {rz:omouseX,nMult:-.4,nFreq:.17*3,sc:.95},
            antRightAll,      {rx:args.rightAntAllrx,ry:args.rightAntAllry,rz:args.rightAntAllrz,offsetter2:0.0001,sc:.95},
            antRightRoot,     {rx:args.rightAntRootrx,ry:-args.rightAntRootry,rz:args.rightAntRootrz},

        ],head.transform,geepeeyou)

        head.applyFunc([
            antRightAll,      {rx:0,rz:0,rz:0.0001,nMult:args.nmultRight,nFreq:args.nfreqRight,rotator:true,sc:.95},
            antLeftAll,       {rx:0,rz:0,rz:0.0001,nMult:args.nmultLeft,nFreq:args.nfreqLeft,rotator:true,sc:.95},

        ],head.transform,geepeeyou)

      
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