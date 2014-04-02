sc1 = {

	setup:function(){

		lamp=true;

		   tree = new TREE();
        scene.add(tree);

        tree.generate({
            joints:[4,10,1,5,8],
            rads:[1,1,1,2,1],
            divs:[1],
            start:[1,1,7,0,4],
            angles:[0,0,Math.PI/2],
            length:[10,13,4,4,4],
            width:[3,3,2,2,4],
            end:[10,10,9],

        })

       joints = tree.makeList([0,0,-1,-1,-1,-1,0])
       
       insulatorsRootLeft  = tree.makeList([0,0,-1,-1,-1,0,-1,0,0,-1,0]);
       insulatorsRootRight = tree.makeList([0,0,-1,-1,-1,0,-1,1,0,-1,0]);

       crossesLRoot = tree.makeList([0,0,-1,-1,-1,-1,-1,0,0])
       crossesLAll =  tree.makeList([0,0,-1,-1,-1,-1,-1,0,-2])
       crossesRRoot = tree.makeList([0,0,-1,-1,-1,-1,-1,1,0])
       crossesRAll =  tree.makeList([0,0,-1,-1,-1,-1,-1,1,-2])

       rootBase = tree.makeList([0,0,-1,-1,0])
 	   root = tree.makeList([0,0,-1,-1,-2])
 	   rootRoot = tree.makeList([0,0,-2])

       var array = [];

       tree.passFunc([
        insulatorsRootLeft,{arr:array},
        insulatorsRootRight,{arr:array}
        ],function(obj,args){args.arr.push(obj)})



       // insulatorsRootRight = tree.makeList([0,0,-1,1,-1,1,1,-1,0])

       insulatorsAll = tree.makeList([0,0,-1,-1,-1,-1,-1,-1,-1,-1,-2])

        tree.passFunc([
            joints, {rx:Math.PI/2},
            insulatorsRootLeft,  {rz:0,rx:-Math.PI/2,      sc:.15},
            insulatorsRootRight, {rz:Math.PI,rx:-Math.PI/2,sc:.15},

            insulatorsAll,  {sinScale:1,sinScaleMult:.21,sinScaleFreq:2}
        ],tree.transform)

        tree.passFunc([
            insulatorsAll,  {sinScale:Math.PI/2,sinScaleMult:.1*2}
        ],function(obj,args){if(obj.joint%2==0){obj.jointMesh.scale.z=2;obj.jointMesh.scale.x=2}})
        
        tree.makeDictionary();
        console.log(tree);
        // //bark
        // sticks = new TREE();

        // sticks.generate({
        //     joints:[1,10],
        //     length:[3,2],
        //     rads:[6,2],
        //     width:[2],
        //     angles:[Math.PI/2]
        // })

        // sticks.makeDictionary();
        // stick = sticks.makeList([0,-1,-1,-1,-1]);

        // sticks.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        // ],sticks.transform)

        // sticks.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.9,nMult:.15,offsetter2:.001}
        // ],sticks.transform)

        // var sti = sticks.makeTubes();
        // // scene.add(sti);
        // sti.scale = new THREE.Vector3(.2,.08,.2);

        // var empty = new THREE.Geometry();

        // var stiGeo = sticks.mergeMeshes(sti);

        // //top

        // topper = new TREE();

        // console.log(topper);

        // topper.generate({
        //     joints:[1,10],
        //     length:[5,2],
        //     rads:[12,1],
        //     width:[1],
        //     angles:[Math.PI/2]
        // });

        // topper.makeDictionary();
        // stick = topper.makeList([0,-1,-1,-1,-2]);

        // topper.passFunc([
        //     stick,{sc:.9,rx:0,nFreq:.5,nMult:.1}
        // ],topper.transform)

        // topper.passFunc([
        //     stick,{sc:.9,rz:.1,nFreq:.9,nMult:.15,offsetter2:.001}
        // ],topper.transform)

        // var topperg = topper.makeTubes();
        // // scene.add(topperg);
        // topperg.scale = new THREE.Vector3(.2,.02,.2);

        // var topp = topper.mergeMeshes(topperg);



        // tree.passFunc(tree.makeInfo([
        //    [0,0,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
        //    [0,0,-1,-1,-1,-1,-1],{jointGeo:stiGeo,ballGeo:empty,ballGeo2:empty},
        //    [0,0,-3],{jointGeo:topp,ballGeo:empty,ballGeo2:empty},
        // ]),tree.setGeo)

        // tree.passFunc(tree.makeInfo([
        //    [0,0,-1],{},
        //    [0,0,-1,-1,-1,-1,-1],{}
        // ]),function(obj,args){obj.jointMesh.rotation.y=Math.random()*3})

        // tree.passFunc(tree.makeInfo([
        //    [0,0,6],{length:10},
        //    [0,0,6],{length:10},
        //    [0,0,7],{length:10},
        //    [0,0,7],{length:10},
        // ]),tree.appendBranch)
        
        // tree.passFunc(tree.makeInfo([
        //     [0,0,0,1,0],{scy:2,rz:.5,ry:Math.PI/2-.3},
        //     [0,0,0,0,0],{scy:2,rz:.5,ry:-Math.PI/2+.3},
        //     [0,0,0,1,-2],{rz:.1},
        //     [0,0,0,0,-2],{rz:.1},
        //     [0,0,1,2,0],{scy:2,rz:.5,ry:Math.PI/2-.3},
        //     [0,0,1,1,0],{scy:2,rz:.5,ry:-Math.PI/2+.3},
        //     [0,0,1,2,-2],{rz:.1},
        //     [0,0,1,1,-2],{rz:.1},
        // ]),tree.transform)

        // tree.passFunc(tree.makeInfo([
        //    [0,0,7],{tree:{joints:[5,5],rads:[1,10],angles:[1],length:[3,4],start:[4],angles:[pi],width:[1,3]}},
        // ]),tree.appendTree)

        //  tree.passFunc(tree.makeInfo([
        //    [0,0,1,3,0],{rz:1,ry:pi+pi/2},
        //    [0,0,1,3,0,-1,-2],{rz:-.04},
        //    [0,0,1,3,0,-1,1],{rz:-pi},
        //    [0,0,1,3,0,-1,4],{rz:-pi},
        //    [0,0,1,3,-2],{rz:.55},
        // ]),tree.transform)

        //   var lampArray = [];

        // if(lamp==true){
        
        //     tree.passFunc(tree.makeInfo([
        //        [0,0,9],{tree:{joints:[15,5],rads:[1,10],angles:[1],length:[3,1],start:[14],angles:[.5,pi],width:[1,1]}},
        //     ]),tree.appendTree)

        //      tree.passFunc(tree.makeInfo([
        //       [0,0,3,0,0],{rz:.3},
        //       [0,0,3,0,0,-1,-2],{rz:-.04},
        //       [0,0,3,0,0,-1,3],{rz:-1},
        //       [0,0,3,0,0,-1,4],{rz:-1},
        //       [0,0,3,0,-2],{rz:.1},
        //       [0,0,3,0,14],{rz:1},
        //     ]),tree.transform)

        //      lamp=false;

        //      var lampPos = tree.makeList([0,0,3,0,0]);

        //     tree.passFunc([
        //         lampPos,{arr:lampArray},
        //     ],function(obj,args){args.arr.push(obj)})


        // }



        //  tree.passFunc(tree.makeInfo([
        //   [0,0,-2],{rz:0,ry:0,rz:0,nMult:Math.random()*.5,nFreq:Math.random()},
          
        // ]),tree.transform)

        //  var tempLamp = [];
        //  tempLamp.push(lampArray)
        // var insulatorPositions = tree.worldPositionsArray(array);
        // var lampPositions = tree.worldPositionsArray(lampArray);

	},

	draw:function(time){
		tree.passFunc([
	        crossesLRoot,	{ry:.12-pi},
	        crossesLAll,	{rx:.2},
	        crossesRRoot,	{ry:-.12-pi},
	        crossesRAll,	{rx:-.2},
	        root, 			{ry:.02,rx:0,jFract:omouseX*3,jMult:1,jFreq:.001,jOff:1,sc:.9,offsetter3:-.2},
	        rootRoot,		{rx:0,jFract:omouseX,jMult:1,jFreq:.001,jOff:1,sc:.9,offsetter:1},
	        rootBase,		{rx:data.var1},
        ],tree.transform)
		
		if(var1){
			bargles = tree.makeTubes({lengthSegs:5,minWidth:2});
			scene.add(bargles);
			scene.remove(tree);
			saver("pole.obj");
			var1=false;
		}
		
	}
}