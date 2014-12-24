/*
selectivizr v1.0.3b - (c) Keith Clark, freely distributable under the terms 
of the MIT license.

selectivizr.com
*/
/* 
  
Notes about this source
-----------------------

 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)
  
  
References:
-----------
 
 * CSS Syntax          : http://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : http://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx
 * W3C Selector Tests  : http://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
 
*/

Selectivizr=function(p){function G(a){return a.replace(H,n).replace(I,function(a,d,c){a=c.split(",");c=0;for(var e=a.length;c<e;c++){var h=J(a[c].replace(K,n).replace(L,n))+t,g=[];a[c]=h.replace(M,function(a,b,c,d,e){return b?(0<g.length&&(u.push({selector:h.substring(0,e),patches:g}),g=[]),b):(b=c?N(c):!y||y.test(d)?{className:z(d),applyClass:!0}:null)?(g.push(b),"."+b.className):a})}return d+a.join(",")})}function N(a){var b=!0,d=z(a.slice(1)),c=":not("==a.substring(0,5),e,h;c&&(a=a.slice(5,-1));
var g=a.indexOf("(");-1<g&&(a=a.substring(0,g));if(":"==a.charAt(0))switch(a.slice(1)){case "root":b=function(a){return c?a!=v:a==v};break;case "target":if(8==k){b=function(a){var b=function(){var b=location.hash,d=b.slice(1);return c?b==l||a.id!=d:b!=l&&a.id==d};m(p,"hashchange",function(){q(a,d,b())});return b()};break}return!1;case "checked":b=function(a){O.test(a.type)&&m(a,"propertychange",function(){"checked"==event.propertyName&&q(a,d,a.checked!==c)});return a.checked!==c};break;case "disabled":c=
!c;case "enabled":b=function(b){return P.test(b.tagName)?(m(b,"propertychange",function(){"$disabled"==event.propertyName&&q(b,d,b.$disabled===c)}),w.push(b),b.$disabled=b.disabled,b.disabled===c):":enabled"==a?c:!c};break;case "focus":e="focus",h="blur";case "hover":e||(e="mouseenter",h="mouseleave");b=function(a){m(a,c?h:e,function(){q(a,d,!0)});m(a,c?e:h,function(){q(a,d,!1)});return c};break;default:if(!Q.test(a))return!1}return{className:d,applyClass:b}}function R(){for(var a,b,d,c,e=0;e<u.length;e++){b=
u[e].selector;d=u[e].patches;c=b.replace(S,l);if(c==l||c.charAt(c.length-1)==t)c+="*";try{a=A(c)}catch(h){p.console&&p.console.log("Selector '"+b+"' threw exception '"+h+"'")}if(a)for(b=0,c=a.length;b<c;b++){for(var g=a[b],f=g.className,m=0,n=d.length;m<n;m++){var k=d[m];(new RegExp("(^|\\s)"+k.className+"(\\s|$)")).test(g.className)||!k.applyClass||!0!==k.applyClass&&!0!==k.applyClass(g)||(f=B(f,k.className,!0))}g.className=f}}}function z(a){return T+"-"+(6==k&&U?V++:a.replace(W,function(a){return a.charCodeAt(0)}))}
function J(a){return a.replace(C,n).replace(X,t)}function q(a,b,d){var c=a.className;b=B(c,b,d);b!=c&&(a.className=b,a.parentNode.className+=l)}function B(a,b,d){var c=RegExp("(^|\\s)"+b+"(\\s|$)"),e=c.test(a);return d?e?a:a+t+b:e?a.replace(c,n).replace(C,n):a}function m(a,b,d){a.attachEvent("on"+b,d)}function x(a,b,d){b||(b=Y);"//"==a.substring(0,2)&&(a=b.substring(0,b.indexOf("//"))+a);if(/^https?:\/\//i.test(a))return d||b.substring(0,b.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if("/"==
a.charAt(0))return b.substring(0,b.indexOf("/",8))+a;b=b.split(/[?#]/)[0];"?"!=a.charAt(0)&&"/"!=b.charAt(b.length-1)&&(b=b.substring(0,b.lastIndexOf("/")+1));return b+a}function D(a){return a?(r.open("GET",a,!1),r.send(),(200==r.status?r.responseText:l).replace(Z,l).replace($,function(b,d,c,e,f,g){b=D(x(c||f,a));return g?"@media "+g+" {"+b+"}":b}).replace(aa,function(b,d,c,e){c=c||l;return d?b:" url("+c+x(e,a,!0)+c+") "})):l}function ba(){for(var a,b,d=0;d<f.styleSheets.length;d++)if(b=f.styleSheets[d],
b.href!=l&&(a=x(b.href)))b.cssText=b.rawCssText=G(D(a))}function E(){R();0<w.length&&setInterval(function(){for(var a=0,b=w.length;a<b;a++){var d=w[a];d.disabled!==d.$disabled&&(d.disabled?(d.disabled=!1,d.$disabled=!0,d.disabled=!0):d.$disabled=d.disabled)}},250)}function ca(a,b){var d=!1,c=!0,e=function(c){if("readystatechange"!=c.type||"complete"==f.readyState)("load"==c.type?a:f).detachEvent("on"+c.type,e,!1),!d&&(d=!0)&&b.call(a,c.type||c)},h=function(){try{v.doScroll("left")}catch(a){setTimeout(h,
50);return}e("poll")};if("complete"==f.readyState)b.call(a,l);else{if(f.createEventObject&&v.doScroll){try{c=!a.frameElement}catch(g){}c&&h()}m(f,"readystatechange",e);m(a,"load",e)}}var s=navigator.userAgent.match(/MSIE (\d+)/);if(!s)return!1;var f=document,v=f.documentElement,r=function(){if(p.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),k=s[1];if(!("CSS1Compat"!=f.compatMode||6>k||8<k)&&r){var F={NW:"*.Dom.select",MooTools:"$$",
DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},A,w=[],u=[],V=0,U=!0,T="slvzr",Z=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g,$=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g,aa=/(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g,Q=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,H=/:(:first-(?:line|letter))/g,I=/((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g,M=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,
S=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,W=/[^\w-]/g,P=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,O=/^(checkbox|radio)$/,y=6<k?/[\$\^*]=(['"])\1/:null,K=/([(\[+~])\s+/g,L=/\s+([)\]+~])/g,X=/\s+/g,C=/^\s*((?:[\S\s]*\S)?)\s*$/,l="",t=" ",n="$1",s=f.getElementsByTagName("BASE"),Y=0<s.length?s[0].href:f.location.href;ba();ca(p,function(){for(var a in F){var b,d,c=p;if(p[a]){for(b=F[a].replace("*",a).split(".");(d=b.shift())&&(c=c[d]););if("function"==
typeof c){A=c;E();break}}}});return{init:E}}}(this);