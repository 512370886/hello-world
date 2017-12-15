前言
最开始接触箭头函数的时候，都是听到别人说”使用箭头函数的话就不需要绑定this，因为它会自动绑定的“，如今深入了解了一下该特性貌似上面的话只对了一半。
什么是箭头函数
箭头函数相对于以前的函数表达式有着更加简洁的语法，最重要的是它不会绑定自己的this、arguments、super或者new.target。换句话说就是箭头函数不像函数表达式那样，有自己的this值，在箭头函数内部的this值总是继承自它的封闭的上下文环境。举一个最经典的例子：
function Animal(name, type){
  this.name = name;
  this.type = type;
  setTimeout(function(){
    console.log("my name is " + this.name);
  }, 1000)
}
 
var dog = new Animal('wangwang', 'dog');
此时因为在setTimeout里面的function是一个独立的作用域，并且该作用域还是属于windows的，所以这样的话你的this.name将是undefined的。
现在使用箭头函数的话只需要改写一下即可让this继承它的封闭作用域，也就是Animal这个封闭的上下文环境：
function Animal(name, type){
  this.name = name;
  this.type = type;
  setTimeout(() => {
    console.log("my name is " + this.name);
  }, 1000)
}
 
var dog = new Animal('wangwang', 'dog');
因为this没有在箭头函数中绑定，call()或者apply()方法只能用来传递参数，对于this参数是直接忽略的。
用法
使用很简单，在此借用MDN上的定义：
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// equivalent to: (param1, param2, …, paramN) => { return expression; }
 
// Parentheses are optional when there's only one parameter:
(singleParam) => { statements }
singleParam => { statements }
 
// A function with no parameters requires parentheses:
() => { statements }
() => expression // equivalent to: () => { return expression; }
值得注意的一点是：如果你想返回一个空对象，那么请将圆括号将空对象包起来，否则会报错，因为箭头函数默认的大括号是作为函数体的起始和结束标志。诸如：
var chewToys = puppies.map(puppy => {});   // BUG!
var chewToys = puppies.map(puppy => ({})); // ok
如果你直接返回一个表达式，那么是不需要加大括号的，如上面的例子中的第二行。
arguments的绑定问题
与this指针一样的还有arguments对象的问题，在箭头函数内部使用arguments对象的时候，实际上使用的是包裹它的作用域的arguments对象，比如：
function foo() {
  var f = (i) => arguments[0]+i; // foo's implicit arguments binding
  return f(2);
}
 
foo(1); // 3
上面例子中的arguments对象实际上用的是foo函数中的arguments对象。
使用注意事项
返回对象字面量记得外面加一个大括号： => ({})
箭头函数在参数和箭头之间不允许存在换行
箭头不是一个操作符，但是在与别的操作符(比如||、&)在一起使用的时候记得将你的箭头函数用大括号括起来以让解析器能够正确解析：value || (=> ({}))
箭头函数不能作为构造函数使用，并且在执行new操作的时候会抛出错误
什么时候不要用箭头函数
方法中使用箭头函数
在MDN中说过箭头函数适合那些非方法的函数，因此当你将其作为方法的时候会出错，比如：
var calculate = {  
  array: [1, 2, 3],
  sum: () => {
    console.log(this === window); // => true
    return this.array.reduce((result, item) => result + item);
  }
};
console.log(this === window); // => true  
// Throws "TypeError: Cannot read property 'reduce' of undefined"
calculate.sum();
因为创建这样的一个对象字面量后，该对象属于windows的(在浏览器环境下)，然后你使用箭头函数的时候this自然继承自calculate的this，所以会出现上面的结果。
所以改为：
var calculate = {  
  array: [1, 2, 3],
  sum() {
    console.log(this === calculate); // => true
    return this.array.reduce((result, item) => result + item);
  }
};
calculate.sum(); // => 6
因为如果我们使用.或者[]调用一个作为对象的属性的方法的时候，this总是指向其函数体的父对象也就是刚才例子的calculate)，在这里我们不得不提一下this的四种含义：
除了上面说的第一种规则还有如下3个规则：
默认，this指向全局对象比如windows；
当一个函数使用new操作符调用的时候，在函数内部的this指向了新建的对象
当一个函数使用call或apply的时候，this就指向这两个函数传递的第一个参数。如果第一个参数为null或者不是对象，那么this又被指向了全局对象
除了作为对象字面量的方法会出错之外，还有可能作为原型方法，其错误的本质也是一样样的。
动态上下文的回调函数使用箭头函数
因为this的存在导致JS具有非常大的灵活性，在不同的场合下this指向不同的对象，因此便有了题目中说的动态上下文环境。因为在调用发生的时候上下文环境一般就是目标对象。
但是箭头函数在声明的时候静态绑定了上下文并且不可能动态地改变。所以便有如下的问题发生：
var button = document.getElementById('myButton');  
button.addEventListener('click', () => {  
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
在声明的时候箭头函数已经绑定到了全局对象上也就是windows，当点击事件触发的时候，因为不能动态改变，所以this.innerHTML就等价于windows.innerHTML。所以这个时候你还得使用function表达式。
参考
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
https://rainsoft.io/when-not-to-use-arrow-functions-in-javascript/
https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/
原文链接：http://blog.5udou.cn/blog/ES6Xue-Xi-Zhi-Jian-Tou-Han-Shu-70
