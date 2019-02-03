# JS

## 原生获取元素&网页宽高

实际开发中，获取元素以及网页的宽高是非常基础和普遍的需求，以下是一些整理：

属性 | 方法
------- | -------
网页可见区域宽 | document.body.clientWidth
网页可见区域高 | document.body.clientHeight
网页可见区域宽 | document.body.offsetWidth (包括边线的宽)
网页可见区域高 | document.body.offsetHeight (包括边线的高)
网页正文全文宽 | document.body.scrollWidth
网页正文全文高 | document.body.scrollHeight
网页被卷去的高 | document.body.scrollTop
网页被卷去的左 | document.body.scrollLeft
网页正文部分上 | window.screenTop
网页正文部分左 | window.screenLeft
屏幕分辨率的高 | window.screen.height
屏幕分辨率的宽 | window.screen.width
屏幕可用工作区高度 | window.screen.availHeight
屏幕可用工作区宽度 | window.screen.availWidth
行内样式元素宽度 | document.getElementById("id").style.width
行内样式元素高度 | document.getElementById("id").style.height
外联样式元素宽度 | document.getElementById("id").offsetWidth
外联样式元素高度 | document.getElementById("id").offsetHeight
元素计算样式 | window.getComputedStyle(document.getElementById("id")) (返回一个样式对象)

## 监听 transiton 过渡结束

当我们在做动画的时候，特别是过渡时，有时候需要在过渡结束后做一些处理。这就需要我们去监听过渡结束的动作，以下是原生的两个监听方法：`ransitionend` 事件和 `animationend` 事件是标准的浏览器事件。（但在WebKit浏览器里我们仍然需要使用webkit前缀，所以，需注意各种浏览器的检测）

使用示例：

```js
document.addEventListener("transitionend", (params) => {
  // 逻辑...
}

document.addEventListener("animationend", (params) => {
  // 逻辑...
}
```

在使用 `ransitionend` 时需要注意以下几点：

- 如果元素有多个属性过渡，则会多次触发 `ransitionend`
- `display` 从 `none` 到 `block` ，不会触发该事件监听
- 部分低端的安卓机，无法促发 transitionend事件，需要主动触发一次