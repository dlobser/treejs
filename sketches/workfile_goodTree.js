
sc1 = {
    
    setup:function(){

        // rift=true;
        // controls = new THREE.OculusRiftControls( camera );
        //         scene.add( controls.getObject() );
        // camera.position.z = 50;

// document.getElementById('container').innerHTML =
                        // effect.getInterpupillaryDistance().toFixed(3);

        tree = new TREE(); 
        tree.branch(); 
        scene.add(tree);
        codeName="treeMaker";
        
        tree.setScale(2);
        
        tree.position.y=-80;
        
        root = tree.makeList([0,0,-2]);

        //add branches
        
        var p = 20;
        
        for(var i = 30 ; i < 99 ; i++){
            var t = tree.FIND([0,0,i]);
            var amt = p;
            var b = (Math.round(Math.random()))+1;
            for(var j = 0 ; j < b ; j++){
             tree.appendBranch(t,{amount:amt,ry:Math.random()*pi*4,rz:Math.random()+.4,sc:4})
            }
            i+=1+Math.round(Math.random()*(i/2));
            p-=1;
        }

        //add twigs

        var lay = tree.reportLayers();

        for(var i = 0 ; i < lay[1].length ; i++){
           
            for(var j = 0 ; j < lay[1][i].joints ; j++){
                var t = tree.findJoint(lay[1][i],j);//Math.floor(Math.random()*lay[1][i].joints));
                var amt = -j+lay[1][i].joints;//1+Math.round(Math.random()*10);
                tree.appendBranch(t,{amount:amt,sc:3,ry:Math.random()*6});
                j+=Math.round(Math.random()+1)*2;
            }
        }
        
        branches1 = [];
        branches2 = [];
        

        tree.makeDictionary();
        
        var limbsArray = tree.report();

        for(var i = 0 ; i < limbsArray.length ; i++){
            for(var j = 0 ; j <= limbsArray[i].joints ; j++){
                
                // console.log(limbsArray[i][j]);

                var tempObj1 = tree.findJoint(limbsArray[i],j);
                // console.log(tempObj1);
                var name = (tempObj1.dictionaryName.split(","));
                var names = [];
                for(var k = 0 ; k < name.length ; k++){
                    names[k] = parseInt(name[k]);
                }
                // console.log(names);
                if(names.length==5 && names[names.length-1]!=0)
                    branches1.push(names);
                if(names.length==7 && names[names.length-1]!=0){
                    branches2.push(names);
                }
                
            }
        }
        

        setSliders({"var1":0.5,"var2":0.232,"var3":Math.random()*12.3,"var4":-.64,"var5":-0.3,"var6":0.2,"var7":-0.08});  
       
         tree.passFunc(tree.makeInfo([
            // [0,0,-1,-1,-1,-1,-2], {fract:.1},  
            [0,0,-1], {fract:0.0021,freq:.04,off:Math.random()*100}, 
            // [0,0,-1,[0,5],-2], {fract:.005},  
        ]),function(obj,args){
            obj.rotation.z+=noise(args.off+obj.joint*args.freq)*(obj.joint*args.fract);
            obj.rotation.x+=noise(.3+args.off+obj.joint*args.freq)*(obj.joint*args.fract);
        });
                vrstate = new vr.State();

        
    },
    
    draw:function(time){

        vr.requestAnimationFrame(animate);

                controls.isOnObject( false );

                var polled = vr.pollState(vrstate);
                // controls.update( Date.now() - time, polled ? vrstate : null );
        
        tree.applyFunc([
            branches1, {sc:.95,nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(.2),sc:.95},  
            root, {rx:0,rz:0,nMult:data.var1,nFreq:data.var2,nOff:data.var3-(.2),nFract:.03,sc:.99}, 
            branches2, {sc:.95,nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(.2),sc:.95},  
        ],tree.transform);
        
       
        
        if(varE){
            var lines = tree.worldPositionsArray(tree.report());
        
            lines2 = (tree.worldPositionsArray(tree.reportLayers()[0]));
            lines3 = (tree.worldPositionsArray(tree.reportLayers()[1]));
            lines4 = (tree.worldPositionsArray(tree.reportLayers()[2]));
            
            tubers = tree.tubes(lines2,{width:1,lengthSegs:3,widthSegs:13,minWidth:0,func:function(t){return 1/((t*.1)+1)*8}});
            for(t in tubers.children[0].geometry.vertices){
                var p = tubers.children[0].geometry.vertices[t];
                p.x+=noise(p.y*.2)*1;
                p.z+=noise(10+p.y*.2)*1;
                p.y+=noise(p.x*.2);
            }
            console.log(tubers);
            // tubers2 = tree.tubes(lines3,{});
            tubers3 = tree.tubes(lines4,{});

            tubers2 = tree.tubes(lines3,{width:1,lengthSegs:3,widthSegs:13,minWidth:0,func:function(t){return 1/((t*.1)+1)}});
           
            scene.add(tubers);
            scene.add(tubers2);
            scene.add(tubers3);
            scene.remove(tree);
            varE=false;
        }

    }
}

