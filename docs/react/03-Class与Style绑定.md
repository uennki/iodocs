# Class 与 Style 绑定

操作元素的 class 列表和内联样式是数据绑定的一个常见需求。在 React 中我们可以通过绑定 Class 或者 Style 的形式去处理它们。

## 绑定 Class

```jsx
class App extends Component {
  render() {
    return (
      <div className={true ? 'red' : ''}>
        hello
      </div>
    )
  }
}
```

## 绑定内联样式

```jsx
class App extends Component {
  render() {
    const style = { color: 'green', }
    return (
      // 三目运算
      <div style={style}>
        hello
      </div>
    )
  }
}
```
