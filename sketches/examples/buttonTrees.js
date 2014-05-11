
sc1 = {
    
    setup:function(){

        tree = new TREE(); 
        tree.branch(); 
        scene.add(tree);
        
        tree.setScale(2);
        
        tree.position.y=-80;

        //add branches
        
        for(var i = 30 ; i < 99 ; i++){
            var t = tree.FIND([0,0,i]);
            var amt = 1+Math.round(Math.random()*(i/2));
            if(Math.random()>.95){
                var b = (Math.round(Math.random()*4))+1;
                for(var j = 0 ; j < b ; j++){
                 tree.appendBranch(t,{amount:amt,ry:Math.random()*pi*4,rz:Math.random(),sc:4})
                }
            }
        }

        //add twigs

        var lay = tree.reportLayers();

        for(var i = 0 ; i < lay[1].length ; i++){
                var b = (Math.round(Math.random()*4))+1;
                for(var j = 0 ; j < b ; j++){
                    var t = tree.findJoint(lay[1][i],Math.floor(Math.random()*lay[1][i].joints));
                    var amt = 1+Math.round(Math.random()*10);
                    tree.appendBranch(t,{amount:amt,sc:3,ry:Math.random()*6})
                }
        }
        
        tree.makeDictionary();
        
        setSliders({"var1":0.5,"var2":0.12,"var3":0.2,"var4":-0.34,"var5":-0.1,"var6":0.2,"var7":-0.08});  

    },
    
    draw:function(time){
        
        tree.passFunc(tree.makeInfo([
            [0,0,-1,[0,5],-1,-1,-2], {nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(time*.2),sc:1+(data.var7*.1)},  
            [0,0,-1], {rz:0,nMult:data.var1,nFreq:data.var2,nOff:data.var3-(time*.2),nFract:.03,sc:.99}, 
            [0,0,-1,[0,5],-2], {nObjOff:-1,rz:0,nMult:data.var4,nFreq:data.var5,nOff:data.var6-(time*.2),sc:1+(data.var7*.1)},  
        ]),tree.transform);
        
        if(varE){
            scene.add(tree.makeTubes());
            scene.remove(tree);
            varE=false;
        }

    }
}