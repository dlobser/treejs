
editable=false;

aceFontSize = 9;
aceColumns = 40;
aceMargin = 60;
invertedColor = true;
aceTransparentBackground=true;
codeVersion = 0;
codeName = "treeCode";

AceIt();

function AceIt(){
    document.getElementById('editor').style.fontSize=aceFontSize+"px";

    editor = ace.edit("editor");
    editor.setTheme("ace/theme/dreamweaver");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWrapMode(true);

    iframe = document.createElement('iframe');
    iframe.id = 'iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = scriptSource;


    text = "";
    texter = "";


    setTimeout(function(){
        console.log(iframe);
        text += document.getElementById('iframe').contentDocument.body.firstChild.innerHTML;
        texter = text.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
        editor.setValue(texter);
        editor.find('foo');
        activateAce();
        activateAce();
        updateCode();

    }, 1000);
}

function AceReplace(){

    iframe.src = scriptSource;


    text = "";
    texter = "";


    setTimeout(function(){
        console.log(iframe);
        text += document.getElementById('iframe').contentDocument.body.firstChild.innerHTML;
        texter = text.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
        editor.setValue(texter);
        editor.find('foo');
        activateAce();
        activateAce();
        updateCode();

    }, 1000);
}




function updateCode() {

	var code = editor.getValue();
	eval(code);
	reinit();
	console.log("Executed");

}

function aceBackground(){

    if(aceTransparentBackground){

        if(invertedColor)
            document.getElementById('editor').style.background="white";
        else
            document.getElementById('editor').style.background="black";

    }
    else
         document.getElementById('editor').style.background="transparent";

    aceTransparentBackground = !aceTransparentBackground;

}

function changeAceFontSize(amount){

    aceFontSize += amount;
    document.getElementById('editor').style.fontSize=aceFontSize+"px";
}

function changeAceWidth(amount){

    aceColumns+=amount;
    aceMargin-=amount;
    document.getElementById('editor').style.width=aceColumns+'%';
    document.getElementById('editor').style.marginRight=aceMargin+'%';
    editor.resize();
}

function saveAce(){

    var code = editor.getValue();
    var blob = new Blob([code], {type: "text/plain;charset=ANSI"});
    var saveName = "";

    if(codeVersion<10)
        saveName = codeName+"_0"+codeVersion+".js";
    else
        saveName = codeName+"_"+codeVersion+".js";

    alert("saved: " + saveName);

    codeVersion++;

    saveAs(blob, saveName);

}

function invertColor(){
    if(invertedColor){
        document.body.style.backgroundColor = "black";
        editor.setTheme("ace/theme/monokai");
        invertedColor=!invertedColor;
    }
    else{
        document.body.style.backgroundColor = "white";
        editor.setTheme("ace/theme/dreamweaver");
        invertedColor=!invertedColor;
    }

}

function activateAce(){

    editor.setReadOnly(editable);
    editable=!editable;

    if(!editable){
        document.getElementById('editor').style.marginRight='100%';
        document.getElementById('editor').style.marginBottom='100%';
    }
    if(editable){
        document.getElementById('editor').style.marginRight='60%';
        document.getElementById('editor').style.width='40%';
        document.getElementById('editor').style.marginBottom='2%';
        document.getElementById('editor').style.marginTop='4%';
    }

    editor.find('foo'); //just to deselect
}

function findAndReplaceAce(){
    
    Object.keys(data).forEach(function (key) {
        var prop = "data.";
        prop += propName(data,data[key]);
        editor.find(prop);
        editor.replaceAll(truncateDecimals(data[key],3).toString());
    })
}

var res = '';

function propName(prop, value) {
    for (var i in prop) {
        if (typeof prop[i] == 'object') {
            if (propName(prop[i], value)) {
                return res;
            }
        } else {
            if (prop[i] == value) {
                res = i;
                return res;
            }
        }
    }
    return undefined;
}

