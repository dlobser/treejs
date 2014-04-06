sc1 = {

    //telephone poles
    
    setup:function(){

        tree = new TREE();
        // tree.position.y=-100;

        tree.generate({
            joints: [5,20,10,5],
            divs:   [1,1,2,4],
            start:  [0,0,16,9],
            angles: [0,2,Math.PI/2,-Math.PI/2],
            length: [10,10,3,1],
            rads:   [1,1,2,1],
            width:  [4,3,2,1]
        });

        scene.add(tree);


        tree.passFunc(tree.makeInfo([
            [0,0,0], {rx:-.3},
            [0,0,-1], {ry:.5,rz:.2,sc:1},
            [0,0,[12,15]], {sc:1},
            [0,0,-1,0,-2], {rx:0,offMult:.0,freq:1,jMult:.02,jFract:4.5,jOffset:.2,offsetter3:0.01,jFreq:.02},
            // [0,0,-1,0,-2], {rz:0.01},//,freq:.1,offMult:-1,offsetter3:1},
            [0,0,-1,0,-1,-1,0], {rz:.1},

            [0,0,-1,0,-1,-1,-2], {rz:.2},

            [0,0,-1,0,0], {rz:0},
            [0,0,-1,0,1], {ry:Math.PI/2},

        ]),
        tree.transform);

        roots = new TREE();
        // tree.position.y=-100;

        roots.generate({
            joints: [20,10],
            divs:   [1,2],
            start:  [0,17],
            angles: [pi],
            length: [5],
            rads:   [6,2],
            width:  [4],
        });

        scene.add(roots);


        rebuildGui({sliders:25,values:{
            rootrx:0,
            rootry:0,
            rootrz:0,
            allrx:0,
            alloffMult:0,
            allFreq:0,
            allJMult:0,
            allJFract:0,
            alljOffset:0,
            alloffsetter:0,
            allJFreq:0,
            branchesRootrz:0,
            branchesAllrz:0,
            allRootrz:0,
            rrx:0,
            rry:0,
            rrz:0,
            buttrz:0,
            buttallrx:0,
            buttallrz:0,
            buttsc:0,
            brrz:0,
            brry:0,
            brsc:0,
            rootPolesrx:0,
            rootPolesry:0,
            rootPolesrz:0,
            rootPolesAllrx:0,
            rootPolesAllry:0,
            rootPolesAllrz:0,



        }})
        

    },

    draw:function(time){

        if(varR){

            var info2 = {
                rootrx:(.5-Math.random())*.5,
                // rootry:(.5-Math.random())*.1,
                // rootrz:(.5-Math.random())*.1,
                allrx:(.5-Math.random())*.1,
                alloffMult:(.5-Math.random())*.5,
                allFreq:(.5-Math.random())*.8,
                allJMult:(.5-Math.random())*.3,
                allJFract:(.5-Math.random())*.8,
                alljOffset:(.5-Math.random())*.8,
                alloffsetter:(.5-Math.random())*.8,
                allJFreq:(.5-Math.random())*.5,
                // branchesRootrz:(.5-Math.random())*.1,
                // branchesAllrz:(.5-Math.random())*.1,
                allRootrz:(.5-Math.random())*3,
                // rrx:(.5-Math.random())*.1,
                // rry:(.5-Math.random())*.1,
                // rrz:(.5-Math.random())*.1,
                buttrz:.5+(Math.random())*.1,
                buttallrx:(.5-Math.random())*.1,
                buttallrz:(.5-Math.random())*.1,
                // buttsc:(.5-Math.random())*.1,
                brrz:(.5-Math.random())*.1,
                brry:(.5-Math.random())*.1,
                // brsc:(.5-Math.random())*.1,
                rootPolesrx:(.5-Math.random())*.1,
                rootPolesry:(.5-Math.random())*.1,
                rootPolesrz:(.5-Math.random())*.1,
                rootPolesAllrx:(.5-Math.random())*.1,
                rootPolesAllry:(.5-Math.random())*.1,
                rootPolesAllrz:(.5-Math.random())*.1,



            };

            for (var key in info2) {
                if (info2.hasOwnProperty(key)){
                    // for (var hey in info2[key]) {
                        // if(typeof info2[key][hey] == "number")
                            data[key] = info2[key];
                    // }
                }
            }
            varR=false;
        }

        roots.passFunc(roots.makeInfo([
            [0,-1,0], {rz:data.buttrz*5},
            [0,-1,-2], {rx:data.buttallrx,rz:data.buttallrz,sc:data.buttsc*2.5},
            [0,-1,-1,-1,-1], {rx:data.rootPolesAllrx*2,rz:data.rootPolesAllrz*2,ry:data.rootPolesAllry*2},
            [0,-1,-1,0,-1], {rx:data.rootPolesAllrx*2,rz:-data.rootPolesAllrz*2,ry:-data.rootPolesAllry*2},

            [0,-1,-1,0,0],  {rx:data.rootPolesrx*2,rz:data.rootPolesrz*2,ry:data.rootPolesry*2},
            [0,-1,-1,1,0],  {rx:data.rootPolesrx*2,rz:-data.rootPolesrz*2,ry:-data.rootPolesry*2},


        ]),
        roots.transform);

         tree.passFunc(tree.makeInfo([
           
            [0,0,-1], {ry:data.rootrx*2,rz:data.rootry,rx:data.rootrz,sc:1},
            [0,0,[12,15]], {sc:1},
            [0,0,-1,-1,-2], {rx:data.allrx,offMult:data.alloffMult,freq:data.allFreq,jMult:data.allJMult*.2,jFract:data.allJFract*10,jOffset:data.alljOffset,offsetter3:data.alloffsetter*.1,jFreq:data.allJFreq*.1},
            [0,0,-1,-1,-2], {rz:data.brrz,ry:data.brry,sc:data.brsc+1},//,freq:.1,offMult:-1,offsetter3:1},
            [0,0,-1,-1,-1,-1,0], {rz:data.branchesRootrz},

            [0,0,-1,-1,-1,-1,-2], {rz:data.branchesAllrz},

            [0,0,-1,-1,0], {rz:data.allRootrz},
            [0,0,-1,-1,1], {ry:Math.PI/2},
             [0,0,0], {rx:data.rrx*6,ry:data.rry*6,rz:data.rrz*6},

        ]),
        tree.transform);

         if(varY){
            console.log(JSON.stringify(data));
            console.log("hi");
            varY = false;
        }

        if(varW){
            var info2 = updateArgs();
            for (var key in info2) {
                if (info2.hasOwnProperty(key)){
                    // for (var hey in info2[key]) {
                        // if(typeof info2[key][hey] == "number")
                            data[key] = info2[key];
                    // }
                }
            }
            varW = false;
        }

        if(var1){
            var poles = tree.reportLayers();

            var stuff = (tree.worldPositionsMultiArray(poles));

            console.log(stuff[3]);
            
            var st1,st2;
             st1 = [];
                st2 = [];
            
            for(var i = 0 ; i < stuff[3].length ; i++){
               
                if(i%2==0){
                    st1.push(stuff[3][i]);
                }
                else
                    st2.push(stuff[3][i]);
            }
                        console.log(st1);

            for(var i = 0 ; i < st2.length ; i++){
                st1.push(st2[i]);
            }
            var Lines = [];


            stuff[3]=st1;
            

            for(var j = 0 ; j < 4 ; j++){
                
                for(var i = 0 ; i < stuff[3].length-3 ; i+=4){
                    var lines = [];
                    lines.push(stuff[3][i+j][4]);
                    // lines.push(stuff[3][i+j][4]);
                    if(i+j+1 < stuff[3].length-3){
                        // if(i%stuff[3].length/4!=0){
                        var v = stuff[3][i+j][4].clone();
                        v.y-=100;
                        lines.push(v.lerp(stuff[3][i+j+4][4],.5));
                        lines.push(stuff[3][i+j+4][4]);


                    }
                    Lines.push(lines);

                }
            }

        
            scene.add(tree.tubes(Lines,{lengthSegs:14,minWidth:2,width:1}));
            bargles = tree.makeTubes({widthSegs:12,lengthSegs:5,minWidth:2,width:1});
            bargles2 = roots.makeTubes({widthSegs:12,lengthSegs:5,minWidth:2,width:1});
            scene.add(bargles);
            scene.add(bargles2);
            scene.remove(tree);
            scene.remove(roots);
            // saver("pole.obj");
            var1=false;
        }

    
    }
}


function updateArgs(){

// return JSON.parse('{"var1":0.4956816257408976,"var2":0.4956816257408976,"var3":0.45232853513971216,"var4":0.300592718035563,"var5":0.21388653683319214,"var6":0.19220999153259943,"var7":0.1055038103302286,"var8":0.14885690093141402,"var9":0.14885690093141402,"var10":0.14885690093141402,"var11":0,"var12":0,"var13":0,"var14":0}  ');

//pot
// return JSON.parse('{"var1":-0.0028789161727349466,"var2":0.018797629127857762,"var3":1,"var4":-0.024555461473327655,"var5":0.25723962743437756,"var6":-0.17629127857747673,"var7":0.08382726502963589,"var8":0.1271803556308213,"var9":0.1055038103302286,"var10":0.17053344623200672,"var11":0.17053344623200672,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.21388653683319214}')
//vedalia
//return JSON.parse('{"var1":0.04047417442845047,"var2":0.6474174428450465,"var3":-0.046232006773920364,"var4":-0.0028789161727349466,"var5":0.300592718035563,"var6":-0.1112616426756986,"var7":0.17053344623200672,"var8":-0.06790855207451307,"var9":0.1271803556308213,"var10":0.21388653683319214,"var11":0.47400508044030487,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.21388653683319214}')
//dancing
// return JSON.parse('{"var1":0.04047417442845047,"var2":0.6474174428450465,"var3":-0.046232006773920364,"var4":-0.0028789161727349466,"var5":0.300592718035563,"var6":-0.1112616426756986,"var7":0.17053344623200672,"var8":-0.06790855207451307,"var9":0.1271803556308213,"var10":0.21388653683319214,"var11":0.47400508044030487,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.5823878069432684,"var15":0.04047417442845047,"var16":0.04047417442845047,"var17":0.43065198983911945,"var18":0,"var19":0,"var20":0}')
//swirling
// return JSON.parse('{"var1":0.018797629127857762,"var2":0.21388653683319214,"var3":-0.0028789161727349466,"var4":0.04047417442845047,"var5":0.25723962743437756,"var6":0.19220999153259943,"var7":-0.06790855207451307,"var8":0.17053344623200672,"var9":0.1271803556308213,"var10":0.21388653683319214,"var11":0.23556308213378485,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.5823878069432684,"var15":0.04047417442845047,"var16":0.04047417442845047,"var17":0.40897544453852674,"var18":0,"var19":0,"var20":0} ')
//swirling new base
//return JSON.parse('{"var1":0.018797629127857762,"var2":0.21388653683319214,"var3":-0.0028789161727349466,"var4":0.04047417442845047,"var5":0.25723962743437756,"var6":0.19220999153259943,"var7":-0.06790855207451307,"var8":0.17053344623200672,"var9":0.1271803556308213,"var10":0.21388653683319214,"var11":0.23556308213378485,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.33378886231636495,"var15":0.07140416809019468,"var16":0.0932695592757089,"var17":0.3993850358729074,"var18":0.596173556542535,"var19":0,"var20":0}')

//willow
// return JSON.parse('{"var1":0.04953877690468067,"var2":0.44311581824393587,"var3":-0.0028789161727349466,"var4":0.15886573283225136,"var5":0.22446190638879404,"var6":0.33378886231636495,"var7":-0.06790855207451307,"var8":0.17053344623200672,"var9":0.1271803556308213,"var10":-0.7376153057738298,"var11":0.23556308213378485,"var12":0.14885690093141402,"var13":-0.696528365791702,"var14":0.6180389477280492,"var15":0.04953877690468067,"var16":0.0058079945336522165,"var17":0.3993850358729074,"var18":0.33378886231636495,"var19":0,"var20":0} ')
//sprigle
// return JSON.parse('{"var1":0.5950155763239875,"var2":-0.31325718241606093,"var3":0.37348563516787814,"var4":0.15886573283225136,"var5":0.30702665282104524,"var6":0.33378886231636495,"var7":-0.0031152647975077885,"var8":0.019037729318103214,"var9":0.17410868812737967,"var10":-0.6012461059190031,"var11":1,"var12":0.08549671166493589,"var13":-1,"var14":0.5507095880927657,"var15":0.041190723433714105,"var16":0.019037729318103214,"var17":0.39563862928348903,"var18":0.30702665282104524,"var19":-0.13603322949117347,"var20":0.17410868812737967,"var21":-0.0031152647975077885,"var22":0,"var23":0,"var24":0,"var25":0} ')
//wide
// return JSON.parse('{"var1":0.5950155763239875,"var2":-0.20249221183800625,"var3":0.019037729318103214,"var4":0.019037729318103214,"var5":0.1298026998961579,"var6":0.063343717549325,"var7":-0.11388023537556247,"var8":-0.09172724125995158,"var9":0.24056767047421257,"var10":0.37348563516787814,"var11":0.43994461751471103,"var12":0.15195569401176878,"var13":0.32917964693665636,"var14":0.1298026998961579,"var15":-0.0031152647975077885,"var16":0.107649705780547,"var17":0.41779162339910014,"var18":-0.4018691588785047,"var19":0.019037729318103214,"var20":0.041190723433714105,"var21":0.019037729318103214,"var22":0.041190723433714105,"var23":0.21841467635860168,"var24":-0.04742125302872968,"var25":0} ')
//new normal
// return JSON.parse('{"rootrx":0,"rootry":0,"rootrz":0,"allrx":0,"alloffMult":0.041190723433714105,"allFreq":-0.02526825891311868,"allJMult":0.041190723433714105,"allJFract":0.39563862928348903,"alljOffset":0.37348563516787814,"alloffsetter":-0.0031152647975077885,"allJFreq":0.41779162339910014,"branchesRootrz":0.5728625822083766,"branchesAllrz":0.17410868812737967,"allRootrz":1,"rrx":0,"rry":0,"rrz":0,"buttrz":0.5285565939771548,"buttallrx":0.041190723433714105,"buttallrz":0.08549671166493589,"buttsc":0.39563862928348903,"brrz":0,"brry":0,"brsc":0,"rootPolesrx":-0.18033921772239525,"rootPolesry":-0.18033921772239525,"rootPolesrz":-0.24679820006922815,"rootPolesAllrx":0.041190723433714105,"rootPolesAllry":0.15195569401176878,"rootPolesAllrz":0.107649705780547,"var1":0,"var2":0,"var3":0,"var4":0,"var5":0,"var6":0,"var7":0,"var8":0,"var9":0,"var10":0,"var11":0,"var12":0,"var13":0,"var14":0,"var15":0,"var16":0,"var17":0,"var18":0,"var19":0,"var20":0,"var21":0,"var22":0,"var23":0,"var24":0,"var25":0} ')
//planty
// return JSON.parse('{"rootrx":0,"rootry":0,"rootrz":0,"allrx":-0.3797161647628937,"alloffMult":0.041190723433714105,"allFreq":-0.02526825891311868,"allJMult":0.041190723433714105,"allJFract":0.39563862928348903,"alljOffset":0.37348563516787814,"alloffsetter":-0.0031152647975077885,"allJFreq":0.4620976116303219,"branchesRootrz":0.8165455174800968,"branchesAllrz":0.107649705780547,"allRootrz":-0.04742125302872968,"rrx":-0.0031152647975077885,"rry":0,"rrz":0,"buttrz":0.5285565939771548,"buttallrx":0.041190723433714105,"buttallrz":0.30702665282104524,"buttsc":0.39563862928348903,"brrz":0.15195569401176878,"brry":0.1298026998961579,"brsc":0,"var1":0,"var2":0,"var3":0,"var4":0,"var5":0,"var6":0,"var7":0,"var8":0,"var9":0,"var10":0,"var11":0,"var12":0,"var13":0,"var14":0,"var15":0,"var16":0,"var17":0,"var18":0,"var19":0,"var20":0,"var21":0,"var22":0,"var23":0,"var24":0,"var25":0} ')
//planty2
// return JSON.parse('{"rootrx":0,"rootry":0,"rootrz":0,"allrx":0,"alloffMult":0.02364394993045904,"allFreq":0.3129346314325452,"allJMult":0.06815020862308763,"allJFract":0.49095966620305975,"alljOffset":-0.08762169680111265,"alloffsetter":0.06815020862308763,"allJFreq":0.06815020862308763,"branchesRootrz":0.5799721835883171,"branchesAllrz":0.17410868812737967,"allRootrz":-0.5326842837273992,"rrx":0.0013908205841446364,"rry":0,"rrz":0,"buttrz":0.5285565939771548,"buttallrx":0.041190723433714105,"buttallrz":0.08549671166493589,"buttsc":0.39563862928348903,"brrz":0,"brry":0,"brsc":0,"rootPolesrx":-0.18033921772239525,"rootPolesry":-0.18033921772239525,"rootPolesrz":-0.24679820006922815,"rootPolesAllrx":0.041190723433714105,"rootPolesAllry":0.15195569401176878,"rootPolesAllrz":0.107649705780547,"var1":0,"var2":0,"var3":0,"var4":0,"var5":0,"var6":0,"var7":0,"var8":0,"var9":0,"var10":0,"var11":0,"var12":0,"var13":0,"var14":0,"var15":0,"var16":0,"var17":0,"var18":0,"var19":0,"var20":0,"var21":0,"var22":0,"var23":0,"var24":0,"var25":0} ')
//fancy wine glass
return JSON.parse('{"rootrx":-0.024367439723573626,"rootry":0,"rootrz":0,"allrx":0.04311622630339116,"alloffMult":-0.2408813958754763,"allFreq":-0.022926700650714338,"allJMult":-0.06970776105299592,"allJFract":-0.38953273091465235,"alljOffset":-0.22370884486008435,"alloffsetter":0.16532320796977729,"allJFreq":-0.07563810865394771,"branchesRootrz":1,"branchesAllrz":0.063343717549325,"allRootrz":-0.030689713102765383,"rrx":0,"rry":0,"rrz":0,"buttrz":0.5950155763239875,"buttallrx":0.041190723433714105,"buttallrz":0.03974289076868445,"buttsc":0.39563862928348903,"brrz":0.022303615440614523,"brry":-0.09172724125995158,"brsc":0,"rootPolesrx":0.008597868238575756,"rootPolesry":0.041190723433714105,"rootPolesrz":-0.02526825891311868,"rootPolesAllrx":0.041190723433714105,"rootPolesAllry":0.041190723433714105,"rootPolesAllrz":0.063343717549325,"var1":0,"var2":0,"var3":0,"var4":0,"var5":0,"var6":0,"var7":0,"var8":0,"var9":0,"var10":0,"var11":0,"var12":0,"var13":0,"var14":0,"var15":0,"var16":0,"var17":0,"var18":0,"var19":0,"var20":0,"var21":0,"var22":0,"var23":0,"var24":0,"var25":0} ')
}