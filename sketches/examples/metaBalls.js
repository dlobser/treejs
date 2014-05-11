
sc1 = {
    
    setup:function(){
        
        tree = new TREE();
                
        tree.generate({
            joints:[30,15],
            divs:[1,6],
            angles:[0,.2],
            rads:[1,2],
            length:[4,2]

        })
        
        // scene.add(tree);
        
        tree.position.y = -50;

        bls = tree.metaBalls.init();
        tree.metaBalls.effect.animate=true;
        tree.metaBalls.setSize(60);
        tree.metaBalls.setResolution(70);
        tree.metaBalls.ballSize = 5.25;
        tree.metaBalls.updateBalls();
        // tree.metaBalls.showBox();

        scene.add(bls);

        setSliders({"var1":0,"var2":0,"var3":0.1,"var4":0.04047417442845047,"var5":0.25723962743437756,"var6":0.21388653683319214,"var7":0.6474174428450465})
        
    },
    
    draw:function(time){

        tree.passFunc(tree.makeInfo([
            [0,-1,-2],   {rz:data.var1*.1,jFreq:.3,jMult:.4,jFract:.03,jOff:time*2,sc:.98},
            [0,-1,-1,-1,-2],  {rx:0,sc:1+(data.var3*.2),rz:data.var2,jOffset:data.var4,jOff:count*data.var7*-.1,jFreq:data.var5,jMult:data.var6}
        ]),tree.transform)

        tree.metaBalls.updateBalls();
           
        if(varE){
            tree.metaBalls.setResolution(200);
            tree.metaBalls.updateBalls();
            generated = tree.metaBalls.generateGeo();
            scene.add(generated);
            scene.remove(bls);
            varE=false;
        }
        
    }
}


