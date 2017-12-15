创建元素节点
原生JS创建元素节点
document.createElement("p");
jQuery创建元素节点
$('<p></p>');`
创建并添加文本节点
原生JS创建文本节点
document.createTextNode("Text Content");
通常创建文本节点和创建元素节点配合使用，比如：
var textEl = document.createTextNode("Hello World.");
var pEl = document.createElement("p");
pEl.appendChild(textEl);
jQuery创建并添加文本节点
var $p = $('<p>Hello World.</p>');
复制节点
原生JS复制节点
var newEl = pEl.cloneNode(true); 
true和false的区别：
true ：克隆整个'<p>Hello World.</p>’节点
false：只克隆'<p></p>’ ，不克隆文本Hello World.’
jQuery复制节点
$newEl = $('#pEl').clone(true);
注意：克隆节点要避免`ID重复
插入节点
原生JS向子节点列表的末尾添加新的子节点
El.appendChild(newNode);
原生JS在节点的已有子节点之前插入一个新的子节点：
El.insertBefore(newNode, targetNode);
在jQuery中，插入节点的方法比原生JS多的多
在匹配元素子节点列表结尾添加内容
$('#El').append('<p>Hello World.</p>');
把匹配元素添加到目标元素子节点列表结尾
$('<p>Hello World.</p>').appendTo('#El');
在匹配元素子节点列表开头添加内容
$('#El').prepend('<p>Hello World.</p>');
把匹配元素添加到目标元素子节点列表开头
$('<p>Hello World.</p>').prependTo('#El');
在匹配元素之前添加目标内容
$('#El').before('<p>Hello World.</p>');
把匹配元素添加到目标元素之前
$('<p>Hello World.</p>').insertBefore('#El');
在匹配元素之后添加目标内容
$('#El').after('<p>Hello World.</p>');
把匹配元素添加到目标元素之后
$('<p>Hello World.</p>').insertAfter('#El');
删除节点
原生JS删除节点
El.parentNode.removeChild(El);
jQuery删除节点
$('#El').remove();
替换节点
原生JS替换节点
El.repalceChild(newNode, oldNode);
注意：oldNode必须是parentEl真实存在的一个子节点
jQuery替换节点
$('p').replaceWith('<p>Hello World.</p>');
设置属性/获取属性
原生JS设置属性/获取属性
imgEl.setAttribute("title", "logo");
imgEl.getAttribute("title");
checkboxEl.checked = true;
checkboxEl.checked;
jQuery设置属性/获取属性
$("#logo").attr({"title": "logo"});
$("#logo").attr("title");
$("#checkbox").prop({"checked": true});
$("#checkbox").prop("checked");
原文地址：http://blog.poetries.top/2017/01/14/js-and-jquery-dom-compare/