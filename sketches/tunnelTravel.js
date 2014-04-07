sc1 = {
    
    setup:function(){

        rift=true;

        camera.position.z=1000;

        tree = new TREE();

        tree.generate({
            joints: [90,3],
            divs:[1,4],
            length:[10,10],
            rads:[6,2],
            angles:[0,1],
            width:[.1]

        });

        tree.passFunc(tree.makeInfo([
            [0,-1,0],{rx:-0.046,rz:0},
            [0,-1,-2],{rz:-0.024,ry:0.474},
            [0,-1,-1,-1,-2],{rz:0.062,ry:-0.739},
            
        ]),tree.transform);

          tree.passFunc(tree.makeInfo([
            
            [0,-1,-2],{radians:.1,axis:new THREE.Vector3(0,1,0)},
          
            
        ]),tree.axisRotate);
        
        tunnel = tree.makeTubes();

        scene.add(tunnel);

    },

    draw:function(time){

    
        tunnel.position.z+=1;
        tunnel.rotation.x = .001*.1;
        tunnel.rotation.z = pi;
        tunnel.rotation.y = pi+.459*.1;

       
       
    }
}