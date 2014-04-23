sc1 = {
    
    setup:function(){

        /*
            This code is from the introduction in the readme
        */
        
        tree = new TREE(); 
        tree.branch(); 
        scene.add(tree);
        
        var myJoint = tree.FIND([0,0,50]);
    
        myJoint.rotation.z = 1;
            
        tree.passFunc(tree.makeInfo([
            [0,0,49],   {rz:-1, amount:50}
        ]),tree.appendBranch);  
    
        var myOtherJoint = tree.FIND([0,0,0,0,25]);
        
        myOtherJoint.rotation.z = 1; 
    
        tree.passFunc(tree.makeInfo([
            [0,0,0,0,-1],   {rz:-1, amount:5,sc:10}
        ]),tree.appendBranch);  
    
        tree.passFunc(tree.makeInfo([
            [0,0,0,0,-2],       {rz:.04},
            [0,0,0,0,-1,0,-2],  {rz:.3,sc:.6}
        ]),tree.transform);  
        
        tree.passFunc(tree.makeInfo([
        [0,0,0,0,-1,0,-1],  {custom:.3}
        ]),
        function(obj,args){
            obj.rotation.x = Math.random();
            obj.rotation.y = args.custom;
        });  
        
        tree.makeDictionary();
        
        myJointList = tree.makeList([0,0,-1]);
    
        tree.applyFunc([
            myJointList,    {rz:.02}
        ],tree.transform);

    },
    
    draw:function(time){

    }
}





