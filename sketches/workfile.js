sc1 = {
    
    setup:function(){

        tree = new TREE();

        tree.generate({
            joints: [10,10],
            length: [10,5],
            width: [2,1]
        });

        var sph = sphere(3);
        tree.setScale(3);
        tree.position.y=-100;

        tree.passFunc(tree.makeInfo([
            [0,0,[0,9],[0,1],9],{obj:sph,ty:5},
        ]),tree.appendObj);
        
        data.var1=-.2;
        data.var3=-.4;

        scene.add(tree);

    },

    draw:function(time){

        tree.passFunc(tree.makeInfo([
            [0,0,"all"],
            {
                rz:data.var2,
                sc:.9,
                jMult:.1,
                jFreq:.7,
                jOff:time,
                jFract:.5
            },
            [0,0,[0,9],[0,1],"all"],
            {
                sc:.9,
                rz:data.var1,
                jMult:.3,
                jFreq:.7,
                jFract:.3,
                jOff:time,
                jOffset:.4
            },
            [0,0,[0,9],[0,1],0],
            {
                rz:data.var3
            }
        ]),tree.transform);
        
        if(varE){
             scene.add(tree.makeTubes());
            varE=false;
            console.log(varE);
        }

    }
}