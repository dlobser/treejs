
loaded = false;

function imgLoad(){
        imgTexture = THREE.ImageUtils.loadTexture( "assets/depthImages/mothOnly.png" );

       imagedata = getImageData( imgTexture.image );

       color = getPixel( imagedata, 10, 10 );
       loaded = true;
}

sc1 = {
    
    setup:function(){

        imgLoad();

        if(loaded){

        colors = [];

        for(var i = 0 ; i < 1024 ; i++){
            var row = [];
            for(var j = 0 ; j < 1024 ; j++){
                var c = getPixel(imagedata,i,j);
                row.push(c.r);
            }
            colors.push(row);
        }

        console.log(colors);



        console.log(color);

        tree = new TREE();

        frameRate = 1;

        for(var i = -5 ; i < 10 ; i++){
            ruler = new THREE.Mesh(new THREE.BoxGeometry(.99,1,.1),new THREE.MeshLambertMaterial());
            ruler.position.z = -1;
            ruler.position.x = i
            scene.add(ruler);
        }

        camera.fov=10;

            invertColor();

            sph = new THREE.Line(new THREE.Geometry(),new THREE.LineBasicMaterial({color:0x888888}));
            // sph.material = new THREE.LineBasicMaterial();
            // sph.geometry.vertices = [];
            // for(var i = 0 ; i < sph.geometry.faces.length ; i++){
            //     sph.geometry.faces[i].c = sph.geometry.faces[i].a;
            // } 
            // sph.geometry.faces = [];
            // console.log(sph);
            // sph.material.wireframe = true;
            scene.add(sph);
            // var deep = 0;
            // for(var k = 0 ; k < 4 ; k++){
            //     sph.geometry.vertices.push(new THREE.Vector3(0,0,.2));
            //     for(var i = 0 ; i < 2000 ; i++){
            //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
            //         for(var j = 0 ; j < 3 ; j++){
            //             sph.geometry.vertices.push(new THREE.Vector3(
            //                 Math.sin(i*.1)*i*.0015,
            //                 Math.cos(i*.1)*i*.0015,
            //                 -Math.abs(
            //                     noise(Math.sin(i*.1)*i*.001,Math.cos(i*.1)*i*.001,0))
            //                 *(k+1)*.3
            //                 ));
            //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
            //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
            //                 // console.log(deep);
            //             }
            //         }
            //     }
            //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
            //     sph.geometry.vertices.push(new THREE.Vector3(vert.x,vert.y,.2));
                
            // }

            // var deep = 0;
           

            // for(var k = 0 ; k < 4 ; k++){
            //     sph.geometry.vertices.push(new THREE.Vector3(0,0,.2));
            //     for(var i = 0 ; i < 1500 ; i++){
            //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
            //         for(var j = 0 ; j < 3 ; j++){
            //             sph.geometry.vertices.push(new THREE.Vector3(
            //                 Math.sin(i*.1)*i*.003,
            //                 Math.cos(i*.1)*i*.003,
            //                 (1+Math.sin(i*.6+(i*.02)))
            //                 *(k+1)*-.08*(i*.0007)
            //                 ));
            //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
            //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
            //             }
            //         }
            //     }
            //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
            //     sph.geometry.vertices.push(new THREE.Vector3(vert.x,vert.y,.2));
            // }

            // minVert = findMin(sph.geometry.vertices);
            // console.log(minVert);


            // for(var i = 0 ; i < sph.geometry.vertices.length ; i++){
            //     var vert = sph.geometry.vertices[i];
            //     vert.x += minVert[0];
            //     vert.y += minVert[1];

            //     vert.x /= minVert[0]*2;
            //     vert.y /= minVert[1]*2;

            //     xCoord = Math.round(vert.x*1023);
            //     yCoord = Math.round(vert.y*1023);

            //     vert.z*=.1;

            //     vert.z += colors[xCoord][yCoord]*.001;

            //     sph.geometry.vertices.needsUpdate = true;

            // }
            // console.log(findMin(sph.geometry.vertices));
            // cntr = 0;
            // var deep = 0;
            // for(var k = 0 ; k < 4 ; k++){
            //     sph.geometry.vertices.push(new THREE.Vector3(0,0,.2));
            //     for(var i = 0 ; i < 3000 ; i++){
            //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
            //         for(var j = 0 ; j < 3 ; j++){
            //             sph.geometry.vertices.push(new THREE.Vector3(
            //                 Math.sin(i*.05)*i*.0015,
            //                 Math.cos(i*.05)*i*.0015,
            //                 (1+Math.sin( Math.sin(i*.07)*i*.002 + Math.sin(i*.08)*i*.002))
            //                 *(k+1)*-.08*(i*.0007)
            //                 ));
            //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
            //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
            //                 // console.log(deep);
            //             }
            //         }
            //     }
            //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
            //     sph.geometry.vertices.push(new THREE.Vector3(vert.x,vert.y,.2));
                
            // }

            // cntr = 0;
            // var deep = 0;
            // for(var k = 0 ; k < 4 ; k++){
            //     sph.geometry.vertices.push(new THREE.Vector3(0,0,.2));
            //     for(var i = 0 ; i < 3000 ; i++){
            //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
            //         for(var j = 0 ; j < 3 ; j++){
            //             sph.geometry.vertices.push(new THREE.Vector3(
            //                 Math.sin(i*.05)*(i*.0015+Math.sin(Math.cos(i*.5+i*.0031))*.3),
            //                 Math.cos(i*.05)*(i*.0015+Math.sin(Math.cos(i*.5+i*.0031))*.3),
            //                 (1+Math.sin(i*.3 + i*i*.001))
            //                 *(k+1)*-.06*(i*.0007)
            //                 ));
            //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
            //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
            //                 // console.log(deep);
            //             }
            //         }
            //     }
            //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
            //     sph.geometry.vertices.push(new THREE.Vector3(vert.x,vert.y,.2));
                
            // }

            lines = [];

            for(var i = 0 ; i < 50 ; i++){
                line = [];
                for (var j = 0 ; j < 1000 ; j++){
                    var vert = new THREE.Vector3(
                            i+noise(i*.1,j*.01,0)*Math.cos(j/1000),
                            j/20+noise(i*.1,j*.01,0)*1,
                            0
                        );
                    line.push(vert);
                    sph.geometry.vertices.push(vert);
                }

                lines.push(line);
            }

            // cntr = 0;
            //  var deep = 0;
            //  topVerts = [];
            // for(var k = 0 ; k < 4 ; k++){
            //     var tVert = new THREE.Vector3(0,0,.2);
            //     topVerts.push(tVert);
            //     sph.geometry.vertices.push(tVert);
            //     for(var i = 0 ; i < 15000 ; i++){
            //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
            //         for(var j = 0 ; j < 3 ; j++){
            //             sph.geometry.vertices.push(
            //                 new THREE.Vector3(
            //                     Math.sin(i*.02)*(i*.0003+Math.sin(Math.cos(i*.1+i*.031))*.031),
            //                     Math.cos(i*.02)*(i*.0003+Math.sin(Math.cos(i*.1+i*.031))*.031),
            //                     (1+k)*.2
            //                     // ((1+Math.sin(i*.3 + i*i*.0000001))
            //                     // *(k+1)*-.002*(i*.0007))-.6
            //                     )
            //                 );
            //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
            //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
            //                 // console.log(deep);
            //             }
            //         }
            //     }
            //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
            //     var tVert = new THREE.Vector3(vert.x,vert.y,.2);
            //     sph.geometry.vertices.push(tVert);
            //     topVerts.push(tVert);
                
            // }

            //  minVert = findMin(sph.geometry.vertices);
            // console.log(minVert);


            // for(var i = 0 ; i < sph.geometry.vertices.length ; i++){
            //     var vert = sph.geometry.vertices[i];
            //     vert.x += minVert[0];
            //     vert.y += minVert[1];

            //     vert.x /= minVert[0]*2;
            //     vert.y /= minVert[1]*2;

            //     xCoord = Math.round(vert.x*1023);
            //     yCoord = Math.round(vert.y*1023);

            //     // vert.z*=.1;

            //     vert.z *= ((256-colors[xCoord][yCoord])*-1)*.005;

            //     sph.geometry.vertices.needsUpdate = true;

            //     vert.x *=10;
            //     vert.x -=5;
            //     vert.y *=10;
            //     vert.y -=5;

            // }

            // for(var i = 0 ; i < topVerts.length ; i ++){
            //     topVerts[i].z=.2;
            // }
            // console.log(findMin(sph.geometry.vertices));

            // cntr = 0;

            // spline = new THREE.SplineCurve3(sph.geometry.vertices);
            // tube = new THREE.TubeGeometry(spline,20000,.0625);
            // scene.add(new THREE.Mesh(tube,new THREE.MeshLambertMaterial()));

            // for(var j = 0 ; j <100 ; j++){
            //     sph.geometry.vertices.push(new THREE.Vector3(Math.random()*100,Math.random()*100,Math.random()*100));

            //     cntr++;
            //     if(cntr>1)
            //         cntr=0;

            //     if(cntr==1){
            //         var amt = sph.geometry.vertices.length-1;
            //                         console.log(amt);

            //         sph.geometry.faces.push(new THREE.Face3(amt,amt-1,amt));
            //     }
            // }
            // console.log(sph);

            up = 0;
            upf = 0;

            console.log(sph.geometry.vertices.length + " " + sph.geometry.faces.length);

            }
    },
    
    draw:function(time){

        if(varE){
            saveSBP(sph.geometry.vertices,"hot");
            console.log('hi');
            varE=false;
        }
        if(varY){
            // document.write(saveToSBP(sph.geometry.vertices));
            console.log(sph);
            // varY=!varY;
        
        // for(var k = 0 ; k<3 ; k++){
            // console.log(up+"up");
            var end = sph.geometry.vertices.length-1;

            for(var i = 0 ; i < sph.geometry.vertices.length-1 ; i++){
                var vert = sph.geometry.vertices[i];
                vert.x = sph.geometry.vertices[i+1].x;
                vert.y = sph.geometry.vertices[i+1].y;
                vert.z = sph.geometry.vertices[i+1].z;
            }

            sph.geometry.vertices[end].x = omouseX*width/2;
            sph.geometry.vertices[end].y = -omouseY*height/2;
            sph.geometry.vertices[end].z = 0;

            // cntr++;

            // console.log(cntr + " " + up);

            // if(k==2){
            //     var amt = upf;
            //     sph.geometry.faces[upf].a = up-1
            //     sph.geometry.faces[upf].b = up+1
            //     sph.geometry.faces[upf].c = up+2;
            //     upf+=1;
            //     // console.log(upf+"upf");
            //     // if(upf>sph.geometry.faces.length-1)
            //     //     upf=0;
            // }

            // if(cntr>2)
            //     cntr=0;

            // console.log(sph.geometry);
            // sph.geometry.faces.needsUpdate = true;

            sph.geometry.verticesNeedUpdate = true;
            // sph.geometry.elementsNeedUpdate = true;

            
            up++;
            if(up>sph.geometry.vertices.length-1){//} || upf>sph.geometry.faces.length){
                // sph.geometry.faces[upf-1].a = up
                // sph.geometry.faces[upf-1].b = up+1
                // sph.geometry.faces[upf-1].c = up+2;
                up=0;
                upf=0;
            }
           } 
           
        // }

        // console.log(sph);

    }
}

function saveToSBP(arr){

    var output = "";
    for(var i = 0 ; i < arr.length ; i++){
        output+="M3,"+arr[i].x+","+arr[i].y,+","+arr[i].z+"\n";
    }
    return output;
}

function findMin(arr){

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        if(minX>arr[i].x)
            minX = arr[i].x;
        if(minY>arr[i].y)
            minY = arr[i].y;
        if(minZ>arr[i].z)
            minZ = arr[i].z;
    }

    var ra = [minX,minY,minZ];
    return ra;
}

function saveSBP(arr,name) {

    // var scaleOut = outputScale || 1;

    // var name = name || "tree.obj";

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        if(minX>arr[i].x)
            minX = arr[i].x;
        if(minY>arr[i].y)
            minY = arr[i].y;
        if(minZ>arr[i].z)
            minZ = arr[i].z;
    }

    MinX = minX;
    MinY = minY;

    var output = "";

    console.log(MinX);
    console.log(MinY);
    console.log(minZ);

    for(var i = 0 ; i < arr.length ; i++){

        var offX = arr[i].x-MinX;
        var offY = arr[i].y-MinY;
        output+="M3,"+offX.toFixed(4);
        output+=","  +offY.toFixed(4);
        output+=","  +arr[i].z.toFixed(4);
        output+='\n';
    }
    // return output;
    // document.write(output);
    console.log("hio");
    // alert("saved!");
    var blob = new Blob([output], {type: "text/plain;charset=ANSI"});
    saveAs(blob, name);
}


function getImageData( image ) {

    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );

}

function getPixel( imagedata, x, y ) {

    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };

}

// var imagedata = getImageData( imgTexture.image );
// var color = getPixel( imagedata, 10, 10 );

