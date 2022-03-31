/*!
 AutoFill 2.3.5
 ©2008-2020 SpryMedia Ltd - datatables.net/license
*/
(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return e(g,window,document)}):"object"===typeof exports?module.exports=function(g,i){g||(g=window);if(!i||!i.fn.dataTable)i=require("datatables.net")(g,i).$;return e(i,g,g.document)}:e(jQuery,window,document)})(function(e,g,i,r){var l=e.fn.dataTable,t=0,k=function(b,c){if(!l.versionCheck||!l.versionCheck("1.10.8"))throw"Warning: AutoFill requires DataTables 1.10.8 or greater";this.c=e.extend(!0,{},l.defaults.autoFill,
k.defaults,c);this.s={dt:new l.Api(b),namespace:".autoFill"+t++,scroll:{},scrollInterval:null,handle:{height:0,width:0},enabled:!1};this.dom={handle:e('<div class="dt-autofill-handle"/>'),select:{top:e('<div class="dt-autofill-select top"/>'),right:e('<div class="dt-autofill-select right"/>'),bottom:e('<div class="dt-autofill-select bottom"/>'),left:e('<div class="dt-autofill-select left"/>')},background:e('<div class="dt-autofill-background"/>'),list:e('<div class="dt-autofill-list">'+this.s.dt.i18n("autoFill.info",
"")+"<ul/></div>"),dtScroll:null,offsetParent:null};this._constructor()};e.extend(k.prototype,{enabled:function(){return this.s.enabled},enable:function(b){var c=this;if(!1===b)return this.disable();this.s.enabled=!0;this._focusListener();this.dom.handle.on("mousedown",function(a){c._mousedown(a);return!1});return this},disable:function(){this.s.enabled=!1;this._focusListenerRemove();return this},_constructor:function(){var b=this,c=this.s.dt,a=e("div.dataTables_scrollBody",this.s.dt.table().container());
c.settings()[0].autoFill=this;a.length&&(this.dom.dtScroll=a,"static"===a.css("position")&&a.css("position","relative"));!1!==this.c.enable&&this.enable();c.on("destroy.autoFill",function(){b._focusListenerRemove()})},_attach:function(b){var c=this.s.dt,a=c.cell(b).index(),d=this.dom.handle,f=this.s.handle;if(!a||-1===c.columns(this.c.columns).indexes().indexOf(a.column))this._detach();else{this.dom.offsetParent||(this.dom.offsetParent=e(c.table().node()).offsetParent());if(!f.height||!f.width)d.appendTo("body"),
f.height=d.outerHeight(),f.width=d.outerWidth();c=this._getPosition(b,this.dom.offsetParent);this.dom.attachedTo=b;d.css({top:c.top+b.offsetHeight-f.height,left:c.left+b.offsetWidth-f.width}).appendTo(this.dom.offsetParent)}},_actionSelector:function(b){var c=this,a=this.s.dt,d=k.actions,f=[];e.each(d,function(c,d){d.available(a,b)&&f.push(c)});if(1===f.length&&!1===this.c.alwaysAsk){var j=d[f[0]].execute(a,b);this._update(j,b)}else if(1<f.length){var h=this.dom.list.children("ul").empty();f.push("cancel");
e.each(f,function(f,j){h.append(e("<li/>").append('<div class="dt-autofill-question">'+d[j].option(a,b)+"<div>").append(e('<div class="dt-autofill-button">').append(e('<button class="'+k.classes.btn+'">'+a.i18n("autoFill.button","&gt;")+"</button>").on("click",function(){var f=d[j].execute(a,b,e(this).closest("li"));c._update(f,b);c.dom.background.remove();c.dom.list.remove()}))))});this.dom.background.appendTo("body");this.dom.list.appendTo("body");this.dom.list.css("margin-top",-1*(this.dom.list.outerHeight()/
2))}},_detach:function(){this.dom.attachedTo=null;this.dom.handle.detach()},_drawSelection:function(b){var c=this.s.dt,a=this.s.start,d=e(this.dom.start),f={row:this.c.vertical?c.rows({page:"current"}).nodes().indexOf(b.parentNode):a.row,column:this.c.horizontal?e(b).index():a.column},b=c.column.index("toData",f.column),j=c.row(":eq("+f.row+")",{page:"current"}),j=e(c.cell(j.index(),b).node());if(c.cell(j).any()&&-1!==c.columns(this.c.columns).indexes().indexOf(b)){this.s.end=f;var h,c=a.row<f.row?
d:j;h=a.row<f.row?j:d;b=a.column<f.column?d:j;d=a.column<f.column?j:d;c=this._getPosition(c.get(0)).top;b=this._getPosition(b.get(0)).left;a=this._getPosition(h.get(0)).top+h.outerHeight()-c;d=this._getPosition(d.get(0)).left+d.outerWidth()-b;f=this.dom.select;f.top.css({top:c,left:b,width:d});f.left.css({top:c,left:b,height:a});f.bottom.css({top:c+a,left:b,width:d});f.right.css({top:c,left:b+d,height:a})}},_editor:function(b){var c=this.s.dt,a=this.c.editor;if(a){for(var d={},f=[],e=a.fields(),h=
0,i=b.length;h<i;h++)for(var p=0,k=b[h].length;p<k;p++){var n=b[h][p],g=c.settings()[0].aoColumns[n.index.column],o=g.editField;if(o===r)for(var g=g.mData,q=0,l=e.length;q<l;q++){var s=a.field(e[q]);if(s.dataSrc()===g){o=s.name();break}}if(!o)throw"Could not automatically determine field data. Please see https://datatables.net/tn/11";d[o]||(d[o]={});g=c.row(n.index.row).id();d[o][g]=n.set;f.push(n.index)}a.bubble(f,!1).multiSet(d).submit()}},_emitEvent:function(b,c){this.s.dt.iterator("table",function(a){e(a.nTable).triggerHandler(b+
".dt",c)})},_focusListener:function(){var b=this,c=this.s.dt,a=this.s.namespace,d=null!==this.c.focus?this.c.focus:c.init().keys||c.settings()[0].keytable?"focus":"hover";if("focus"===d)c.on("key-focus.autoFill",function(a,c,d){b._attach(d.node())}).on("key-blur.autoFill",function(){b._detach()});else if("click"===d)e(c.table().body()).on("click"+a,"td, th",function(){b._attach(this)}),e(i.body).on("click"+a,function(a){e(a.target).parents().filter(c.table().body()).length||b._detach()});else e(c.table().body()).on("mouseenter"+
a,"td, th",function(){b._attach(this)}).on("mouseleave"+a,function(a){e(a.relatedTarget).hasClass("dt-autofill-handle")||b._detach()})},_focusListenerRemove:function(){var b=this.s.dt;b.off(".autoFill");e(b.table().body()).off(this.s.namespace);e(i.body).off(this.s.namespace)},_getPosition:function(b,c){var a=b,d,f=0,j=0;c||(c=e(e(this.s.dt.table().node())[0].offsetParent));do{var h=a.offsetTop,i=a.offsetLeft;d=e(a.offsetParent);f+=h+1*parseInt(d.css("border-top-width"));j+=i+1*parseInt(d.css("border-left-width"));
if("body"===a.nodeName.toLowerCase())break;a=d.get(0)}while(d.get(0)!==c.get(0));return{top:f,left:j}},_mousedown:function(b){var c=this,a=this.s.dt;this.dom.start=this.dom.attachedTo;this.s.start={row:a.rows({page:"current"}).nodes().indexOf(e(this.dom.start).parent()[0]),column:e(this.dom.start).index()};e(i.body).on("mousemove.autoFill",function(a){c._mousemove(a)}).on("mouseup.autoFill",function(a){c._mouseup(a)});var d=this.dom.select,a=e(a.table().node()).offsetParent();d.top.appendTo(a);d.left.appendTo(a);
d.right.appendTo(a);d.bottom.appendTo(a);this._drawSelection(this.dom.start,b);this.dom.handle.css("display","none");b=this.dom.dtScroll;this.s.scroll={windowHeight:e(g).height(),windowWidth:e(g).width(),dtTop:b?b.offset().top:null,dtLeft:b?b.offset().left:null,dtHeight:b?b.outerHeight():null,dtWidth:b?b.outerWidth():null}},_mousemove:function(b){var c=b.target.nodeName.toLowerCase();"td"!==c&&"th"!==c||(this._drawSelection(b.target,b),this._shiftScroll(b))},_mouseup:function(b){e(i.body).off(".autoFill");
var c=this,a=this.s.dt,d=this.dom.select;d.top.remove();d.left.remove();d.right.remove();d.bottom.remove();this.dom.handle.css("display","block");var d=this.s.start,f=this.s.end;if(!(d.row===f.row&&d.column===f.column)){var j=a.cell(":eq("+d.row+")",d.column+":visible",{page:"current"});if(e("div.DTE",j.node()).length){var h=a.editor();h.on("submitSuccess.dtaf close.dtaf",function(){h.off(".dtaf");setTimeout(function(){c._mouseup(b)},100)}).on("submitComplete.dtaf preSubmitCancelled.dtaf close.dtaf",
function(){h.off(".dtaf")});h.submit()}else{for(var g=this._range(d.row,f.row),d=this._range(d.column,f.column),f=[],k=a.settings()[0],l=k.aoColumns,n=a.columns(this.c.columns).indexes(),m=0;m<g.length;m++)f.push(e.map(d,function(b){var c=a.row(":eq("+g[m]+")",{page:"current"}),b=a.cell(c.index(),b+":visible"),c=b.data(),d=b.index(),f=l[d.column].editField;f!==r&&(c=k.oApi._fnGetObjectDataFn(f)(a.row(d.row).data()));if(-1!==n.indexOf(d.column))return{cell:b,data:c,label:b.data(),index:d}}));this._actionSelector(f);
clearInterval(this.s.scrollInterval);this.s.scrollInterval=null}}},_range:function(b,c){var a=[],d;if(b<=c)for(d=b;d<=c;d++)a.push(d);else for(d=b;d>=c;d--)a.push(d);return a},_shiftScroll:function(b){var c=this,a=this.s.scroll,d=!1,f=b.pageY-i.body.scrollTop,e=b.pageX-i.body.scrollLeft,h,g,k,l;65>f?h=-5:f>a.windowHeight-65&&(h=5);65>e?g=-5:e>a.windowWidth-65&&(g=5);null!==a.dtTop&&b.pageY<a.dtTop+65?k=-5:null!==a.dtTop&&b.pageY>a.dtTop+a.dtHeight-65&&(k=5);null!==a.dtLeft&&b.pageX<a.dtLeft+65?l=
-5:null!==a.dtLeft&&b.pageX>a.dtLeft+a.dtWidth-65&&(l=5);h||g||k||l?(a.windowVert=h,a.windowHoriz=g,a.dtVert=k,a.dtHoriz=l,d=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null);!this.s.scrollInterval&&d&&(this.s.scrollInterval=setInterval(function(){if(a.windowVert)i.body.scrollTop=i.body.scrollTop+a.windowVert;if(a.windowHoriz)i.body.scrollLeft=i.body.scrollLeft+a.windowHoriz;if(a.dtVert||a.dtHoriz){var b=c.dom.dtScroll[0];if(a.dtVert)b.scrollTop=b.scrollTop+
a.dtVert;if(a.dtHoriz)b.scrollLeft=b.scrollLeft+a.dtHoriz}},20))},_update:function(b,c){if(!1!==b){var a=this.s.dt,d,f=a.columns(this.c.columns).indexes();this._emitEvent("preAutoFill",[a,c]);this._editor(c);if(null!==this.c.update?this.c.update:!this.c.editor){for(var e=0,h=c.length;e<h;e++)for(var g=0,i=c[e].length;g<i;g++)d=c[e][g],-1!==f.indexOf(d.index.column)&&d.cell.data(d.set);a.draw(!1)}this._emitEvent("autoFill",[a,c])}}});k.actions={increment:{available:function(b,c){var a=c[0][0].label;
return!isNaN(a-parseFloat(a))},option:function(b){return b.i18n("autoFill.increment",'Increment / decrement each cell by: <input type="number" value="1">')},execute:function(b,c,a){for(var b=1*c[0][0].data,a=1*e("input",a).val(),d=0,f=c.length;d<f;d++)for(var j=0,g=c[d].length;j<g;j++)c[d][j].set=b,b+=a}},fill:{available:function(){return!0},option:function(b,c){return b.i18n("autoFill.fill","Fill all cells with <i>"+c[0][0].label+"</i>")},execute:function(b,c){for(var a=c[0][0].data,d=0,f=c.length;d<
f;d++)for(var e=0,g=c[d].length;e<g;e++)c[d][e].set=a}},fillHorizontal:{available:function(b,c){return 1<c.length&&1<c[0].length},option:function(b){return b.i18n("autoFill.fillHorizontal","Fill cells horizontally")},execute:function(b,c){for(var a=0,d=c.length;a<d;a++)for(var f=0,e=c[a].length;f<e;f++)c[a][f].set=c[a][0].data}},fillVertical:{available:function(b,c){return 1<c.length},option:function(b){return b.i18n("autoFill.fillVertical","Fill cells vertically")},execute:function(b,c){for(var a=
0,d=c.length;a<d;a++)for(var e=0,g=c[a].length;e<g;e++)c[a][e].set=c[0][e].data}},cancel:{available:function(){return!1},option:function(b){return b.i18n("autoFill.cancel","Cancel")},execute:function(){return!1}}};k.version="2.3.5";k.defaults={alwaysAsk:!1,focus:null,columns:"",enable:!0,update:null,editor:null,vertical:!0,horizontal:!0};k.classes={btn:"btn"};var m=e.fn.dataTable.Api;m.register("autoFill()",function(){return this});m.register("autoFill().enabled()",function(){var b=this.context[0];
return b.autoFill?b.autoFill.enabled():!1});m.register("autoFill().enable()",function(b){return this.iterator("table",function(c){c.autoFill&&c.autoFill.enable(b)})});m.register("autoFill().disable()",function(){return this.iterator("table",function(b){b.autoFill&&b.autoFill.disable()})});e(i).on("preInit.dt.autofill",function(b,c){if("dt"===b.namespace){var a=c.oInit.autoFill,d=l.defaults.autoFill;if(a||d)d=e.extend({},a,d),!1!==a&&new k(c,d)}});l.AutoFill=k;return l.AutoFill=k});
