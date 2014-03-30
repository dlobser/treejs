// convert -alpha opaque -resize 300 -delay 4 moth_*.png moh_02_300.gif
imagesToSave = 0;

sc1 = {
    
    setup:function(){

        // noLights = true;

        // light = new THREE.DirectionalLight( 0xffffff ); light.intensity = 10;light.position.set( 0, 1, 0 ); scene.add( light );

        moth = Moth.setup();
        setScale(moth,1.25);
        scene.add(moth);

        countUp = 0;

        // scene.add(new THREE.AmbientLight({color:0xffffff,intensity:10}))

        var legValues = {};

        legValues.symmetry = 0;

        for (var i = 1 ; i <= 6 ; i++){
            legValues["Leg"+i+"RootRX"]=0.001;
            legValues["Leg"+i+"RootRY"]=0.001;
            legValues["Leg"+i+"RootRZ"]=0.001;
            legValues["Leg"+i+"Femur"]=0.7;
            legValues["Leg"+i+"Tibia"]=-.28;
            legValues["Leg"+i+"UTarsis"]=0.3;
            legValues["Leg"+i+"LTarsis"]=-.075;
        }


        rebuildGui({
            sliders:0.1,
            folders:[
            {name:"body",values:{
                bodyRX:0,
                bodyRY:0,
                bodyRZ:0,
                abdomenRX:0,
                abdomenRY:0,
                abdomenRZ:0,
                thoraxRX:0,
                thoraxRY:0,
                thoraxRZ:0,

            },
            },
            {name:"anim",values:{
                flapHeight:0,
                flapSpeed:0,
                jiggly:1,
            },
            },
            {name:"head",values:{
                symmetry:0,
                headRX:0,
                headRY:0,
                headRZ:0,
                leftAntRootRX:0,
                leftAntRootRY:0,
                leftAntRootRZ:0,
                leftAntAllRX:0,
                leftAntAllRY:0,
                leftAntAllRZ:0,
                rightAntRootRX:0,
                rightAntRootRY:0,
                rightAntRootRZ:0,
                rightAntAllRX:0,
                rightAntAllRY:0,
                rightAntAllRZ:0,
                probAllRX:0,
                probAllRY:0,
                probAllRZ:0,
                probRootRX:0,
                probRootRY:0,
                probRootRZ:0,
                nFreqLeft:0,
                nFreqRight:0,
                nMultLeft:0,
                nMultRight:0,
            },
            },
            {name:"wings",values:{

                LeftWingRootRX:0,
                LeftWingRootRY:0,
                LeftWingRootRZ:0,
                RightWingRootRX:0,
                RightWingRootRY:0,
                RightWingRootRZ:0,

                LUWingRootRX:0,
                LUWingRootRY:0,
                LUWingRootRZ:0,
                LUWingAllRX:0,
                LUWingAllRY:0,
                LUWingAllRZ:0,
                LUWingVeinsAllRX:0,
                LUWingVeinsAllRY:0,
                LUWingVeinsAllRZ:0,


                LLWingRootRX:0,
                LLWingRootRY:0,
                LLWingRootRZ:0,
                LLWingAllRX:0,
                LLWingAllRY:0,
                LLWingAllRZ:0,
                LLWingVeinsAllRX:0,
                LLWingVeinsAllRY:0,
                LLWingVeinsAllRZ:0,

                RUWingRootRX:0,
                RUWingRootRY:0,
                RUWingRootRZ:0,
                RUWingAllRX:0,
                RUWingAllRY:0,
                RUWingAllRZ:0,
                RUWingVeinsAllRX:0,
                RUWingVeinsAllRY:0,
                RUWingVeinsAllRZ:0,


                RLWingRootRX:0,
                RLWingRootRY:0,
                RLWingRootRZ:0,
                RLWingAllRX:0,
                RLWingAllRY:0,
                RLWingAllRZ:0,
                RLWingVeinsAllRX:0,
                RLWingVeinsAllRY:0,
                RLWingVeinsAllRZ:0,

            }},
             {name:"legs",values:legValues,
            }
            ]})

        info.head.headRX=-.5;
    },

    draw:function(time){

        Moth.draw(count);
      
        if(varE){
            saveIMG("moth_"+count+".png");
            countUp++;
            if(countUp>imagesToSave){
                countUp=0;
                varE = false;
            }
        }

        if(varR){
            console.log(imagesToSave);
        }

        if(varY){
            console.log(JSON.stringify(info));
            varY = false;
        }

        if(varW){
            var info2 = updateArgs();
            for (var key in info2) {
                if (info2.hasOwnProperty(key)){
                    for (var hey in info2[key]) {
                        if(typeof info2[key][hey] == "number")
                            info[key][hey] = info2[key][hey];
                    }
                }
            }
            varW = false;
        }

         if(varT){


            scene.traverse(function(obj){obj.updateMatrixWorld()});
           

            var holder = new THREE.Object3D();

            var wng = mothParts[6];

            var bod = wng.worldPositionsArray(body.upperRibsLeft);
            var bod2 = wng.worldPositionsArray(body.upperRibsRight);
            var bod3 = wng.worldPositionsArray(body.lowerRibsLeft);
            var bod4 = wng.worldPositionsArray(body.lowerRibsRight);

            var ob = {zero:1,xy:0,divx:10,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:2,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:-5,tipLength:3,tipPoint:0.01},
                tubeArgs:{lengthSegs:2,minWidth:0.01,width:4}};
            var ob2 = {zero:1,xy:0,divx:10,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:2,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:5,tipLength:3,tipPoint:0.01},
                tubeArgs:{lengthSegs:2,minWidth:0.01,width:4}};

            for(var i = 0 ; i < bod.length ; i++){
                 // bod[i].pop();
                // bod[i].shift();
               
            }
            holder.add(weave(bod,ob));
            holder.add(weave(bod2,ob2));
           
            holder.add(weave(mothParts[6],{divx:12,divy:2,zero:7,off:{skip:true},tubeArgs:{lengthSegs:4,minWidth:.2,width:2}}));
            holder.add(weave(mothParts[7],{divx:12,divy:2,zero:7,off:{skip:true},tubeArgs:{lengthSegs:4,minWidth:.2,width:2}}));
            holder.add(weave(mothParts[8],{divx:5,divy:10,zero:5,off:{skip:true},tubeArgs:{lengthSegs:3,minWidth:.2,width:2}}));
            holder.add(weave(mothParts[9],{divx:5,divy:10,zero:5,off:{skip:true},tubeArgs:{lengthSegs:3,minWidth:.2,width:2}}));
            // weave(mothParts[11],2,1);
           
            // scene.add(geo);
            for(var i = 0 ; i < mothParts.length-1 ; i++){
                if(i>5 && i!=10)
                holder.add(mothParts[i].makeTubes({lengthSegs:2,width:1.5,minWidth:1.5,func:function(t){return Math.sin(((t)/2)-1.5)*2}}));
                if(i==10)
                holder.add(mothParts[i].makeTubes({lengthSegs:1,width:3,minWidth:.5}));

                if(i<=5)
                holder.add(mothParts[i].makeTubes({lengthSegs:2,width:1,minWidth:2,func:function(t){return Math.sin(t/3)*2}}));

            }
            scene.add(holder);
            scene.remove(moth); 

            var count=0;

            scene.traverse(function(obj){if(obj.geometry)count+=obj.geometry.vertices.length})

            console.log(count);
           
           varT=false;
        }

        // if(varT){

        //     objName = "moth_"+countUp+".obj";
        //     countUp++;
        //     console.log(count);

        //     scene.traverse(function(obj){obj.updateMatrixWorld()});
           

        //     var holder = new THREE.Object3D();

        //     console.log('t');
        //     // scene.traverse(function(o){o.updateMatrixWorld();if(o.parent)o.parent.updateMatrixWorld()});
        //     var wng = mothParts[6];

        //     // console.log(body.upperRibs);
        //     var bod = wng.worldPositionsArray(body.upperRibsLeft);
        //     var bod2 = wng.worldPositionsArray(body.upperRibsRight);
        //     var bod3 = wng.worldPositionsArray(body.lowerRibsLeft);
        //     var bod4 = wng.worldPositionsArray(body.lowerRibsRight);

        //     var ob = {zero:1,xy:0,divx:30,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:2,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:-5,tipLength:3},
        //         tubeArgs:{lengthSegs:2,minWidth:0.01,width:2}};
        //     var ob2 = {zero:1,xy:0,divx:30,divy:10,off:{func:function(t){var p=0;if(t<8)p=10;return p;},points:1,freq:.5,mult:2,tipNoiseMult:5,tipNoiseFreq:.1,tipOff:5,tipLength:3},
        //         tubeArgs:{lengthSegs:2,minWidth:0.01,width:2}};

        //     holder.add(weave(bod,ob));
        //     holder.add(weave(bod2,ob2));
           
        //     holder.add(weave(mothParts[6],{zero:5}));
        //     holder.add(weave(mothParts[7],{zero:5}));
        //     holder.add(weave(mothParts[8],{zero:5}));
        //     holder.add(weave(mothParts[9],{zero:5}));
        //     // weave(mothParts[11],2,1);
           
        //     // scene.add(geo);
        //     for(var i = 0 ; i < mothParts.length ; i++){
        //         holder.add(mothParts[i].makeTubes({lengthSegs:5,minWidth:1.5,func:
        //             function(t){return Math.sin(t/2)}}));
        //     }
        //     scene.add(holder);
        //     scene.remove(moth); 
        //     saver(objName);
        //     scene.remove(holder);
         

        //     holder.traverse(function(obj){if(obj.geometry){obj.geometry.vertices=[];obj.geometry.faces=[];obj.geometry.dispose();}});

        //     var lngth = holder.children.length

        //     for(var i = 0 ; i < lngth ; i++){
        //         holder.remove(holder.children[0]);
        //         // console.log(holder.children);
        //     }
        //     console.log(holder.children);

            
        //     holder = new THREE.Object3D();
        //     scene.add(moth);

        //     if(countUp>imagesToSave){
        //         countUp=0;
        //         varT = false;
        //     }
        // }

    }
}

Moth = {

    setup:function(){   

        mothParts = [];

        head = Head.setup();

        head.setScale(2.5);
        head.rotation.y=Math.PI;
        head.rotation.x=-Math.PI/2;
        head.position.y=5;
        head.position.z=2;

        lwing = Wing.setup();
        rwing = Wing.setup();
        llwing = LowerWing.setup();
        lrwing = LowerWing.setup();

        legs = [];

        legs[0] = Leg.setup();
        legs[1] = Leg.setup();
        legs[2] = Leg.setup();
        legs[3] = Leg.setup();
        legs[4] = Leg.setup();
        legs[5] = Leg.setup();

        body = Body.setup();

        body.neck.rotator.add(head);

        body.tips[3].rotator.add(lwing);
        lwing.position.y = body.tips[1].params.jointScale.y;
        body.tips[3].rotator.add(llwing);
        body.tips[3].scale = new THREE.Vector3(1.3,1.3,1.3);
        lwing.setScale(1.1);

        body.tips[2].rotator.add(rwing);
        rwing.position.y = body.tips[1].params.jointScale.y;
        body.tips[2].rotator.add(lrwing);
        body.tips[2].scale = new THREE.Vector3(1.3,1.3,1.3);
        rwing.setScale(1.1);
       

        legs[0].setScale(.3);
        legs[0].rotation.y = -Math.PI/2;
        legs[1].setScale(.4);
        legs[1].rotation.y = -Math.PI/2;
        legs[2].setScale(.5);
        legs[2].rotation.y = -Math.PI/2;

        legs[3].setScale(.3);
        legs[3].rotation.y = -Math.PI/2;
        legs[4].setScale(.4);
        legs[4].rotation.y = -Math.PI/2;
        legs[5].setScale(.5);
        legs[5].rotation.y = -Math.PI/2;

        body.tips[1].rotator.add(legs[2]);
        body.tips[5].rotator.add(legs[1]);
        body.tips[7].rotator.add(legs[0]);

        body.tips[0].rotator.add(legs[5]);
        body.tips[4].rotator.add(legs[4]);
        body.tips[6].rotator.add(legs[3]);

        moth = new THREE.Object3D();
        console.log(body);

        for(var i = 0 ; i < legs.length ; i++){
            mothParts.push(legs[i]);
        }

        mothParts.push(lwing);
        mothParts.push(rwing);
        mothParts.push(llwing);
        mothParts.push(lrwing);
        mothParts.push(head);
        mothParts.push(body);

        args = {};

        args.LeftUpperWing = makeArgs();
        args.LeftLowerWing = makeArgs();
        args.RightUpperWing = makeArgs();
        args.RightLowerWing = makeArgs();
        args.Head = makeArgs();
        
        for(var i = 0 ; i < 6 ; i++){
            args["Leg"+(i+1)] = makeArgs();
        }

        moth.add(body);

        return moth;
    },

    draw:function(time){


        body.setScale(.8);
        body.position.y=-15;

        var flappity = Math.round(info.anim.flapSpeed*30) 
        var flapSpeed = (flappity/15);
        imagesToSave = (1/flapSpeed)*Math.PI*2;

        body.position.z=  (Math.sin(1-(flapSpeed*count))*5)*info.anim.flapHeight*3 * info.anim.jiggly;

        args.Wings = {

            lwrx : info.wings.LeftWingRootRX*2,
            lwry : info.wings.LeftWingRootRY*2,
            lwrz : info.wings.LeftWingRootRZ*2,
            rwrx : info.wings.RightWingRootRX*2,
            rwry : info.wings.RightWingRootRY*2,
            rwrz : info.wings.RightWingRootRZ*2,

        }

        args.LeftUpperWing = {
                rootrx :  info.wings.LUWingRootRX*Math.PI,
                rootry :  info.wings.LUWingRootRY*Math.PI,
                rootrz :  info.wings.LUWingRootRZ*Math.PI,
                allrx :   info.wings.LUWingAllRX,
                allry :   info.wings.LUWingAllRY,
                allrz :   info.wings.LUWingAllRZ,
                veinsrx : info.wings.LUWingVeinsAllRX*.3 + (.1*info.anim.flapHeight*(Math.sin(flapSpeed*count))),
                veinsry : info.wings.LUWingVeinsAllRY*.3,
                veinsrz : info.wings.LUWingVeinsAllRZ*.3,
        };
        args.LeftLowerWing = {
                rootrx :  info.wings.LLWingRootRX*Math.PI -(.2*info.anim.flapHeight) + (.2* info.anim.flapHeight*(Math.sin((Math.PI-(flapSpeed*count))))),
                rootry :  info.wings.LLWingRootRY*Math.PI,
                rootrz :  info.wings.LLWingRootRZ*Math.PI,
                allrx :   info.wings.LLWingAllRX,
                allry :   info.wings.LLWingAllRY,
                allrz :   info.wings.LLWingAllRZ,
                veinsrx : info.wings.LLWingVeinsAllRX*.3 + (.1*info.anim.flapHeight*(Math.sin(flapSpeed*count))),
                veinsry : info.wings.LLWingVeinsAllRY*.3,
                veinsrz : info.wings.LLWingVeinsAllRZ*.3,
        };
        args.RightUpperWing = {
                rootrx :  info.wings.RUWingRootRX*Math.PI,
                rootry :  info.wings.RUWingRootRY*Math.PI,
                rootrz :  info.wings.RUWingRootRZ*Math.PI,
                allrx :   info.wings.RUWingAllRX,
                allry :   info.wings.RUWingAllRY,
                allrz :   info.wings.RUWingAllRZ,
                veinsrx : info.wings.RUWingVeinsAllRX*.3 + (.1*info.anim.flapHeight*(Math.sin(flapSpeed*count))),
                veinsry : info.wings.RUWingVeinsAllRY*.3,
                veinsrz : info.wings.RUWingVeinsAllRZ*.3,
        };
        args.RightLowerWing = {
                rootrx :  info.wings.RLWingRootRX*Math.PI-(.2*info.anim.flapHeight) + (.2* info.anim.flapHeight*(Math.sin((Math.PI-(flapSpeed*count))))),
                rootry :  info.wings.RLWingRootRY*Math.PI,
                rootrz :  info.wings.RLWingRootRZ*Math.PI,
                allrx :   info.wings.RLWingAllRX,
                allry :   info.wings.RLWingAllRY,
                allrz :   info.wings.RLWingAllRZ,
                veinsrx : info.wings.RLWingVeinsAllRX*.3 + (.1*info.anim.flapHeight*(Math.sin(flapSpeed*count))),
                veinsry : info.wings.RLWingVeinsAllRY*.3,
                veinsrz : info.wings.RLWingVeinsAllRZ*.3,
        };
        args.Body = {
                rootrx :  info.body.abdomenRX*.3 ,
                rootry :  info.body.abdomenRY*.3,
                rootrz :  info.body.abdomenRZ*.3,
                allrx :   info.body.thoraxRX*.3 + (.02*info.anim.flapHeight*(Math.cos(1+(-flapSpeed*count))*5)) * info.anim.jiggly ,
                allry :   info.body.thoraxRY*.3,
                allrz :   info.body.thoraxRZ*.3,
        }
        args.Head = {
                symmetry:         info.head.symmetry, 
                leftAntRootrx :   info.head.leftAntRootRX,
                leftAntRootry :   info.head.leftAntRootRY,
                leftAntRootrz :   info.head.leftAntRootRZ - .2,
                rightAntRootrx :  info.head.rightAntRootRX,
                rightAntRootry :  info.head.rightAntRootRY,
                rightAntRootrz :  info.head.rightAntRootRZ - .2,
                leftAntAllrx :    info.head.leftAntAllRX + (.02*info.anim.flapHeight*(Math.cos(1.5+(-flapSpeed*count))*5))* info.anim.jiggly ,
                leftAntAllry :    info.head.leftAntAllRY,
                leftAntAllrz :    info.head.leftAntAllRZ,
                rightAntAllrx :   info.head.rightAntAllRX - (.02*info.anim.flapHeight*(Math.cos(1.5+(-flapSpeed*count))*5))* info.anim.jiggly ,
                rightAntAllry :   info.head.rightAntAllRY,
                rightAntAllrz :   info.head.rightAntAllRZ,
                proballrx:        info.head.probAllRX + (.02*info.anim.flapHeight*(Math.cos(1.5+(-flapSpeed*count))*5))* info.anim.jiggly ,
                proballry:        info.head.probAllRY,
                proballrz:        info.head.probAllRZ,
                probrootrx :      info.head.probRootRX,
                probrootry :      info.head.probRootRY,
                probrootrz :      info.head.probRootRZ,
                nfreqLeft  :      info.head.nFreqLeft,
                nfreqRight :      info.head.nFreqRight,
                nmultLeft  :      info.head.nMultLeft,
                nmultRight :      info.head.nMultRight,
        }
        for (var i = 1 ; i <= 6 ; i++){
            args["Leg"+i].rootrx  = info.legs["Leg"+i+"RootRX"]*Math.PI;
            args["Leg"+i].rootry  = info.legs["Leg"+i+"RootRY"]*Math.PI;
            args["Leg"+i].rootrz  = info.legs["Leg"+i+"RootRZ"]*Math.PI + (.1*info.anim.flapHeight*(Math.sin(.5+(-flapSpeed*count))*5))* info.anim.jiggly ;
            args["Leg"+i].femur   = info.legs["Leg"+i+"Femur"]*Math.PI;
            args["Leg"+i].tibia   = info.legs["Leg"+i+"Tibia"]*Math.PI;
            args["Leg"+i].utarsis = info.legs["Leg"+i+"UTarsis"]*Math.PI;
            args["Leg"+i].ltarsis = info.legs["Leg"+i+"LTarsis"]*Math.PI + (.2*info.anim.flapHeight*(Math.sin(1+(-flapSpeed*count))*5))* info.anim.jiggly;
        }

        args.Legs = {};

        args.Legs.symmetry = info.legs.symmetry;//+ (.02*info.anim.flapHeight*(Math.cos(1.5+(-flapSpeed*count))*5));

        var q = 0;
         for(var i = 0 ; i < legs.length ; i++){
            var mult = 1;
            q=i;
            if(i>2){
                mult=-1;
                if(args.Legs.symmetry>0)
                    q=i-3;
            }
            Leg.draw(legs[i],mult,args["Leg"+(q+1)]);
            legs[i].position.y = legs[i].parent.parent.params.jointScale.y;
        }   

        moth.rotation.x = info.body.bodyRX*Math.PI + (.05*info.anim.flapHeight*(Math.sin(1+(-flapSpeed*count))*5))* info.anim.jiggly;
        moth.rotation.y = info.body.bodyRY*Math.PI;
        moth.rotation.z = info.body.bodyRZ*Math.PI;

        head.rotation.x = info.head.headRX*Math.PI + (.1*info.anim.flapHeight*(Math.cos(1+(-flapSpeed*count))*5)) * info.anim.jiggly;
        head.rotation.y = Math.PI+info.head.headRY*Math.PI;
        head.rotation.z = info.head.headRZ*Math.PI;

        Wing.draw(lwing,1,args.LeftUpperWing);//lwing,1 ,Math.cos(time*Math.PI*.2)*.05);
        Wing.draw(rwing,-1,args.RightUpperWing);//rwing,-1,Math.cos(time*Math.PI*.2)*.05);
        LowerWing.draw(llwing,1,args.LeftLowerWing);//llwing,1 ,Math.cos(time*Math.PI*.2)*.05);
        LowerWing.draw(lrwing,-1,args.RightLowerWing);//lrwing,-1,Math.cos(time*Math.PI*.2)*.05);

        Head.draw(head,1,args.Head);

        body.tips[3].rotation.x = args.Wings.lwrx + (-0.414*2)+(info.anim.flapHeight*.5)+info.anim.flapHeight*1.3*(Math.cos(flapSpeed*count));
        body.tips[3].rotation.y = args.Wings.lwry + (0.17*2);
        body.tips[3].rotation.z = args.Wings.lwrz + (-.34*5);//-0.739*2;

        body.tips[2].rotation.x = args.Wings.rwrx + (-0.414*2)+(info.anim.flapHeight*.5)+info.anim.flapHeight*1.3*(Math.cos(flapSpeed*count));;
        body.tips[2].rotation.y = args.Wings.rwry + -0.17*2;
        body.tips[2].rotation.z = args.Wings.rwrz + .34*5;

        Body.draw(body,1,args.Body);

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

        ],head.transform)

        head.applyFunc([
            antRightAll,      {rx:0,rz:0,rz:0.0001,nMult:args.nmultRight,nFreq:args.nfreqRight,rotator:true,sc:.95},
            antLeftAll,       {rx:0,rz:0,rz:0.0001,nMult:args.nmultLeft,nFreq:args.nfreqLeft,rotator:true,sc:.95},

        ],head.transform)

      
    }
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

        // leg.passFunc([
        //     ltarsis,{amount:5,sc:2,rz:.2},
        //     ltarsis,{amount:5,sc:2,rz:-.2},
        // ],leg.appendBranch);

        leg.passFunc([
         lParts[0],     {length:1},
            lParts[1],  {length:1},
        ],leg.setJointLength);

        // tarsishairLeft =        leg.makeList([0,0,-1,0,-2]);
        // tarsishairRight =        leg.makeList([0,0,-1,1,-2]);

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

            // tarsishairLeft,  {sc:.8,rz:.2},
            // tarsishairRight,  {sc:.8,rz:-.2},

        ],leg.transform);

    }
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

    console.log(args);

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

function sinChop(arr){

    var tempArr = [];

    // console.log(arr);

    for(var i = 0 ; i < arr.length ; i++){

        if(!(Math.sin(i*.3)>-1 && Math.sin(i*.3)<-.5)){
            tempArr.push(arr[i]);
        }

    }
    // console.log(tempArr);

    return tempArr;
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

function updateArgs(){
// return JSON.parse('{"body":{"bodyRX":0,"bodyRY":0,"bodyRZ":0},"head":{"headRX":-0.5,"headRY":0,"headRZ":0},"wings":{"LUWingRootRX":0,"LUWingRootRY":0,"LUWingRootRZ":0,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":0,"LUWingVeinsAllRX":0,"LUWingVeinsAllRY":0,"LUWingVeinsAllRZ":0,"LLWingRootRX":0,"LLWingRootRY":0,"LLWingRootRZ":0,"LLWingAllRX":0,"LLWingAllRY":0,"LLWingAllRZ":0,"LLWingVeinsAllRX":0,"LLWingVeinsAllRY":0,"LLWingVeinsAllRZ":0},"legs":{"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":-0.12050739957716705,"Leg1Femur":0.7589852008456659,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":-0.16560958421423533,"Leg2RootRX":0.15010570824524305,"Leg2RootRY":0.10500352360817478,"Leg2RootRZ":-0.07540521494009866,"Leg2Femur":0.5560253699788584,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.075,"Leg3RootRX":0.3305144467935166,"Leg3RootRY":-0.007751937984496138,"Leg3RootRZ":0.001,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.23326286116983797,"Leg3UTarsis":0.24031007751937983,"Leg3LTarsis":-0.3009161381254405,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}}');

//legs and wings normal

// return JSON.parse('{"body":{"bodyRX":0,"bodyRY":0,"bodyRZ":0,"abdomenRX":0,"abdomenRY":0,"abdomenRZ":0,"thoraxRX":0,"thoraxRY":0,"thoraxRZ":0},"anim":{"flapHeight":0,"flapSpeed":0,"jiggly":1},"head":{"symmetry":0,"headRX":-0.5,"headRY":0,"headRZ":0,"leftAntRootRX":-0.34601832276250877,"leftAntRootRY":0.03735024665257214,"leftAntRootRZ":-0.23326286116983797,"leftAntAllRX":0.10500352360817478,"leftAntAllRY":0,"leftAntAllRZ":0,"rightAntRootRX":0.3305144467935166,"rightAntRootRY":-0.1430584918957012,"rightAntRootRZ":-0.18816067653276958,"rightAntAllRX":-0.1430584918957012,"rightAntAllRY":0,"rightAntAllRZ":0,"probAllRX":0,"probAllRY":0,"probAllRZ":0,"probRootRX":0,"probRootRY":0,"probRootRZ":0,"nFreqLeft":0.5560253699788584,"nFreqRight":0.4432699083861875,"nMultLeft":0.46582100070472165,"nMultRight":0.30796335447498246},"wings":{"LUWingRootRX":0,"LUWingRootRY":0,"LUWingRootRZ":0,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":0,"LUWingVeinsAllRX":0,"LUWingVeinsAllRY":0,"LUWingVeinsAllRZ":0,"LLWingRootRX":0,"LLWingRootRY":0,"LLWingRootRZ":0,"LLWingAllRX":0,"LLWingAllRY":0,"LLWingAllRZ":0,"LLWingVeinsAllRX":0,"LLWingVeinsAllRY":0,"LLWingVeinsAllRZ":0,"RUWingRootRX":0,"RUWingRootRY":0,"RUWingRootRZ":0,"RUWingAllRX":0,"RUWingAllRY":0,"RUWingAllRZ":0,"RUWingVeinsAllRX":0,"RUWingVeinsAllRY":0,"RUWingVeinsAllRZ":0,"RLWingRootRX":0,"RLWingRootRY":0,"RLWingRootRZ":0,"RLWingAllRX":0,"RLWingAllRY":0,"RLWingAllRZ":0,"RLWingVeinsAllRX":0,"RLWingVeinsAllRY":0,"RLWingVeinsAllRZ":0},"legs":{"symmetry":0,"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":-0.12050739957716705,"Leg1Femur":0.7589852008456659,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":-0.16560958421423533,"Leg2RootRX":0.15010570824524305,"Leg2RootRY":0.10500352360817478,"Leg2RootRZ":-0.07540521494009866,"Leg2Femur":0.5560253699788584,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.075,"Leg3RootRX":0.3305144467935166,"Leg3RootRY":-0.007751937984496138,"Leg3RootRZ":0.001,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.23326286116983797,"Leg3UTarsis":0.24031007751937983,"Leg3LTarsis":-0.3009161381254405,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}}');

//tweaked animation

return JSON.parse('{"body":{"bodyRX":-0.5,"bodyRY":0,"bodyRZ":1,"abdomenRX":0,"abdomenRY":0,"abdomenRZ":0,"thoraxRX":0,"thoraxRY":0,"thoraxRZ":0},"anim":{"flapHeight":0.6102016198518008,"flapSpeed":0.03670515250732387,"jiggly":1},"head":{"symmetry":0,"headRX":-0.5,"headRY":0,"headRZ":0,"leftAntRootRX":-0.34601832276250877,"leftAntRootRY":0.03735024665257214,"leftAntRootRZ":-0.23326286116983797,"leftAntAllRX":0.10500352360817478,"leftAntAllRY":0,"leftAntAllRZ":0,"rightAntRootRX":0.3305144467935166,"rightAntRootRY":-0.1430584918957012,"rightAntRootRZ":-0.18816067653276958,"rightAntAllRX":-0.1430584918957012,"rightAntAllRY":0,"rightAntAllRZ":0,"probAllRX":0,"probAllRY":0,"probAllRZ":0,"probRootRX":0,"probRootRY":0,"probRootRZ":0,"nFreqLeft":0.5560253699788584,"nFreqRight":0.4432699083861875,"nMultLeft":0.46582100070472165,"nMultRight":0.30796335447498246},"wings":{"LeftWingRootRX":0.15010570824524305,"LeftWingRootRY":-0.007751937984496138,"LeftWingRootRZ":-0.007751937984496138,"RightWingRootRX":0.19520789288231155,"RightWingRootRY":0.03735024665257214,"RightWingRootRZ":0,"LUWingRootRX":0,"LUWingRootRY":0,"LUWingRootRZ":0,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":0,"LUWingVeinsAllRX":0,"LUWingVeinsAllRY":0,"LUWingVeinsAllRZ":0,"LLWingRootRX":0,"LLWingRootRY":0,"LLWingRootRZ":0,"LLWingAllRX":0,"LLWingAllRY":0,"LLWingAllRZ":0,"LLWingVeinsAllRX":0,"LLWingVeinsAllRY":0,"LLWingVeinsAllRZ":0,"RUWingRootRX":0,"RUWingRootRY":0,"RUWingRootRZ":0,"RUWingAllRX":0,"RUWingAllRY":0,"RUWingAllRZ":0,"RUWingVeinsAllRX":0,"RUWingVeinsAllRY":0,"RUWingVeinsAllRZ":0,"RLWingRootRX":0,"RLWingRootRY":0,"RLWingRootRZ":0,"RLWingAllRX":0,"RLWingAllRY":0,"RLWingAllRZ":0,"RLWingVeinsAllRX":0,"RLWingVeinsAllRY":0,"RLWingVeinsAllRZ":0},"legs":{"symmetry":0.0599013389711065,"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":-0.12050739957716705,"Leg1Femur":0.7589852008456659,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":-0.16560958421423533,"Leg2RootRX":0.19520789288231155,"Leg2RootRY":0.0599013389711065,"Leg2RootRZ":-0.030303030303030276,"Leg2Femur":0.46582100070472165,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.075,"Leg3RootRX":0.2854122621564481,"Leg3RootRY":0.2177589852008457,"Leg3RootRZ":0.03735024665257214,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.23326286116983797,"Leg3UTarsis":0.24031007751937983,"Leg3LTarsis":-0.3009161381254405,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}}');

// return JSON.parse('{"body":{"bodyRX":0,"bodyRY":0,"bodyRZ":0,"abdomenRX":0.28487365870543435,"abdomenRY":-0.31325718241606093,"abdomenRZ":0.15195569401176878,"thoraxRX":0.39563862928348903,"thoraxRY":-0.4018691588785047,"thoraxRZ":-0.31325718241606093},"head":{"symmetry":0,"headRX":-0.5243319766413024,"headRY":0.177844629269156,"headRZ":0,"leftAntRootRX":0.22314634577950798,"leftAntRootRY":0,"leftAntRootRZ":0,"leftAntAllRX":0.10500352360817478,"leftAntAllRY":0,"leftAntAllRZ":0,"rightAntRootRX":-0.22987081932401343,"rightAntRootRY":0,"rightAntRootRZ":0,"rightAntAllRX":0.1325429127588038,"rightAntAllRY":0,"rightAntAllRZ":0,"probAllRX":-0.026013095027428768,"probAllRY":0.019288621482923318,"probAllRZ":-0.026013095027428768,"probRootRX":-0.09396566979295695,"probRootRY":-0.3657759688550699,"probRootRZ":0,"nFreqLeft":0.19520789288231155,"nFreqRight":0.4883720930232558,"nMultLeft":0.7815362931642,"nMultRight":0.6011275546159267},"wings":{"LUWingRootRX":-0.048663953282604866,"LUWingRootRY":-0.003362236772252669,"LUWingRootRZ":-0.026013095027428768,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":0,"LUWingVeinsAllRX":0.3137497788002124,"LUWingVeinsAllRY":0.20049548752433188,"LUWingVeinsAllRZ":0,"LLWingRootRX":-0.003362236772252669,"LLWingRootRY":0.10500352360817478,"LLWingRootRZ":-0.12050739957716705,"LLWingAllRX":-0.007751937984496138,"LLWingAllRY":-0.030303030303030276,"LLWingAllRZ":0.014799154334038,"LLWingVeinsAllRX":0.177844629269156,"LLWingVeinsAllRY":0.014799154334038,"LLWingVeinsAllRZ":0.0599013389711065,"RUWingRootRX":0.0599013389711065,"RUWingRootRY":0.04193947973809942,"RUWingRootRZ":-0.030303030303030276,"RUWingAllRX":0,"RUWingAllRY":0,"RUWingAllRZ":0,"RUWingVeinsAllRX":0.1551937710139799,"RUWingVeinsAllRY":-0.030303030303030276,"RUWingVeinsAllRZ":-0.052854122621564525,"RLWingRootRX":-0.13926738630330915,"RLWingRootRY":-0.07540521494009866,"RLWingRootRZ":0.03735024665257214,"RLWingAllRX":0,"RLWingAllRY":0,"RLWingAllRZ":0,"RLWingVeinsAllRX":0.1551937710139799,"RLWingVeinsAllRY":-0.030303030303030276,"RLWingVeinsAllRZ":0},"legs":{"symmetry":0.20049548752433188,"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":0.06459033799327552,"Leg1Femur":1,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":0.2684480622898602,"Leg2RootRX":-0.11661652804813305,"Leg2RootRY":0.10500352360817478,"Leg2RootRZ":-0.07540521494009866,"Leg2Femur":0.5560253699788584,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.4790302601309503,"Leg3RootRX":0.3305144467935166,"Leg3RootRY":-0.007751937984496138,"Leg3RootRZ":0.001,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.22987081932401343,"Leg3UTarsis":0.177844629269156,"Leg3LTarsis":-0.682887984427535,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}} ');

// return JSON.parse('{"body":{"bodyRX":0,"bodyRY":0,"bodyRZ":0,"abdomenRX":0.03735024665257214,"abdomenRY":0.08245243128964064,"abdomenRZ":-0.052854122621564525,"thoraxRX":0.08245243128964064,"thoraxRY":0.0599013389711065,"thoraxRZ":-0.07540521494009866},"head":{"symmetry":0,"headRX":-0.5,"headRY":0,"headRZ":0,"leftAntRootRX":0.24031007751937983,"leftAntRootRY":0,"leftAntRootRZ":0,"leftAntAllRX":0.10500352360817478,"leftAntAllRY":0,"leftAntAllRZ":0,"rightAntRootRX":-1,"rightAntRootRY":0,"rightAntRootRZ":0,"rightAntAllRX":-0.23326286116983797,"rightAntAllRY":0,"rightAntAllRZ":0,"probAllRX":-0.0979563072586328,"probAllRY":-0.16560958421423533,"probAllRZ":-0.052854122621564525,"probRootRX":0.26286116983791397,"probRootRY":-0.751937984496124,"probRootRZ":0,"nFreqLeft":0.19520789288231155,"nFreqRight":0.4883720930232558,"nMultLeft":0.7815362931642,"nMultRight":0.6011275546159267},"wings":{"LUWingRootRX":0.12755461592670891,"LUWingRootRY":0.3305144467935166,"LUWingRootRZ":-0.16560958421423533,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":0,"LUWingVeinsAllRX":0.03735024665257214,"LUWingVeinsAllRY":0.03735024665257214,"LUWingVeinsAllRZ":0,"LLWingRootRX":0.2854122621564481,"LLWingRootRY":0.10500352360817478,"LLWingRootRZ":-0.12050739957716705,"LLWingAllRX":-0.007751937984496138,"LLWingAllRY":-0.030303030303030276,"LLWingAllRZ":0.014799154334038,"LLWingVeinsAllRX":0.014799154334038,"LLWingVeinsAllRY":0.014799154334038,"LLWingVeinsAllRZ":0.0599013389711065,"RUWingRootRX":0.0599013389711065,"RUWingRootRY":-0.3009161381254405,"RUWingRootRZ":-0.030303030303030276,"RUWingAllRX":0,"RUWingAllRY":0,"RUWingAllRZ":0,"RUWingVeinsAllRX":0.014799154334038,"RUWingVeinsAllRY":-0.030303030303030276,"RUWingVeinsAllRZ":-0.052854122621564525,"RLWingRootRX":0.15010570824524305,"RLWingRootRY":-0.07540521494009866,"RLWingRootRZ":0.03735024665257214,"RLWingAllRX":0,"RLWingAllRY":0,"RLWingAllRZ":0,"RLWingVeinsAllRX":0.03735024665257214,"RLWingVeinsAllRY":-0.030303030303030276,"RLWingVeinsAllRZ":0},"legs":{"symmetry":0,"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":-0.12050739957716705,"Leg1Femur":0.7589852008456659,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":-0.16560958421423533,"Leg2RootRX":0.15010570824524305,"Leg2RootRY":0.10500352360817478,"Leg2RootRZ":-0.07540521494009866,"Leg2Femur":0.5560253699788584,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.075,"Leg3RootRX":0.3305144467935166,"Leg3RootRY":-0.007751937984496138,"Leg3RootRZ":0.001,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.23326286116983797,"Leg3UTarsis":0.24031007751937983,"Leg3LTarsis":-0.3009161381254405,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}}');



// {"body":{"bodyRX":0,"bodyRY":0,"bodyRZ":0,"abdomenRX":-0.0979563072586328,"abdomenRY":0,"abdomenRZ":0,"thoraxRX":0.03735024665257214,"thoraxRY":0.0599013389711065,"thoraxRZ":0.03735024665257214},"head":{"symmetry":0.1726568005637774,"headRX":-0.5,"headRY":0,"headRZ":0,"leftAntRootRX":0,"leftAntRootRY":0,"leftAntRootRZ":0,"rightAntRootRX":-0.7970401691331924,"rightAntRootRY":0,"rightAntRootRZ":0,"leftAntAllRX":0,"leftAntAllRY":0,"leftAntAllRZ":-0.052854122621564525,"rightAntAllRX":-0.23326286116983797,"rightAntAllRY":-0.16560958421423533,"rightAntAllRZ":0.15010570824524305,"probAllRX":-0.1430584918957012,"probAllRY":0,"probAllRZ":0.08245243128964064,"probRootRX":-0.16560958421423533,"probRootRY":0,"probRootRZ":0},"wings":{"LUWingRootRX":0,"LUWingRootRY":0,"LUWingRootRZ":0,"LUWingAllRX":0,"LUWingAllRY":0,"LUWingAllRZ":-0.007751937984496138,"LUWingVeinsAllRX":0.03735024665257214,"LUWingVeinsAllRY":-0.007751937984496138,"LUWingVeinsAllRZ":-0.030303030303030276,"LLWingRootRX":-0.030303030303030276,"LLWingRootRY":0,"LLWingRootRZ":-0.052854122621564525,"LLWingAllRX":0,"LLWingAllRY":0,"LLWingAllRZ":0,"LLWingVeinsAllRX":0.03735024665257214,"LLWingVeinsAllRY":0.014799154334038,"LLWingVeinsAllRZ":-0.030303030303030276,"RUWingRootRX":0,"RUWingRootRY":-0.12050739957716705,"RUWingRootRZ":0.014799154334038,"RUWingAllRX":0,"RUWingAllRY":0,"RUWingAllRZ":0,"RUWingVeinsAllRX":0.014799154334038,"RUWingVeinsAllRY":-0.030303030303030276,"RUWingVeinsAllRZ":0,"RLWingRootRX":0,"RLWingRootRY":0,"RLWingRootRZ":0,"RLWingAllRX":0,"RLWingAllRY":0,"RLWingAllRZ":0,"RLWingVeinsAllRX":0.03735024665257214,"RLWingVeinsAllRY":0,"RLWingVeinsAllRZ":0},"legs":{"symmetry":0,"Leg1RootRX":-0.21071176885130372,"Leg1RootRY":-0.07540521494009866,"Leg1RootRZ":-0.12050739957716705,"Leg1Femur":0.7589852008456659,"Leg1Tibia":-0.21071176885130372,"Leg1UTarsis":0.26286116983791397,"Leg1LTarsis":-0.16560958421423533,"Leg2RootRX":0.15010570824524305,"Leg2RootRY":0.10500352360817478,"Leg2RootRZ":-0.07540521494009866,"Leg2Femur":0.5560253699788584,"Leg2Tibia":-0.2558139534883721,"Leg2UTarsis":0.2854122621564481,"Leg2LTarsis":-0.075,"Leg3RootRX":0.3305144467935166,"Leg3RootRY":-0.007751937984496138,"Leg3RootRZ":0.001,"Leg3Femur":0.398167723749119,"Leg3Tibia":-0.23326286116983797,"Leg3UTarsis":0.24031007751937983,"Leg3LTarsis":-0.3009161381254405,"Leg4RootRX":-0.21071176885130372,"Leg4RootRY":-0.07540521494009866,"Leg4RootRZ":-0.12050739957716705,"Leg4Femur":0.7589852008456659,"Leg4Tibia":-0.21071176885130372,"Leg4UTarsis":0.26286116983791397,"Leg4LTarsis":-0.16560958421423533,"Leg5RootRX":0.15010570824524305,"Leg5RootRY":0.10500352360817478,"Leg5RootRZ":-0.07540521494009866,"Leg5Femur":0.5560253699788584,"Leg5Tibia":-0.2558139534883721,"Leg5UTarsis":0.2854122621564481,"Leg5LTarsis":-0.075,"Leg6RootRX":0.3305144467935166,"Leg6RootRY":-0.007751937984496138,"Leg6RootRZ":0.001,"Leg6Femur":0.398167723749119,"Leg6Tibia":-0.23326286116983797,"Leg6UTarsis":0.24031007751937983,"Leg6LTarsis":-0.3009161381254405}} 
}


