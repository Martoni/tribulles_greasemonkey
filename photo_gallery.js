// ==UserScript==
// @name        photogallery 
// @namespace   photogallery
// @description Adding an arrow when visiualize photo in a list 
// @include     http://raspberrypi.local:8000/Photos/*.JPG
// @version     1.01
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       none
// ==/UserScript==

console.log("photogallery run");
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


var files_list_url = document.URL.split('/').slice(0, -1).join('/')+'/';
var file_name = document.URL.split('/').pop();
var html_list = httpGet(files_list_url);

var doc_list = document.createElement('html');
doc_list.innerHTML = html_list;

allinks = doc_list.getElementsByTagName('a');

var photos_names = [];
var photos_url = [];
var file_found = 0;

for(i = 0; i < allinks.length; i++) {
  var fname = allinks[i].innerHTML;
  var furl = allinks[i].href
  if(fname == file_name)
    file_found = i;
  photos_names.push(fname);
  photos_url.push(furl);
}

console.log(photos_names);
console.log(photos_url);

if(file_found > 0){
  var prev_div = document.createElement('div')
  prev_div.id = "idprev";
	var  elprev= document.createElement('a');
	//elprev.innerHTML = photos_names[file_found - 1];
  elprev.href = photos_url[file_found - 1];
  elprev.innerHTML = '<< ' + photos_names[file_found - 1];
  prev_div.appendChild(elprev)
	document.body.appendChild(prev_div);
}


if(file_found < photos_names.length-1){
  var next_div = document.createElement('div')
  next_div.id = "idnext";
  var elnext = document.createElement('a');
  elnext.href = photos_url[file_found + 1];
  elnext.innerHTML = photos_names[file_found + 1] + ' >>';
  next_div.appendChild(elnext);
  document.body.appendChild(next_div);
}

addGlobalStyle("#idnext { float:right; background-color:silver;}")
addGlobalStyle("#idprev { float:left; background-color:silver;}")

