# *React*

## JSX

- 特点：
  - 类似 html 标签
  - 内部可以使用 { } 放置任何有效的 JavaScript 表达式
  - 属性的名称使用 camelCase（小驼峰命名）, 属性值可以用字符串，或者 { } 插入JS表达式
  - 为便于阅读，可以将 JSX 拆分为多行（外部用括号包裹）

```jsx
const name = 'tom'
const url = 'xxx.png'

const element1 = (
  <h1>hello, { name }</h1>
)

const element2 = (
  <img className="active" src="xxx.png"></img>
  <img src={ url }></img>
)

const element3 = (
  <button onClick={ handleMethos }></button>
)
```

## 元素

- 特点：
  - 元素是 React 最基本单元
  - 组件由元素构成而来

```jsx
// element 是一个元素
const element = <h1>hello, world</h1>
```

## 生命周期

以下是react 16后版本的生命周期图示:

![react-life](/react-life.png)

生命周期主要介绍组件从渲染--挂载-数据更新--卸载销毁等不同阶段的特点，以及在某一些阶段，我们可以做的一些事情。

## Class 与 Style 绑定

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

## 组件

- 特点：
  - 可以接受任意的入参（即“props”）
  - 组件名称必须以大写字母开头
  - 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改
  - 组件类型
    - 函数组件（无状态组件, 没有this,state）
    - class组件

### 函数组件

```jsx
function App(props) {
  return (
    <div>
      hello, {props.name}
    </div>
  )
}

// ========================================

ReactDOM.render(
  <App name='tom' />,
  document.getElementById('root')
);
```

### class 组件

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

// ========================================

ReactDOM.render(
  <App name='tom' />,
  document.getElementById('root')
);
```

## State 与 Props

### State

- 特点：
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

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Props

- 特点：
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

// ========================================

ReactDOM.render(
  <App name='tom' />,
  document.getElementById('root')
);
```

声明 Props 默认值

```jsx
// 方式1：
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

```jsx
// 方式2：
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

## 事件处理

- 特点：
  - React 事件的命名采用小驼峰式（camelCase）
  - 事件不能通过返回 false 的方式阻止默认行为
  - 事件传参
    - 箭头函数方式
    - Function.prototype.bind 方式

```jsx
class App extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = (value, e) => {
    // 阻止默认事件
    e.preventDefault();
    console.log(value, e)
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick.bind(this, 'hello')}> hello </div>
        <div onClick={(e) => { this.handleClick('word', e)}}> word </div>
      </div>
    )
  }
}
```

## 条件渲染

- 特点：
  - 通过 JS 条件运算去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI
  - 阻止渲染直接返回 null 即可

```jsx
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const d1 = <Demo1></Demo1>
    const d2 = <Demo2></Demo2>

    return (
      <div>
        {/* 与运算 */}
        {this.props.isTrue && d2}

        {/* 三目运算 */}
        {this.props.isTrue ? d1 : d2}
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App isTrue={false} />,
  document.getElementById('root')
);
```

```jsx
function Demo(props) {
  // 阻止渲染
  if(!props.isTrue) return null
  return ( <div> demo </div> )
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const d1 = <Demo isTrue={false}></Demo>
    const d2 = <Demo isTrue={true}></Demo>

    return (
      <div>
        {d1} {d2}
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App isTrue={false} />,
  document.getElementById('root')
);
```

## 列表渲染

- 特点：
  - 使用 JS 生成元素列表
  - 通过 key 来标识元素

```jsx
function Demo(props) {
  const list = props.list.map((item, index) => {
    return <li key={index}>{item}</li>
  })

  return (
    <ul>
      {list}
    </ul>
  )
}

class App extends Component {
  render() {
    const list = [1, 2, 3, 4, 5]
    const demo = <Demo list={list}></Demo>

    return (
      <div>
        {demo}
      </div>
    )
  }
}
```

## 表单输入绑定（受控组件）

- 特点：
  - 通过 value 来绑定值到 state
  - 通过 setState 来更新值

```jsx
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: "",
      value2: "",
      value3: "",
    }
  }

  handleChange1 = (event) => {
    this.setState({ value1: event.target.value })
  }

  handleChange2 = (event) => {
    this.setState({ value2: event.target.value })
  }

  handleChange3 = (event) => {
    this.setState({ vlaue3: event.target.value })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange1} type="text" value={this.state.value1} />

        <textarea onChange={this.handleChange2} value={this.state.value2}></textarea>

        <select onChange={this.handleChange3} value={this.state.value3}>
          <option value="apple">apple</option>
          <option value="banana">banana</option>
          <option value="orange">orange</option>
        </select>
      </div>
    )
  }
}
```

## 高级

### React.lazy（懒加载）

- 特点：
  - 按需引入所用组件，减少组件加载时间

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

### Suspense （加载指示器组件）

- 特点：
  - 组件加载过程中的提示组件

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

### Context（依赖注入）

```jsx
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

### Refs （DOM操作）

- 特点：
  - 获取组件DOM
  - 仅类组件支持ref
  - 你不能在函数组件上使用 ref 属性，因为他们没有实例。

```jsx
// 方式1：赋值型（通用型）
class App extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef();
  }

  handleClick = ()=>{
    console.log(this.textInput.current);
  }
  
  render() {
    return (
      <div>
        <h1 ref={this.textInput} onClick={this.handleClick}>
          hello
        </h1>
      </div>
    )
  }
}
```

```jsx
// 方式2：回调型
class App extends Component {
  handleClick = () => {
    console.log(this.textInput);
  }

  render() {
    return (
      <div>
        <h1 ref={el => this.textInput = el} onClick={this.handleClick} >
          hello
        </h1>
      </div>
    )
  }
}
```

```jsx
// 方式3：API型
// 作用：获取子组件内部某一 DOM 节点
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

### Fragments （多元素组件）

- 特点：
  - 一个组件返回多个元素

```jsx
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

### Portals （类插槽）

- 特点：
  - 将子节点渲染到存在于父组件以外的 DOM 节点
  - 有点类似插槽的概念（但是比插槽更强大）

```jsx
render() {
  // React 并*没有*创建一个新的元素。它只是把当前元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

以上是主要的React内容，更完整内容可以阅读 [官方文档](https://zh-hans.reactjs.org/docs/getting-started.html)
