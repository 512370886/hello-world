前言
本文是自己vue项目实践中的一些总结，针对Vue2及相关技术栈，实践中版本为2.3.3。
开发前须知
vue-cli
在开发前，我们要至少通读一遍vue官方文档和API(看官方文档是最重要的，胜过看五十、一百篇博客),英文阅读能力还行的建议阅读英文文档，中文文档内容会稍落后，还要通读相关的vue-router、axios、vuex等。
一般来说我们都是先利用vue-cli来搭建项目基本架构。
vue-cli官方temaplte地址，我们选择webpack版本，建议看看其文档vue-webpack-boilerplate了解基本用法和项目配置等。
深入地了解vue-cli的webpack配置请查看vue-cli#2.0 webpack 配置分析
打造团队的脚手架
vue-cli虽然强大，但是它有很多个步骤要我们去选择配置，而实际上公司业务很多配置是固定的，比如我们公司规定了要安装vue-router、要使用Standard风格Eslint等，还规定了必须使用sass，这样在vue-cli配置完成后还必须要npm install node-sass和sass-loader，还有axios等也是一定要安装的。所以不应该每次新建一个项目都去一步步选择vue-cli的那些配置然后还要去安装sass等，应该在vue-cli基础上根据公司自身的情况打造团队的脚手架，只需运行脚手架，就可以初始化整个项目。
目录结构
建议在src/目录增加views或pages目录来存放对应路由的组件，添加api目录，根据项目情况增加filters、vuex等目录。components目录存放公共组件或者全局组件。每个组件目录可以将图片等资源放在一起。组件的子组件目录建议命名为children放在父组件目录下。如home组件目录为home/home.vue，子组件banner路径为home/chldren/banner/banner.vue。
静态资源处理
vue-webpack-boilerplate文档中有静态资源处理的详细说明，但发现还有很多人都不知道，因此在这里稍微提一下。
vue-webpack-boilerplate的项目结构中，我们有静态资源两个目录：src/assets和static/
assets目录中的文件会被webpack处理，只支持相对路径形式，assets/logo.png会被编译为./assets/logo.png，不支持/assets/logo.png
在js中，我们可以这样获取文件资源路径
require('./assets/logo.png')
以下带~前缀类似require效果
<img src="~assets/logo.png">
static目录中的静态资源不会被webpack处理，这里适合放一些外部不需要webpack处理的资源，build后的静态资源都会被放进这个目录。
vue组件化
关于vue组件化，360奇舞团前端工程师钟恒的pptVue.js实践 如何使用Vue2.0开发富交互式WEB应用写得非常好，本节内容也是出自其中。ppt中提到组件化带来的新问题：通信、复用、耦合，以及如何解决。
通信
1）props和events：props down，events up
2）函数调用：this.refs
3）组件树: $parent.$parent
4）共享state
5）eventbus
6）vue技术栈之外的如localstorage等
复用
1）冗余：if、else if、else判断执行不同的代码
if(this.type === 'editing') {
  // some editing code
} else if(this.type === 'preview') {
  // some preview code
} else if(this.type === 'present') {
  // some present code
} else {
  // some base code
}
2）包装：slots
// plugin-page.vue
<div>
  <slot name="page">
    i am a page
  </slot>
</div>
 
// present-plugin-page.vue
<div class="PresetPluginPage">
  <plugin-page ref="page">
    <h1 slot="page">
      i am a present page
    </h1>
  </plugin-page>
</div>
 
//output
<div class="PresetPluginPage">
  <div>
    <h1>
      i am a present page
    </h1>
  </div>
</div>
3）继承：mixins
// define a mixin object
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// define a component that uses this mixin
var Component = Vue.extend({
  mixins: [myMixin]
})
var component = new Component() 
// -> "hello from mixin!"
组件耦合
1）组件耦合带来的问题：
单组件修改困难
组合新组件困难
组件debug困难
2）解耦
解耦的本质就是将变化分离
一、组件功能单一
// wrong
<control-input type="number"></control-input>
// right
<control-number></control-number>
二、采用稳定的接口
// wrong
this.$parent.$parent.$refs['resource-image'].open()
// right
bus.$emit('open-resource-image')
三、处理好共享的部分
bindEvents (remove) {
  let method = remove
    ? 'removeEventListener'
    : 'addEventListener'
  window[method]('resize', this.handleResize)
}
3）与服务端解耦
this.$http.get('/user/detail')
.then(({body}) => {
  this.user = JSON.parse(body).data
}, err => {
  console.error(err)
})
 
user.detail().then(detail => this.detail = detail)
1、服务端与前端体系不一
2、同步异步转换
3、多服务端/跨域的代码
4、统一的错误处理代码
vuex使用中的一些注意事项
1）不要滥用vuex
使用Vuex并不意味着你需要将所有的状态放入Vuex。虽然将所有的状态放到Vuex会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。
2）最好在根实例中注册store选项，该store实例会注入到根组件下的所有子组件中，子组件可以通过this.$store访问，当状态较多时使用建议mapState辅助函数。
3）polyfill
本次项目中使用了vuex，因此为兼容IE9等低版本，须引入promise的polyfill–es6-promise。npm install后在main.js：
import 'es6-promise/auto'
开发中的常见问题
引入axios
为了和后端进行数据交互，我们一般引入axios库。在main.js中如下将其加入vue的原型中，这样可以在组件中通过this.$http来获取axios：
Object.defineProperty(Vue.prototype, '$http', { value: axios })
// 或者 Object.defineProperty(Vue.prototype, '$axios', { value: axios })
这次实践中未采用这种做法，而是创建了一个getData.js进行了统一管理：
import axios from 'axios'
 
const getSomething = (param1，param2) => axios.get(url，{
  params: {
    param1: param1,
    param2: param2
  }
})
 
export {
  getSomething
}
在单文件组件中import getSomething方法再进行调用即可。
引入iconfont
直接在main.js中import你下载的iconfont.css即可
js中判断环境
常见的需求是开发环境须console，而线上环境不可以console。默认环境有’development’、’production’、’testing’三种。
if (process.env.NODE_ENV !== 'production') {
  console.log(data)
}
设置数据模拟请求Mock
数据模拟请求利用了mock.js,配置文档，不过这个只是简单的数据模拟，没有生成文档的功，更全面的文档、Mock.js、可视化、Rest、接口过渡、文档修改提醒、支持本地部署等功能可以使用阿里RAP。
npm install mockjs安装后，可在/src/api目录下新建data.js，引入mockjs，后可在程序入口或api入口根据开发环境来引入data.js，下面是几个示例：
import Mock from 'mockjs'
let data = Mock.mock({
  'list|1-10': [{
      'id|+1': 1
  }]
}) // mock一个数据
console.log(JSON.stringify(data, null, 4))
 
import Mock from 'mockjs'
Mock.setup({ timeout: '300‐500' })
Mock.mock(/\/login/, { code: 0 }) // 拦截login请求，返回对象{ code: 0 }
 
import Mock from 'mockjs'
Mock.setup({ timeout: '300‐500' })
Mock.mock(sitemap.cms.banners, {
  results: []
}) // 拦截sitemap中cms.banners请求，返回对象{ results: [] }
seo
可以使用服务端渲染或者预渲染，预渲染webpack插件github地址。
Webpack
实际项目中还是不可避免地要修改webpack配置，如果不知道怎么改的话就去查看webpack的配置分析去进行修改。
配置全局变量
要设置全局变量可以在build中的webpack.base.conf.js中配置externals，与module同级：
externals: {
  sitemap: 'sitemap'
}   
然后在eslinttrc.js的module.exports添加这样一个配置：
globals: {
  'sitemap': false
}
根据环境的不同加载不同的js
在这个项目中要根据环境（开发环境、测试环境、生产环境）的不同加载不同的sitemap.js，这个sitemap.js会暴露出一个全局的sitemap变量，sitemap变量是个由api地址构成的json对象。利用HtmlWebpackPlugin插件的option选项来实现。
在index.html中这样写：
<script src="<%= htmlWebpackPlugin.options.src %>"></script>
然后在build中的各自conf.js的HtmlWebpackPlugin设置不同的src，如在开发环境中添加src那一行：
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  src: '//dev.example.com/api/sitemap.js',
  inject: true
})
配置alias（别名）
在webpack.base.conf.js，vue-cli已经默认配置好了src目录的别名为@，建议配置src下一级目录的别名，这样能减少重复书写也更美观，如下添加src、pages、components别名：
resolve: {
  extensions: ['.js', '.vue', '.json'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'src': resolve('src'),
    'pages': path.resolve(__dirname, '../src/pages'),
    'components': path.resolve(__dirname, '../src/components')
  }
}
图片压缩
可以使用webpack插件image-webpack-loader来压缩处理图片。
多页面
实际就是添加多个入口js然后再修改相应配置，网上资料很多，一搜就知道了。
eslint
我们有时候需要关闭某些代码检查，具体配置参见Configuring ESLint – ESLint中文，下面是常见的两个：
1）关闭eslint
/* eslint-disable */
 
alert('foo')
 
/* eslint-enable */
2）关闭禁止new
/* eslint-disable no-new */
优化和其他
优化
1）由于vue的追踪对象变化原理基于使用Object.defineProperty，在处理大量数据并且不需要追踪对象变化时，可通过Object.freeze(data)冻结对象达到优化数据渲染处理
2）vue-router路由懒加载。当打包构建应用时，javascript包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
其他
1）使用表驱动法来注册全局filter、指令等，如在src下新建filters目录，index.js中import所有全局过滤器:
import milliFormat from './milliFormat'
import reverse from './reverse'
 
export default {
  milliFormat,
  reverse
}
然后在main.js中注册
import commonFiltes from './filters/index'
 
Object.keys(commonFiltes).forEach(key => Vue.filter(key, commonFiltes[key]))
2）对于一些强耦合的组件如collapse和collapse-item，可以使用$parent和$children来进行通信，没必要像elementUI一样自己实现组件的broadcast和dispatch，我还发现有UI库竟然是使用bus来通信的，这样导致同一个页面要是有两个collapse，就会互相影响。
3）在根组件上注册公共过滤器后，除了在“Mustache”语法中使用，还可在组件中通过this.$root.$options.filters.datetime(data)获取datetime过滤器。
打包上线
优化分析
npm run build –report进行打包大小分析，可视化地看到有什么地方需要优化。
测试build后的文件
build成功后有个tip提示你build后的文件需要部署在http服务器上，不能通过file协议打开。
我们可以通过node-static来启动服务。可以写一个js配置文件通过node来启动，或者CLI中输入static dist(先安装node-static)：
$ static dist
serving "dist" at http://127.0.0.1:8080
更多如设置端口等请点击上面的链接查看文档。
后语
本文最重要的是文章中给出的一些链接，尤其是开发前须知章节中的链接，最好点进去通读一下。
原文地址：http://www.cnblogs.com/ang-/p/7082202.html