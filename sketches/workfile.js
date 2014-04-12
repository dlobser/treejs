
sc1 = {
    
    setup:function(){
        
        tree = new TREE();
        
        tree.generate({
            joints:[100,10],
            divs:[1,5],
            rads:[1,2],
        })
        
        scene.add(tree);
        
        tree.makeDictionary();
        
        spine = tree.makeList([0,0,-1]);
        
        codeName = "edwards";
       
        // tree.applyFunc([
        //     spine, {amount:10},
        // ],tree.appendBranch);
        
         branches = tree.makeList([0,0,-1,-1,-1]);
    },

    draw:function(time){
        
        tree.applyFunc([
            spine, {rz:data.var3,nFreq:data.var1,nMult:data.var2},
            branches, {rz:data.var4,nFreq:data.var5,nMult:data.var6}
        ],tree.transform);

        if(var1){
            savePlot(tree);
            var1=false;
        }

    }
}

function savePlot(t,scale){

    var sc = scale || 1;

    var p = tree.worldPositionsArray(tree.report());
    var print = "$0=150.00 \n$1=150.00 \n$2=20.00 \n$4=3000.000 (default feed, mm/min) \n$5=3000.000 (default seek, mm/min) \n$8=20.00\n";
    print += "G1 X0 Y0 Z0\n";
    print += "G1 X0 Y0 Z40";

    for(var i = 0 ; i < p.length ; i++){

        print+="";
        
        for(var j = 0 ; j < p[i].length ; j++){

            if(j==0){
                print += "G1 X"+p[i][j].x*sc + " Y"+p[i][j].y*sc + " Z" + 40 + "\n";
            }

            print += "G1 X"+p[i][j].x*sc + " Y"+p[i][j].y*sc + " Z" + -40 + "\n";

            if(j==p[i].length-1){
                 print += "G1 X"+p[i][j].x*sc + " Y"+p[i][j].y*sc + " Z" + 40 + "\n";
            }
        }

    }

    var blob = new Blob([print], {type: "text/plain;charset=ANSI"});
    saveAs(blob, "plot.gcode");
}
