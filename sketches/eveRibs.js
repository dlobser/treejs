
sc1 = {
    
    setup:function(){
        
        tree = new TREE();
        
        codeName = "eveRibs";
        
        tree.generate({
            joints:[50,15],
            angles:[0,pi],
            rads:[1,2],
            length:[3,5],
            width:[1,.2]
        })
        
        scene.add(tree);
        
        tree.position.y = -190;
        
        // var sph = new THREE.SphereGeometry(3,10,10);
        
        // var geo = new THREE.Mesh(sph,tree.params.mat);
        
        // var geo2 = geo.clone();
        // var geo3 = geo.clone();
        
        // geo.add(geo2);
        // geo.add(geo3);
        
        // geo2.position.x = 2;
        // geo3.position.x = -2;
        // m = new THREE.Geometry();

        // geo.traverse(function(o){
        //     THREE.
        // })
        
        //  tree.passFunc(tree.makeInfo([
            
        //     [0,-1,-1],   {ballGeo2:sph}
           
        // ]),tree.setGeo)

        setSliders({"var1":0.04047417442845047,"var2":0.25723962743437756,"var3":0.06215071972904318,"var4":0.40897544453852674,"var5":0.2,"var6":-0.8049110922946655,"var7":0.3})
        
    },
    
    draw:function(time){

        tree.passFunc(tree.makeInfo([
            //  [0,-1,-2],  {rz:0,nFreq:.2,nMult:.1},
            [0,-1,-2],   {rx:0.04*.1,
                sinScale:0.062,
                sinScaleMult:0.408*.1,
                sinOff:0.2},
           
            [0,-1,-1,0,-2], {sc:1+(-0.804*.3),rx:-0.257},
            [0,-1,-1,1,-2], {sc:1+(-0.804*.3),rx:0.257},
            [0,-1,-1,0,[3,5]], {rx:-0.257*2},
            [0,-1,-1,1,[3,5]], {rx:0.257*2},
            [0,-1,-1,-1,[0,5]], {scx:1.1},
            [0,-1,-1,0,[10,15]], {sc:1+(-0.804*.3),rz:.03,rx:-0.257*.2},
            [0,-1,-1,1,[10,15]], {sc:1+(-0.804*.3),rz:.03,rx:0.257*.2},
           
        ]),tree.transform)
        
        if(varE){
            
            e = new THREE.Object3D();
            thang = tree.reportLayers();
            thing = tree.worldPositionsArray(thang[0]);
            thing2 = tree.worldPositionsArray(thang[1]);

            args = {minWidth:3,lengthSegs:8,widthSegs:8,func:
                function(t){
                    return Math.sin(t*pi)*4;
                }
            };
            
            args2 = {width:0.1,lengthSegs:4,widthSegs:2};
            
            b = new THREE.Object3D();
            
            b.add(tree.tubes(thing,args));
            // b.add(tree.tubes(thing,args2));
        
            b.position.z=10;
            
            e.add(b);
            e.add(tree.tubes(thing2,{lengthSegs:6,widthSegs:9,func:
                function(t){
                    return Math.sin(t/3)*3;
                }
            }));
            
            // scene.add(tree.makeTubes({lengthSegs:5,func:
            //     function(t){
            //         return Math.sin(t)*20;
            //     }
            // }));
            // scene.add(e);
            scene.remove(tree);
            varE=false;
            
        }
        
        
        if(varR){
            
            outputScale=1;
            
            empty = new THREE.Geometry();

            e.traverse(function(o){o.updateMatrixWorld();if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});


            bls = tree.metaBalls.init();
            tree.metaBalls.effect.animate=true;
            tree.metaBalls.setSize(200);
            tree.metaBalls.setResolution(250);
            tree.metaBalls.ballSize = .25;
            // tree.metaBalls.updateBalls();
            // tree.metaBalls.showBox();

            varR=false;
            tree.metaBalls.updateBalls(empty.vertices);
            generated = tree.metaBalls.generateGeo();
            scene.add(generated);
        

            
        }

        
    }
}


