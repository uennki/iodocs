# State 与 Props

关于数据的操作传递，React 提供了State 和 Props 两种方式。

## State

- class组件特有（类似小程序的Data）
- 可以通过 setState 方法修改 state 内部的变量值（类似小程序 setData）
- state 的更新可能是异步的（警告！）
- state 的更新会被合并

```jsx
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'tom'
    }
  }

  handleClick = () => {
    // 对象式修改
    this.setState({ name: 'bilibili'})

    // 函数式修改(可解决 state 异步更新问题)
    // this.setState((state, props) => (
    //   console.log(state, props),
    //   { name: 'hahahah' }
    // ))
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        hello, {this.state.name}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Props

- 所有组件都有
- 支持默认值
- 单向数据流，传入值不支持修改

```jsx
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        hello, {this.props.name}
      </div>
    )
  }
}

ReactDOM.render(
  <App name='tom' />,
  document.getElementById('root')
);
```

### 默认值

我们可以设置 Props 的默认值作为初始化数据项。

它的设置有以下两种形式：

第一种：

```jsx
class App extends Component {
  static defaultProps = {
    name: 'hello'
  }

  render() {
    return (
      <div>
        hello, {this.props.name}
      </div>
    )
  }
}
```

第二种：

```jsx
class App extends Component {
  render() {
    return (
      <div>
        hello, {this.props.name}
      </div>
    )
  }
}

App.defaultProps = {
  name: 'hello'
}
```
