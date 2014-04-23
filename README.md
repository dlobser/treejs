Turbine 0.2
======

## A parametric animation and modeling tool for threejs

####(Turbine0.1 is here)   
####Gallery

This document briefly outlines some of the basic functionality of Turbine.  I built this tool for myself for two reasons: parametric modeling for 3D prints and animation.  It is low level, general purpose and possibly somewhat obtuse.  It is also possible to make extremely complex and elegant animating sculptures with relatively little code.  It is called Turbine because I feel like I've stuck my head in one while wrestling with recursive functions.  

This is a gallery of work generated in Turbine.  

##Interface

orbit controls for mouse - zoom and rotate
  
h hides sliders  
ctrl-c shows editor  
ctrl-v runs code   
ctrl-i inverts colors  
ctrl-shift-i makes code background opaque  
ctrl-space pauses animation  
ctrl-r slider values copied to code  
ctrl < and > makes code bigger and smaller    
ctrl - and + makes code window bigger and smaller    
arrows move tree when code view is invisible     
ctrl-shift-s saves file    
  
### variables  
`codeName = "string" ` name of code to save with ctrl+shift+s    
`frameRate = 1000/30 ` by default    
`noLights = boolean ` (removes default lights)    
`rift = true` enable Oculus Rift effect (doesn't work with default camera)  
`varW,varE,varR...T,Y,1,2,3,4,5,6,7` - these are all automatically set to false    
ctrl+W will make varW true - as with the others, useful for quick keyboard shortcuts  
`time` is delta time  
`count` is the frame count  
`omouseX` (and Y) is the mouse position from -.5 to .5 in screen space  
`mouseX` from 0 to 1 in screen space  
`rmouseX` position of the mouse from 0 to horizontal resolution  
`pmouseX` previous position of mouseX  
`opMouseX` same but with omouseX  

####GUI 

`h` hides dat.gui - you can access the values on the sliders like this:  

	var thing = data.var1;  

Once you have values you like ctrl+r will copy those to your code.  
You can easily customize the gui.  

	setSliders({"var1":1,"var2":2,etc});  
	rebuildGui({values:{customVal1:0,customVal2:0},sliders:31});  
  
###Files  
  
`TREE.js` requires THREEjs  
`library.js` lots of helper functions  
  
the following are not necessarily required:  
  
`fungus.js` a simple branching simulator  
`setupAce.js` script to set up the ace editor  
`template.js` behind the scenes THREEjs elements  
`webAudio.js` functions to add sounds to 3d objects  
`blob.js` helpful for saving files  
  
###Functions

*	Branching    
		*	`generate()` generate complex, usually symmetrical tree structures    
		*	`branch()` create one branch    
		`appendBranch()` attach a branch to a joint    
		`appendTree()` generate a tree from a specified joint  

*	Organization  
		*	`makeInfo()` takes an array [[0,0,0],{rz:0}] like that and makes an object which can be passed along  
		*	`makeList()` takes an array [0,0,-1] and returns a list of many arrays  
		*	`makeDictionary()` Assigns a name to each joint  
		*	`FIND()` will return one joint given an array  
		`report()` creates a list of joints  
		`reportLayers()` a list of joints organized by their branch level  
		`worldPositionsArray()` makes an array of vectors in the world positions of the joints  
		
*	Transforming  
		*	`transform()` a function designed to move joint chains in every imaginable way  
		*	`passFunc()` works well with `makeInfo()` to pass functions to joints on the fly  
		*	`applyFunc()` works well with `makeDictionary()` othewise does the same as `passFunc()`  
		`aimAt()` slow and janky - will aim at an object in world space  
		`axisRotate()` will rotate joints in an arbitrary axis in world space  
		`setJointLength()`   
		`setJointWidth()`  
  
*	Modeling  
		*	`makeTubes()` converts joint chains to extruded tubes (3d printable!)  
		`solidSurface()` generates a surface, using joints as cross sections, and gives the surface thickness  
		`openSurface()` same, but doesn't extrude the geometry  
		`metaBalls{}` a set of tools to generate implicit surfaces  
		`mergeMeshes()` takes a joint and merges all the geometry under it in the hierarchy  
		`setGeo()` swap out the default geometry on each joint  
		`nurbsishSurface()` makes an array of vectors which can be used as splines   
		`makeSkinnedGeo()` janky - this will convert geo to skinned, accelerated geo  
  


####Basics 

*this command will create a single branch with 100 joints by default*  

`tree = new TREE();  
tree.branch();  
scene.add(tree);` 
  
*this slightly more complicated example demonstrates the creation of a sierpinski like branching structure*  

`tree = new TREE();  
tree.generate({joints:[1],angles:[1],rads:[3,3,3,3,3,3],length:[10]})  
scene.add(tree);`  
  
*`generate` accepts an object as an argument, any arguments that are not passed will be filled in by default:*  

`{ joints:[], divs:[], start:[], angles:[], length:[], rads:[], width:[], end:[]};  `

joints: The number of joints on a particular branch layer  
divs: how often the branch sprouts new branches (every 1st, 2nd, 5th joint etc)  
start: at which joint the branch starts branching  
angles: the angle that new branches will be rotated to  
length: how long each joint on a branch is  
rads: how many branches sprout from each joint  
width: width of the branches  
end: the last joint on a branch that will sprout  

####A Lesson

The following is the preset called `basics`.  
  
Once a tree has been created you will want to do things to it.  In order to accomplish this you must be able to access parts of the tree.  There are a variety of ways to do this.  `FIND` is the most fundamental way.  If you want to follow along with this example start by branching a tree as shown above:  

`tree = new TREE();  
tree.branch();  
scene.add(tree);` 
  
and then we can find one joint and assign it to a variable:  

`var myJoint = tree.FIND([0,0,50]);`  

myJoint is now a threejs Object3D which can be manipulated by normal means.  

`myJoint.rotation.z = 1;`  

You should now have a stick with a crook in it.  

*But what does this mean: [0,0,50] ???*  

Finding each joint in a chain relies on recursive functions.  The arguments the search functions get work like this:  

`[0,0,50]`  

The first item in the array always refers to the root and it is _always_ `0`.  The second item in the array refers to which of potentially lots of branches we're referring to.  Imagine a yucca plant, there are lots of leaves coming from the root, the first element refers to the origin of the yucca plant, and the second item refers to which leaf (branch) we want to select (0 indexed always).  In this case, we've only grown one branch from the origin.  The last item in the array refers to which joint along that chosen branch we want to refer to.  Please make sure you're getting this concept as everything else depends on this.  
  
Now that we have our joint selected and assigned to a variable we can start to do things with it, add other branches for instance.  Add this line to your code:

	tree.passFunc(tree.makeInfo([
		[0,0,49],   {rz:-1, amount:50}
    ]),tree.appendBranch);  

If all is well you should have a Y shaped tree now.  Let's select a joint on the second branch and transform that.  We'll find it again.  

`var myOtherJoint = tree.FIND([0,0,0,0,25]);`  

and we'll rotate this in the same way:  

`myOtherJoint.rotation.z = 1;`  

Notice how much longer the search array has become - there are now 5 items.  

[root,which branch, which joint with branches, which branch, which joint on the branch]  

In this case there is just one branch branching from the first branch.  So we select the root, the first (and only) branch, then the joint which has branches (there is only one), then which of potentially several branches come off of that joint (in this case there is only one) and then finally - the last number in the array is always the number of the joint we're selecting.  Magic.  

Let's get fancy.  

	tree.passFunc(tree.makeInfo([
		[0,0,0,0,-1],   {rz:-1, amount:5,sc:10}
    ]),tree.appendBranch);  

Zounds!  By using `-1` we've selected *all* the joints on that branch, and appended branches to each joint!  How can we possibly even think about controlling all of those joints?  We just added 50 branches with 5 joints each, that's just scads of joints.  Now we can start using the `tree.transform` function.  

	tree.passFunc(tree.makeInfo([
		[0,0,0,0,-2],   	{rz:.04},
		[0,0,0,0,-1,0,-2],  {rz:.3,sc:.6}
    ]),tree.transform);  

Notice the use of `-2` - this will select all the joints except the first one, useful if you want to do things to the root of a joint separately from the rest.  By rotating each joint we can start to make curves.  Looking at the second line I'm selecting the root, then the first joint (as before), and then I'm using `-1` to select *all* of the joints on that branch which have branches coming out of them - which in this case is *all* of them!  The very last number of course is all of the joints (except the first) of all of the branches that we've selected.  Easy!  

`tree.transform()` is intended to be an all purpose method for transforming objects but you don't need to use it - it may make more sense for you to do things yourself.  Here is how you can pass your own custom function with `passFunc()`  

	tree.passFunc(tree.makeInfo([
		[0,0,0,0,-1,0,-1],  {custom:.1}
    ]),
	function(obj,args){
		obj.rotation.x = Math.random();
		obj.rotation.y = args.custom;
	});  

Notice that while I'm passing this function it is not overwriting what I did before.  You can also define your own functions elsewhere, generally you want the first argument to be the joint and the second argument to be an object with arguments related to what you want that joint to do.  

Before moving on I want to show you another way to access joints.  This method is faster and is better for animating.  Check it:  

	tree.makeDictionary();

	myJointList = tree.makeList([0,0,-1]);

	tree.applyFunc([
		myJointList,	{rz:.02}
	],tree.transform);

In this case we make a dictionary of all the joint names, then we make a variable which contains all the names of the joints we want, and then we apply the function to those items.  Notice I'm using `applyFunc` instead of `passFunc`.  This method is nice because you know what parts you're referring to (lots of lists of numbers can get confusing), it's faster and simpler.  

This example turned out to be quite ugly but you can access it from the presets, it's called `basics`.


