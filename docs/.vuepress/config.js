module.exports = {
  title: 'Code Monkey',
  description: 'Document library',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.png'
    }],
  ],

  themeConfig: {
    lastUpdated: '上次更新时间',
    displayAllHeaders: false,
    /*显示所有页面的标题链接*/
    sidebarDepth: 2,
    /* 嵌套的标题链接 h2-h3*/

    nav: [{
      text: '前端',
      link: '/library/js'
    },
    {
      text: '计算机通识',
      link: '/network/网络',
    },
    {
      text: 'TypeScript',
      link: '/TypeScript/01-数据类型'
    },
    {
      text: 'React',
      link: '/React/01-起步'
    },
    {
      text: 'GitHub',
      link: 'https://github.com/zhangxuanmai'
    },
    ],
    sidebar: {
      '/library/': [{
        title: '基础',
        collapsable: false,
        children: [
          'js',
          '浏览器',
          '性能',
          '安全',
          '框架通识',
        ]
      }],

      '/network/': [{
        title: '基础',
        collapsable: false,
        children: [
          '网络',
          '构建工具',
          'Git',
        ]
      },{
        title: '进阶',
        collapsable: false,
        children: [
          '设计模式',
          '重构',
        ]
      }],

      '/React/': [{
        title: '基础',
        collapsable: false,
        children: [
          '01-起步',
          '02-生命周期',
          '03-Class与Style绑定',
          '04-组件',
          '05-State与Props',
          '06-事件处理',
          '07-条件渲染',
          '08-列表渲染',
          '09-表单输入绑定',
          '10-高级',
        ]
      },{
        title: '路由',
        collapsable: false,
        children: [
          '11-路由基础',
          '12-路由动态匹配',
          '13-路由传参',
        ]
      }],

      '/TypeScript/': [{
        title: '基础',
        collapsable: false,
        children: [
          '01-数据类型',
          '02-接口',
          '03-函数',
          '04-类',
          '05-元组',
          '06-枚举',
          '07-泛型',
          '08-声明合并',
          '09-声明文件',
          '10-内置对象'
        ]
      }],
    }
  }
}