module.exports = {
  title: '阿丢のBlog',
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
        text: '小词典',
        link: '/issues/JS'
      },
      {
        text: '小仓库',
        link: '/snippets/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/zhangxuanmai'
      },
    ],
    sidebar: {
      '/library/': [{
        title: '前端',
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
        title: '计算机通识',
        collapsable: false,
        children: [
          '网络',
          '构建工具',
          '设计模式',
          'Git',
        ]
      }],
      '/issues/': [{
        title: '小词典',
        collapsable: false,
        children: [
          'JS',
          '框架',
          '常用正则',
          '工具函数',
        ]
      }],
      '/snippets/': [{
        title: '小仓库',
        collapsable: false,
        children: [
          '',
        ]
      }],
    }
  }
}