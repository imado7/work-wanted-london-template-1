
/******************************************************************************
 *	
 *	PROJECT: Flynax Classifieds Software
 *	VERSION: 4.3.0
 *	LICENSE: FL615037127W - http://www.flynax.com/license-agreement.html
 *	PRODUCT: General Classifieds
 *	DOMAIN: workwanted.london
 *	FILE: LIB.JS
 *	
 *	The software is a commercial product delivered under single, non-exclusive,
 *	non-transferable license for one domain or IP address. Therefore distribution,
 *	sale or transfer of the file in whole or in part without permission of Flynax
 *	respective owners is considered to be illegal and breach of Flynax License End
 *	User Agreement.
 *	
 *	You are not allowed to remove this information from the file without permission
 *	of Flynax respective owners.
 *	
 *	Flynax Classifieds Software 2014 | All copyrights reserved.
 *	
 *	http://www.flynax.com/
 ******************************************************************************/

/* mouse wheel */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/* custom scrollbar */
(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,alwaysShowScrollbar:false,snapAmount:null,snapOffset:0,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"mcsEaseOut",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,alwaysShowScrollbar:e.alwaysShowScrollbar,snapAmount:e.snapAmount,snapOffset:e.snapOffset,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=true}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}if(n.data("alwaysShowScrollbar")){if(!n.data("horizontalScroll")){m.css({height:o.height()})}else{if(n.data("horizontalScroll")){m.css({width:o.width()})}}}else{y.css("display","none");q.addClass("mCS_no_scrollbar")}n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(i,q,n,k,A,f,D,w){var l=c(this);if(!l.data("bindEvent_scrollbar_drag")){var o,p,C,z,e;if(c.support.pointer){C="pointerdown";z="pointermove";e="pointerup"}else{if(c.support.msPointer){C="MSPointerDown";z="MSPointerMove";e="MSPointerUp"}}if(c.support.pointer||c.support.msPointer){k.bind(C,function(K){K.preventDefault();l.data({on_drag:true});k.addClass("mCSB_dragger_onDrag");var J=c(this),M=J.offset(),I=K.originalEvent.pageX-M.left,L=K.originalEvent.pageY-M.top;if(I<J.width()&&I>0&&L<J.height()&&L>0){o=L;p=I}});c(document).bind(z+"."+l.data("mCustomScrollbarIndex"),function(K){K.preventDefault();if(l.data("on_drag")){var J=k,M=J.offset(),I=K.originalEvent.pageX-M.left,L=K.originalEvent.pageY-M.top;G(o,p,L,I)}}).bind(e+"."+l.data("mCustomScrollbarIndex"),function(x){l.data({on_drag:false});k.removeClass("mCSB_dragger_onDrag")})}else{k.bind("mousedown touchstart",function(K){K.preventDefault();K.stopImmediatePropagation();var J=c(this),N=J.offset(),I,M;if(K.type==="touchstart"){var L=K.originalEvent.touches[0]||K.originalEvent.changedTouches[0];I=L.pageX-N.left;M=L.pageY-N.top}else{l.data({on_drag:true});k.addClass("mCSB_dragger_onDrag");I=K.pageX-N.left;M=K.pageY-N.top}if(I<J.width()&&I>0&&M<J.height()&&M>0){o=M;p=I}}).bind("touchmove",function(K){K.preventDefault();K.stopImmediatePropagation();var N=K.originalEvent.touches[0]||K.originalEvent.changedTouches[0],J=c(this),M=J.offset(),I=N.pageX-M.left,L=N.pageY-M.top;G(o,p,L,I)});c(document).bind("mousemove."+l.data("mCustomScrollbarIndex"),function(K){if(l.data("on_drag")){var J=k,M=J.offset(),I=K.pageX-M.left,L=K.pageY-M.top;G(o,p,L,I)}}).bind("mouseup."+l.data("mCustomScrollbarIndex"),function(x){l.data({on_drag:false});k.removeClass("mCSB_dragger_onDrag")})}l.data({bindEvent_scrollbar_drag:true})}function G(J,K,L,I){if(l.data("horizontalScroll")){l.mCustomScrollbar("scrollTo",(k.position().left-(K))+I,{moveDragger:true,trigger:"internal"})}else{l.mCustomScrollbar("scrollTo",(k.position().top-(J))+L,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&l.data("contentTouchScroll")){if(!l.data("bindEvent_content_touch")){var m,E,s,t,v,F,H;q.bind("touchstart",function(x){x.stopImmediatePropagation();m=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];E=c(this);s=E.offset();v=m.pageX-s.left;t=m.pageY-s.top;F=t;H=v});q.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();m=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];E=c(this).parent();s=E.offset();v=m.pageX-s.left;t=m.pageY-s.top;if(l.data("horizontalScroll")){l.mCustomScrollbar("scrollTo",H-v,{trigger:"internal"})}else{l.mCustomScrollbar("scrollTo",F-t,{trigger:"internal"})}})}}if(!l.data("bindEvent_scrollbar_click")){n.bind("click",function(I){var x=(I.pageY-n.offset().top)*l.data("scrollAmount"),y=c(I.target);if(l.data("horizontalScroll")){x=(I.pageX-n.offset().left)*l.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){l.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});l.data({bindEvent_scrollbar_click:true})}if(l.data("mouseWheel")){if(!l.data("bindEvent_mousewheel")){i.bind("mousewheel",function(K,M){var J,I=l.data("mouseWheelPixels"),x=Math.abs(q.position().top),L=k.position().top,y=n.height()-k.height();if(l.data("normalizeMouseWheelDelta")){if(M<0){M=-1}else{M=1}}if(I==="auto"){I=100+Math.round(l.data("scrollAmount")/2)}if(l.data("horizontalScroll")){L=k.position().left;y=n.width()-k.width();x=Math.abs(q.position().left)}if((M>0&&L!==0)||(M<0&&L!==y)){K.preventDefault();K.stopImmediatePropagation()}J=x-(M*I);l.mCustomScrollbar("scrollTo",J,{trigger:"internal"})});l.data({bindEvent_mousewheel:true})}}if(l.data("scrollButtons_enable")){if(l.data("scrollButtons_scrollType")==="pixels"){if(l.data("horizontalScroll")){w.add(D).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend",j,h);l.data({bindEvent_buttonsContinuous_x:false});if(!l.data("bindEvent_buttonsPixels_x")){w.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().left)+l.data("scrollButtons_scrollAmount"))});D.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().left)-l.data("scrollButtons_scrollAmount"))});l.data({bindEvent_buttonsPixels_x:true})}}else{f.add(A).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend",j,h);l.data({bindEvent_buttonsContinuous_y:false});if(!l.data("bindEvent_buttonsPixels_y")){f.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().top)+l.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();r(Math.abs(q.position().top)-l.data("scrollButtons_scrollAmount"))});l.data({bindEvent_buttonsPixels_y:true})}}function r(x){if(!k.data("preventAction")){k.data("preventAction",true);l.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(l.data("horizontalScroll")){w.add(D).unbind("click");l.data({bindEvent_buttonsPixels_x:false});if(!l.data("bindEvent_buttonsContinuous_x")){w.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollRight:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var j=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollRight"))};w.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",j);D.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollLeft:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var h=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollLeft"))};D.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",h);l.data({bindEvent_buttonsContinuous_x:true})}}else{f.add(A).unbind("click");l.data({bindEvent_buttonsPixels_y:false});if(!l.data("bindEvent_buttonsContinuous_y")){f.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollDown:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var u=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollDown"))};f.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",u);A.bind("mousedown touchstart MSPointerDown pointerdown",function(y){y.preventDefault();var x=B();l.data({mCSB_buttonScrollUp:setInterval(function(){l.mCustomScrollbar("scrollTo",Math.abs(q.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(l.data("mCSB_buttonScrollUp"))};A.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout",g);l.data({bindEvent_buttonsContinuous_y:true})}}function B(){var x=l.data("scrollButtons_scrollSpeed");if(l.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((l.data("scrollInertia")+100)/40)}return x}}}if(l.data("autoScrollOnFocus")){if(!l.data("bindEvent_focusin")){i.bind("focusin",function(){i.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var J=q.position().top,y=x.position().top,I=i.height()-x.outerHeight();if(l.data("horizontalScroll")){J=q.position().left;y=x.position().left;I=i.width()-x.outerWidth()}if(J+y<0||J+y>I){l.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});l.data({bindEvent_focusin:true})}}if(l.data("autoHideScrollbar")&&!l.data("alwaysShowScrollbar")){if(!l.data("bindEvent_autoHideScrollbar")){i.bind("mouseenter",function(x){i.addClass("mCS-mouse-over");d.showScrollbar.call(i.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){i.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(i.children(".mCSB_scrollTools"))}});l.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(e,f){var i=c(this),o={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:i.data("scrollInertia"),scrollEasing:i.data("scrollEasing")},f=c.extend(o,f),p,g=i.children(".mCustomScrollBox"),k=g.children(".mCSB_container"),r=g.children(".mCSB_scrollTools"),j=r.children(".mCSB_draggerContainer"),h=j.children(".mCSB_dragger"),t=draggerSpeed=f.scrollInertia,q,s,m,l;if(!k.hasClass("mCS_no_scrollbar")){i.data({mCS_trigger:f.trigger});if(i.data("mCS_Init")){f.callbacks=false}if(e||e===0){if(typeof(e)==="number"){if(f.moveDragger){p=e;if(i.data("horizontalScroll")){e=h.position().left*i.data("scrollAmount")}else{e=h.position().top*i.data("scrollAmount")}draggerSpeed=0}else{p=e/i.data("scrollAmount")}}else{if(typeof(e)==="string"){var v;if(e==="top"){v=0}else{if(e==="bottom"&&!i.data("horizontalScroll")){v=k.outerHeight()-g.height()}else{if(e==="left"){v=0}else{if(e==="right"&&i.data("horizontalScroll")){v=k.outerWidth()-g.width()}else{if(e==="first"){v=i.find(".mCSB_container").find(":first")}else{if(e==="last"){v=i.find(".mCSB_container").find(":last")}else{v=i.find(e)}}}}}}if(v.length===1){if(i.data("horizontalScroll")){e=v.position().left}else{e=v.position().top}p=e/i.data("scrollAmount")}else{p=e=v}}}if(i.data("horizontalScroll")){if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.width()-k.outerWidth()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollLeft"));if(!s){q=true}}else{if(p>=j.width()-h.width()){p=j.width()-h.width();e=g.width()-k.outerWidth();clearInterval(i.data("mCSB_buttonScrollRight"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"left",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"left",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().left>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().left<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}else{if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.height()-k.outerHeight()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollUp"));if(!s){q=true}}else{if(p>=j.height()-h.height()){p=j.height()-h.height();e=g.height()-k.outerHeight();clearInterval(i.data("mCSB_buttonScrollDown"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"top",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"top",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().top>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().top<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")&&!i.data("alwaysShowScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}if(i.data("mCS_Init")){i.data({mCS_Init:false})}}}function u(w){if(i.data("mCustomScrollbarIndex")){this.mcs={top:k.position().top,left:k.position().left,draggerTop:h.position().top,draggerLeft:h.position().left,topPct:Math.round((100*Math.abs(k.position().top))/Math.abs(k.outerHeight()-g.height())),leftPct:Math.round((100*Math.abs(k.position().left))/Math.abs(k.outerWidth()-g.width()))};switch(w){case"onScrollStart":i.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(i,this.mcs);break;case"whileScrolling":i.data("whileScrolling_Callback").call(i,this.mcs);break;case"onScroll":i.data("onScroll_Callback").call(i,this.mcs);break;case"onTotalScrollBack":i.data("onTotalScrollBack_Callback").call(i,this.mcs);break;case"onTotalScroll":i.data("onTotalScroll_Callback").call(i,this.mcs);break}}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.pointer=window.navigator.pointerEnabled;c.support.msPointer=window.navigator.msPointerEnabled;c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);

/* MediaMatch v.2.0.2 - Testing css media queries in Javascript. Authors & copyright (c) 2013: WebLinc, David Knight. */
window.matchMedia||(window.matchMedia=function(c){var a=c.document,w=a.documentElement,l=[],t=0,x="",h={},G=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,H=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,y=0,A=function(b){var z=-1!==b.indexOf(",")&&b.split(",")||[b],e=z.length-1,j=e,g=null,d=null,c="",a=0,l=!1,m="",f="",g=null,d=0,f=null,k="",p="",q="",n="",r="",k=!1;if(""===
b)return!0;do{g=z[j-e];l=!1;if(d=g.match(G))c=d[0],a=d.index;if(!d||-1===g.substring(0,a).indexOf("(")&&(a||!d[3]&&c!==d.input))k=!1;else{f=g;l="not"===d[1];a||(m=d[2],f=g.substring(c.length));k=m===x||"all"===m||""===m;g=-1!==f.indexOf(" and ")&&f.split(" and ")||[f];d=g.length-1;if(k&&0<=d&&""!==f){do{f=g[d].match(H);if(!f||!h[f[3]]){k=!1;break}k=f[2];n=p=f[5];q=f[7];r=h[f[3]];q&&(n="px"===q?Number(p):"em"===q||"rem"===q?16*p:f[8]?(p/f[8]).toFixed(2):"dppx"===q?96*p:"dpcm"===q?0.3937*p:Number(p));
k="min-"===k&&n?r>=n:"max-"===k&&n?r<=n:n?r===n:!!r;if(!k)break}while(d--)}if(k)break}}while(e--);return l?!k:k},B=function(){var b=c.innerWidth||w.clientWidth,a=c.innerHeight||w.clientHeight,e=c.screen.width,j=c.screen.height,g=c.screen.colorDepth,d=c.devicePixelRatio;h.width=b;h.height=a;h["aspect-ratio"]=(b/a).toFixed(2);h["device-width"]=e;h["device-height"]=j;h["device-aspect-ratio"]=(e/j).toFixed(2);h.color=g;h["color-index"]=Math.pow(2,g);h.orientation=a>=b?"portrait":"landscape";h.resolution=
d&&96*d||c.screen.deviceXDPI||96;h["device-pixel-ratio"]=d||1},C=function(){clearTimeout(y);y=setTimeout(function(){var b=null,a=t-1,e=a,j=!1;if(0<=a){B();do if(b=l[e-a])if((j=A(b.mql.media))&&!b.mql.matches||!j&&b.mql.matches)if(b.mql.matches=j,b.listeners)for(var j=0,g=b.listeners.length;j<g;j++)b.listeners[j]&&b.listeners[j].call(c,b.mql);while(a--)}},10)},D=a.getElementsByTagName("head")[0],a=a.createElement("style"),E=null,u="screen print speech projection handheld tv braille embossed tty".split(" "),
m=0,I=u.length,s="#mediamatchjs { position: relative; z-index: 0; }",v="",F=c.addEventListener||(v="on")&&c.attachEvent;a.type="text/css";a.id="mediamatchjs";D.appendChild(a);for(E=c.getComputedStyle&&c.getComputedStyle(a)||a.currentStyle;m<I;m++)s+="@media "+u[m]+" { #mediamatchjs { position: relative; z-index: "+m+" } }";a.styleSheet?a.styleSheet.cssText=s:a.textContent=s;x=u[1*E.zIndex||0];D.removeChild(a);B();F(v+"resize",C);F(v+"orientationchange",C);return function(a){var c=t,e={matches:!1,
media:a,addListener:function(a){l[c].listeners||(l[c].listeners=[]);a&&l[c].listeners.push(a)},removeListener:function(a){var b=l[c],d=0,e=0;if(b)for(e=b.listeners.length;d<e;d++)b.listeners[d]===a&&b.listeners.splice(d,1)}};if(""===a)return e.matches=!0,e;e.matches=A(a);t=l.push({mql:e,listeners:null});return e}}(window));

/*! jQuery Mobile v1.2.0 jquerymobile.com | jquery.org/license */
(function(a,b,c){typeof define=="function"&&define.amd?define(["jquery"],function(d){return c(d,a,b),d.mobile}):c(a.jQuery,a,b)})(this,document,function(a,b,c,d){(function(a){a.event.special.throttledresize={setup:function(){a(this).bind("resize",c)},teardown:function(){a(this).unbind("resize",c)}};var b=250,c=function(){f=(new Date).getTime(),g=f-d,g>=b?(d=f,a(this).trigger("throttledresize")):(e&&clearTimeout(e),e=setTimeout(c,b-g))},d=0,e,f,g})(a),function(a,c){a.extend(a.support,{orientation:"orientation"in b&&"onorientationchange"in b})}(a),function(a,b){function o(){var a=g();a!==h&&(h=a,d.trigger(e))}var d=a(b),e="orientationchange",f,g,h,i,j,k={0:!0,180:!0};if(a.support.orientation){var l=b.innerWidth||a(b).width(),m=b.innerHeight||a(b).height(),n=50;i=l>m&&l-m>n,j=k[b.orientation];if(i&&j||!i&&!j)k={"-90":!0,90:!0}}a.event.special.orientationchange=a.extend({},a.event.special.orientationchange,{setup:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;h=g(),d.bind("throttledresize",o)},teardown:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;d.unbind("throttledresize",o)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=g(),b.apply(this,arguments)}}}),a.event.special.orientationchange.orientation=g=function(){var d=!0,e=c.documentElement;return a.support.orientation?d=k[b.orientation]:d=e&&e.clientWidth/e.clientHeight<1.1,d?"portrait":"landscape"},a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)},a.attrFn&&(a.attrFn[e]=!0)}(a,this),function(a,b){var d={touch:"ontouchend"in c};a.mobile=a.mobile||{},a.mobile.support=a.mobile.support||{},a.extend(a.support,d),a.extend(a.mobile.support,d)}(a),function(a,b,c,d){function x(a){while(a&&typeof a.originalEvent!="undefined")a=a.originalEvent;return a}function y(b,c){var e=b.type,f,g,i,k,l,m,n,o,p;b=a.Event(b),b.type=c,f=b.originalEvent,g=a.event.props,e.search(/^(mouse|click)/)>-1&&(g=j);if(f)for(n=g.length,k;n;)k=g[--n],b[k]=f[k];e.search(/mouse(down|up)|click/)>-1&&!b.which&&(b.which=1);if(e.search(/^touch/)!==-1){i=x(f),e=i.touches,l=i.changedTouches,m=e&&e.length?e[0]:l&&l.length?l[0]:d;if(m)for(o=0,p=h.length;o<p;o++)k=h[o],b[k]=m[k]}return b}function z(b){var c={},d,f;while(b){d=a.data(b,e);for(f in d)d[f]&&(c[f]=c.hasVirtualBinding=!0);b=b.parentNode}return c}function A(b,c){var d;while(b){d=a.data(b,e);if(d&&(!c||d[c]))return b;b=b.parentNode}return null}function B(){r=!1}function C(){r=!0}function D(){v=0,p.length=0,q=!1,C()}function E(){B()}function F(){G(),l=setTimeout(function(){l=0,D()},a.vmouse.resetTimerDuration)}function G(){l&&(clearTimeout(l),l=0)}function H(b,c,d){var e;if(d&&d[b]||!d&&A(c.target,b))e=y(c,b),a(c.target).trigger(e);return e}function I(b){var c=a.data(b.target,f);if(!q&&(!v||v!==c)){var d=H("v"+b.type,b);d&&(d.isDefaultPrevented()&&b.preventDefault(),d.isPropagationStopped()&&b.stopPropagation(),d.isImmediatePropagationStopped()&&b.stopImmediatePropagation())}}function J(b){var c=x(b).touches,d,e;if(c&&c.length===1){d=b.target,e=z(d);if(e.hasVirtualBinding){v=u++,a.data(d,f,v),G(),E(),o=!1;var g=x(b).touches[0];m=g.pageX,n=g.pageY,H("vmouseover",b,e),H("vmousedown",b,e)}}}function K(a){if(r)return;o||H("vmousecancel",a,z(a.target)),o=!0,F()}function L(b){if(r)return;var c=x(b).touches[0],d=o,e=a.vmouse.moveDistanceThreshold,f=z(b.target);o=o||Math.abs(c.pageX-m)>e||Math.abs(c.pageY-n)>e,o&&!d&&H("vmousecancel",b,f),H("vmousemove",b,f),F()}function M(a){if(r)return;C();var b=z(a.target),c;H("vmouseup",a,b);if(!o){var d=H("vclick",a,b);d&&d.isDefaultPrevented()&&(c=x(a).changedTouches[0],p.push({touchID:v,x:c.clientX,y:c.clientY}),q=!0)}H("vmouseout",a,b),o=!1,F()}function N(b){var c=a.data(b,e),d;if(c)for(d in c)if(c[d])return!0;return!1}function O(){}function P(b){var c=b.substr(1);return{setup:function(d,f){N(this)||a.data(this,e,{});var g=a.data(this,e);g[b]=!0,k[b]=(k[b]||0)+1,k[b]===1&&t.bind(c,I),a(this).bind(c,O),s&&(k.touchstart=(k.touchstart||0)+1,k.touchstart===1&&t.bind("touchstart",J).bind("touchend",M).bind("touchmove",L).bind("scroll",K))},teardown:function(d,f){--k[b],k[b]||t.unbind(c,I),s&&(--k.touchstart,k.touchstart||t.unbind("touchstart",J).unbind("touchmove",L).unbind("touchend",M).unbind("scroll",K));var g=a(this),h=a.data(this,e);h&&(h[b]=!1),g.unbind(c,O),N(this)||g.removeData(e)}}}var e="virtualMouseBindings",f="virtualTouchID",g="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),h="clientX clientY pageX pageY screenX screenY".split(" "),i=a.event.mouseHooks?a.event.mouseHooks.props:[],j=a.event.props.concat(i),k={},l=0,m=0,n=0,o=!1,p=[],q=!1,r=!1,s="addEventListener"in c,t=a(c),u=1,v=0,w;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var Q=0;Q<g.length;Q++)a.event.special[g[Q]]=P(g[Q]);s&&c.addEventListener("click",function(b){var c=p.length,d=b.target,e,g,h,i,j,k;if(c){e=b.clientX,g=b.clientY,w=a.vmouse.clickDistanceThreshold,h=d;while(h){for(i=0;i<c;i++){j=p[i],k=0;if(h===d&&Math.abs(j.x-e)<w&&Math.abs(j.y-g)<w||a.data(h,f)===j.touchID){b.preventDefault(),b.stopPropagation();return}}h=h.parentNode}}},!0)}(a,b,c),function(a,b,d){function j(b,c,d){var e=d.type;d.type=c,a.event.handle.call(b,d),d.type=e}a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)});var e=a.mobile.support.touch,f="touchmove scroll",g=e?"touchstart":"mousedown",h=e?"touchend":"mouseup",i=e?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function g(a,c){d=c,j(b,d?"scrollstart":"scrollstop",a)}var b=this,c=a(b),d,e;c.bind(f,function(b){if(!a.event.special.scrollstart.enabled)return;d||g(b,!0),clearTimeout(e),e=setTimeout(function(){g(b,!1)},50)})}},a.event.special.tap={tapholdThreshold:750,setup:function(){var b=this,d=a(b);d.bind("vmousedown",function(e){function i(){clearTimeout(h)}function k(){i(),d.unbind("vclick",l).unbind("vmouseup",i),a(c).unbind("vmousecancel",k)}function l(a){k(),f===a.target&&j(b,"tap",a)}if(e.which&&e.which!==1)return!1;var f=e.target,g=e.originalEvent,h;d.bind("vmouseup",i).bind("vclick",l),a(c).bind("vmousecancel",k),h=setTimeout(function(){j(b,"taphold",a.Event("taphold",{target:f}))},a.event.special.tap.tapholdThreshold)})}},a.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var b=this,c=a(b);c.bind(g,function(b){function j(b){if(!f)return;var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;g={time:(new Date).getTime(),coords:[c.pageX,c.pageY]},Math.abs(f.coords[0]-g.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}var e=b.originalEvent.touches?b.originalEvent.touches[0]:b,f={time:(new Date).getTime(),coords:[e.pageX,e.pageY],origin:a(b.target)},g;c.bind(i,j).one(h,function(b){c.unbind(i,j),f&&g&&g.time-f.time<a.event.special.swipe.durationThreshold&&Math.abs(f.coords[0]-g.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(f.coords[1]-g.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&f.origin.trigger("swipe").trigger(f.coords[0]>g.coords[0]?"swipeleft":"swiperight"),f=g=d})})}},a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})}(a,this)});

/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-load
 */
window.Modernizr=function(a,b,c){function t(a){i.cssText=a}function u(a,b){return t(prefixes.join(a+";")+(b||""))}function v(a,b){return typeof a===b}function w(a,b){return!!~(""+a).indexOf(b)}function x(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:v(f,"function")?f.bind(d||b):f}return!1}var d="2.7.1",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l={},m={},n={},o=[],p=o.slice,q,r={}.hasOwnProperty,s;!v(r,"undefined")&&!v(r.call,"undefined")?s=function(a,b){return r.call(a,b)}:s=function(a,b){return b in a&&v(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=p.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(p.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(p.call(arguments)))};return e});for(var y in l)s(l,y)&&(q=y.toLowerCase(),e[q]=l[y](),o.push((e[q]?"":"no-")+q));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)s(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},t(""),h=j=null,e._version=d,e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/* numeric */
(function(d){d.fn.numeric=function(a,c){"boolean"===typeof a&&(a={decimal:a});a=a||{};"undefined"==typeof a.negative&&(a.negative=!0);var h=!1===a.decimal?"":a.decimal||".",b=!0===a.negative?!0:!1;c="function"==typeof c?c:function(){};return this.data("numeric.decimal",h).data("numeric.negative",b).data("numeric.callback",c).keypress(d.fn.numeric.keypress).keyup(d.fn.numeric.keyup).blur(d.fn.numeric.blur)};d.fn.numeric.keypress=function(a){var c=d.data(this,"numeric.decimal"),h=d.data(this,"numeric.negative"), b=a.charCode?a.charCode:a.keyCode?a.keyCode:0;if(13==b&&"input"==this.nodeName.toLowerCase())return!0;if(13==b)return!1;var f=!1;if(a.ctrlKey&&97==b||a.ctrlKey&&65==b||a.ctrlKey&&120==b||a.ctrlKey&&88==b||a.ctrlKey&&99==b||a.ctrlKey&&67==b||a.ctrlKey&&122==b||a.ctrlKey&&90==b||a.ctrlKey&&118==b||a.ctrlKey&&86==b||a.shiftKey&&45==b)return!0;if(48>b||57<b){var e=d(this).val();if(0!==e.indexOf("-")&&h&&45==b&&(0===e.length||0===parseInt(d.fn.getSelectionStart(this),10)))return!0;c&&b==c.charCodeAt(0)&& -1!=e.indexOf(c)&&(f=!1);8!=b&&9!=b&&13!=b&&35!=b&&36!=b&&37!=b&&39!=b&&46!=b?f=!1:"undefined"!=typeof a.charCode&&(a.keyCode==a.which&&0!==a.which?(f=!0,46==a.which&&(f=!1)):0!==a.keyCode&&0===a.charCode&&0===a.which&&(f=!0));c&&b==c.charCodeAt(0)&&(f=-1==e.indexOf(c)?!0:!1)}else f=!0;return f};d.fn.numeric.keyup=function(a){if((a=d(this).val())&&0<a.length){var c=d.fn.getSelectionStart(this),h=d.fn.getSelectionEnd(this),b=d.data(this,"numeric.decimal"),f=d.data(this,"numeric.negative");if(""!== b&&null!==b){var e=a.indexOf(b);0===e&&(this.value="0"+a);1==e&&"-"==a.charAt(0)&&(this.value="-0"+a.substring(1));a=this.value}for(var m=[0,1,2,3,4,5,6,7,8,9,"-",b],e=a.length,g=e-1;0<=g;g--){var k=a.charAt(g);0!==g&&"-"==k?a=a.substring(0,g)+a.substring(g+1):0!==g||f||"-"!=k||(a=a.substring(1));for(var n=!1,l=0;l<m.length;l++)if(k==m[l]){n=!0;break}n&&" "!=k||(a=a.substring(0,g)+a.substring(g+1))}f=a.indexOf(b);if(0<f)for(e-=1;e>f;e--)a.charAt(e)==b&&(a=a.substring(0,e)+a.substring(e+1));this.value= a;d.fn.setSelection(this,[c,h])}};d.fn.numeric.blur=function(){var a=d.data(this,"numeric.decimal"),c=d.data(this,"numeric.callback"),h=this.value;""!==h&&(RegExp("^\\d+$|^\\d*"+a+"\\d+$").exec(h)||c.apply(this))};d.fn.removeNumeric=function(){return this.data("numeric.decimal",null).data("numeric.negative",null).data("numeric.callback",null).unbind("keypress",d.fn.numeric.keypress).unbind("blur",d.fn.numeric.blur)};d.fn.getSelectionStart=function(a){if(a.createTextRange){var c=document.selection.createRange().duplicate(); c.moveEnd("character",a.value.length);return""===c.text?a.value.length:a.value.lastIndexOf(c.text)}return a.selectionStart};d.fn.getSelectionEnd=function(a){if(a.createTextRange){var c=document.selection.createRange().duplicate();c.moveStart("character",-a.value.length);return c.text.length}return a.selectionEnd};d.fn.setSelection=function(a,c){"number"==typeof c&&(c=[c,c]);if(c&&c.constructor==Array&&2==c.length)if(a.createTextRange){var d=a.createTextRange();d.collapse(!0);d.moveStart("character", c[0]);d.moveEnd("character",c[1]);d.select()}else a.setSelectionRange&&(a.focus(),a.setSelectionRange(c[0],c[1]))}})(jQuery);

/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
(function(t,i,n){var e=i.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(e):"function"==typeof define&&define.amd?define(function(){return i[t]=n(e)}):i[t]=n(e)})("enquire",this,function(t){"use strict";function i(t,i){var n,e=0,s=t.length;for(e;s>e&&(n=i(t[e],e),n!==!1);e++);}function n(t){return"[object Array]"===Object.prototype.toString.apply(t)}function e(t){return"function"==typeof t}function s(t){this.options=t,!t.deferSetup&&this.setup()}function o(i,n){this.query=i,this.isUnconditional=n,this.handlers=[],this.mql=t(i);var e=this;this.listener=function(t){e.mql=t,e.assess()},this.mql.addListener(this.listener)}function r(){if(!t)throw Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!t("only all").matches}return s.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},o.prototype={addHandler:function(t){var i=new s(t);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(t){var n=this.handlers;i(n,function(i,e){return i.equals(t)?(i.destroy(),!n.splice(e,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){i(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";i(this.handlers,function(i){i[t]()})}},r.prototype={register:function(t,s,r){var h=this.queries,u=r&&this.browserIsIncapable;return h[t]||(h[t]=new o(t,u)),e(s)&&(s={match:s}),n(s)||(s=[s]),i(s,function(i){h[t].addHandler(i)}),this},unregister:function(t,i){var n=this.queries[t];return n&&(i?n.removeHandler(i):(n.clear(),delete this.queries[t])),this}},new r});

/**
 * jQuery Masonry v2.1.06
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(f,e){var h=e.event,i;h.special.smartresize={setup:function(){e(this).bind("resize",h.special.smartresize.handler)},teardown:function(){e(this).unbind("resize",h.special.smartresize.handler)},handler:function(a,c){var b=this,d=arguments;a.type="smartresize";i&&clearTimeout(i);i=setTimeout(function(){e.event.handle.apply(b,d)},"execAsap"===c?0:100)}};e.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])};e.Mason=function(a,c){this.element= e(c);this._create(a);this._init()};e.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,fraudWidth:0,isFitWidth:!1,containerStyle:{position:"relative"}};e.Mason.prototype={_filterFindBricks:function(a){var c=this.options.itemSelector;return!c?a:a.filter(c).add(a.find(c))},_getBricks:function(a){return this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick")},_create:function(a){this.options=e.extend(!0,{},e.Mason.settings, a);this.styleQueue=[];a=this.element[0].style;this.originalStyle={height:a.height||""};var c=this.options.containerStyle,b;for(b in c)this.originalStyle[b]=a[b]||"";this.element.css(c);this.horizontalDirection=this.options.isRTL?"right":"left";b=this.element.css("padding-"+this.horizontalDirection);a=this.element.css("padding-top");this.offset={x:b?parseInt(b,10):0,y:a?parseInt(a,10):0};this.isFluid=this.options.columnWidth&&"function"===typeof this.options.columnWidth;var d=this;setTimeout(function(){d.element.addClass("masonry")}, 0);this.options.isResizable&&e(f).bind("smartresize.masonry",function(){d.resize()});this.reloadItems()},_init:function(a){this._getColumns();this._reLayout(a)},option:function(a){e.isPlainObject(a)&&(this.options=e.extend(!0,this.options,a))},layout:function(a,c){for(var b=0,d=a.length;b<d;b++)this._placeBrick(a[b]);d={};d.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){for(var e=0,b=this.cols;--b&&0===this.colYs[b];)e++;d.width=(this.cols-e)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element, style:d});for(var e=!this.isLaidOut?"css":this.options.isAnimated?"animate":"css",g=this.options.animationOptions,f,b=0,d=this.styleQueue.length;b<d;b++)f=this.styleQueue[b],f.$el[e](f.style,g);this.styleQueue=[];c&&c.call(a);this.isLaidOut=!0},_getColumns:function(){var a=(this.options.isFitWidth?this.element.parent():this.element).width(),a=a+this.options.fraudWidth;this.columnWidth=this.isFluid?this.options.columnWidth(a):this.options.columnWidth||this.$bricks.outerWidth(!0)||a;this.columnWidth+= this.options.gutterWidth;this.cols=Math.floor((a+this.options.gutterWidth)/this.columnWidth);this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var a=e(a),c,b,d,f,g;c=Math.ceil(a.outerWidth(!0)/this.columnWidth);c=Math.min(c,this.cols);if(1===c)d=this.colYs;else{b=this.cols+1-c;d=[];for(g=0;g<b;g++)f=this.colYs.slice(g,g+c),d[g]=Math.max.apply(Math,f)}g=Math.min.apply(Math,d);b=c=0;for(f=d.length;b<f;b++)if(d[b]===g){c=b;break}d={top:g+this.offset.y};d[this.horizontalDirection]=this.columnWidth* c+this.offset.x;this.styleQueue.push({$el:a,style:d});a=g+a.outerHeight(!0);d=this.cols+1-f;for(b=0;b<d;b++)this.colYs[c+b]=a},resize:function(){var a=this.cols;this._getColumns();(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var c=this.cols;for(this.colYs=[];c--;)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems();this._init(a)},appended:function(a,c,b){if(c){this._filterFindBricks(a).css({top:this.element.height()}); var d=this;setTimeout(function(){d._appended(a,b)},1)}else this._appended(a,b)},_appended:function(a,c){var b=this._getBricks(a);this.$bricks=this.$bricks.add(b);this.layout(b,c)},remove:function(a){this.$bricks=this.$bricks.not(a);a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="";this.style.top="";this.style.left=""});var a=this.element[0].style,c;for(c in this.originalStyle)a[c]=this.originalStyle[c];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"); e(f).unbind(".masonry")}};e.fn.imagesLoaded=function(a){function c(){a.call(d,f)}function b(a){a=a.target;a.src!==h&&-1===e.inArray(a,i)&&(i.push(a),0>=--g&&(setTimeout(c),f.unbind(".imagesLoaded",b)))}var d=this,f=d.find("img").add(d.filter("img")),g=f.length,h="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",i=[];g||c();f.bind("load.imagesLoaded error.imagesLoaded",b).each(function(){var a=this.src;this.src=h;this.src=a});return d};e.fn.masonry=function(a){if("string"=== typeof a){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var b=e.data(this,"masonry");b?!e.isFunction(b[a])||"_"===a.charAt(0)?f.console&&f.console.error("no such method '"+a+"' for masonry instance"):b[a].apply(b,c):f.console&&f.console.error("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'")})}else this.each(function(){var b=e.data(this,"masonry");b?(b.option(a||{}),b._init()):e.data(this,"masonry",new e.Mason(a,this))});return this}})(window, jQuery);

/*
 * jQuery Textarea Characters Counter Plugin v 2.0
 * Examples and documentation at: http://roy-jin.appspot.com/jsp/textareaCounter.jsp
 * Copyright (c) 2010 Roy Jin
 * Version: 2.0 (11-JUN-2010)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.4.2 or later
 */
(function(d){d.fn.textareaCount=function(b,q){function f(){g.html(t());"undefined"!=typeof q&&q.call(this,{input:e,max:h,left:m,words:k});return!0}function t(){var a=c.val(),n=a.length;if(0<b.maxCharacterSize){n>=b.maxCharacterSize&&(a=a.substring(0,b.maxCharacterSize));var l=r(a),d=b.maxCharacterSize-l;p()||(d=b.maxCharacterSize);if(n>d){var f=this.scrollTop;c.val(a.substring(0,d));this.scrollTop=f}g.removeClass(b.warningStyle);d-n<=b.warningNumber&&g.addClass(b.warningStyle);e=c.val().length+l;
p()||(e=c.val().length);k=s(c.val()).length-1;m=h-e}else l=r(a),e=c.val().length+l,p()||(e=c.val().length),k=s(c.val()).length-1;a=b.displayFormat;a=a.replace("#input",e);a=a.replace("#words",k);0<h&&(a=a.replace("#max",h),a=a.replace("#left",m));return a}function p(){return-1!=navigator.appVersion.toLowerCase().indexOf("win")?!0:!1}function r(a){for(var b=0,c=0;c<a.length;c++)"\n"==a.charAt(c)&&b++;return b}function s(a){a=(a+" ").replace(/^[^A-Za-z0-9]+/gi,"");var b=rExp=/[^A-Za-z0-9]+/gi;return a.replace(b,
" ").split(" ")}b=d.extend({maxCharacterSize:250,originalStyle:"textarea_counter_default",warningStyle:"textarea_counter_warning",warningNumber:20,displayFormat:"<b>#left</b> "+lang.characters_left},b);var c=d(this);d("<div class='charleft'>&nbsp;</div>").insertAfter(c);var g=c.next(".charleft");g.addClass(b.originalStyle);g.css({});var e=0,h=b.maxCharacterSize,m=0,k=0;c.bind("keyup",function(a){f()}).bind("mouseover",function(a){setTimeout(function(){f()},10)}).bind("paste",function(a){setTimeout(function(){f()},
10)})}})(jQuery);

/*
 * Hisrc jQuery Plugin (IE8 support added by John)
 *
 * Copyright (c) 2012
 * Licensed under the MIT license.
 *
 */
(function(b){b.hisrc={bandwidth:null,connectionTestResult:null,connectionKbps:null,connectionType:null,devicePixelRatio:null};b.hisrc.defaults={useTransparentGif:!0,transparentGifSrc:rlConfig.tpl_base+"img/blank_10x7.gif",minKbpsForHighBandwidth:300,speedTestUri:rlConfig.tpl_base+"img/50K.jpg",speedTestKB:50,speedTestExpireMinutes:10,forcedBandwidth:!1,srcIsLowResoltion:!0};b.hisrc.speedTest=function(d){b(window).hisrc(d)};b.fn.hisrc=function(d){var e=b.extend({callback:function(){}},b.hisrc.defaults,
d),g=b(this),k=navigator.connection||{type:0},n=3==k.type||4==k.type||/^[23]g$/.test(k.type);b.hisrc.devicePixelRatio=1;if(void 0!==window.devicePixelRatio)b.hisrc.devicePixelRatio=window.devicePixelRatio;else if(void 0!==window.matchMedia)for(d=1;2>=d;d+=0.5)window.matchMedia("(min-resolution: "+d+"dppx)").matches&&(b.hisrc.devicePixelRatio=d);var m=e.speedTestUri,f,l=function(a,c){if("complete"!==f){f="complete";b.hisrc.connectionTestResult=a;try{c||(c=e.speedTestExpireMinutes);var p={kbps:b.hisrc.connectionKbps,
bw:b.hisrc.bandwidth,exp:(new Date).getTime()+6E4*c};localStorage.setItem("fsjs",JSON.stringify(p))}catch(d){}g.trigger("speedTestComplete.hisrc")}},h=function(a,c){e.useTransparentGif?a.attr("src",e.transparentGifSrc).css("backgroundImage",'url("'+c+'")'):a.attr("src",c);b.browser.msie&&8>=b.browser.version&&a.css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+c+"', sizingMethod='scale')")};e.callback.call(this);g.each(function(){var a=b(this),c=a.attr("src");c&&(a.data("m1src")||
a.data("m1src",c),!a.attr("width")&&0<a.width()&&a.attr("width",a.width()),!a.attr("height")&&0<a.height()&&a.attr("height",a.height()),a.on("speedTestComplete.hisrc",function(){if("complete"===f){if(n)a.attr("src",a.data("m1src")),b.browser.msie&&8>=b.browser.version&&a.css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a.data("m1src")+"', sizingMethod='scale')");else if(1<b.hisrc.devicePixelRatio&&"high"===b.hisrc.bandwidth){var c=a.data("2x");c||(c=a.data("m1src").replace(/\.\w+$/,
function(a){return"@2x"+a}));h(a,c)}else e.srcIsLowResoltion&&((c=a.data("1x"))||(c=a.data("m1src").replace(/\.\w+$/,function(a){return"@1x"+a})),h(a,c));a.off("speedTestComplete.hisrc")}}))});(function(){if(!f)if(e.forcedBandwidth)b.hisrc.bandwidth=e.forcedBandwidth,b.hisrc.connectionTestResult="forced",f="complete",g.trigger("speedTestComplete.hisrc");else if(1===b.hisrc.devicePixelRatio)b.hisrc.connectionTestResult="skip",f="complete",g.trigger("speedTestComplete.hisrc");else if(b.hisrc.connectionType=
k.type,n)b.hisrc.connectionTestResult="connTypeSlow",f="complete",g.trigger("speedTestComplete.hisrc");else{try{var a=JSON.parse(localStorage.getItem("fsjs"));if(null!==a&&(new Date).getTime()<a.exp){b.hisrc.bandwidth=a.bw;b.hisrc.connectionKbps=a.kbps;b.hisrc.connectionTestResult="localStorage";f="complete";g.trigger("speedTestComplete.hisrc");return}}catch(c){}var a=document.createElement("img"),d,h;a.onload=function(){d=(new Date).getTime();var a=(d-h)/1E3;b.hisrc.connectionKbps=8192*e.speedTestKB/
(1<a?a:1)/1024;b.hisrc.bandwidth=b.hisrc.connectionKbps>=e.minKbpsForHighBandwidth?"high":"low";l("networkSuccess")};a.onerror=function(){l("networkError",5)};a.onabort=function(){l("networkAbort",5)};h=(new Date).getTime();f="loading";"https:"===document.location.protocol&&(m=m.replace("http:","https:"));a.src=m+"?r="+Math.random();setTimeout(function(){l("networkSlow")},8*e.speedTestKB/e.minKbpsForHighBandwidth*1E3+350)}})();return g}})(jQuery);

/*
 * jquery.qtip. The jQuery tooltip plugin
 *
 * Copyright (c) 2009 Craig Thompson
 * http://craigsworks.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : February 2009
 * Version : 1.0.0-rc3
 * Released: Tuesday 12th May, 2009 - 00:00
 * Debug: jquery.qtip.debug.js
 */
(function(f){f.fn.qtip=function(B,u){var y,t,A,s,x,w,v,z;if(typeof B=="string"){if(typeof f(this).data("qtip")!=="object"){f.fn.qtip.log.error.call(self,1,f.fn.qtip.constants.NO_TOOLTIP_PRESENT,false)}if(B=="api"){return f(this).data("qtip").interfaces[f(this).data("qtip").current]}else{if(B=="interfaces"){return f(this).data("qtip").interfaces}}}else{if(!B){B={}}if(typeof B.content!=="object"||(B.content.jquery&&B.content.length>0)){B.content={text:B.content}}if(typeof B.content.title!=="object"){B.content.title={text:B.content.title}}if(typeof B.position!=="object"){B.position={corner:B.position}}if(typeof B.position.corner!=="object"){B.position.corner={target:B.position.corner,tooltip:B.position.corner}}if(typeof B.show!=="object"){B.show={when:B.show}}if(typeof B.show.when!=="object"){B.show.when={event:B.show.when}}if(typeof B.show.effect!=="object"){B.show.effect={type:B.show.effect}}if(typeof B.hide!=="object"){B.hide={when:B.hide}}if(typeof B.hide.when!=="object"){B.hide.when={event:B.hide.when}}if(typeof B.hide.effect!=="object"){B.hide.effect={type:B.hide.effect}}if(typeof B.style!=="object"){B.style={name:B.style}}B.style=c(B.style);s=f.extend(true,{},f.fn.qtip.defaults,B);s.style=a.call({options:s},s.style);s.user=f.extend(true,{},B)}return f(this).each(function(){if(typeof B=="string"){w=B.toLowerCase();A=f(this).qtip("interfaces");if(typeof A=="object"){if(u===true&&w=="destroy"){while(A.length>0){A[A.length-1].destroy()}}else{if(u!==true){A=[f(this).qtip("api")]}for(y=0;y<A.length;y++){if(w=="destroy"){A[y].destroy()}else{if(A[y].status.rendered===true){if(w=="show"){A[y].show()}else{if(w=="hide"){A[y].hide()}else{if(w=="focus"){A[y].focus()}else{if(w=="disable"){A[y].disable(true)}else{if(w=="enable"){A[y].disable(false)}}}}}}}}}}}else{v=f.extend(true,{},s);v.hide.effect.length=s.hide.effect.length;v.show.effect.length=s.show.effect.length;if(v.position.container===false){v.position.container=f(document.body)}if(v.position.target===false){v.position.target=f(this)}if(v.show.when.target===false){v.show.when.target=f(this)}if(v.hide.when.target===false){v.hide.when.target=f(this)}t=f.fn.qtip.interfaces.length;for(y=0;y<t;y++){if(typeof f.fn.qtip.interfaces[y]=="undefined"){t=y;break}}x=new d(f(this),v,t);f.fn.qtip.interfaces[t]=x;if(typeof f(this).data("qtip")=="object"){if(typeof f(this).attr("qtip")==="undefined"){f(this).data("qtip").current=f(this).data("qtip").interfaces.length}f(this).data("qtip").interfaces.push(x)}else{f(this).data("qtip",{current:0,interfaces:[x]})}if(v.content.prerender===false&&v.show.when.event!==false&&v.show.ready!==true){v.show.when.target.bind(v.show.when.event+".qtip-"+t+"-create",{qtip:t},function(C){z=f.fn.qtip.interfaces[C.data.qtip];z.options.show.when.target.unbind(z.options.show.when.event+".qtip-"+C.data.qtip+"-create");z.cache.mouse={x:C.pageX,y:C.pageY};p.call(z);z.options.show.when.target.trigger(z.options.show.when.event)})}else{x.cache.mouse={x:v.show.when.target.offset().left,y:v.show.when.target.offset().top};p.call(x)}}})};function d(u,t,v){var s=this;s.id=v;s.options=t;s.status={animated:false,rendered:false,disabled:false,focused:false};s.elements={target:u.addClass(s.options.style.classes.target),tooltip:null,wrapper:null,content:null,contentWrapper:null,title:null,button:null,tip:null,bgiframe:null};s.cache={mouse:{},position:{},toggle:0};s.timers={};f.extend(s,s.options.api,{show:function(y){var x,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"show")}if(s.elements.tooltip.css("display")!=="none"){return s}s.elements.tooltip.stop(true,false);x=s.beforeShow.call(s,y);if(x===false){return s}function w(){if(s.options.position.type!=="static"){s.focus()}s.onShow.call(s,y);if(f.browser.msie){s.elements.tooltip.get(0).style.removeAttribute("filter")}}s.cache.toggle=1;if(s.options.position.type!=="static"){s.updatePosition(y,(s.options.show.effect.length>0))}if(typeof s.options.show.solo=="object"){z=f(s.options.show.solo)}else{if(s.options.show.solo===true){z=f("div.qtip").not(s.elements.tooltip)}}if(z){z.each(function(){if(f(this).qtip("api").status.rendered===true){f(this).qtip("api").hide()}})}if(typeof s.options.show.effect.type=="function"){s.options.show.effect.type.call(s.elements.tooltip,s.options.show.effect.length);s.elements.tooltip.queue(function(){w();f(this).dequeue()})}else{switch(s.options.show.effect.type.toLowerCase()){case"fade":s.elements.tooltip.fadeIn(s.options.show.effect.length,w);break;case"slide":s.elements.tooltip.slideDown(s.options.show.effect.length,function(){w();if(s.options.position.type!=="static"){s.updatePosition(y,true)}});break;case"grow":s.elements.tooltip.show(s.options.show.effect.length,w);break;default:s.elements.tooltip.show(null,w);break}s.elements.tooltip.addClass(s.options.style.classes.active)}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_SHOWN,"show")},hide:function(y){var x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"hide")}else{if(s.elements.tooltip.css("display")==="none"){return s}}clearTimeout(s.timers.show);s.elements.tooltip.stop(true,false);x=s.beforeHide.call(s,y);if(x===false){return s}function w(){s.onHide.call(s,y)}s.cache.toggle=0;if(typeof s.options.hide.effect.type=="function"){s.options.hide.effect.type.call(s.elements.tooltip,s.options.hide.effect.length);s.elements.tooltip.queue(function(){w();f(this).dequeue()})}else{switch(s.options.hide.effect.type.toLowerCase()){case"fade":s.elements.tooltip.fadeOut(s.options.hide.effect.length,w);break;case"slide":s.elements.tooltip.slideUp(s.options.hide.effect.length,w);break;case"grow":s.elements.tooltip.hide(s.options.hide.effect.length,w);break;default:s.elements.tooltip.hide(null,w);break}s.elements.tooltip.removeClass(s.options.style.classes.active)}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_HIDDEN,"hide")},updatePosition:function(w,x){var C,G,L,J,H,E,y,I,B,D,K,A,F,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updatePosition")}else{if(s.options.position.type=="static"){return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.CANNOT_POSITION_STATIC,"updatePosition")}}G={position:{left:0,top:0},dimensions:{height:0,width:0},corner:s.options.position.corner.target};L={position:s.getPosition(),dimensions:s.getDimensions(),corner:s.options.position.corner.tooltip};if(s.options.position.target!=="mouse"){if(s.options.position.target.get(0).nodeName.toLowerCase()=="area"){J=s.options.position.target.attr("coords").split(",");for(C=0;C<J.length;C++){J[C]=parseInt(J[C])}H=s.options.position.target.parent("map").attr("name");E=f('img[usemap="#'+H+'"]:first').offset();G.position={left:Math.floor(E.left+J[0]),top:Math.floor(E.top+J[1])};switch(s.options.position.target.attr("shape").toLowerCase()){case"rect":G.dimensions={width:Math.ceil(Math.abs(J[2]-J[0])),height:Math.ceil(Math.abs(J[3]-J[1]))};break;case"circle":G.dimensions={width:J[2]+1,height:J[2]+1};break;case"poly":G.dimensions={width:J[0],height:J[1]};for(C=0;C<J.length;C++){if(C%2==0){if(J[C]>G.dimensions.width){G.dimensions.width=J[C]}if(J[C]<J[0]){G.position.left=Math.floor(E.left+J[C])}}else{if(J[C]>G.dimensions.height){G.dimensions.height=J[C]}if(J[C]<J[1]){G.position.top=Math.floor(E.top+J[C])}}}G.dimensions.width=G.dimensions.width-(G.position.left-E.left);G.dimensions.height=G.dimensions.height-(G.position.top-E.top);break;default:return f.fn.qtip.log.error.call(s,4,f.fn.qtip.constants.INVALID_AREA_SHAPE,"updatePosition");break}G.dimensions.width-=2;G.dimensions.height-=2}else{if(s.options.position.target.add(document.body).length===1){G.position={left:f(document).scrollLeft(),top:f(document).scrollTop()};G.dimensions={height:f(window).height(),width:f(window).width()}}else{if(typeof s.options.position.target.attr("qtip")!=="undefined"){G.position=s.options.position.target.qtip("api").cache.position}else{G.position=s.options.position.target.offset()}G.dimensions={height:s.options.position.target.outerHeight(),width:s.options.position.target.outerWidth()}}}y=f.extend({},G.position);if(G.corner.search(/right/i)!==-1){y.left+=G.dimensions.width}if(G.corner.search(/bottom/i)!==-1){y.top+=G.dimensions.height}if(G.corner.search(/((top|bottom)Middle)|center/)!==-1){y.left+=(G.dimensions.width/2)}if(G.corner.search(/((left|right)Middle)|center/)!==-1){y.top+=(G.dimensions.height/2)}}else{G.position=y={left:s.cache.mouse.x,top:s.cache.mouse.y};G.dimensions={height:1,width:1}}if(L.corner.search(/right/i)!==-1){y.left-=L.dimensions.width}if(L.corner.search(/bottom/i)!==-1){y.top-=L.dimensions.height}if(L.corner.search(/((top|bottom)Middle)|center/)!==-1){y.left-=(L.dimensions.width/2)}if(L.corner.search(/((left|right)Middle)|center/)!==-1){y.top-=(L.dimensions.height/2)}I=(f.browser.msie)?1:0;B=(f.browser.msie&&parseInt(f.browser.version.charAt(0))===6)?1:0;if(s.options.style.border.radius>0){if(L.corner.search(/Left/)!==-1){y.left-=s.options.style.border.radius}else{if(L.corner.search(/Right/)!==-1){y.left+=s.options.style.border.radius}}if(L.corner.search(/Top/)!==-1){y.top-=s.options.style.border.radius}else{if(L.corner.search(/Bottom/)!==-1){y.top+=s.options.style.border.radius}}}if(I){if(L.corner.search(/top/)!==-1){y.top-=I}else{if(L.corner.search(/bottom/)!==-1){y.top+=I}}if(L.corner.search(/left/)!==-1){y.left-=I}else{if(L.corner.search(/right/)!==-1){y.left+=I}}if(L.corner.search(/leftMiddle|rightMiddle/)!==-1){y.top-=1}}if(s.options.position.adjust.screen===true){y=o.call(s,y,G,L)}if(s.options.position.target==="mouse"&&s.options.position.adjust.mouse===true){if(s.options.position.adjust.screen===true&&s.elements.tip){K=s.elements.tip.attr("rel")}else{K=s.options.position.corner.tooltip}y.left+=(K.search(/right/i)!==-1)?-6:6;y.top+=(K.search(/bottom/i)!==-1)?-6:6}if(!s.elements.bgiframe&&f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){f("select, object").each(function(){A=f(this).offset();A.bottom=A.top+f(this).height();A.right=A.left+f(this).width();if(y.top+L.dimensions.height>=A.top&&y.left+L.dimensions.width>=A.left){k.call(s)}})}y.left+=s.options.position.adjust.x;y.top+=s.options.position.adjust.y;F=s.getPosition();if(y.left!=F.left||y.top!=F.top){z=s.beforePositionUpdate.call(s,w);if(z===false){return s}s.cache.position=y;if(x===true){s.status.animated=true;s.elements.tooltip.animate(y,200,"swing",function(){s.status.animated=false})}else{s.elements.tooltip.css(y)}s.onPositionUpdate.call(s,w);if(typeof w!=="undefined"&&w.type&&w.type!=="mousemove"){f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_POSITION_UPDATED,"updatePosition")}}return s},updateWidth:function(w){var x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateWidth")}else{if(w&&typeof w!=="number"){return f.fn.qtip.log.error.call(s,2,"newWidth must be of type number","updateWidth")}}x=s.elements.contentWrapper.siblings().add(s.elements.tip).add(s.elements.button);if(!w){if(typeof s.options.style.width.value=="number"){w=s.options.style.width.value}else{s.elements.tooltip.css({width:"auto"});x.hide();if(f.browser.msie){s.elements.wrapper.add(s.elements.contentWrapper.children()).css({zoom:"normal"})}w=s.getDimensions().width+1;if(!s.options.style.width.value){if(w>s.options.style.width.max){w=s.options.style.width.max}if(w<s.options.style.width.min){w=s.options.style.width.min}}}}if(w%2!==0){w-=1}s.elements.tooltip.width(w);x.show();if(s.options.style.border.radius){s.elements.tooltip.find(".qtip-betweenCorners").each(function(y){f(this).width(w-(s.options.style.border.radius*2))})}if(f.browser.msie){s.elements.wrapper.add(s.elements.contentWrapper.children()).css({zoom:"1"});s.elements.wrapper.width(w);if(s.elements.bgiframe){s.elements.bgiframe.width(w).height(s.getDimensions.height)}}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_WIDTH_UPDATED,"updateWidth")},updateStyle:function(w){var z,A,x,y,B;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateStyle")}else{if(typeof w!=="string"||!f.fn.qtip.styles[w]){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.STYLE_NOT_DEFINED,"updateStyle")}}s.options.style=a.call(s,f.fn.qtip.styles[w],s.options.user.style);s.elements.content.css(q(s.options.style));if(s.options.content.title.text!==false){s.elements.title.css(q(s.options.style.title,true))}s.elements.contentWrapper.css({borderColor:s.options.style.border.color});if(s.options.style.tip.corner!==false){if(f("<canvas>").get(0).getContext){z=s.elements.tooltip.find(".qtip-tip canvas:first");x=z.get(0).getContext("2d");x.clearRect(0,0,300,300);y=z.parent("div[rel]:first").attr("rel");B=b(y,s.options.style.tip.size.width,s.options.style.tip.size.height);h.call(s,z,B,s.options.style.tip.color||s.options.style.border.color)}else{if(f.browser.msie){z=s.elements.tooltip.find('.qtip-tip [nodeName="shape"]');z.attr("fillcolor",s.options.style.tip.color||s.options.style.border.color)}}}if(s.options.style.border.radius>0){s.elements.tooltip.find(".qtip-betweenCorners").css({backgroundColor:s.options.style.border.color});if(f("<canvas>").get(0).getContext){A=g(s.options.style.border.radius);s.elements.tooltip.find(".qtip-wrapper canvas").each(function(){x=f(this).get(0).getContext("2d");x.clearRect(0,0,300,300);y=f(this).parent("div[rel]:first").attr("rel");r.call(s,f(this),A[y],s.options.style.border.radius,s.options.style.border.color)})}else{if(f.browser.msie){s.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function(){f(this).attr("fillcolor",s.options.style.border.color)})}}}return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_STYLE_UPDATED,"updateStyle")},updateContent:function(A,y){var z,x,w;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateContent")}else{if(!A){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateContent")}}z=s.beforeContentUpdate.call(s,A);if(typeof z=="string"){A=z}else{if(z===false){return}}if(f.browser.msie){s.elements.contentWrapper.children().css({zoom:"normal"})}if(A.jquery&&A.length>0){A.clone(true).appendTo(s.elements.content).show()}else{s.elements.content.html(A)}x=s.elements.content.find("img[complete=false]");if(x.length>0){w=0;x.each(function(C){f('<img src="'+f(this).attr("src")+'" />').load(function(){if(++w==x.length){B()}})})}else{B()}function B(){s.updateWidth();if(y!==false){if(s.options.position.type!=="static"){s.updatePosition(s.elements.tooltip.is(":visible"),true)}if(s.options.style.tip.corner!==false){n.call(s)}}}s.onContentUpdate.call(s);return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_CONTENT_UPDATED,"loadContent")},loadContent:function(w,z,A){var y;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"loadContent")}y=s.beforeContentLoad.call(s);if(y===false){return s}if(A=="post"){f.post(w,z,x)}else{f.get(w,z,x)}function x(B){s.onContentLoad.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_CONTENT_LOADED,"loadContent");s.updateContent(B)}return s},updateTitle:function(w){if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateTitle")}else{if(!w){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateTitle")}}returned=s.beforeTitleUpdate.call(s);if(returned===false){return s}if(s.elements.button){s.elements.button=s.elements.button.clone(true)}s.elements.title.html(w);if(s.elements.button){s.elements.title.prepend(s.elements.button)}s.onTitleUpdate.call(s);return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_TITLE_UPDATED,"updateTitle")},focus:function(A){var y,x,w,z;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"focus")}else{if(s.options.position.type=="static"){return f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.CANNOT_FOCUS_STATIC,"focus")}}y=parseInt(s.elements.tooltip.css("z-index"));x=6000+f("div.qtip[qtip]").length-1;if(!s.status.focused&&y!==x){z=s.beforeFocus.call(s,A);if(z===false){return s}f("div.qtip[qtip]").not(s.elements.tooltip).each(function(){if(f(this).qtip("api").status.rendered===true){w=parseInt(f(this).css("z-index"));if(typeof w=="number"&&w>-1){f(this).css({zIndex:parseInt(f(this).css("z-index"))-1})}f(this).qtip("api").status.focused=false}});s.elements.tooltip.css({zIndex:x});s.status.focused=true;s.onFocus.call(s,A);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_FOCUSED,"focus")}return s},disable:function(w){if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"disable")}if(w){if(!s.status.disabled){s.status.disabled=true;f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_DISABLED,"disable")}else{f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,"disable")}}else{if(s.status.disabled){s.status.disabled=false;f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_ENABLED,"disable")}else{f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,"disable")}}return s},destroy:function(){var w,x,y;x=s.beforeDestroy.call(s);if(x===false){return s}if(s.status.rendered){s.options.show.when.target.unbind("mousemove.qtip",s.updatePosition);s.options.show.when.target.unbind("mouseout.qtip",s.hide);s.options.show.when.target.unbind(s.options.show.when.event+".qtip");s.options.hide.when.target.unbind(s.options.hide.when.event+".qtip");s.elements.tooltip.unbind(s.options.hide.when.event+".qtip");s.elements.tooltip.unbind("mouseover.qtip",s.focus);s.elements.tooltip.remove()}else{s.options.show.when.target.unbind(s.options.show.when.event+".qtip-create")}if(typeof s.elements.target.data("qtip")=="object"){y=s.elements.target.data("qtip").interfaces;if(typeof y=="object"&&y.length>0){for(w=0;w<y.length-1;w++){if(y[w].id==s.id){y.splice(w,1)}}}}delete f.fn.qtip.interfaces[s.id];if(typeof y=="object"&&y.length>0){s.elements.target.data("qtip").current=y.length-1}else{s.elements.target.removeData("qtip")}s.onDestroy.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_DESTROYED,"destroy");return s.elements.target},getPosition:function(){var w,x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getPosition")}w=(s.elements.tooltip.css("display")!=="none")?false:true;if(w){s.elements.tooltip.css({visiblity:"hidden"}).show()}x=s.elements.tooltip.offset();if(w){s.elements.tooltip.css({visiblity:"visible"}).hide()}return x},getDimensions:function(){var w,x;if(!s.status.rendered){return f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getDimensions")}w=(!s.elements.tooltip.is(":visible"))?true:false;if(w){s.elements.tooltip.css({visiblity:"hidden"}).show()}x={height:s.elements.tooltip.outerHeight(),width:s.elements.tooltip.outerWidth()};if(w){s.elements.tooltip.css({visiblity:"visible"}).hide()}return x}})}function p(){var s,w,u,t,v,y,x;s=this;s.beforeRender.call(s);s.status.rendered=true;s.elements.tooltip='<div qtip="'+s.id+'" class="qtip '+(s.options.style.classes.tooltip||s.options.style)+'"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:'+s.options.position.type+';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content '+s.options.style.classes.content+'"></div></div></div></div>';s.elements.tooltip=f(s.elements.tooltip);s.elements.tooltip.appendTo(s.options.position.container);s.elements.tooltip.data("qtip",{current:0,interfaces:[s]});s.elements.wrapper=s.elements.tooltip.children("div:first");s.elements.contentWrapper=s.elements.wrapper.children("div:first").css({background:s.options.style.background});s.elements.content=s.elements.contentWrapper.children("div:first").css(q(s.options.style));if(f.browser.msie){s.elements.wrapper.add(s.elements.content).css({zoom:1})}if(s.options.hide.when.event=="unfocus"){s.elements.tooltip.attr("unfocus",true)}if(typeof s.options.style.width.value=="number"){s.updateWidth()}if(f("<canvas>").get(0).getContext||f.browser.msie){if(s.options.style.border.radius>0){m.call(s)}else{s.elements.contentWrapper.css({border:s.options.style.border.width+"px solid "+s.options.style.border.color})}if(s.options.style.tip.corner!==false){e.call(s)}}else{s.elements.contentWrapper.css({border:s.options.style.border.width+"px solid "+s.options.style.border.color});s.options.style.border.radius=0;s.options.style.tip.corner=false;f.fn.qtip.log.error.call(s,2,f.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED,"render")}if((typeof s.options.content.text=="string"&&s.options.content.text.length>0)||(s.options.content.text.jquery&&s.options.content.text.length>0)){u=s.options.content.text}else{if(typeof s.elements.target.attr("title")=="string"&&s.elements.target.attr("title").length>0){u=s.elements.target.attr("title").replace("\\n","<br />");s.elements.target.attr("title","")}else{if(typeof s.elements.target.attr("alt")=="string"&&s.elements.target.attr("alt").length>0){u=s.elements.target.attr("alt").replace("\\n","<br />");s.elements.target.attr("alt","")}else{u=" ";f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.NO_VALID_CONTENT,"render")}}}if(s.options.content.title.text!==false){j.call(s)}s.updateContent(u);l.call(s);if(s.options.show.ready===true){s.show()}if(s.options.content.url!==false){t=s.options.content.url;v=s.options.content.data;y=s.options.content.method||"get";s.loadContent(t,v,y)}s.onRender.call(s);f.fn.qtip.log.error.call(s,1,f.fn.qtip.constants.EVENT_RENDERED,"render")}function m(){var F,z,t,B,x,E,u,G,D,y,w,C,A,s,v;F=this;F.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove();t=F.options.style.border.width;B=F.options.style.border.radius;x=F.options.style.border.color||F.options.style.tip.color;E=g(B);u={};for(z in E){u[z]='<div rel="'+z+'" style="'+((z.search(/Left/)!==-1)?"left":"right")+":0; position:absolute; height:"+B+"px; width:"+B+'px; overflow:hidden; line-height:0.1px; font-size:1px">';if(f("<canvas>").get(0).getContext){u[z]+='<canvas height="'+B+'" width="'+B+'" style="vertical-align: top"></canvas>'}else{if(f.browser.msie){G=B*2+3;u[z]+='<v:arc stroked="false" fillcolor="'+x+'" startangle="'+E[z][0]+'" endangle="'+E[z][1]+'" style="width:'+G+"px; height:"+G+"px; margin-top:"+((z.search(/bottom/)!==-1)?-2:-1)+"px; margin-left:"+((z.search(/Right/)!==-1)?E[z][2]-3.5:-1)+'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'}}u[z]+="</div>"}D=F.getDimensions().width-(Math.max(t,B)*2);y='<div class="qtip-betweenCorners" style="height:'+B+"px; width:"+D+"px; overflow:hidden; background-color:"+x+'; line-height:0.1px; font-size:1px;">';w='<div class="qtip-borderTop" dir="ltr" style="height:'+B+"px; margin-left:"+B+'px; line-height:0.1px; font-size:1px; padding:0;">'+u.topLeft+u.topRight+y;F.elements.wrapper.prepend(w);C='<div class="qtip-borderBottom" dir="ltr" style="height:'+B+"px; margin-left:"+B+'px; line-height:0.1px; font-size:1px; padding:0;">'+u.bottomLeft+u.bottomRight+y;F.elements.wrapper.append(C);if(f("<canvas>").get(0).getContext){F.elements.wrapper.find("canvas").each(function(){A=E[f(this).parent("[rel]:first").attr("rel")];r.call(F,f(this),A,B,x)})}else{if(f.browser.msie){F.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>')}}s=Math.max(B,(B+(t-B)));v=Math.max(t-B,0);F.elements.contentWrapper.css({border:"0px solid "+x,borderWidth:v+"px "+s+"px"})}function r(u,w,s,t){var v=u.get(0).getContext("2d");v.fillStyle=t;v.beginPath();v.arc(w[0],w[1],s,0,Math.PI*2,false);v.fill()}function e(v){var t,s,x,u,w;t=this;if(t.elements.tip!==null){t.elements.tip.remove()}s=t.options.style.tip.color||t.options.style.border.color;if(t.options.style.tip.corner===false){return}else{if(!v){v=t.options.style.tip.corner}}x=b(v,t.options.style.tip.size.width,t.options.style.tip.size.height);t.elements.tip='<div class="'+t.options.style.classes.tip+'" dir="ltr" rel="'+v+'" style="position:absolute; height:'+t.options.style.tip.size.height+"px; width:"+t.options.style.tip.size.width+'px; margin:0 auto; line-height:0.1px; font-size:1px;">';if(f("<canvas>").get(0).getContext){t.elements.tip+='<canvas height="'+t.options.style.tip.size.height+'" width="'+t.options.style.tip.size.width+'"></canvas>'}else{if(f.browser.msie){u=t.options.style.tip.size.width+","+t.options.style.tip.size.height;w="m"+x[0][0]+","+x[0][1];w+=" l"+x[1][0]+","+x[1][1];w+=" "+x[2][0]+","+x[2][1];w+=" xe";t.elements.tip+='<v:shape fillcolor="'+s+'" stroked="false" filled="true" path="'+w+'" coordsize="'+u+'" style="width:'+t.options.style.tip.size.width+"px; height:"+t.options.style.tip.size.height+"px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:"+((v.search(/top/)!==-1)?"bottom":"top")+'"></v:shape>';t.elements.tip+='<v:image style="behavior:url(#default#VML);"></v:image>';t.elements.contentWrapper.css("position","relative")}}t.elements.tooltip.prepend(t.elements.tip+"</div>");t.elements.tip=t.elements.tooltip.find("."+t.options.style.classes.tip).eq(0);if(f("<canvas>").get(0).getContext){h.call(t,t.elements.tip.find("canvas:first"),x,s)}if(v.search(/top/)!==-1&&f.browser.msie&&parseInt(f.browser.version.charAt(0))===6){t.elements.tip.css({marginTop:-4})}n.call(t,v)}function h(t,v,s){var u=t.get(0).getContext("2d");u.fillStyle=s;u.beginPath();u.moveTo(v[0][0],v[0][1]);u.lineTo(v[1][0],v[1][1]);u.lineTo(v[2][0],v[2][1]);u.fill()}function n(u){var t,w,s,x,v;t=this;if(t.options.style.tip.corner===false||!t.elements.tip){return}if(!u){u=t.elements.tip.attr("rel")}w=positionAdjust=(f.browser.msie)?1:0;t.elements.tip.css(u.match(/left|right|top|bottom/)[0],0);if(u.search(/top|bottom/)!==-1){if(f.browser.msie){if(parseInt(f.browser.version.charAt(0))===6){positionAdjust=(u.search(/top/)!==-1)?-3:1}else{positionAdjust=(u.search(/top/)!==-1)?1:2}}if(u.search(/Middle/)!==-1){t.elements.tip.css({left:"50%",marginLeft:-(t.options.style.tip.size.width/2)})}else{if(u.search(/Left/)!==-1){t.elements.tip.css({left:t.options.style.border.radius-w})}else{if(u.search(/Right/)!==-1){t.elements.tip.css({right:t.options.style.border.radius+w})}}}if(u.search(/top/)!==-1){t.elements.tip.css({top:-positionAdjust})}else{t.elements.tip.css({bottom:positionAdjust})}}else{if(u.search(/left|right/)!==-1){if(f.browser.msie){positionAdjust=(parseInt(f.browser.version.charAt(0))===6)?1:((u.search(/left/)!==-1)?1:2)}if(u.search(/Middle/)!==-1){t.elements.tip.css({top:"50%",marginTop:-(t.options.style.tip.size.height/2)})}else{if(u.search(/Top/)!==-1){t.elements.tip.css({top:t.options.style.border.radius-w})}else{if(u.search(/Bottom/)!==-1){t.elements.tip.css({bottom:t.options.style.border.radius+w})}}}if(u.search(/left/)!==-1){t.elements.tip.css({left:-positionAdjust})}else{t.elements.tip.css({right:positionAdjust})}}}s="padding-"+u.match(/left|right|top|bottom/)[0];x=t.options.style.tip.size[(s.search(/left|right/)!==-1)?"width":"height"];t.elements.tooltip.css("padding",0);t.elements.tooltip.css(s,x);if(f.browser.msie&&parseInt(f.browser.version.charAt(0))==6){v=parseInt(t.elements.tip.css("margin-top"))||0;v+=parseInt(t.elements.content.css("margin-top"))||0;t.elements.tip.css({marginTop:v})}}function j(){var s=this;if(s.elements.title!==null){s.elements.title.remove()}s.elements.title=f('<div class="'+s.options.style.classes.title+'">').css(q(s.options.style.title,true)).css({zoom:(f.browser.msie)?1:0}).prependTo(s.elements.contentWrapper);if(s.options.content.title.text){s.updateTitle.call(s,s.options.content.title.text)}if(s.options.content.title.button!==false&&typeof s.options.content.title.button=="string"){s.elements.button=f('<a class="'+s.options.style.classes.button+'" style="float:right; position: relative"></a>').css(q(s.options.style.button,true)).html(s.options.content.title.button).prependTo(s.elements.title).click(function(t){if(!s.status.disabled){s.hide(t)}})}}function l(){var t,v,u,s;t=this;v=t.options.show.when.target;u=t.options.hide.when.target;if(t.options.hide.fixed){u=u.add(t.elements.tooltip)}if(t.options.hide.when.event=="inactive"){s=["click","dblclick","mousedown","mouseup","mousemove","mouseout","mouseenter","mouseleave","mouseover"];function y(z){if(t.status.disabled===true){return}clearTimeout(t.timers.inactive);t.timers.inactive=setTimeout(function(){f(s).each(function(){u.unbind(this+".qtip-inactive");t.elements.content.unbind(this+".qtip-inactive")});t.hide(z)},t.options.hide.delay)}}else{if(t.options.hide.fixed===true){t.elements.tooltip.bind("mouseover.qtip",function(){if(t.status.disabled===true){return}clearTimeout(t.timers.hide)})}}function x(z){if(t.status.disabled===true){return}if(t.options.hide.when.event=="inactive"){f(s).each(function(){u.bind(this+".qtip-inactive",y);t.elements.content.bind(this+".qtip-inactive",y)});y()}clearTimeout(t.timers.show);clearTimeout(t.timers.hide);t.timers.show=setTimeout(function(){t.show(z)},t.options.show.delay)}function w(z){if(t.status.disabled===true){return}if(t.options.hide.fixed===true&&t.options.hide.when.event.search(/mouse(out|leave)/i)!==-1&&f(z.relatedTarget).parents("div.qtip[qtip]").length>0){z.stopPropagation();z.preventDefault();clearTimeout(t.timers.hide);return false}clearTimeout(t.timers.show);clearTimeout(t.timers.hide);t.elements.tooltip.stop(true,true);t.timers.hide=setTimeout(function(){t.hide(z)},t.options.hide.delay)}if((t.options.show.when.target.add(t.options.hide.when.target).length===1&&t.options.show.when.event==t.options.hide.when.event&&t.options.hide.when.event!=="inactive")||t.options.hide.when.event=="unfocus"){t.cache.toggle=0;v.bind(t.options.show.when.event+".qtip",function(z){if(t.cache.toggle==0){x(z)}else{w(z)}})}else{v.bind(t.options.show.when.event+".qtip",x);if(t.options.hide.when.event!=="inactive"){u.bind(t.options.hide.when.event+".qtip",w)}}if(t.options.position.type.search(/(fixed|absolute)/)!==-1){t.elements.tooltip.bind("mouseover.qtip",t.focus)}if(t.options.position.target==="mouse"&&t.options.position.type!=="static"){v.bind("mousemove.qtip",function(z){t.cache.mouse={x:z.pageX,y:z.pageY};if(t.status.disabled===false&&t.options.position.adjust.mouse===true&&t.options.position.type!=="static"&&t.elements.tooltip.css("display")!=="none"){t.updatePosition(z)}})}}function o(u,v,A){var z,s,x,y,t,w;z=this;if(A.corner=="center"){return v.position}s=f.extend({},u);y={x:false,y:false};t={left:(s.left<f.fn.qtip.cache.screen.scroll.left),right:(s.left+A.dimensions.width+2>=f.fn.qtip.cache.screen.width+f.fn.qtip.cache.screen.scroll.left),top:(s.top<f.fn.qtip.cache.screen.scroll.top),bottom:(s.top+A.dimensions.height+2>=f.fn.qtip.cache.screen.height+f.fn.qtip.cache.screen.scroll.top)};x={left:(t.left&&(A.corner.search(/right/i)!=-1||(A.corner.search(/right/i)==-1&&!t.right))),right:(t.right&&(A.corner.search(/left/i)!=-1||(A.corner.search(/left/i)==-1&&!t.left))),top:(t.top&&A.corner.search(/top/i)==-1),bottom:(t.bottom&&A.corner.search(/bottom/i)==-1)};if(x.left){if(z.options.position.target!=="mouse"){s.left=v.position.left+v.dimensions.width}else{s.left=z.cache.mouse.x}y.x="Left"}else{if(x.right){if(z.options.position.target!=="mouse"){s.left=v.position.left-A.dimensions.width}else{s.left=z.cache.mouse.x-A.dimensions.width}y.x="Right"}}if(x.top){if(z.options.position.target!=="mouse"){s.top=v.position.top+v.dimensions.height}else{s.top=z.cache.mouse.y}y.y="top"}else{if(x.bottom){if(z.options.position.target!=="mouse"){s.top=v.position.top-A.dimensions.height}else{s.top=z.cache.mouse.y-A.dimensions.height}y.y="bottom"}}if(s.left<0){s.left=u.left;y.x=false}if(s.top<0){s.top=u.top;y.y=false}if(z.options.style.tip.corner!==false){s.corner=new String(A.corner);if(y.x!==false){s.corner=s.corner.replace(/Left|Right|Middle/,y.x)}if(y.y!==false){s.corner=s.corner.replace(/top|bottom/,y.y)}if(s.corner!==z.elements.tip.attr("rel")){e.call(z,s.corner)}}return s}function q(u,t){var v,s;v=f.extend(true,{},u);for(s in v){if(t===true&&s.search(/(tip|classes)/i)!==-1){delete v[s]}else{if(!t&&s.search(/(width|border|tip|title|classes|user)/i)!==-1){delete v[s]}}}return v}function c(s){if(typeof s.tip!=="object"){s.tip={corner:s.tip}}if(typeof s.tip.size!=="object"){s.tip.size={width:s.tip.size,height:s.tip.size}}if(typeof s.border!=="object"){s.border={width:s.border}}if(typeof s.width!=="object"){s.width={value:s.width}}if(typeof s.width.max=="string"){s.width.max=parseInt(s.width.max.replace(/([0-9]+)/i,"$1"))}if(typeof s.width.min=="string"){s.width.min=parseInt(s.width.min.replace(/([0-9]+)/i,"$1"))}if(typeof s.tip.size.x=="number"){s.tip.size.width=s.tip.size.x;delete s.tip.size.x}if(typeof s.tip.size.y=="number"){s.tip.size.height=s.tip.size.y;delete s.tip.size.y}return s}function a(){var s,t,u,x,v,w;s=this;u=[true,{}];for(t=0;t<arguments.length;t++){u.push(arguments[t])}x=[f.extend.apply(f,u)];while(typeof x[0].name=="string"){x.unshift(c(f.fn.qtip.styles[x[0].name]))}x.unshift(true,{classes:{tooltip:"qtip-"+(arguments[0].name||"defaults")}},f.fn.qtip.styles.defaults);v=f.extend.apply(f,x);w=(f.browser.msie)?1:0;v.tip.size.width+=w;v.tip.size.height+=w;if(v.tip.size.width%2>0){v.tip.size.width+=1}if(v.tip.size.height%2>0){v.tip.size.height+=1}if(v.tip.corner===true){v.tip.corner=(s.options.position.corner.tooltip==="center")?false:s.options.position.corner.tooltip}return v}function b(v,u,t){var s={bottomRight:[[0,0],[u,t],[u,0]],bottomLeft:[[0,0],[u,0],[0,t]],topRight:[[0,t],[u,0],[u,t]],topLeft:[[0,0],[0,t],[u,t]],topMiddle:[[0,t],[u/2,0],[u,t]],bottomMiddle:[[0,0],[u,0],[u/2,t]],rightMiddle:[[0,0],[u,t/2],[0,t]],leftMiddle:[[u,0],[u,t],[0,t/2]]};s.leftTop=s.bottomRight;s.rightTop=s.bottomLeft;s.leftBottom=s.topRight;s.rightBottom=s.topLeft;return s[v]}function g(s){var t;if(f("<canvas>").get(0).getContext){t={topLeft:[s,s],topRight:[0,s],bottomLeft:[s,0],bottomRight:[0,0]}}else{if(f.browser.msie){t={topLeft:[-90,90,0],topRight:[-90,90,-s],bottomLeft:[90,270,0],bottomRight:[90,270,-s]}}}return t}function k(){var s,t,u;s=this;u=s.getDimensions();t='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'+u.height+"px; width:"+u.width+'px" />';s.elements.bgiframe=s.elements.wrapper.prepend(t).children(".qtip-bgiframe:first")}f(document).ready(function(){f.fn.qtip.cache={screen:{scroll:{left:f(window).scrollLeft(),top:f(window).scrollTop()},width:f(window).width(),height:f(window).height()}};var s;f(window).bind("resize scroll",function(t){clearTimeout(s);s=setTimeout(function(){if(t.type==="scroll"){f.fn.qtip.cache.screen.scroll={left:f(window).scrollLeft(),top:f(window).scrollTop()}}else{f.fn.qtip.cache.screen.width=f(window).width();f.fn.qtip.cache.screen.height=f(window).height()}for(i=0;i<f.fn.qtip.interfaces.length;i++){var u=f.fn.qtip.interfaces[i];if(u.status.rendered===true&&(u.options.position.type!=="static"||u.options.position.adjust.scroll&&t.type==="scroll"||u.options.position.adjust.resize&&t.type==="resize")){u.updatePosition(t,true)}}},100)});f(document).bind("mousedown.qtip",function(t){if(f(t.target).parents("div.qtip").length===0){f(".qtip[unfocus]").each(function(){var u=f(this).qtip("api");if(f(this).is(":visible")&&!u.status.disabled&&f(t.target).add(u.elements.target).length>1){u.hide(t)}})}})});f.fn.qtip.interfaces=[];f.fn.qtip.log={error:function(){return this}};f.fn.qtip.constants={};f.fn.qtip.defaults={content:{prerender:false,text:false,url:false,data:null,title:{text:false,button:false}},position:{target:false,corner:{target:"bottomRight",tooltip:"topLeft"},adjust:{x:0,y:0,mouse:true,screen:false,scroll:true,resize:true},type:"absolute",container:false},show:{when:{target:false,event:"mouseover"},effect:{type:"fade",length:100},delay:140,solo:false,ready:false},hide:{when:{target:false,event:"mouseout"},effect:{type:"fade",length:100},delay:0,fixed:false},api:{beforeRender:function(){},onRender:function(){},beforePositionUpdate:function(){},onPositionUpdate:function(){},beforeShow:function(){},onShow:function(){},beforeHide:function(){},onHide:function(){},beforeContentUpdate:function(){},onContentUpdate:function(){},beforeContentLoad:function(){},onContentLoad:function(){},beforeTitleUpdate:function(){},onTitleUpdate:function(){},beforeDestroy:function(){},onDestroy:function(){},beforeFocus:function(){},onFocus:function(){}}};f.fn.qtip.styles={defaults:{background:"white",color:"#111",overflow:"hidden",textAlign:"left",width:{min:0,max:250},padding:"5px 9px",border:{width:1,radius:0,color:"#d3d3d3"},tip:{corner:false,color:false,size:{width:13,height:13},opacity:1},title:{background:"#e1e1e1",fontWeight:"bold",padding:"7px 12px"},button:{cursor:"pointer"},classes:{target:"",tip:"qtip-tip",title:"qtip-title",button:"qtip-button",content:"qtip-content",active:"qtip-active"}},cream:{border:{width:3,radius:0,color:"#F9E98E"},title:{background:"#F0DE7D",color:"#A27D35"},background:"#FBF7AA",color:"#A27D35",classes:{tooltip:"qtip-cream"}},light:{border:{width:3,radius:0,color:"#E2E2E2"},title:{background:"#f1f1f1",color:"#454545"},background:"white",color:"#454545",classes:{tooltip:"qtip-light"}},dark:{border:{width:3,radius:0,color:"#303030"},title:{background:"#404040",color:"#f3f3f3"},background:"#505050",color:"#f3f3f3",classes:{tooltip:"qtip-dark"}},red:{border:{width:3,radius:0,color:"#CE6F6F"},title:{background:"#f28279",color:"#9C2F2F"},background:"#F79992",color:"#9C2F2F",classes:{tooltip:"qtip-red"}},green:{border:{width:3,radius:0,color:"#A9DB66"},title:{background:"#b9db8c",color:"#58792E"},background:"#CDE6AC",color:"#58792E",classes:{tooltip:"qtip-green"}},blue:{border:{width:3,radius:0,color:"#ADD9ED"},title:{background:"#D0E9F5",color:"#5E99BD"},background:"#E5F6FE",color:"#4D9FBF",classes:{tooltip:"qtip-blue"}}}})(jQuery);

var media_query = 'desktop';
var swipeLeft = rlLangDir == 'rtl' ? 'swiperight' : 'swipeleft';
var swipeRight = rlLangDir == 'rtl' ? 'swipeleft' : 'swiperight';

/**
* document ready
* 
**/
$(document).ready(function(){
	flynaxTpl.customInput();
	flynaxTpl.langSelector();
	flynaxTpl.userNavbar();
	flynaxTpl.keywordSearch();
	flynaxTpl.gridView();
	flynaxTpl.categoryTree();
	flynaxTpl.urlHash();
	flynaxTpl.featured();
	flynaxTpl.tabsMore();
	
	flynax.moreCategories();

	$('div.sorting div.current').tplToggle({
		cont: $('div.sorting ul.fields'),
		parent: 'sorting'
	});

	$('section.side_block .expander').each(function(){
		$(this).parent().before($(this));
		$(this).tplToggle({
			cont: $(this).next(),
			id: 'cat_box_expander'
		});
	});

	var plans_controllers = Array('add_listing', 'upgrade_listing', 'my_packages');

	/**
	* media queries handler
	*
	**/
	enquire.register("screen and (min-width: 960px)", {
		match: function(){
			media_query = 'desktop';

			flynaxTpl.stickMenu('match');
			flynaxTpl.menu();
			flynaxTpl.sidebar('clear');
			
			if ( !$('section.side_block > .expander').next().is(':visible') ){
				$('section.side_block > .expander').trigger('click');
			}

			$('aside.three-middle > div.middle-center').append($('aside.middle > *'));
			$('div.categories').flCatSlider();

			$('div.listing-details div.table-container').mCustomScrollbar();

			if ( rlPageInfo['controller'] == 'add_listing' ) {
				$('ul.select-category li select').attr('size', 10);
			}

			if ( plans_controllers.indexOf(rlPageInfo['controller']) >= 0 ) {
				if ( $('div.plans-container').length > 0 ) {
					if ( $.browser.msie && $.browser.version <= 8 ) {
						setTimeout(function(){
							$('div.plans-container').mCustomScrollbar('destroy');
							$('div.plans-container').mCustomScrollbar({horizontalScroll: true});
						}, 100);
					}
					else {
						$('div.plans-container').mCustomScrollbar('destroy');
						$('div.plans-container').mCustomScrollbar({horizontalScroll: true});
					}

					if ( rlLangDir == 'rtl' ) {
						$('div.plans-container').mCustomScrollbar('scrollTo', 'right');
					}
				}
			}
		},
		unmatch: function(){
			$('aside.middle').append($('aside.three-middle > div.middle-center > *'));
			$('div.listing-details div.table-container').mCustomScrollbar('destroy');
		}
	}).register("screen and (min-width: 768px) and (max-width: 959px)", {
		match: function(){
			media_query = 'tablet';

			flynaxTpl.stickMenu('unmatch');
			$('section.main-menu').removeClass('fixed-menu');
			flynaxTpl.menu();
			flynaxTpl.sidebar();
			$('div.categories').flCatSlider();
			$('div.listing-details div.table-container').mCustomScrollbar();

			if ( rlPageInfo['key'] == 'home' ) {
				$('div.featured_gallery > ul.featured').after($('div.featured_gallery > div.preview'));
			}
			if ( rlPageInfo['controller'] == 'add_listing' ) {
				$('ul.select-category li select').removeAttr('size');
			}
			if ( plans_controllers.indexOf(rlPageInfo['controller']) >= 0 ) {
				$('div.plans-container').mCustomScrollbar('destroy');
				$('div.plans-container').mCustomScrollbar({horizontalScroll: true});
			}
		},
		unmatch: function(){
			$('div.listing-details div.table-container').mCustomScrollbar('destroy');

			if ( rlPageInfo['key'] == 'home' ) {
				$('div.featured_gallery > div.preview').after($('div.featured_gallery > ul.featured'));
			}
		}
	}).register("screen and (max-width: 767px)", {
		match: function(){
			media_query = 'mobile';

			flynaxTpl.stickMenu('unmatch');
			$('section.main-menu').removeClass('fixed-menu');
			$('section.main-menu ul.menu > li').attr('style', '');
			$('section.main-menu ul.menu').removeClass('menu').addClass('menu-mobile');
			flynaxTpl.mobileMenu();

			$('div.kw-search span.field').attr('style', '');
			$('div.kw-search').removeClass('kw-search kw-search-active').addClass('kw-search-mobile');
			$('#ac_interface').remove();
						
			flynaxTpl.sidebar();

			$('div.categories').flCatSlider();
			
			$('.grid_navbar .buttons .list').trigger('click');

			if ( $('section.side_block > .expander').next().is(':visible') ){
				$('section.side_block > .expander').trigger('click');
			}

			if ( rlPageInfo['controller'] == 'add_listing' ) {
				$('ul.select-category li select').removeAttr('size');
			}
			if ( plans_controllers.indexOf(rlPageInfo['controller']) >= 0 ) {
				$('div.plans-container').mCustomScrollbar('destroy');
			}
		},
		unmatch: function(){
			$('section.main-menu ul.menu-mobile').removeClass('menu-mobile opened').addClass('menu');
			$('div.kw-search-mobile').removeClass('kw-search-mobile').addClass('kw-search');
			
			flynaxTpl.menu();
		},
		setup: function(){
			if ( rlPageInfo['controller'] == 'listing_details' ) {
				if ( $('div.gallery div.thumbs div.slider a').length > 0 ) {
					Modernizr.load({
						load: rlConfig['tpl_base']+'js/code-photoswipe.js',
						complete: function(){
							$('div.gallery div.thumbs div.slider a:not(.video)').photoSwipe();
						}
					});
				}
			}
		}
	});
	
	flFieldset();
	flynaxTpl.qtip();

	if ( rlPageInfo['controller'] == 'listing_details' ) {
		flynaxTpl.listingDetails();
	}
	else if ( rlPageInfo['controller'] == 'account_type' ) {
		flynaxTpl.accountDetails();
	}
	else if ( rlPageInfo['key'] == 'home' ) {
		flynaxTpl.featuredGallery();
		flynaxTpl.categoryAlphabet();
	}

	/* other */
	$('.numeric').numeric();
	$('.file-input input[type=file]').change(function(){
		var path = $(this).val().split('\\');
		$(this).parent().find('input[type=text]').val(path[path.length - 1]);
	});
	$('footer .scroll-top').click(function(){
		$('body,html').animate({scrollTop: 0}, 'slow');
	});
});

/**
* template related javascript handlers
* 
**/
var flynaxTplClass = function(){
	
	/**
	* reference to it self object
	*
	**/
	var self = this;

	var prevHash = '';

	this.featured = function(){
		$('ul.featured').each(function(){
			if ( $(this).closest('.featured_gallery').length <= 0 ) {
				$(this).find(' > li:not(.no-picture) img').hisrc();
			}
		});
	};

	/**
	* url hash handler
	* 
	**/
	this.urlHash = function(){
		$(window).on('hashchange', function(e) {
			var hash = flynax.getHash();

			if ( rlPageInfo['controller'] == 'listing_details' && hash != 'map-fullscreen' ) {
				var obj = 'ul.tabs li#tab_'+hash;
				tabsSwitcher(obj);
				if ( $(obj).length > 0 ) {
					$('html, body').animate({scrollTop:$(obj).offset().top - 58});
				}
			}
			if ( prevHash == 'map-fullscreen' && !hash ) {
				$('#modal_block div.inner > div.close').trigger('click');
			}

			prevHash = flynax.getHash();
		});
	};

	/**
	* sidebar boxes arrangement handler
	* 
	**/
	this.sidebar = function(mode){
		if ( rlPageInfo['controller'] == 'listing_details' ) {
			if ( mode == 'clear' ) {
				if ( $('#controller_area > aside.right').length <= 0 ) {
					$('#controller_area').prepend($('div.listing-details > section.main-section').next());
				}
			}
			else {
				if ( $('div.listing-details > aside.right').length <= 0 ) {
					$('div.listing-details > section.main-section').after($('#controller_area > aside.right'));
				}
			}

			if ( media_query == 'mobile' ) {
				$('div.top-navigation').prepend($('div.listing-details-icons'));

				$('.listing-details > .content-section').after('<aside class="left second-copy clearfix"></div>');
				$('.listing-details > aside.left.second-copy').append($('.listing-details > aside.right > section:not(.stick)'));
			}
			else {
				$('nav#content_nav_icons').prepend($('div.listing-details-icons'));

				$('.listing-details > aside.right').append($('.listing-details > aside.left.second-copy > *'));
				$('aside.left.second-copy').remove();
			}
		}
		else {
			if ( mode == 'clear' ) {
				if ( $('aside.left.second-copy').length > 0 ) {
					$('#main_container > div > aside.left').append($('aside.left.first-copy > *'));
					$('#main_container > div > aside.left').append($('aside.left.second-copy > *'));
					$('aside.left.second-copy, aside.left.first-copy').remove();
				}
			}
			else {
				if ( $('aside.left.second-copy').length <= 0 ) {
					$('#controller_area').before('<aside class="left first-copy clearfix"></div>');
					$('#controller_area').after('<aside class="left second-copy clearfix"></div>');
					$('aside.left.first-copy').append($('#main_container aside.left > *.stick'));
					$('aside.left.second-copy').append($('#main_container aside.left > *:not(.stick)'));
				}
			}
		}
	};

	/**
	* custom tips
	* 
	**/
	this.qtip = function(){
		var tmp_style = jQuery.extend({}, qtip_style);
		tmp_style.tip = 'bottomMiddle';

		$('.hint').each(function(){
			$(this).qtip({
				content: $(this).attr('title') ? $(this).attr('title') : $(this).prev('div.qtip_cont').html(),
				show: 'mouseover',
				hide: 'mouseout',
				position: {
					corner: {
						target: 'topMiddle',
						tooltip: 'bottomMiddle'
					}
				},
				style: tmp_style
			}).attr('title', '');
		});
	};

	/**
	* main menu handler
	* 
	**/
	this.menu = function(){
		var menu = $('.main-menu ul.menu');

		$('ul.menu-mobile > li > a').unbind('click');

		/* clear */
		$('#main_menu_more li').remove();
		menu.find('li:not(:visible)').show();
		menu.find('li').width('auto');
		menu.find('li.more').removeClass('more_active');
		menu.find('li:not(.more)').attr('style', '');
		$('ul#main_menu_more').hide();
		
		/* build menu */
		var width = menu.width(),
			buttonWidth = menu.find('li.more').width() + 20,
			workWidth = width - buttonWidth,
			countWidth = 0,
			countItems = menu.find('li:not(:last)').length,
			border = false,
			margin = 0,
			effected = false;
		
		menu.find('li:not(:last)').each(function(index){
			countWidth += $(this).outerWidth() + margin;
	
			if ( index == 0 ) {
				countWidth -= margin/2;
			}
			index++;
			
			var rest = countItems != index ? 100 : 0;
			if ( workWidth - countWidth < rest ) {
				effected = true;
				
				if ( !border && countItems != index ) {
					var newWidth = workWidth - (countWidth - $(this).width());
					if ( newWidth < $(this).width() ) {
						$(this).width(newWidth);
					}
					border = true;
				}
				else {
					$('#main_menu_more').append('<li></li>');
					$('#main_menu_more li:last').html($(this).find('a').parent().html()).addClass($(this).find('a').parent().attr('class'));
					$(this).hide();
				}
			}
		});
		
		if ( effected ) {
			menu.find('li.more').show();
		}
		else {
			menu.find('li.more').hide();
		}
		
		/* set click handler */
		menu.find('li.more').unbind('click').click(function(){
			$(this).toggleClass('more_active');
			var width = menu.find('li.more > span').position(true).left;
			if ( rlLangDir == 'rtl' ) {
				width -= $('#main_menu_more').width();
			}
			$('#main_menu_more').css('left', width).toggle();
		});
		
		/* document click handler */
		$(document).bind('click touchstart', function(event){
			var close = true;
			$(event.target).parents().each(function(){
				if ( $(this).attr('id') == 'main_menu_more' || $(this).hasClass('more') || $(event.target).hasClass('more') ) {
					close = false;
				}
			});
			
			if ( close ) {
				$('#main_menu_more').hide();
				menu.find('li.more').removeClass('more_active');
			}
		});
	};
	
	/**
	* mobile menu handler
	* 
	**/
	this.mobileMenu = function(){
		$('div.mobile-menu-button').unbind('click').click(function(){
			if ( $('ul.menu-mobile').hasClass('opened') ) {
				$('ul.menu-mobile').removeClass('opened');
			}
			else {
				$('ul.menu-mobile').addClass('opened');
				flynax.slideTo('.menu-mobile.opened');
			}
		});
		
		var mobileMenuClose = function(event){
			if ( !$(event.target).hasClass('mobile-menu-button') && !$(event.target).parents().hasClass('menu-mobile') && !$(event.target).hasClass('menu-mobile') ) {
				$('ul.menu-mobile').removeClass('opened');
			}
		};

		$(document).unbind('click touchend', mobileMenuClose).bind('click touchend', mobileMenuClose);
	};
	
	/**
	* stick menu handler
	* 
	**/
	this.stickMenu = function(mode){
		if ( mode == 'match' ) {
			var mainMenuAction = function(){
				if ( $(document).scrollTop() > $('body > header > section.point1').height() + 106 ) {
					$('section.main-menu').addClass('fixed-menu');				}
				else {
					$('section.main-menu').removeClass('fixed-menu');
				}
			};
			$(window).bind('touchmove scroll', mainMenuAction);
		}
		else {
			$(window).unbind('touchmove scroll', mainMenuAction);
		}
	};

	/**
	* highlight search results in grid
	**/
	this.highlightResults = function(query, details){
		if ( !query )
			return;
		
		query = trim(query);
		var repeat = new RegExp('(\\s)\\1+', 'gm');
		query = query.replace(repeat, ' ');
		query = query.split(' ');
		
		var pattern = '';
		for (var i=0; i<query.length; i++)
		{
			if ( query[i].length > 2 )
			{
				pattern += query[i]+'|'
			}
		}
		pattern = rtrim(pattern, '|');

		var pattern = new RegExp('('+pattern+')(?=[^>]*(<|$))', 'gi');
		var link_pattern = new RegExp('<a([^>]*)>(.*)</a>');
		var selectors = details ? '.table-container div.table-cell div.value, #area_listing div.table-cell div.value' : '#listings article ul.info li.title, #listings article ul.info li.fields';

		$(selectors).each(function(){
			var value = trim($(this).html());
			var href = false;
			if ( $(this).find('a').length > 0 ) {
				value = trim($(this).find('a').html());
				href = $(this).find('a').attr('href');
				className = $(this).find('a').attr('class');
			}

			//value = value.replace(/(<([^>]+)>)/ig,"");
			value = value.replace(pattern, '<span class="ks-highlight">$1</span>');
			value = href ? '<a class="'+className+'" href="'+href+'">'+value+'</a>' : value;
				
			$(this).html(value);
		});
	};
	
	/**
	* custom checkboxes, radio handler
	* 
	**/
	this.customInputIndex = 1;
	this.customInput = function(){
		$('body label > input[type=checkbox]:not(.default),body label > input[type=radio]:not(.default)').each(function(){ 
			var name = $(this).attr('id') ? $(this).attr('id') : 'css_'+ $(this).prop('tagName') + '_' + self.customInputIndex;

			$(this).parent().prepend('<span></span>');
			$(this).attr('id', name);
			$(this).parent().attr('for', name);
			$(this).parent().before($(this));
			self.customInputIndex++;
		});
	};
	
	/**
	* languages selector handler
	* 
	**/
	this.langSelector = function(){
		$('#lang-selector > .default').click(function(){
			if ( $('#lang-selector').hasClass('lang-mobile') ) {
				$(this).next().toggle();
			}
			else {
				$('span.circle_opened').not($(this).parent()).removeClass('circle_opened');
				$(this).parent().toggleClass('circle_opened');

				if ( !$(this).next().hasClass('placed') ) {
					var width = ($(this).next().get(0).offsetWidth / 2) - 19;
					$(this).next().css('left', '-'+width+'px');
					$(this).next().addClass('placed');
				}
			}
		});
		
		$(document).bind('click touchstart', function(event){
			if ( !$(event.target).parents().hasClass('circle_opened') ) {
				$('#lang-selector').removeClass('circle_opened');
			}
			if ( !$(event.target).parents().hasClass('lang-mobile') ) {
				$('.lang-mobile > span.content').attr('style', '');
			}
		});
	};
	
	/**
	* user navigation bar
	*
	**/
	this.userNavbar = function(){
		$('#user-navbar > .default').click(function(){
			$('span.circle_opened').not($(this).parent()).removeClass('circle_opened');
			$(this).parent().toggleClass('circle_opened');
		});
		
		$(document).bind('click touchstart', function(event){
			if ( !$(event.target).parents().hasClass('circle_opened') ) {
				$('#user-navbar').removeClass('circle_opened');
			}
		});
	};
	
	/**
	* keyword search handler
	*
	**/
	this.keywordSearch = function(){
		var close_handler = function(){
			if ( $('#autocomplete').val() || media_query == 'desktop' ) {
				$('#autocomplete').closest('span.field').next().show();
			}
			else {
				$('#autocomplete').closest('span.field').next().hide();	
			}
		};

		$('.kw-search > span.lens').click(function(){
			if ( $(this).parent().hasClass('kw-search-mobile') ) {
				$(this).parent().find('form').submit();
			}
			else {
				if ( !$(this).parent().hasClass('kw-search-active') ) {
					$(this).parent().addClass('kw-search-active');
					$(this).parent().find('#autocomplete').focus();
					$(this).parent().find('span.field').animate({width: 200}, function(){
						$(this).animate({opacity: 1});
						flynaxTpl.menu();
					});
				}
			}
		});
		$('.kw-search .close').click(function(){
			if ( $(this).parent().hasClass('kw-search-mobile') ) {
				$(this).parent().find('#autocomplete').val('');
				close_handler();
			}
			else {
				$(this).hide();
				$(this).parent().find('span.field').animate({opacity: 0}, function(){
					$(this).parent().removeClass('kw-search-active');
					$(this).animate({width: 0}, function(){
						flynaxTpl.menu();
						$('.kw-search .close').show();
					});
				});
			}
		});

		close_handler();
		$('#autocomplete').keyup(function(){
			close_handler();
		});
		
		$('input#autocomplete').vsAutoComplete();
	};
	
	/**
	* feature gallery handler
	*
	**/
	this.featuredGallery = function() {
		var self = this,
			count = $('div.featured_gallery ul.featured > li').length,
			gl = $('div.featured_gallery ul.featured'),
			item_width = gl.find('> li:first').width(),
			item_height = gl.find('> li:first').height(),
			active_count = 5,
			shift = 0,
			current = 0,
			timer = false,
			slideshow = true,
			demo = $('div.featured_gallery').hasClass('demo');
		
		if ( count <= 0 )
			return;

		/* prepare content */
		gl.find('> li img').each(function(){
			if ( !$(this).attr('style') ) {
				$(this).css('backgroundImage', 'url('+rlConfig['tpl_base']+'img/no-thumb.jpg)').attr('accesskey', rlConfig['tpl_base']+'img/no-thumb-preview.jpg');
			}

			$(this).closest('li').find('> ul > li > *').each(function(){
				$(this).replaceWith(this.childNodes);
			});
			$(this).closest('li').find('> ul > li:gt(1)').remove();
			var href = $(this).closest('a').attr('href');
			$(this).closest('li').find('ul:first').attr('accesskey', href);
			$(this).closest('a').replaceWith(this);
		});

		/* hide fields to calculate height properly */
		gl.find('li ul').addClass('hide');

		this.calc = function(){
			item_width = gl.find('> li:first').width(),
			item_height = gl.find('> li:first').height(),

			active_count = media_query == 'tablet' ? gl.height() / item_height : gl.width() / item_width;
			active_count = Math.floor(active_count);
		};

		this.showImage = function(obj, url){
			gl.parent().find('div.preview > a > div').css('backgroundImage', 'url('+url+')').fadeIn();
		 	gl.parent().find('div.preview > a').attr('href', $(obj).parent().find('ul:first').attr('accesskey'));
		 	if ( slideshow ) {
				current = current == (count - 1) ? 0 : current + 1;
			}
		};

		this.loadImage = function(){
			self.slide();

			var obj = gl.find('> li:eq('+current+') img');
			obj.closest('li').parent().find('li.active').removeClass('active');
			obj.closest('li').addClass('active');
			var src = obj.css('backgroundImage').replace(/^url|[\(\)]/g, '');
			src = trim(src, '"');
			src = src.replace(rlConfig['files_url'], '');

			if ( demo ) {
				src = src.replace('no-thumb.jpg', 'no-thumb-preview.jpg');
				obj.attr('accesskey', src);
			}
	
			/* set title */
			var title = obj.attr('alt');
			if ( title ) {
				gl.parent().find('div.preview > div.fg-title').show().html(title);
			}
			else {
				gl.parent().find('div.preview > div.fg-title').hide().html('');
			}
			
			/* set price */
			var price = '';
			obj.parent().find('> ul > li[id*=price]').each(function(){
				price = $(this).html();
			});
			if ( !price && $(obj).find('li > ul > li:last').length > 0 ) {
				$(obj).find('li > ul > li:last').html();
			}
			if ( price ) {
				gl.parent().find('div.preview > div.fg-price').show().html(price);
			}
			else {
				gl.parent().find('div.preview > div.fg-price').hide().html('');
			}

			if ( obj.attr('accesskey') ) {
				self.showImage(obj, obj.attr('accesskey'));
			}
			else {
				$.getJSON(rlConfig['tpl_base'] +'request.ajax.php', {mode: 'photo', item: src, lang: rlLang}, function(url) {
					if ( url != '' && url != null ) {
						var img = new Image();
						img.onload = function(){
							self.showImage(obj, url);
							obj.attr('accesskey', url);
						}
						img.src = url;
					}
				});
			}
		};

		this.slide = function(){
			var do_slide = false;
			if ( current >= (shift + active_count - 1) && (count - 1) > current ) {
				shift++;
				do_slide = true;
			}
			else if ( current > 0 && shift == current ) {
				shift--;
				do_slide = true;
			}
			else if ( current == 0 && shift != 0 ) {
				shift = 0;
				do_slide = true;
			}

			if ( do_slide ) {
				if ( media_query == 'tablet' ) {
					var shift_pos = shift * item_height * -1;
					gl.find('> li:first').animate({marginTop: shift_pos});
				}
				else {
					var shift_pos = shift * item_width * -1;
					if ( rlLangDir == 'rtl' ) {
						gl.find('> li:first').animate({marginRight: shift_pos});
					}
					else {
						gl.find('> li:first').animate({marginLeft: shift_pos});
					}
				}
			}
		};

		timer = setInterval(function(){
			self.loadImage(current);
		}, 12000);

		this.loadImage();

		this.calc();

		gl.find('li img').unbind('click').click(function(){
			slideshow = false;
			clearInterval(timer);
			current = gl.find('> li').index($(this).closest('li'));
			self.loadImage();
		});

		$(window).bind('resize', function(){
			self.calc();
		});
	};
	
	/**
	* grid view handler
	*
	**/
	this.gridView = function(){

		/* listings grid */
		if ( $('div.grid_navbar') .hasClass('listings-area')) {
			$('div.switcher > div.buttons > div').click(function(){
				$('div.switcher > div.buttons > div.active').removeClass('active');
				var view = $(this).attr('class');

				/* IE hack */
				if ( $.browser.msie && $.browser.version <= 8 ) {
					view = view.replace(' slvzr-hover', '');
				}

				createCookie('grid_mode', view, 365);
				
				$(this).addClass('active');
				
				if ( view == 'map' ) {
					$('#listings').attr('class', 'clearfix').hide();
					$('#listings_map').show();

					$('div.grid_navbar > div.sorting > div.current').addClass('disabled');
					
					self.gridViewMap('listings_map', listings_map);
				}
				else {
					$('#listings').attr('class', view+' clearfix').show();
					$('#listings_map').hide();

					$('div.grid_navbar > div.sorting > div.current').removeClass('disabled');
				}

				if ( $.browser.msie && $.browser.version <= 8 && view == 'grid' ) {
					Selectivizr.init();
				}
			});

			if ( typeof(listings_map) == "undefined" || listings_map.length <= 0 ) {
				$('div.switcher > div.buttons > div.map').remove();
				$('div.switcher > div.buttons > div.list').trigger('click');
			}

			if ( readCookie('grid_mode') == 'map' ) {
				$('#listings').attr('class', 'clearfix').hide();
				$('#listings_map').show();
				
				self.gridViewMap('listings_map', listings_map);
			}
		}
		/* accounts grid */
		else {
			$('div.switcher > div.buttons > div').click(function(){
				$('div.switcher > div.buttons > div.active').removeClass('active');
				var view = $(this).attr('class');
				createCookie('grid_mode_account', view, 365);
				
				$(this).addClass('active');
				
				if ( view == 'map' ) {
					$('#accounts').hide();
					$('#accounts_map').show();

					$('div.grid_navbar > div.sorting > div.current').addClass('disabled');
					
					self.gridViewMap('accounts_map', accounts_map);
				}
				else {
					$('#accounts').attr('class', 'grid clearfix').show();
					$('#accounts_map').hide();

					$('div.grid_navbar > div.sorting > div.current').removeClass('disabled');
				}
			});

			if ( typeof(accounts_map) == "undefined" || accounts_map.length <= 0 ) {
				$('div.switcher > div.buttons > div.map').remove();
				$('div.switcher > div.buttons > div.grid').trigger('click');
			}

			if ( readCookie('grid_mode_account') == 'map' ) {
				$('#accounts').hide();
				$('#accounts_map').show();

				self.gridViewMap('accounts_map', accounts_map);
			}
		}

		if ( $('div.switcher > div.buttons > div').length <= 1 ) {
			$('div.switcher > div.buttons').remove();
		}
	};
	
	/**
	* grid view map handler
	*
	**/
	this.gridViewMap = function(container_id, listings){
		if ( $('#'+container_id+' > *').length > 0 || typeof(listings) == "undefined" || listings.length <= 0 ) 
			return;

		Modernizr.load({
			load: rlConfig['libs_url']+'jquery/jquery.flmap.js',
			complete: function(){
				$('section#'+container_id).flMap({
					addresses: listings,
					phrases: {
						hide: '{/literal}{$lang.hide}{literal}',
						show: '{/literal}{$lang.show}{literal}',
						notFound: '{/literal}{$lang.location_not_found}{literal}'
					},
					zoom: 12
				});
			}
		});
	};
	
	/**
	* category tree handler (available for boxes on listing type page only)
	*
	**/
	this.categoryTree = function(){
		var count = $('ul.cat-tree > li').length;
		var desktop_limit_top = 10;
		var desktop_limit_bottom = 25;

		if ( count <= 0 )
			return;

		$('ul.cat-tree > li span.toggle').click(function(){
			$(this).parent().find('ul').toggle();

			var parent = $(this).closest('.cat-tree-cont');
			if ( parent.hasClass('mCustomScrollbar') ) {
				parent.addClass('limit-height').mCustomScrollbar('update');
			}

			$(this).text(trim($(this).text()) == '+' ? '-' : '+');
		});
		
		if ( $('ul.cat-tree > li span.toggle:contains("+")').length == 0 ) {
			$('ul.cat-tree > li span.toggle').hide();
		}

		var current_media_query = media_query;
		$(window).resize(function(){
			if ( media_query != current_media_query ) {
				$('div.cat-tree-cont').addClass('limit-height').mCustomScrollbar('update');
				current_media_query = media_query;
			}
		});

		if ( count > desktop_limit_top && count <= desktop_limit_bottom ) {
			var gt = desktop_limit_top - 1;
			$('ul.cat-tree > li:gt('+gt+')').addClass('rest');

			$('div.cat-tree-cont div.cat-toggle').removeClass('hide').click(function(){
				$(this).prev().find('> li.rest').toggle();
			});
			$('div.cat-tree-cont').removeClass('limit-height');
		}
		else if (count > desktop_limit_bottom) {
			$('div.cat-tree-cont').mCustomScrollbar();
		}
		else {
			$('div.cat-tree-cont').removeClass('limit-height');
		}
	};

	/**
	* pictures gallery (on listing details page for example)
	*
	**/
	this.picGallery = function(){
		var gl = $('div.gallery');

		Modernizr.load({
			load: rlConfig['tpl_base']+'js/jquery.fancybox.js',
			complete: function(){
				$(gl).find('div.preview a, div#imgSource a').fancybox({
					padding: 10,
					removeFirst: true,
					customIndex: true,
					mouseWheel: true,
					closeBtn: true,
					playSpeed: fb_slideshow_delay,
					helpers: {
			    		title: {
			    			type: 'over'
			    		},
			    		overlay: {
							opacity: 0.5
						},
						buttons: fb_slideshow
			    	}
				});
			}
		});

		var current_image = 0;
		var current_slide = 0;
		var per_slide = 5;
		var picG = this;
		var item_width = $(gl).find('div.thumbs div.slider li').width();
		var items_count = $(gl).find('div.thumbs div.slider li').length;

		this.calc = function(){
			var width = $(gl).find('div.thumbs div.slider').width();
			per_slide = Math.floor(width/item_width);

			/* restore gallery state to default */
			if ( current_image != 0 ) {
				current_image = current_slide = 0;
				$(gl).find('div.thumbs div.slider li.active').removeClass('active');
				$(gl).find('div.thumbs div.slider li:first').addClass('active');
				$(gl).find('div.thumbs div.prev').addClass('disabled');
				$(gl).find('div.thumbs div.next').removeClass('disabled');
				$(gl).find('div.slider > ul').animate({marginLeft: 0});
			}

			if ( per_slide >= items_count ) {
				$(gl).find('div.thumbs div.next').addClass('disabled');
			}
		};

		picG.calc();

		/* thumbnail click handler */
		$(gl).find('div.slider img, div.slider span.play').click(function(){
			return picG.loadImage(this);
		});

		/* navigation click handler */
		$(gl).find('div.thumbs div.next,div.thumbs div.prev').click(function(){
			picG.slide(this);
		});

		/* navigation click handler */
		$(gl).find('div.thumbs div.slider').bind(swipeRight, function(){
			picG.slide($(gl).find('div.thumbs div.prev'));
		}).bind(swipeLeft, function(){
			picG.slide($(gl).find('div.thumbs div.next'));
		});

		$(window).resize(function(){
			picG.calc();
		});

		this.loadImage = function(obj){
			if ( media_query == 'mobile' ) {
				return {};
			}

			var index = $(obj).closest('li').index('div.gallery div.slider ul > li');
			var timer = false;

			if ( current_image == index )
				return false;

			if ( index >= (current_slide + per_slide) ) {
				$(gl).find('div.thumbs div.next').trigger('click');
			}

			$(gl).find('div.slider ul li.active').removeClass('active');
			$(obj).closest('li').addClass('active');

			current_image = index;
			
			/* video */
			if ( $(obj).closest('a').attr('accesskey') ) {
				var preview = $(obj).closest('a').attr('accesskey');

				var video_src = $(obj).closest('a').hasClass('local') ? $(obj).closest('a').attr('href') : '//www.youtube.com/embed/'+preview+'?rel=0';
				$(gl).find('div.preview iframe').attr('src', video_src);
				$(gl).find('div.preview').addClass('video');
			}
			/* photos */
			else {
				$(gl).find('div.preview').removeClass('video');

				timer = setTimeout(function(){
					$(obj).after('<span class="img-loading"></span>');

					var width = $(obj).width();
					var height = $(obj).height();
					var border = $(obj)[0].clientLeft;
					$(obj).next().width(width).height(height).css({opacity: 0.5});
				}, 10);

				var photo_src = $(obj).closest('a').attr('href');
				
				$.fancybox.setIndex(current_image);
				
				var img = new Image();
				img.onload = function(){
					clearTimeout(timer);

					$(gl).find('div.preview img').css('backgroundImage', 'url('+photo_src+')');
					
					$(obj).next().fadeOut('normal', function(){
						$(this).remove();
					});
				}
				img.src = photo_src;
			}

			return false;
		};

		this.slide = function(button){
			if ( $(button).hasClass('next') ) {
				if ( current_slide + per_slide >= items_count )
					return;

				current_slide += per_slide;

				if ( current_slide + per_slide >= items_count ) {
					$(button).prev().removeClass('disabled');
					$(button).addClass('disabled');
				}
			}
			else {
				if ( current_slide <= 0 )
					return;

				current_slide -= per_slide;

				if ( current_slide <= 0 ) {
					$(button).next().removeClass('disabled');
					$(button).addClass('disabled');
				}
			}

			picG.loadImage($(gl).find('div.thumbs div.slider li:eq('+current_slide+') img'));

			var offset = (current_slide * item_width) * -1;
			if ( rlLangDir == 'rtl' ) {
				$(gl).find('div.slider > ul').animate({marginRight: offset});
			}
			else {
				$(gl).find('div.slider > ul').animate({marginLeft: offset});
			}
		};
	};

	/**
	* listing details handlers
	*
	**/
	this.listingDetails = function(){
		var src = $('section.map-capture > img').attr('fl:style');
		if ( src ) {
			$('section.map-capture > img').attr('style', src.replace('|ratio|', window.devicePixelRatio));
		}

		self.picGallery();

		$('.contact-seller').flModal({
			source: '#contact_owner_form',
			width: 450,
			height: 'auto',
			ready: function(){
				$('#contact_owner_message').textareaCount({
					'maxCharacterSize': rlConfig['messages_length'],
					'warningNumber': 20
				})
			}
		});

		$('section.map-capture').flModal({
			content: '<div id="map_fullscreen"></div>',
			width: '100%',
			height: '100%',
			fill_edge: true,
			ready: function(){
				Modernizr.load({
					load: rlConfig['libs_url']+'jquery/jquery.flmap.js',
					complete: function(){
						location.hash = 'map-fullscreen'
						$('#map_fullscreen').flMap(map_data);
					}
				});
			}
		});
	};

	/**
	* account details handlers
	*
	**/
	this.accountDetails = function(){
		var src = $('div.map-capture > img').attr('fl:style');
		if ( src ) {
			$('div.map-capture > img').attr('style', src.replace('|ratio|', window.devicePixelRatio));
		}

		$('.contact-seller').flModal({
			source: '#contact_owner_form',
			width: 450,
			height: 'auto',
			ready: function(){
				$('#contact_owner_message').textareaCount({
					'maxCharacterSize': rlConfig['messages_length'],
					'warningNumber': 20
				})
			}
		});

		$('div.map-capture').flModal({
			content: '<div id="map_fullscreen"></div>',
			width: '100%',
			height: '100%',
			fill_edge: true,
			ready: function(){
				Modernizr.load({
					load: rlConfig['libs_url']+'jquery/jquery.flmap.js',
					complete: function(){
						$('#map_fullscreen').flMap(map_data);
					}
				});
			}
		});
	};

	/**
	* location fields hamdler
	*
	**/
	this.locationHandler = function(){
		var region = $('input[name="f[region]"]');
		var states = $('select[name="f[b_states]"]');
		var country = $('select[name="f[b_country]"]');

		if ( country.length <= 0 )
			return;

		var locationHandlerAction = function(){
			if ( country.val() == 'united_states' ) {
				region.closest('.submit-cell').hide();
				states.closest('.submit-cell').show();
			}
			else {
				region.closest('.submit-cell').show();
				states.closest('.submit-cell').hide();	
			}
		};

		country.bind('change', locationHandlerAction);
		locationHandlerAction();
	};

	/**
	* category by alphabet
	*
	**/
	this.categoryAlphabet = function(){
		$('div.category-alphabet li:not(.active) > span').click(function() {
			var cont = '';
			var self = this;
			
			$(this).closest('ul').find('li').removeClass('active');
			$(this).parent().addClass('active');
			
			$('div#cat_alphabet_cont').show();

			var replace = $(this).text();
			var char = $(this).text() == '#' ? 'rest' : $(this).text();
			
			$('div#cat_alphabet_cont .char_cont').hide();
			
			if ( $('div#cat_alphabet_cont #cont_'+char).length > 0 ) {
				$('div#cat_alphabet_cont #cont_'+char).show();
			}
			else {
				$('div#cat_alphabet_cont div.loading').show();
				
				$.getJSON(rlConfig['tpl_base'] +'request.ajax.php', {mode: 'category', item: char, lang: rlLang}, function(response) {
					if ( response != '' && response != null ) {
						cont = '<ul class="char_cont" id="cont_'+char+'">';
						for (var i = 0; i < response.length; i++ ) {
							var url = rlConfig['seo_url'];
							if  ( rlConfig['mod_rewrite'] ) {
								url += response[i].Cat_type_page +'/'+ response[i].Path;
								url += response[i].Cat_postfix == '1' ? '.html' : '/';
							}
							else {
								url += '?page='+ response[i].Cat_type_page +'&category='+ response[i].ID;
							}
							cont += '<li><a title="'+response[i].name+' ('+response[i].Count+')" href="'+url+'">'+response[i].name+'</a></li>';
						}
						cont += '</ul>';
					}
					else {
						cont = '<div class="char_cont" id="cont_'+char+'">'+lang['nothing_found_for_char'].replace('{char}', replace)+'</div>';
					}
					
					$('div#cat_alphabet_cont').append(cont);
					$('div#cat_alphabet_cont div.loading').hide();

					setPosition(self);
				});
			}

			setPosition(this);
		});
		
		setPosition = function(obj){
			var left = $('div.category-alphabet').position().left - 1;
			var right = $('div.category-alphabet').get(0).offsetWidth + 1 + left;

			var char_top = $(obj).get(0).offsetTop + 34;
			var char_width = $(obj).get(0).offsetWidth / 2;
			var cont_width = $('div#cat_alphabet_cont').get(0).offsetWidth;
			var half = cont_width / 2;
			var left_offset = $(obj).parent().position().left - half + char_width;
			left_offset = left_offset < left ? left : left_offset;
			left_offset = left_offset + cont_width > right ? right - cont_width : left_offset;
			$('div#cat_alphabet_cont').css({left: left_offset+'px',top: char_top+'px'});
		};

		$(document).bind('click touchstart', function(event){
			if ( !$(event.target).parents().hasClass('category-alphabet') ) {
				$('div#cat_alphabet_cont').hide();
				$('div.category-alphabet li.active').removeClass('active');
			}
		});
	};

	this.tabsMore = function(){
		var tmSelf = this; //reference to local methoad environment

		var width = $('ul.tabs').width();
		var height = $('ul.tabs').height();
		var count = $('ul.tabs > li:not(.more,.overflowed)').length;
		var sum = 0;
		var overflowed = false;

		this.init = function(){
			$('ul.tabs > li:not(.more,.overflowed)').each(function(){
				var index = $('ul.tabs > li').index(this) + 1;
				var button = index == count ? 0 : height;

				sum += $(this).outerWidth();
				if ( sum + button > width ) {
					if ( !overflowed ) {
						tmSelf.more($(this).parent());
					}
					$(this).parent().find('li.overflowed > ul').append($(this));
					overflowed = true;
				}
			});
		};

		this.more = function(parent){
			parent.append('<li class="more"><span></span><span></span><span></span></li><li class="overflowed"><ul></ul></li>');
		};

		this.expand = function(){
			var tabsExpander = function(){
				var select = $('ul.tabs > li.more');
				$(select).toggleClass('opened');
				$(select).next().toggleClass('opened');
			};
			$('ul.tabs > li.more:not(.opened)').unbind('click', tabsExpander).bind('click', tabsExpander);
		};

		this.tabsResize = function(){
			$('ul.tabs > li.more').remove();
			$('ul.tabs > li.overflowed > ul > li').each(function(){
				$('ul.tabs').append($(this));
			});
			$('ul.tabs > li.overflowed').remove();

			width = $('ul.tabs').width();
			sum = 0;
			overflowed = false;

			tmSelf.init();
			tmSelf.expand();
		};

		this.init();
		this.expand();

		$(document).bind('mouseup touchstart', function(event){
			var container = $('ul.tabs > li.overflowed');
			if (!container.is(event.target) && container.has(event.target).length === 0 && !$(event.target).hasClass('more') && !$(event.target).parent().hasClass('more')) {
				$('ul.tabs > li.opened').removeClass('opened');
			}
		});

		$(window).bind('resize', this.tabsResize);
	};
};

var flynaxTpl = new flynaxTplClass();

var caroselCallback = function(){
	$('div.carousel_block ul.featured > li:not(.no-picture) img').hisrc();
};

/**
* cookie functions
*
**/
function createCookie( name, value, days) {
	value = encodeURI(value);
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURI(c.substring(nameEQ.length,c.length));
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/**
*
* toggle container by clicking some element
*
**/
(function($) {
	$.fn.tplToggle = function(options) {
		var settings = $.extend({
			cont: false, // container to toggle
			parent : false, // parent element to detect on body click
			id: false // id to save state
		}, options);
		
		var self = this;

		if ( settings.id ) {
			if ( parseInt(readCookie(settings.id)) ) {
				$(settings.cont).toggle();
				self.toggleClass('active');
			}
		}

		this.click(function(){
			if ( $(this).hasClass('disabled') )
				return false;

			$(settings.cont).toggle();
			self.toggleClass('active');

			if ( settings.id ) {
				createCookie(settings.id, self.hasClass('active') ? 1 : 0, 365);
			}

			if ( $(settings.cont).is(':visible') && settings.id == 'cat_box_expander' ) {
				$('div.cat-tree-cont').addClass('limit-height').mCustomScrollbar('update');
			}
		});
		
		if ( settings.parent ) {
			$(document).bind('click touchstart', function(event){
				if ( !$(event.target).parents().hasClass(settings.parent) ) {
					$(settings.cont).hide();
					self.removeClass('active');
				}
			});
		}
	};
}(jQuery));

/**
*
* autocomplete plugin
*
* @package jQuery
* 
**/
(function($) {
	$.fn.vsAutoComplete = function(options){
		options = jQuery.extend({
			type: '*',
			field: false
		},options)

		var query = '';
		var obj = this;
		var set = false;
		var cur_item = 0;
		var total = 0;
		var interface = '<div id="ac_interface"></div>';
		var save_pos = 0;
		var timer = 0;
		
		var key_enter = 13;
		var key_down = 40;
		var key_up = 38;
		var del_up = 46;
		var poss = 0;
		
		if ( $(obj).parents().hasClass('kw-search-mobile') )
			return;
		
		$('#ac_interface').remove();
		$(obj).attr('autocomplete', 'off');
		
		var request = function(e)
		{
			if( (query != $(obj).val() && e.keyCode != key_enter) || (e.keyCode == key_down && cur_item == 0) || e.type == 'click' )
			{
				if ( $(obj).val().length < 2 )
				{
					$('#ac_interface').hide();
					return false;
				}
				
				/* build interface */
				if ( !set )
				{
					$(obj).after(interface);
					set = true;
				}
				
				if ( e.keyCode != key_down )
				{
					cur_item = 0;
				}
				
				/* do complete */
				$.getJSON(ac_php, {mode: 'listing', item: $(obj).val(), field: options.field, type: options.type, lang: rlLang}, function(response){
					if( response != '' && response != null )
					{
						var content = '<ul>';
						var index = 0;
						var query_arr = query.split(' ');

						for ( var i = 0; i < response.length; i++ )
						{
							if ( response[i]['listing_title'] != 'listing' && response[i]['listing_title'] != '' )
							{
								var out = response[i]['listing_title'];
								
								for ( var it = 0; it < query_arr.length; it++ )
								{
									if ( query_arr[it] != '' && query_arr[it].toLowerCase() != 'b' && query_arr[it].length > 2 )
									{
										if ( response[i]['listing_title'].toLowerCase().indexOf(query_arr[it].toLowerCase()) >= 0 )
										{
											var replace = '';
											
											var ix = response[i]['listing_title'].toLowerCase().indexOf(query_arr[it].toLowerCase());
			
											for ( var j = 0; j< query_arr[it].length; j++ )
											{
												if ( response[i]['listing_title'][ix] != query_arr[it][j] )
												{
													replace += query_arr[it].charAt(j).toUpperCase();
												}
												else
												{
													replace += query_arr[it].charAt(j);
												}
												
												ix++;
											}
	
											var search = new RegExp(query_arr[it], 'gi');
											out = out.replace(search, '<b>'+replace+'</b>' );
										}
									}
								}
								
								if ( replace != '' )
								{
									index++;
									content += '<li id="ac_item_'+index+'" class="clearfix"><div class="ac-listing"><a title="'+view_details+'" href="'+response[i]['Listing_path']+'" target="_blank">'+out+'</a></div><div class="ac-category"><a title="'+response[i]['Category_name']+'" href="'+response[i]['Category_path']+'" target="_blank">'+response[i]['Category_name']+'</a></div></li>';
								}
							}
						}
						
						content += '</ul>';
						
						total = index;
						
						$('#ac_interface').html(content);
						$('#ac_interface').show();
						$('#ac_interface').mCustomScrollbar();
			
						$('#ac_interface div:not(.ac_header)').click(function(){							
							save_pos = poss = 0;
						});
		
						$('#ac_interface li').mouseover(function(){
							$(this).addClass('active');
						}).mouseout(function(){
							$(this).removeClass('active');
						});
					}
					else
					{
						$('#ac_interface').hide();
					}
				});
				query = $(obj).val();
			}
		}
		
		/* keydown handler */
		$(obj).bind('keyup', function(e){
			if ( $(obj).parents().hasClass('kw-search-mobile') )
				return;
				
			if ( e.keyCode == key_enter )
			{
				if (cur_item != 0)
				{
					location.href = $('#ac_item_'+cur_item).find('a').attr('href');
				}
			}
			else if ( e.keyCode == key_down )
			{
				if ( cur_item < total && $('#ac_interface').is(':visible') )
				{
					cur_item++;
					poss += 31;
					drow();
				}
			}
			else if ( e.keyCode == key_up && $('#ac_interface').is(':visible') )
			{
				if (cur_item > 1)
				{
					cur_item--;
					poss -= 31;
					drow('up');
				}
			}
			else if ( e.keyCode == del_up )
			{
				$('#ac_interface').hide();
				$('#ac_interface ul').remove();
			}
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				request(e);
			}, 600);
		})
		
		$(obj).click(function(){
			if ( $(obj).parents().hasClass('kw-search-mobile') )
				return;
				
			if ( $('#ac_interface ul').length > 0 )
			{
				$('#ac_interface').show();
			}
		});
		
		$('body').click(function(e){
			if ( $(e.target).attr('id') != 'autocomplete' && $(e.target).parent().attr('class') != 'ac-category' )
			{
				$('#ac_interface').hide();
			}
		});
		
		function drow(direction)
		{
			$('#ac_interface li.active').removeClass('active');
			$('#ac_item_'+cur_item).addClass('active');
			
			$('#ac_interface').animate({scrollTop:poss-62}, 100);
		}
	}
})(jQuery);

/**
*
* jQuery file uploader plugin by Flynax 
*
**/
(function($){
	$.flUpload = function(el, options){
		var base = this;
		
		base.validate = new Array();
		base.validate['image'] = ['image/jpeg', 'image/gif', 'image/png'];
		base.index = 0;
		base.files = new Array();
		
		// access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// add a reverse reference to the DOM object
		base.$el.data("flUpload", base);

		base.init = function(){
			base.options = $.extend({},$.flUpload.defaultOptions, options);

			// initialize working object id
			if ( $(base.el).attr('id') )
			{
				base.options.id = $(base.el).attr('id');
			}
			else
			{
				$(base.el).attr('id', base.options.id);
			}
			
			base.upload();
			base.deleteObj();
		};

		// upload
		base.upload = function(){
			$(base.el).change(function(){
				base.index = 0;

				if ( $.browser.msie )
				{
					var name;
					eval("name = $(this).val().split('\\').reverse()[0];");
					base.poorMode(false, name);
					
					return;
				}
				
				var imgObj = this.files[0];
				var name = 'name' in imgObj ? imgObj.name : imgObj.fileName;
				var ext = name.split('.').reverse()[0];

				if ( base.options.validate && base.validate[base.options.validate].indexOf(imgObj.type) < 0 )
				{
					printMessage('error', lang['notice_bad_file_ext'].replace('{ext}', '<b>'+ext+'</b>'));
				}
				else
				{
					if ( base.options.sampleFrame )
					{
						var img = new Image();
						if ( 'getAsDataURL' in imgObj )
						{
							img.src = imgObj.getAsDataURL();
							img.onload = function(){
								var canvas = document.createElement('canvas');
								var width = base.options.sampleMaxWidth;
								var height = Math.floor((base.options.sampleMaxWidth * img.height) / img.width);
								
								if ( base.options.fixedSize && height < base.options.sampleMaxHeight )
								{
									width = width*base.options.sampleMaxHeight/height;
									height = base.options.sampleMaxHeight;
								}
								if (!canvas.getContext) {
									console.log('.getContext() doesn\'t work')
								}
								canvas.width = base.options.fixedSize ? base.options.sampleMaxWidth : width;
								canvas.height = base.options.fixedSize ? base.options.sampleMaxHeight : height;
								canvas.getContext('2d').drawImage(img, 0, 0, width, height);
								canvas.className = 'new';
								
								$(base.options.sampleFrame).addClass('active').find('canvas').remove();
								$(base.options.sampleFrame).prepend(canvas);
								$(base.options.sampleFrame).find('.preview').hide();
							};
						}
						else
						{
							base.poorMode(imgObj, name, ext);
						}
					}
					else
					{
						console.log('Flynax Error: No sample/preview object specified')
					}
				}
			});
		};
		
		base.poorMode = function(imgObj, name, ext){
			var html = '<div title="'+name+'" style="width: '+base.options.sampleMaxWidth+'px;height: '+base.options.sampleMaxHeight+'px;">'+name+'</div>';
			$(base.options.sampleFrame).find('img.preview,div').hide();
			$(base.options.sampleFrame).prepend(html);
			$(base.options.sampleFrame).addClass('active');
		};
		
		base.deleteObj = function(){
			$(base.options.sampleFrame).find('img.delete').unbind('click').click(function(){
				if ( $(this).hasClass('ajax') )
					return;

				$(base.options.sampleFrame).find('img.preview').show();
				$(base.options.sampleFrame).find('canvas, div').remove();
				$(base.options.sampleFrame).removeClass('active');
			});
		};
		
		// run initializer
		base.init();
	};

	$.flUpload.defaultOptions = {
		sampleFrame: false,
		sampleMaxWidth: 105,
		sampleMaxHeight: 105,
		validate: 'image',
		fixedSize: false,
		allowed: 3,
		unlimited: false
	};

	$.fn.flUpload = function(options){
		return this.each(function(){
			(new $.flUpload(this, options));
		});
	};

})(jQuery);

/**
*
* jQuery modal window plugin by Flynax 
*
**/
(function($){
	$.flModal = function(el, options){
		var base = this;
		var lock = false;
		var direct = false;
		var fullscreen_mode = false;
		
		// access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		base.objHeight = 0;
		base.objWidth = 0;
		base.sourceContent = false;

		// add a reverse reference to the DOM object
		base.$el.data("flModal", base);

		base.init = function(){
			base.options = $.extend({},$.flModal.defaultOptions, options);

			// initialize working object id
			if ( $(base.el).attr('id') ) {
				base.options.id = $(base.el).attr('id');
			}
			else {
				$(base.el).attr('id', base.options.id);
			}
			
			fullscreen_mode = false;

			// add mask on click
			if ( base.options.click ) {
				base.$el.click(function(){
					base.mask();
					base.loadContent();
				});
			}
			else {
				base.mask();
				base.loadContent();
			}
		};

		base.mask = function() {
			var dom = '<div id="modal_mask"><div id="modal_block" class="modal_block"></div></div>';
			
			$('body').append(dom);
			
			if ( media_query == 'mobile' ) {
				base.options.width = base.options.height = '100%';
			}

			if ( base.options.fill_edge ) {
				$('#modal_block').addClass('fill-edge');
			}

			if ( base.options.width == '100%' && base.options.height == '100%' ) {
				fullscreen_mode = true;
				$('body > *:visible').addClass('tmp-hidden').hide();
				$('#modal_block').addClass('fullscreen');
				$('#modal_mask').show();
				var width = '100%';
				var height = '100%';
			}
			else {
				var width = $(document).width();
				var height = $(document).height();
			}

			$('#modal_mask').width(width);
			$('#modal_mask').height(height);
			$('#modal_block').width(base.options.width).height(base.options.height);

			if ( !fullscreen_mode ) {
				// on resize
				$(window).bind('resize', base.resize);
			
				// on scroll	
				if ( base.options.scroll ) {
					$(window).bind('scroll', base.scroll);
				}
			}
		};
		
		base.resize = function() {
			if ( lock )
				return;

			var width = $(window).width();
			var height = $(document).height();
			$('#modal_mask').width(width);
			$('#modal_mask').height(height);
			
			var margin = ($(window).height()/2)-base.objHeight + $(window).scrollTop();
			$('#modal_block').stop().animate({marginTop: margin});
			
			var margin = base.objWidth * -1;
			$('#modal_block').stop().animate({marginLeft: margin});
		};
		
		base.scroll = function() {
			if ( lock )
				return;

			var margin = ($(window).height()/2)-base.objHeight + $(window).scrollTop();
			$('#modal_block').stop().animate({marginTop: margin});
		};
		
		base.loadContent = function() {
			/* load main block source */
			var dom = '<div class="inner"><div class="modal_content"></div><div class="close" title="'+lang['close']+'"><div></div></div></div>';
			$('div#modal_block').html(dom);

			/* load content */
			var content = '';
			var caption_class = base.options.type ? ' '+base.options.type : '';
			base.options.caption = base.options.type && !base.options.caption ? lang[base.options.type] : base.options.caption;
			
			/* save source */
			if ( base.options.source ) {
				if ( $(base.options.source + ' > div.tmp-dom').length > 0 ) {
					base.sourceContent = $(base.options.source + ' > div.tmp-dom');
					direct = true;
				}
				else {
					base.sourceContent = $(base.options.source).html();
				}
			}
			
			/* build content */
			content = base.options.caption ? '<div class="caption'+caption_class+'">'+ base.options.caption + '</div>': '';
			content += base.options.content ? base.options.content : '';
			
			/* clear soruce objects to avoid id overload */
			if ( base.options.source && !direct ) {
				$(base.options.source).html('');
				content += !base.options.content ? base.sourceContent : '';
			}
			
			$('div#modal_block div.inner div.modal_content').html(content);
			
			if ( base.options.source && direct ) {
				$('div#modal_block div.inner div.modal_content').append(base.sourceContent);
			}
			
			if ( base.options.prompt ) {
				var prompt = '<div class="prompt"><input name="ok" type="button" value="Ok" /> <a class="close" href="javascript:void(0)">'+lang['cancel']+'</a></div>';
				$('div#modal_block div.inner div.modal_content').append(prompt);
			}
			
			if ( base.options.ready ) {
				base.options.ready();
			}
			
			$('#modal_block input[name=close], #modal_block .close').click(function(){
				base.closeWindow();
			});
			
			if ( base.options.prompt ) {
				$('#modal_block div.prompt input[name=close]').click(function(){
					base.closeWindow();
				});
				$('#modal_block div.prompt input[name=ok]').click(function(){
					var func = base.options.prompt;
					func += func.indexOf('(') < 0 ? '()' : '';
					eval(func);
					base.closeWindow();
				});
			}
			
			/* set initial sizes */
			if ( !fullscreen_mode ) {
				base.objHeight = $('#modal_block').height()/2;
				base.objWidth = $('#modal_block').width()/2;
				
				var setTop = ($(window).height()/2) - base.objHeight + $(window).scrollTop();
				$('#modal_block').css('marginTop', setTop);
				var setLeft = base.objWidth * -1;
				$('#modal_block').css('marginLeft', setLeft);
			}
			
			$('#modal_mask').click(function(e){
				if ( $(e.target).attr('id') == 'modal_mask' ) {
					base.closeWindow();
				}
			});
			
			$('#modal_block div.close').click(function(){
				base.closeWindow();
			});
		};
		
		base.closeWindow = function() {
			lock = true;
			
			$('#modal_block').animate({opacity: 0});
			$('#modal_mask').animate({opacity: 0}, function(){
				$(this).remove();
				$('#modal_block').remove();
				
				if ( base.options.source ) {
					$(base.options.source).append(base.sourceContent);
				}
				
				lock = false;
			});

			$(window).unbind('resize', base.resize);
			$(window).unbind('scroll', base.scroll);

			if ( fullscreen_mode ) {
				$('body > *.tmp-hidden').show().removeClass('tmp-hidden');
			}
		};
		
		// run initializer
		base.init();
	};

	$.flModal.defaultOptions = {
		scroll: true,
		type: false,
		width: 340,
		height: 230,
		source: false,
		content: false,
		caption: false,
		prompt: false,
		click: true,
		ready: false,
		fill_edge: false
	};

	$.fn.flModal = function(options){
		return this.each(function(){
			(new $.flModal(this, options));
		});
	};

})(jQuery);

/**
*
* jQuery categoroes slider plugin by Flynax
*
**/
(function($){
	$.flCatSlider = function(el, options){
		var base = this;
		
		base.block_width = 0;
		base.work_width = 0;
		base.position = 0;
		base.areaMargin = 0;
		base.pages = 1;
		
		// access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// add a reverse reference to the DOM object
		base.$el.data("flCatSlider", base);

		base.init = function() {
			base.options = $.extend({},$.flCatSlider.defaultOptions, options);

			// initialize working object id
			if ( $(base.el).attr('id') ) {
				base.options.id = $(base.el).attr('id');
			}
			else {
				$(base.el).attr('id', base.options.id);
			}

			if ( !$(base.el).attr('id') )
				return;
			
			if ( !$(base.el).next().hasClass('category-slider-bar') ) {
				return;
			}
			
			base.clear();	
			base.setSizes();
			base.eventsHandler();
			base.scroll();
		};

		base.clear = function() {
			$(base.el).attr('style', '');
			$(base.el).find('ul').attr('style', '')
			$(base.el).find('ul > li').attr('style', '');
			base.position = 0;
			$(base.el).next().find('.navigation > span').removeClass('active');
			$(base.el).next().find('.navigation > span:first-child').addClass('active');
			$(base.el).next().find('.prev').hide();
			$(base.el).next().find('.next').show();
		};
		
		base.setSizes = function() {
			base.pages = parseInt($(base.el).attr('id').split('_')[2]) || 1;
			
			if ( base.pages < 2 )
				return;
				
			base.block_width = 100;
			base.work_width = base.block_width - base.areaMargin
			//$(base.el).width(base.block_width);
			$(base.el).find('ul').css('width', (base.block_width * base.pages) + '%');
			$(base.el).find('ul li').css('width', (base.block_width / base.pages)+'%').show();
			
			$(base.el).next().find('.prev').hide();
		};
		
		base.eventsHandler = function() {
			if ( base.pages < 0 )
				return;
				
			$(base.el).next().find('.navigation span').unbind('click').click(function(){
				var point = parseInt($(this).attr('accesskey'));
				base.position = point - 1;
				base.slider();
			});
			

			var move_next = function(){
				var active = base.position + 1;
				if ( active < base.pages ) {
					base.position++;
					base.slider();
				}
			};

			$(base.el).next().find('.next').parent().unbind('click', move_next).bind('click', move_next);
			$(base.el).unbind(swipeLeft, move_next).bind(swipeLeft, move_next);

			var move_prev = function(){
				var active = base.position + 1;
				if ( active > 1 ) {
					base.position--;
					base.slider();
				}
			};

			$(base.el).next().find('.prev').parent().unbind('click', move_prev).bind('click', move_prev);
			$(base.el).unbind(swipeRight, move_prev).bind(swipeRight, move_prev);
		};
		
		base.slider = function() {
			var pos = (base.block_width * base.position) * -1;
			var active = base.position + 1;
			if ( rlLangDir == 'ltr' ) {
				$(base.el).find('ul').stop().animate({marginLeft: pos+'%'});
			}
			else {
				$(base.el).find('ul').stop().animate({marginRight: pos+'%'});
			}
			$(base.el).next().find('.navigation span').removeClass('active');
			$(base.el).next().find('.navigation span[accesskey='+ active +']').addClass('active');
			
			if ( active == 1 ) {
				$(base.el).next().find('.prev').fadeOut('normal');
			}
			else {
				$(base.el).next().find('.prev').fadeIn('normal');
			}
			
			if ( active == base.pages ) {
				$(base.el).next().find('.next').fadeOut('normal');
			}
			else {
				$(base.el).next().find('.next').fadeIn('normal');
			}
		};
		
		base.scroll = function() {
			if ( $(base.el).next().hasClass('mousewheel') ) {
				$(base.el).parent().unbind('mousewheel').bind('mousewheel', function(e, data){
					if ( data < 0 ) {
						var active = base.position + 1;
						if ( active < base.pages ) {
							base.position++;
							base.slider();
							e.preventDefault();
						}
					}
					else {
						var active = base.position + 1;
						if ( active > 1 ) {
							base.position--;
							base.slider();
							e.preventDefault();
						}
					}
				});
			}
		};
		
		// run initializer
		base.init();
	};

	$.flCatSlider.defaultOptions = {
		scroll: 1
	};

	$.fn.flCatSlider = function(options){
		return this.each(function(){
			(new $.flCatSlider(this, options));
		});
	};

})(jQuery);

/**
*
* jQuery common slider plugin by Flynax
*
**/
(function($){
	$.flSlider = function(el, options){
		var base = this;
		
		base.items = new Array();
		base.loading = new Array();
		base.currentSlide = 0;
		base.parent = false;
		base.cont = false;
		base.slidesNumber = 0;
		base.itemsPerSlide = 0;
		base.workSide = 0;
		base.itemSide = 0;
		base.itemsCount = 0;
		
		// access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// add a reverse reference to the DOM object
		base.$el.data("flSlider", base);

		base.init = function(){
			base.options = $.extend({},$.flSlider.defaultOptions, options);

			// initialize working object id
			if ( $(base.el).attr('id') )
			{
				base.options.id = $(base.el).attr('id');
			}
			else
			{
				$(base.el).attr('id', base.options.id);
			}

			base.preLoader();
		};

		base.preLoader = function(){
			if ( !base.options.height && base.options.vertical )
			{
				console.log('The HEIGHT parameter is required in VERTICAL slider mode');
				return;
			}
			
			$(base.el).css('opacity', 0);
			
			var index = 0;
			$(base.el).find('li').each(function(){
				eval(" \
				var obj"+index+" = this; \
				var src"+index+" = $(obj"+index+").find('img').attr('src'); \
				if ( src"+index+" ) \
				{ \
					base.loading["+index+"] = 'progress'; \
					var img"+index+" = new Image(); \
					img"+index+".onload = function(){ \
						base.loading["+index+"] = 'success'; \
						base.items["+index+"] = new Array(src"+index+", $(obj"+index+").width(), $(obj"+index+").height()); \
						if ( base.loading.indexOf('progress') < 0 ) \
						{ \
							base.setSizes(); \
						} \
					}; \
					img"+index+".src = src"+index+"; \
				} \
				");
				index++;
			});
		};
		
		base.setSizes = function(){
			var add_class = base.options.vertical ? ' vertical' : ' horizontal';
			base.itemsCount = $(base.el).find('li').length;
			$(base.el).before('<div class="slider '+add_class+'"><div class="prev"></div><div class="container"></div><div class="next"></div></div>');
			$(base.el).prev().children('div.container').html($(base.el));
			base.parent = $(base.el).parent().parent();
			base.cont = $(base.el).parent();
			
			if ( base.options.vertical )
			{	
				$(base.parent).height(base.options.height);
				$(base.cont).height(base.options.height-40);// -container margin (top and bottom)
				base.workSide = base.options.height-40;
				base.itemSide = $(base.el).find('li:first').height();
			}
			else
			{
				base.workSide = $(base.cont).width();
				$(base.cont).width(base.workSide);//fix the width
				
				var max_height = 0;
				var total_width = 0;
				
				for (var i=0; i<base.items.length; i++ )
				{
					max_height = base.items[i][2] > max_height ? base.items[i][2]: max_height;
					total_width += base.items[i][1];
				}
				$(base.parent).height(max_height);
				//$(base.el).width(total_width);
				
				base.itemSide = $(base.el).find('li:first').width();
			}
			
			if ( !base.itemSide )
			{
				console.log('Can not detect slider work side length (width/height), probably ul located in hidden element.');
				return;
			}
			
			base.itemsPerSlide = Math.floor((base.workSide+base.options.clearance)/base.itemSide);
			base.slidesNumber = Math.ceil(base.itemsCount/base.itemsPerSlide);
			
			if ( base.slidesNumber <= 1 )
			{
				$(base.el).closest('div.slider').find('div.prev, div.next').remove();
				$(base.el).parent().css({width: 'auto', margin: 0});
				$(base.el).css({opacity: 1});
				return;
			}
			
			$(base.el).animate({opacity: 1});
			
			base.setMargin();
			base.eventsHandler();
		};
		
		base.setMargin = function(){
			var work_width = (base.itemsPerSlide * base.itemSide) - base.options.clearance;
			base.options.perSlide = base.itemsPerSlide < base.options.perSlide ? base.itemsPerSlide: base.options.perSlide;
			var rest = base.workSide - work_width;
			
			var margin = Math.floor(rest / (base.itemsPerSlide -1));
			if ( margin >= 1 )
			{
				base.itemSide += margin;
				if ( base.options.vertical )
				{
					$(base.el).find('li').css('marginBottom', margin+'px');
				}
				else
				{
					$(base.el).find('li').css('marginRight', margin+'px');
				}
			}
		};
		
		base.eventsHandler = function(){
			$(base.parent).find('div.navigation a').click(function(){
				var point = parseInt($(this).attr('accesskey'));
				currentSlide = point - 1;
				base.slider();
			});
			
			$(base.parent).find('div.next').click(function(){
				if ( base.currentSlide+1 < base.slidesNumber )
				{
					base.currentSlide++;
					base.slider();
				}
			});
			$(base.parent).find('div.prev').click(function(){
				if ( base.currentSlide > 0 )
				{
					base.currentSlide--;
					base.slider();
				}
			});
		};
		
		base.slider = function(){
			var pos = (base.itemSide * base.options.perSlide * base.currentSlide) * -1;
			
			if ( base.options.vertical )
			{
				$(base.el).animate({marginTop: pos});
			}
			else
			{
				$(base.el).animate({marginLeft: pos});
			}
//			$(base.el).next().find('div.navigation a').removeClass('active');
//			$(base.el).next().find('div.navigation a[accesskey='+ active +']').addClass('active');
		};
		
		// run initializer
		base.init();
	};

	$.flSlider.defaultOptions = {
		vertical: false,
		height: false,//required in vertical mode,
		preload: true,
		perSlide: 1,
		clearance: 0
	};

	$.fn.flSlider = function(options){
		return this.each(function(){
			(new $.flSlider(this, options));
		});
	};

})(jQuery);

/**
*
* tabs click handler
*
* @param object obj - tab object referent
* 
**/
$(document).ready(function(){
	$('.tabs:not(.search_tabs) li:not(.more,.overflowed)').click(function(){
		tabsSwitcher(this);
	});
});

var tabsSwitcher = function(obj){
	if ( typeof obj == 'string' ) {
		obj = obj.replace('div.tabs', 'ul.tabs');
	}
	else {
		if ( $(obj).closest('ul').hasClass('search_tabs') ) {
			if ( media_query == 'desktop' ) {
				$('div.search-block-content div.scroller').mCustomScrollbar('destroy');
				$('div.search-block-content div.scroller').mCustomScrollbar();
			}
			return false;
		}
	}

	if ( $(obj).length <= 0 )
		return;

	var key = $(obj).attr('id').split('_')[1];
	
	$('.tab_area').hide();
	$('.tabs li.active').removeClass('active');
	
	$(obj).addClass('active');
	$('div#area_'+key).show();
};

/**
*
* favorites handler
* 
**/
$(document).ready(function(){
	flFavoritesHandler();
});

var flFavoritesHandler = function(){
	
	/* favorites handler */
	$('.favorite').each(function(){
		var id = $(this).attr('id').split('_')[1];
		var ids = readCookie('favorites');
		
		if ( ids ) {
			ids = ids.split(',');
			
			if ( ids.indexOf(id) >= 0 ) {
				$(this).removeClass('add').addClass('remove');
				$(this).attr('title', lang['remove_from_favorites']).find('span.link').text(lang['remove_from_favorites']);
			}
		}
	});
	
	$('.favorite').unbind('click').click(function(){
		var id = $(this).attr('id').split('_')[1];
		var ids = readCookie('favorites');
		
		if ( ids ) {
			ids = ids.split(',');
			
			if ( ids.indexOf(id) >= 0 ) {
				ids.splice(ids.indexOf(id), 1);
				createCookie('favorites', ids.join(','), 93);
				
				$(this).removeClass('remove').addClass('add');
				$(this).attr('title', lang['add_to_favorites']).find('span.link').text(lang['add_to_favorites']);
				
				if ( rlPageInfo['key'] == 'my_favorites' ) {
					$(this).closest('article').fadeOut(function(){
						$(this).remove();
						printMessage('notice', lang['notice_listing_removed_from_favorites']);

						if ( $('#listings > article').length < 1 ) {
							if ( $('ul.pagination').length > 0 ) {
								var redirect = rlConfig['seo_url'];
								redirect += rlConfig['mod_rewrite'] ? rlPageInfo['path'] +'.html' : 'index.php?page='+ rlPageInfo['path'];
								location.href = redirect;
							}
							else {
								var div = '<div class="info">'+lang['no_favorite']+'</div>';
								$('#controller_area').append(div);
								$('.grid_navbar').remove();
							}
						}
					});
				}
				
				return;
			}
			else {
				ids.push(id);
			}
		}
		else {
			ids = new Array();
			ids.push(id);
		}
		
		createCookie('favorites', ids.join(','), 93);
		
		$(this).removeClass('add').addClass('remove');
		$(this).attr('title', lang['remove_from_favorites']).find('span.link').text(lang['remove_from_favorites']);
	});
}

/**
*
* photos count effects handler
* 
**/
$(document).ready(function(){
	$('#listings fieldset div.photos_count').prev().each(function(){
		var imgObj = new Image();
		
		var parentObj = this;
		imgObj.onload = function(){
			$(parentObj).next().children('div').width($(parentObj).children('a img').width()-2);
		};
		
		imgObj.src = $(this).children('a img').attr('src');
	});
	$('#listings fieldset').mouseenter(function(){
		$(this).find('.photos_count').children('div').stop().css('opacity', 0.5).animate({opacity: 0.8});
	});
	$('#listings fieldset').mouseleave(function(){
		$(this).find('.photos_count').children('div').stop().animate({opacity: 0.5});
	});
});

/**
*
* paging transit handler
* 
**/
$(document).ready(function(){
	$('ul.pagination li.transit input').bind('focus', function(){
		$(this).select();
	}).keypress(function(event){
		if( event.keyCode == 13 ) { //enter key pressed
			var page = parseInt($(this).val());
			var info = $('ul.pagination li.transit input[name=stats]').val().split('|');
			var first = $('ul.pagination li.transit input[name=first]').val();
			var pattern = $('ul.pagination li.transit input[name=pattern]').val();
			
			if ( page > 0 && page != parseInt(info[0]) && page <= parseInt(info[1]) ) {
				if ( page == 1 ) {
					location.href = first;
				}
				else {
					location.href = pattern.replace('[pg]', page);
				}
			}
		}
	});
});

/**
* notices/errors handler
*
* @param string type - message type: error, notice, warning
* @param string/array message - message text
* @param string/array fields - error fields names, array or comma separated
* @param direct - DEPRECATED
*
**/
var PMtimer = false;
var printMessage = function(type, message, fields, direct){
	if ( !message || !type )
		return;

	var self  = this;
	var types = new Array('error', 'notice', 'warning');
	var height = 0;
	var from_top = false;

	var time = 20; //seconds
	time *= 1000;
	
	if ( types.indexOf(type) < 0 )
		return;
	
	this.isFixed = function(){
		var offset = $('.header-banner-cont').get(0).offsetHeight;
		var selector = media_query == 'desktop' ? 'body > header > section.point1' : 'body > header';
		return $(document).scrollTop() > ($(selector).height() + offset) ? true : false;
	};

	this.getHeight = function(){
		var offset = $('.header-banner-cont').get(0).offsetHeight;
		return media_query != 'mobile' ? $('body > header').height() + offset : $('body > header > section.point1').height() + offset;
	};

	this.build = function(){
		this.closeMessage();

		var offset = this.isFixed() && media_query == 'desktop' ? 58 : 0;
		var addClass = this.isFixed() ? ' fixed' : '';

		if ( $('body > div#modal_mask').length > 0 ) {
			addClass += ' top';
			this.from_top = true;
		}

		var html = ' \
			<div class="notification '+type+addClass+' hide"><div> \
				<div class="message">'+message+'</div> \
				<div class="close close-black" title="'+lang['close']+'"><div></div></div> \
			</div></div> \
		';

		$('section#main_container').prepend(html);
		height = $('.notification').height() + 70 - offset; //70 is shadow height

		if ( this.from_top ) {
			offset = 0;
		}

		$('.notification').css('top', '-'+height+'px').show().animate({top: offset}, 'slow', function(){
			if ( self.isFixed() ) {
				$(this).addClass('done');
			}
		});

		PMtimer = setTimeout(self.closeMessage, time);
	};

	this.closeMessage = function(build){
		clearTimeout(PMtimer);

		var top = $('.notification').hasClass('fixed') && media_query == 'desktop' ? 58 : 0;

		$('.notification').animate({top: 50 + top, opacity: 0}, function(){
			$('.notification').remove();
			if ( build ) {
				self.build();
			}
		});
	};

	if ( typeof(message) == 'object' ) {
		var tmp = '<ul>';
		for( var i=0; i<message.length; i++ ) {
			tmp += '<li>'+message[i]+'</li>';
		}
		tmp += '</ul>';
		message = tmp;
	}
	
	$('input,select,textarea,table.error').removeClass('error');
	
	/* highlight error fields */
	if ( fields ) {
		if ( typeof(fields) != 'object' ) {
			fields = fields.split(',');
		}

		for ( var i = 0; i<fields.length; i++ ) {
			if ( !fields[i] )
				continue;

			if ( trim(fields[i]) != '' ) {
				if ( fields[i].charAt(0) == '#' ) {
					$(fields[i]).addClass('error');
				}
				else {
					var selector = 'input[name^="'+fields[i]+'"]:last:not(.policy),select[name="'+fields[i]+'"],textarea[name="'+fields[i]+'"]';
					if ( $(selector).length > 0 && $(selector).attr('type') != 'radio' && $(selector).attr('type') != 'checkbox' ) {
						$(selector).addClass('error');
					}
					else {
						if ( $(selector).attr('type') == 'radio' || $(selector).attr('type') == 'checkbox' ) {
							$(selector).closest('div.field').addClass('error');
						}
						else {
							$('input[name="'+fields[i]+'"],select[name="'+fields[i]+'"],textarea[name^="'+fields[i]+'"]').parent().addClass('error');
						}
					}
				}	
			}
		}

		$('input,select,textarea,table.error').unbind('focus').focus(function(){
			$(this).removeClass('error')
		});
		$('div.field.error input').unbind('click').click(function(){
			$(this).closest('div.error').removeClass('error')
		});
	}

	if ( $('.notification').length > 0 ) {
		self.closeMessage(true);
	}
	else {
		self.build();
	}

	$('.notification div.close').live('click', function(){
		self.closeMessage();
	});

	$('.notification').mouseenter(function(){
		clearTimeout(PMtimer);
	}).mouseleave(function(){
		PMtimer = setTimeout(self.closeMessage, time);
	});

	var notificationScroll = function(){
		if ( this.isFixed() ) {
			$('.notification').addClass('fixed done');
		}
		else {
			$('.notification').removeClass('hide fixed done').removeAttr('style');
		}
	};
	$(window).bind('touchmove scroll', notificationScroll);
};

var flFieldset = function(){
	$('div.fieldset header .arrow').unbind('click').click(function(){
		var arrow = this;
		var parent = $(this).closest('.fieldset');
		var id = $(parent).attr('id');
		var cookies = readCookie('fieldset');
		
		if ( $(parent).find('div.body').is(':visible') ) {
			if ( cookies ) {
				cookies = cookies.split(',');
				if ( cookies.indexOf(id) < 0 ) {
					cookies.push(id);
					createCookie('fieldset', cookies.join(','), 62);
				}
			}
			else {
				createCookie('fieldset', id, 62);
			}
			
			$(parent).find('div.body').slideUp(function(){
				$(arrow).addClass('up');
			});
		}
		else {
			if ( cookies ) {
				cookies = cookies.split(',');
				cookies.splice(cookies.indexOf(id), 1);
				createCookie('fieldset', cookies.join(','), 62);
			}
			
			$(parent).find('div.body').slideDown(function(){
				$(arrow).removeClass('up');
			});
			//ereaseCookie();
		}
	});
	
	var cookies = readCookie('fieldset');
	cookies = cookies ? cookies.split(',') : false;
	
	$('div.fieldset').each(function(){
		if ( cookies ) {
			var id = $(this).attr('id');
			if ( cookies.indexOf(id) >= 0 ) {
				$(this).find(' > div.body').hide();
				$(this).find('header .arrow').addClass('up');
			}
		}
	});
}

/**
*
* prompt alert
*
* @param string message - prompt message text
* @param srting method  - javascript method (function)
* @param Array  params  - method (function) params
* @param string load_object  - load object ID
* 
**/
function rlConfirm( message, method, params, load_object )
{
	if (confirm(message))
	{
		var func = method+'('+params+')';
		
		eval(func);
		
		if ( load_object != '')
		{
			$('#'+load_object).fadeIn('normal');
		}
	}
}

/**
*
* hide or show the object (via jQuery effect) by ID, and hide all objects by html path
*
* @param srting id - field id
* @param srting path - html path
* 
**/
function show( id, path )
{
	if (path != undefined)
	{
		$(path).slideUp('fast');
	}

	if ( $( '#'+id ).css('display') == 'block' )
	{
		$( '#'+id ).slideUp('normal');
	}
	else
	{
		$( '#'+id ).slideDown('slow');
	}
}

/* adaptation for IE6 */
if(!Array.indexOf)
{
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    }
}

/**
*
* trim string
*
* @param string str - string for trim
* @param string chars - chars to be trimmed
*
* @return trimmed string
* 
**/
function trim(str, chars)
{
	return ltrim(rtrim(str, chars), chars);
}

/**
*
* left trim string
*
* @param string str - string for trim
* @param string chars - chars to be trimmed
*
* @return trimmed string
* 
**/
function ltrim(str, chars)
{
	if ( !str )
		return;
		
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

/**
*
* right trim string
*
* @param string str - string for trim
* @param string chars - chars to be trimmed
*
* @return trimmed string
* 
**/
function rtrim(str, chars)
{
	if ( !str )
		return;
		
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

/**
*
* escape or replace quotes
*
* @param string str - string for replacing
* @param bool to - replace if true and escape if false
* 
**/
function quote( str, to ) {
	if (!to) {
		return str.replace(/'/g, "").replace(/"/g, "");
	}
	else {
		var to_single = '&rsquo;';
		var to_double = '&quot;';
		
		return str.replace(/'/g, to_single).replace(/"/g, to_double).replace(/\n/g, '<br />' );
	}
}