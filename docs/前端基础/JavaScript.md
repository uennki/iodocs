# JavaScript

该篇幅将主要讨论在 JS 学习过程中的难点，比如常见的变量类型，类型转换， this，作用域，闭包，原型和原型链等相关内容。

## 变量类型和计算

### 变量类型

JS 的变量类型分为两大类：值类型(也叫基本类型) 和 引用类型。

基本类型有 6 种： `null` ， `undefined` ， `boolean` ， `number` ，`string` ， `symbol` (ES6新增)。

```js
let a = null
let b = undefined
let c = true
let d = 9
let e = 'hello'
let f = Symbol()
```

引用类型有 3 种： 对象，数组，函数

```js
let obj = {}
let arr = []
let fn  = function(){}
```

这两大类型最鲜明的特点就是变量存储的位置不一样。

- 基本类型存放在栈内
- 引用类型存放在堆内，通过指针指向
  
所以当我们需要对一个引用类型执行拷贝时，需分情况选择浅拷贝还是深拷贝。

### typeof

通过 `typeof` 运算符可以进行变量类型的判断。

```js
typeof undefined     // undefined
typeof 'hello'       // string
typeof 9             // number
typeof true          // boolean
typeof {}            // object
typeof []            // object
typeof null          // object
typeof console.log   // function
```

但是 `typeof` 的功能有限，它无法正确区分出对象和数组以及 `null`。（ null 判断为 object 其实是一个历史遗留的 BUG ）

如果我们想获取一个变量的正确类型，推荐使用如下方法：

```js
let a = ''

Object.prototype.toString.call(a)
```

### 强制类型转换

一般在如下 4 种情况下，会发生强制类型转换：

- 字符串拼接
- `==` 运算符
- if 语句
- 逻辑运算

```js
console.log('hello' + 10); // 打印 'hello10'
console.log(5 == '5' ? true : false); // 打印 true

if ('') {
  console.log('hello'); // 空
}

console.log('' || 456); // 打印 456
```

::: tip
在进行条件判断时，除了 `undefined` ，  `null` ， `false` ， `''` ， `NaN` ， `0` ， `-0` 会转换成 false 以外，其他所有值都会转换成 true 。
:::

### == 操作符 和 === 操作符

关于两者的区别：

- `==`  仅判断值是否相等
- `===` 判断值和类型是否相等

通常情况下，我们一致建议使用 `===` 操作符来进行相等判断。

但是当我们想判断一个值是否等于 `null` 或者 `undefined` 时可以使用 `==`。

```js
if (obj.a == null) {
  // 这里相当于 obj.a === null || obj.a === undefined
  // 这也是 jquery 源码中推荐的写法
}
```

### JSON

关于 JSON 我们一定知道它是一种数据格式，但是在 JS 中它还有一个身份——对象。

作为对象它有两个自己的方法：

```js
JSON.stringify({ a : 10 })
JSON.pares('{ "a" : "10" }')
```

## 原型和原型链

### 原型

首先来看一张图，建议可以搭配这张图去加深印象。

![GitHub](/_proto_.png)

同时先铺垫几点前置知识：

- 所有的引用类型，都具有对象的特性，既可以自由扩展属性（除了 `null` 以外）
- 所有的引用类型都有 `__proto__` 属性，属性值是一个普通对象（隐式原型）
- 所有的函数都有 `prototype` 属性，属性值也是一个普通对象（显示原型）
- 所有引用类型的 `__proto__` 属性值，指向它的构造函数的 `prototype` 属性值

```js
let obj = {}
obj.a   = 100

let arr = []
arr.a   = 100

function fn()
fn.a    = 100

console.log(obj.__proto__)
console.log(arr.__proto__)
console.log(fn.__proto__)

console.log(fn.prototype)

console.log(obj.__proto__ === Object.prototype) // true
```

### 原型链

当我们试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 `__proto__` （即它构造函数的 `prototype` ）中进行寻找。

``` js{19}
// 构造函数
function Foo(name) {
  this.name = name
}

// 构造函数的原型
Foo.prototype.alertName = function () {
  console.log(this.name)
}

// 实例对象
let student = new Foo('小明')
student.printName = function () {
  console.log(this.name);
}

student.printName() // 打印小明
student.alertName() // 打印小明
student.toString()  // 要去 student.__proto__.__proto__ 中查找
```

注意上面高亮的代码部分，通过代码我们可以很清楚的看到，我们并没有定义这个叫 `toString()` 的方法，但是实际运行过程中，也成功执行了。那么这个方法哪里来的呢？

其实原理也很简单，根据开头我们说的，自己没有的就去 `__proto__` 中找（不要忘记 `__proto__` 的值就是一个普通对象，它也有自己的 `__proto__` ）。所以这个查找过程会一直持续下去，直到找到该属性（或者方法）。

:::tip
通过 `for in` 可以循环遍历对象的属性（但有个问题，它无法识别属性到底来自对象自身，还是来自原型）。 所以我们可以借助 `obj.hasOwnProperty(xx)` 来进行识别。
:::

### new

讲 `new` 之前，先提一嘴构造函数，它俩基本是一对好基友。其实构造函数本质也就是一个函数而且，只是在写法上与普通函数有细微区别。

```js
function Foo() {}  // 构造函数

function foo() {}  // 普通函数
```

通过 `new` 操作符，我们可以搭配构造函数来生成实例对象。

```js
function Foo() {
  // 第1步：创建一个空对象
  let obj = new Object()
  // 第2步：将空对象的原型，指向构造函数的 prototype 属性
  obj.__proto__ = Foo.prototype
  // 第3步：将构造函数内部的 this ,指向这个空对象
  let result = Foo.apply(obj, arguments)
  // 第4步：返回新对象（加判断: 确保 new 出来的是个对象）
  return typeof result === 'object' ? result : obj  
}

const f = new Foo()
```

以上就是 `new` 过程中构造函数内部发生的故事，简单来说：

- 创建一个空对象
- 将空对象的原型指向构造函数的原型
- 改变构造函数内部 this 指向
- 返回新对象

:::tip
对于实例对象来说，都是通过 `new` 产生的。例如 `let a = {} , 其实就是 let a = new Object()` 的语法糖。大多数创建对象时候，我们更推荐使用字面量的方式（无论性能上还是可读性）。
:::

### instanceof

`instanceof` 可以正确判断对象的类型。该方法的内部实现机制，是通过判断该引用类型的原型链中是否可以找到类型的 `prototype` 。

```js
let arr = []
arr instanceof Array // true

typeof arr // Object， 我们在 typeof 小节中说过，它是无法区分 [] 和 {} 的
```

### 继承

在 ES5 中，我们可以使用如下方式解决继承的问题。该方法主要借助 `Object.create()` 方法，实现的思路就是将子类的原型设置为父类的原型。

```js
function Super() {}
Super.prototype.sayHello = function() {
  console.log('hello');
}

function Sub() {}

Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub

let f = new Sub()
f.sayHello()  // 打印 'hello'
```

而在 ES6 中，由于引入了 `class` 类的概念，所以我们实现继承的方式变得更加简单。

```js
class SuperMan {
  sayHello(){
    console.log('hello');
  }
};

class Sub extends SuperMan {
  constructor() {
    super(); // 调用父类的constructor()
  }
}

let f = new Sub()
f.sayHello() // 打印 'hello'
```

## 作用域和闭包

### 作用域

首先明确一个概念，JS 是没有块级作用域的（这里先不讨论 ES6 的情况）。

作用域（又叫词法环境，它包含了变量，常量，函数等等的定义信息和赋值信息，以及这个区域内代码书写的结构信息等内容）。在 JS 中作用域分2种：

- 全局作用域
- 函数作用域

```js
// 无块级作用域
if (true) {
  var name = '小明'
}
console.log(name) // 小明

// 函数和全局作用域
var a = 100
function fn() {
  var a = 200
  console.log(a)
}
console.log('global', a) // 100
fn() // 200
```

### 执行上下文

执行上下文（EC），在 JS 中来表示代码的不同运行环境。随着代码的执行，可能会进入不同的执行上下文，这些执行上下文就会构成一个**执行上下文栈**（ECS）。

执行上下文分3种：

- 全局执行上下文
- 函数执行上下文
- eval执行上下文

每个执行上下文都有三要素：

- 变量对象（全局环境下是 VO，函数环境下是 AO）
- 作用域链
- this

#### 变量对象

变量对象（VO），包含变量声明，函数声明和函数的形参，该属性只能在全局上下文中访问

```js
var a = 100
function foo(name) {
  var age = 20
}

foo()
```

对于上述的代码来说，在执行栈中存在两个执行上下文：全局执行上下文和函数 `foo` 执行上下文。

```js
stack = [
  fooContext,
  globalContext
]
```

再来看看它们各自执行上下文中的变量对象。

```js
// 全局执行上下文
globalContext.VO = {
  a: undefined,  // 变量声明（初始值为 undefined）
  foo: Function, // 函数声明（若发生命名冲突，则会覆盖）
}
```

```js
// 函数 foo 执行上下文
fooContext.AO = {
  name: undefined,   // 函数参数（若未传入，初始化该形参的值为undefined）
  age: undefined,    // 变量声明（规则同 VO）
  arguments: _array, // 函数声明（规则同 VO）
}

// arguments 是函数独有的对象(箭头函数没有)
// 该对象是一个伪数组，有 `length` 属性且可以通过下标访问元素
// 该对象中的 `callee` 属性代表函数本身
// `caller` 属性代表函数的调用者
```

#### 作用域链

作用域链，可以把它理解成包含自身变量对象和上级变量对象的列表，通过 `[[Scope]]` 属性查找上级变量对象。还是接着上面的代码栗子继续来看

```js
// 函数 foo 上一级的变量对象
fooContext.[[Scope]] = [
    globalContext.VO
]

// 函数 foo 的作用域链 = 函数自身变量对象 + 上一级变量对象
fooContext.Scope = fooContext.AO + fooContext.[[Scope]]
fooContext.Scope = [
    fooContext.AO,
    globalContext.VO
]
```

### this

本来 `this` 应该放在上面的执行上下文小节里一起讨论，但考虑到这块内容比较绕，还是单独拎出来说。首先来看两句话：

- 在全局环境下，`this` 的指向永远是 `window` 对象
- 在函数环境下，`this` 只有在函数被调用时，才会确认指向

关于函数的调用，大体可以分为4种模式：

- 函数模式：作为普通函数被调用，`this` 指向 `window`
- 方法模式：作为对象的方法被调用，`this` 指向调用该函数的对象
- 构造器模式：作为构造函数被调用，`this` 指向生成的实例对象
- 上下文模式：通过 `call / apply / bind` 方法来改变 `this` 指向

```js
var a = 100

// 函数模式
function f() {
  console.log(this.a) // 100
}

// 方法模式
var obj = {
  a: 200,
  f: function() {
    console.log(this.a)
  }
}
obj.f() // 200

// 构造器模式
function Foo() {
  this.a = 300
}
var c = new Foo()
console.log(c.a) // 300

// 上下文模式
obj.f.call({ a: 400 })  // 400
obj.f.apply({ a: 500 }) // 500
```

以上要是都明白了，很多代码中的 this 应该就没什么问题了。 值得补充一点的是，在 ES6 新增的箭头函数中是没有 `this` 的。（它的 `this` 实际是取决于它外面的第一个不是箭头函数的函数的 `this`）

```js
function f() {
  // 函数 f 的 this 指向 window
  return () => {
    console.log(this)
  }
}

f()() // window
```

并且 `this` 一旦绑定了上下文，就不会被任何代码改变。（排除 `call / apply / bind` 的情况）

### 闭包

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

```js
function A() {
  let c = 100
  return function B() {
    console.log(c)
  }
}

const B = A()
B() // 100
```

来看一道很经典的题目，让循环的输出结果为1到5

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000);
}
```

由于 `setTimeout` 是一个异步函数，所以会先把循环全部执行完毕，所以会输出一堆 6。

解决方案1：使用闭包

```js
for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j)
    }, 1000);
  })(i)
}
```

解决方案2：使用 `let`

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000);
}
```

解决方案3：使用 `setTimeout` 的第3个参数

```js
for (let i = 1; i <= 5; i++) {
  setTimeout((j) => {
    console.log(j)
  }, 1000, i);
}
```

## 异步和单线程

JS 语言的一大特点就是单线程。（因为作为浏览器脚本语言，JS 的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题）

### 事件循环机制

单线程又是如何进行异步编程呢？原因其实也很简单，因为**任务队列**和**事件循环**机制的存在。

- 任务队列：任务队列是一个先进先出的队列，它里面存放着各种任务。
- 事件循环：事件循环是指主线程重复从任务队列中获取任务、并执行的过程。

![event-loop](/event-loop.webp)

大体解释一下上图的含义：

- 所有同步任务都在主线程上执行，形成一个执行栈（ECS）
- 所有异步任务的回调结果，都将有序放置在任务队列内
- 等执行栈中的代码执行完毕，再去读取任务队列中的任务，加入执行栈中执行
- 如此循环

### 异步与同步

在 JS 中所有的任务都可以分为两种：同步任务和异步任务。

同步任务简单来说，就是每次只做一个任务，如果有多个任务，则必须排队依次进行。

```js
console.log(100)
alert(200)
console.log(300)
```

以上就是一个简单的同步任务栗子，可以非常明显的看出同步任务的缺陷，一旦某个任务出错或超时，则会阻塞后续任务的进行。

而异步任务，则有效解决了同步任务存在的缺陷，使得 JS 的代码运行更加健壮。

异步任务通常有以下几种使用场景：

- 定时器
- 网络请求
- 事件绑定

来看个简单的异步栗子

```js
console.log(100)

setTimeout(() => {
    console.log(200)
}, 0);

console.log(300)
```

最终的打印结果 100 300 200，虽然定时器的时间设置是 0 ，但是实际上作为一个异步任务，它的执行总是会在当前执行栈中的同步任务全部执行完毕后，再被从任务队列内拿到执行栈内执行。

## 模块化

当项目变得复杂将会存在什么问题：

- 全局变量污染
- 命名冲突
- 依赖不易管理

模块化可以有效解决上述的问题，同时提高了代码的可维护性和复用性。

### CommonJS

`CommonJS` 是 `Node` 独有的规范，用同步的方式来加载模块，浏览器中使用的话需要用到 Browserify 解析。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。

```js
// file a.js
const a = 100

// 推荐方式
module.exports = { a: a }
// 或者
exports.a = a
```

可能大家会有疑惑，`exports` 和 `module.exports` 到底是什么关系。

其实 `exports` 默认指向 `module.exports`。相当于在每个模块头部，有一行这样的命令。

```js
let exports = module.exports;
```

于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

导出模块之后，我们可以使用 `require` 导入需要的模块。

```js
// file b.js
const module = require('./a.js')
console.log(module.a) // 100
```

### AMD

`AMD` 以 `RequireJS` 为代表，它推崇依赖前置的原则，采用异步方式来加载模块。更具体点，是用 `define()` 来定义模块，用 `require()` 来加载模块。

```js
// 定义say.js模块
define(function () {
  let hello = function () {
      console.log('hello')
  }
  return { hello : hello }
})
```

```js
// 引用模块
require(['./say.js'], function(say) {
  say.hello() // 打印 'hello'
});
```

### CMD

`CMD` 以 `SeaJS` 为代表，它的使用与 `AMD` 很类似，但不同点在于它推崇依赖就近，延迟执行的原则。

```js
// 定义模块 math.js
define(function(require, exports, module) {
  let $ = require('jquery.js')
  let add = function(a, b){
      return a + b
  }
  exports.add = add
})
```

```js
// 加载模块
seajs.use(['./math.js'], function(math){
    var sum = math.add(1 + 2)
})
```

### ES6 模块化

从 ES6 开始正式引入了模块化的概念，用简单的 `import` 和 `export` 命令就可以处理模块化。不过，由于 ES6 当前尚未被所有浏览器支持，只能通过 Babel 之类的转译工具来转译。

```js
// 导出模块 profile.js
let firstName = 'Michael'
let lastName = 'Jackson'
let year = 1958

export {firstName, lastName, year}
```

```js
// 导入模块
import {firstName, lastName, year} from './profile.js'

console.log(year) // 1958
```

## 深浅拷贝

先来看个栗子

```js
let a = { age: 10 }
let b = a

a.age = 20
console.log(b.age);
```

从上面的栗子中，很容易发现一个问题：如果给一个变量赋值一个对象，那么两者的值会是同一个引用，其中一方改变，另一方也会相应改变。

通常在开发中我们不希望出现这样的问题，那么就需要通过浅拷贝来解决。

### 浅拷贝

实现方案1：通过 `Object.assign` 方法

```js
let a = { age: 10 }
let b = Object.assign({}, a)

a.age = 20
console.log(b.age) // 10
```

实现方案2：借助 ES6 的展开运算符

```js
let a = { age: 10 }
let b = {...a}

a.age = 20
console.log(b.age)
```

通常情况下，浅拷贝就可以解决大部分问题了，但是如果遇到多层引用的话，那就需要考虑使用深拷贝了。

### 深拷贝

深拷贝中，最简洁的一种方案是通过 `JSON.parse(JSON.stringify(object))` 来实现。

```js
let a = {
  age: 10,
  likes: {
    eat: 'apple'
  }
}

let b = JSON.parse(JSON.stringify(a))
a.likes.eat = 'banana'
console.log(b.likes.eat) // apple
```

但是该方案局限性也十分明显：

- 会忽略 undefined
- 会忽略 symbol
- 不能序列化函数
- 不能解决循环引用的对象

不过大多数情况，这个方案都是十分有效的，毕竟复杂数据都是可以序列化的。（而且后端也不会真的传个函数给你，除非你们不够和睦相处...）

当然如果你的数据中含有以上几种特殊情况，推荐使用 [_lodash 的深拷贝函数](https://lodash.com/docs##cloneDeep)

## 防抖和节流

针对一些会频繁触发的事件如scroll、resize，如果正常绑定事件处理函数的话，有可能在很短的时间内多次连续触发事件，十分影响性能。

因此我们对于这类的事件，需要做防抖或者节流的处理，它们的作用就是用来限制函数的执行频次。

防抖适用场景：

- search搜索联想，用户在不断输入值时，用防抖来节约请求资源
- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

节流适用场景：

- 鼠标不断点击触发，mousedown（单位时间内只触发一次）
- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

### 防抖

防抖原理：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

下面是一个简单的防抖实现。

```js
const debounce = (fn, delay) => {
  // 设置定时器ID
  let timer = null

  return function (args) {
    // 如果定时器存在，则清理
    if(timer) clearTimeout(timer)
    // 重新设置定时器
    timer = setTimeout(() => {
        fn.call(this, args)
    }, delay)
  }
}
```

### 节流

节流原理：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

以下是节流的简单实现。

```js
const throttle = (fn, delay) => {
  // 定义定时器ID
  // 定义上一个时间戳
  let timer = null
  let last = null

  return function (args) {
    // 获取当前时间戳
    let now = Date.now()
    // 计算差值
    let n = delay - (now - last)

    // 根据差值情况，执行代码
    if (n <= 0) {
      if (timer) clearTimeout(timer)
      fn.call(this.args)
      last = now
    }
    else {
      timer = setTimeout(() => {
        fn.call(this, args)
      }, delay);
    }
  }
}
```

## call,apply,bind 的区别与实现

以上3者都可以实现改变 `this` 指向的功能，只是在使用方式上有所区别。

三个方法的第一个参数都一样，区别在于：

- `call` 跟一个参数列表
- `apply` 跟一个参数数组
- `bind` 可跟一个不定参数的列表，它会返回一个函数，并且实现函数柯里化

```js
var a = { value: 'hi' }
var value = 'hello'

function sayName(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value)
}

sayName()
sayName.call(a, '小张', '10')
sayName.apply(a, ['小雪', '15'])
sayName.bind(a)('小红','20')
```

下面我们来看下这三个方法的内部实现机制。

### call

根据 `call` 的方法特性：

- 第一个参数如果不传，默认值是 `window`
- 改变 `this` 指向，让新的对象可以执行该函数。（可以模拟在新对象上新增一个相同的方法函数，使用再删除）

```js
Function.prototype.MyCall = function(context) {
  // 满足第一个特性：默认参数为 window
  var context = context || window

  // 将该方法，赋值为新对象的一个临时属性取名为 fn
  context.fn = this

  // 取出剩余的其他参数
  var args = [...arguments].slice(1)
  var result = context.fn(...args)

  // 删除这个临时属性并返回结果
  delete context.fn
  return result
}
```

### apply

`apply` 的特性与 `call` 基本类似，只是它是传入一个参数数组。

```js
Function.prototype.MyApply = function(context) {
  var context = context || window
  context.fn = this

  var result = null
  // 判断一下第二个参数是否存在
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }
  else{
    result = context.fn()
  }

  delete context.fn
  return result
}
```

### bind

`bing` 相对于前面两者来说，它会返回一个函数，并且可以实现函数柯里化。

```js
Function.prototype.MyBind = function(context) {
  var _this = this
  var args  = [...arguments].slice(1)

  // 返回一个函数
  return function() {
    return _this.apply(context, [...args, ...arguments])
  }
}
```

## 异步编程

就像之前在异步和单线程小节中提到的，由于 JS 是单线程的语言，单线程本身就会带来代码阻塞的问题。因此 JS 才会将任务的执行模式分为两种：同步和异步。并引入了事件循环机制来做总控。

下面我们就来看看关于异步编程的发展史。

### 回调函数 Callback

回调函数是解决异步编程的最基本方案。

```js
ajax(url, () => {
  // 处理逻辑
})
```

但是这种方式有个很致命的弱点，就是容易写出 **回调地狱（Callback hell）**。假设多个请求存在依赖性，那你的代码可能就会变成这样。

```js
ajax(url1, () => {
  // 处理逻辑
  ajax(url2, () => {
    // 处理逻辑
    ajax(url3, () => {
      // 处理逻辑
      // ....
    })
  })
})
```

总体来说，回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护。此外它还不能使用 `try catch` 捕获错误，不能直接 `return`。

### Promise/A+

由于回调函数存在的种种弊端，才诞生了基于 Promise/A+ 规范的 Promise 方案。

我们可以把 `Promise` 看做是一个状态机，它有三种状态：

- `Pending`   ：进行中（初始状态）
- `Fulfilled` ：已成功
- `Rejected`  ：已失败

以下是 `Promise` 的基本结构及使用：

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('FULFILLED')
  }, 1000)
})

p.then((result) => {
  // 成功状态下执行
}).catch((err) => {
  // 失败状态下执行
});
```

接着来看下 `Promise` 的简单实现：

```js
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'

// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }

    // 添加 promise 状态
    this._status = PENDING
    // 添加 promise 的值
    this._value = undefined

    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []

    // 执行 handle 函数
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  // *添加 resolve 时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return

      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb = null
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }

      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }

      /*
       * 如果resolve的参数为 Promise 对象，则必须等待该 Promise 对象状态改变后,
       * 当前 Promsie 的状态才会改变，且状态取决于参数 Promsie 对象的状态
       */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }

    }

    // 为了支持同步的 Promise，这里采用异步调用
    setTimeout(run, 0)
  }

  // *添加 reject 时执行的函数
  _reject(val) {
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，
    // 并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }

    // 为了支持同步的 Promise，
    // 这里采用异步调用
    setTimeout(run, 0)
  }

  // *添加then方法
  then(onFulfilled, onRejected) {
    const {
      _status,
      _value
    } = this

    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = (value) => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value)

            if (res instanceof MyPromise) {
              // 如果当前回调函数返回 Promise 对象，
              // 必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，
              // 传入下一个then的回调函数，
              // 并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }

          }
        } catch (err) {
          // 如果函数执行出错，
          // 新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      // 封装一个失败时执行的函数
      let rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);

            if (res instanceof MyPromise) {
              // 如果当前回调函数返回 Promise对象，
              // 必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              // 否则会将返回结果直接作为参数，
              // 传入下一个then的回调函数，
              // 并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，
          // 新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      // 判断状态
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break;

          // 当状态已经改变时，
          // 立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break;

        case REJECTED:
          rejected(_value)
          break;
      }

    })
  }

  // *添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
}
```

以上就是 `promise` 的简单实现，但是它还缺少几个静态的方法，更具体的实现步骤请参考[这篇文章](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)。

### Generator

`Generator` 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

形式上，`Generator` 函数是一个普通函数，但是又如下几个特征。

- `function` 关键字与函数名之间有一个星号
- 函数体内部使用 `yield` 表达式，定义不同的内部状态
- 调用 Generator 函数后，该函数并不执行
- 必须调用 `next` 方法去执行

简单来说，`Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

```js
hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```

### Async

ES2017 标准引入了 `async` 函数，使得异步操作变得更加方便。（本质上其实就是 `Generator` 函数的语法糖）

以下是 async 函数的基本使用：

```js
async function A() {
  const b = await B()
  const c = await B()
  return c
}

A().then(result => {
  console.log(result);
});
```

关于这块的具体内容可以参考[阮一峰老师的ES6入门](http://es6.ruanyifeng.com/#docs/async)

## 正则表达式

这块内容，实际开发的用的地方大多是输入校验以及一些替换等业务逻辑方面。好像没什么可以说的，这里简单罗列一下正则相关的基本信息，以便查阅。

### 元字符

元字符 | 作用
----|---
. | 匹配任意字符除了换行符和回车符
[] | 匹配方括号内的任意字符。比如 [0-9] 就可以用来匹配任意数字
^ | ^9，这样使用代表匹配以 9 开头。[^9]，这样使用代表不匹配方括号内除了 9 的字符
{1, 2} | 匹配 1 到 2 位字符
(yck) | 只匹配和 yck 相同字符串
\| | 匹配 \| 前后任意字符
\ | 转义
\* | 只匹配出现 0 次及以上 * 前的字符
\+ | 只匹配出现 1 次及以上 + 前的字符
? | ? 之前字符可选

### 修饰语

修饰语 | 作用
----|---
i | 忽略大小写
g | 全局搜索
m | 多行

### 简写

简写 | 作用
---|---
\w | 匹配字母数字或下划线
\W | 和上面相反
\s | 匹配任意的空白符
\S | 和上面相反
\d | 匹配数字
\D | 和上面相反
\b | 匹配单词的开始或结束
\B | 和上面相反
