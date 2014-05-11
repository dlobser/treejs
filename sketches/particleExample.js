sc1 = {
    
    setup:function(){
        noLights = true;
        particles = new THREE.SphereGeometry(12,12,12);

        particles.needsUpdate = true;

        // create the particle variables
        var pMaterial =
          new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            depthWrite:false,
            size: 34,
            map: THREE.ImageUtils.loadTexture(
              "assets/textures/particle.png"
            ),
            //blending: THREE.AdditiveBlending,
            transparent: true
          });
        
        // create the particle system
        particleSystem =
          new THREE.ParticleSystem(
            particles,
            pMaterial);

     
        particleSystem.sortParticles = true;
        particleSystem.geometry.vertices.needsUpdate = true;
      
        scene.add(particleSystem);
    },

    draw:function(time){

        for(var i = 0 ; i < particles.vertices.length ; i++){
            particles.vertices[i].x += -.5+Math.random();

        }

    }
}