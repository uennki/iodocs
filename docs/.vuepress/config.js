module.exports = {
  title: 'Code Monkey',
  description: 'Document library',
  plugins: [
    "vuepress-plugin-cat",
  ],
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
      link: '/前端基础/JavaScript'
    },
    {
      text: '计算机基础',
      link: '/网络基础/Http',
    },
    {
      text: 'TypeScript',
      link: '/TypeScript/01-数据类型'
    },
    {
      text: 'React',
      link: '/React/01-基础'
    },
    {
      text: 'GitHub',
      link: 'https://github.com/zhangxuanmai'
    },
    ],

    sidebar: {
      '/前端基础/': [{
        title: '基础',
        collapsable: false,
        children: [
          'JavaScript',
          '浏览器',
          '性能',
          '安全',
          '框架',
          '自动化',
        ]
      }],

      '/网络基础/': [{
        title: '基础',
        collapsable: false,
        children: [
          'Http',
          'Git',
        ]
      }, {
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
          '01-基础',
          '02-进阶',
          '03-路由',
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