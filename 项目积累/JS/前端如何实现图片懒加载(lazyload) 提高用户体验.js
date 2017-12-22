定义
图片懒加载又称图片延时加载、惰性加载，即在用户需要使用图片的时候加载，这样可以减少请求，节省带宽，
提高页面加载速度，相对的，也能减少服务器压力。
惰性加载是程序人性化的一种体现，提高用户体验，防止一次性加载大量数据，而是根据用户需要进行资源的请求。
实现
懒加载的难点在于确定某张图片是否是用户需要的资源，在浏览器中，用户需要的是可视区内的资源，
因此我们只需要判断图片是否已经呈现在可视区内，当图片呈现在可视区内时，
获取图片的真实地址并赋给该图片即可(图片宽高需要指定，可以利用padding处理)。
判断是否存在于可视区
浏览器视口高度
待加载资源距离视口顶端位置
通过以上两点即可判断图片是否位于可视区内。
var nodes = document.querySelectorAll('img[data-src]'),
    elem = nodes[0],
    rect = elem.getBoundingClientRect(),
    vpHeight = document.documentElement.clientHeight;
if(rect.top < vpHeight && rect.bottom>=0) {
  console.log('show')
}
之后获取图片的真实地址
<img src="loading.gif" alt="" data-src="1.gif">
...
  
<script>
    var src = elem.dataset.src;
</script>
把真实地址赋给图片
var img = new Image();
img.onload = function(){
  elem.src = img.src;
}
img.src = src;
完整代码
var scrollElement = document.querySelector('.page'),
    viewH = document.documentElement.clientHeight;
  
function lazyload(){
  var nodes = document.querySelectorAll('img[data-src]');
  
  Array.prototype.forEach.call(nodes,function(item,index){
    var rect;
    if(item.dataset.src==='') return;
  
    rect = item.getBoundingClientRect();
  
    if(rect.bottom>=0 && rect.top < viewH){
        (function(item){
          var img = new Image();
          img.onload = function(){
            item.src = img.src;
          }
          img.src = item.dataset.src
          item.dataset.src = ''
        })(item)
    }
  })
}
  
lazyload();
  
scrollElement.addEventListener('scroll',throttle(lazyload,500,1000));
  
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
原文链接 ：http://mp.weixin.qq.com/s/W8qAWARdyacrTW07NBPXFA