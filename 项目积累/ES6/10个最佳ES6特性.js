原文: Top 10 ES6 Features Every Busy JavaScript Developer Must Know
译者: Fundebug
为了保证可读性，本文采用意译而非直译，并且对源代码进行了大量修改。另外，本文版权归原作者所有，翻译仅用于学习。
ES6，正式名称是ECMAScript2015，但是ES6这个名称更加简洁。ES6已经不再是JavaScript最新的标准，但是它已经广泛用于编程实践中。如果你还没用过ES6，现在还不算太晚…
下面是10个ES6最佳特性，排名不分先后：
函数参数默认值
模板字符串
多行字符串
解构赋值
对象属性简写
箭头函数
Promise
Let与Const
类
模块化
函数参数默认值
不使用ES6
为函数的参数设置默认值：
function foo(height, color)
{
    var height = height || 50;
    var color = color || 'red';
    //...
}
这样写一般没问题，但是，当参数的布尔值为false时，是会出事情的！比如，我们这样调用foo函数：
foo(0, "", "")
因为0的布尔值为false，这样height的取值将是50。同理color的取值为‘red’。
使用ES6
function foo(height = 50, color = 'red')
{
    // ...
}
模板字符串
不使用ES6
使用+号将变量拼接为字符串：
var name = 'Your name is ' + first + ' ' + last + '.'
使用ES6
将变量放在大括号之中：
var name = `Your name is ${first} ${last}.`
ES6的写法更加简洁、直观。
多行字符串
不使用ES6
使用“\n\t”将多行字符串拼接起来：
var roadPoem = 'Then took the other, as just as fair,\n\t'
    + 'And having perhaps the better claim\n\t'
    + 'Because it was grassy and wanted wear,\n\t'
    + 'Though as for that the passing there\n\t'
    + 'Had worn them really about the same,\n\t'
使用ES6
将多行字符串放在反引号“之间就好了：
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`
解构赋值
不使用ES6
当需要获取某个对象的属性值时，需要单独获取：
var data = $('body').data(); // data有house和mouse属性
var house = data.house;
var mouse = data.mouse;
使用ES6
一次性获取对象的子属性：
var { house, mouse} = $('body').data()
对于数组也是一样的：
var [col1, col2]  = $('.column')；
对象属性简写
不使用ES6
对象中必须包含属性和值，显得非常多余：
var bar = 'bar';
var foo = function ()
{
    // ...
}
var baz = {
  bar: bar,
  foo: foo
};
使用ES6
对象中直接写变量，非常简单：
var bar = 'bar';
var foo = function ()
{
    // ...
}
var baz = { bar, foo };
箭头函数
不使用ES6
普通函数体内的this，指向调用时所在的对象。
function foo() 
{
    console.log(this.id);
}
var id = 1;
foo(); // 输出1
foo.call({ id: 2 }); // 输出2
使用ES6
箭头函数体内的this，就是定义时所在的对象，而不是调用时所在的对象。
var foo = () => {
  console.log(this.id);
}
var id = 1;
foo(); // 输出1
foo.call({ id: 2 }); // 输出1
Promise
不使用ES6
嵌套两个setTimeout回调函数：
setTimeout(function()
{
    console.log('Hello'); // 1秒后输出"Hello"
    setTimeout(function()
    {
        console.log('Fundebug'); // 2秒后输出"Fundebug"
    }, 1000);
}, 1000);
使用ES6
使用两个then是异步编程串行化，避免了回调地狱：
var wait1000 = new Promise(function(resolve, reject)
{
    setTimeout(resolve, 1000);
});
wait1000
    .then(function()
    {
        console.log("Hello"); // 1秒后输出"Hello"
        return wait1000;
    })
    .then(function()
    {
        console.log("Fundebug"); // 2秒后输出"Fundebug"
    });
Let与Const
使用Var
var定义的变量未函数级作用域：
{
  var a = 10;
}
console.log(a); // 输出10
使用let与const
let定义的变量为块级作用域，因此会报错：(如果你希望实时监控JavaScript应用的错误，欢迎免费使用Fundebug)
{
  let a = 10;
}
console.log(a); // 报错“ReferenceError: a is not defined”
const与let一样，也是块级作用域。
类
不使用ES6
使用构造函数创建对象：
function Point(x, y)
{
    this.x = x;
    this.y = y;
    this.add = function()
    {
        return this.x + this.y;
    };
}
var p = new Point(1, 2);
console.log(p.add()); // 输出3
使用ES6
使用Class定义类，更加规范，且你能够继承：
class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    add()
    {
        return this.x + this.y;
    }
}
var p = new Point(1, 2);
console.log(p.add()); // 输出3
模块化
JavaScript一直没有官方的模块化解决方案，开发者在实践中主要采用CommonJS和AMD规范。而ES6制定了模块(Module)功能。
不使用ES6
Node.js采用CommenJS规范实现了模块化，而前端也可以采用，只是在部署时需要使用Browserify等工具打包。这里不妨介绍一下CommenJS规范。
module.js中使用module.exports导出port变量和getAccounts函数：
module.exports = {
  port: 3000,
  getAccounts: function() {
    ...
  }
}
main.js中使用require导入module.js：
var service = require('module.js')
console.log(service.port) // 输出3000
使用ES6
ES6中使用export与import关键词实现模块化。
module.js中使用export导出port变量和getAccounts函数：
export var port = 3000
export function getAccounts(url) {
  ...
}
main.js中使用import导入module.js，可以指定需要导入的变量：
import {port, getAccounts} from 'module'
console.log(port) // 输出3000
也可以将全部变量导入：
import * as service from 'module'
console.log(service.port) // 3000
参考链接
ES6/ECMAScript2015 Cheatsheet(PDF)
Understanding ECMAScript 6
Exploring ES6
ECMAScript 6 入门
Javascript的this用法

原文链接：https://blog.fundebug.com/2017/08/21/10-best-es6-feature/