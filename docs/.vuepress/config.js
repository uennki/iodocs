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
      link: '/network/网络'
    },
    {
      text: 'React',
      link: '/react/介绍'
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
        ]
      }],

      '/react/': [{
        title: '基础',
        collapsable: false,
        children: [
          '介绍',
        ]
      },{
        title: '进阶',
        collapsable: false,
        children: [
          '路由'
        ]
      }],
    }
  }
}