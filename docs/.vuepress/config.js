module.exports = {
    base: '/blog-book/',
    title: '前端笔记',
    description: '记录，总结，分享，javascript，node',
    head: [
        ['link', { rel: 'icon', href: '/dragon.png' }]
    ],
    themeConfig: {
        repo: 'yinjialu/blog-book',
        repoLabel: 'Github',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [],
        sidebar: [
            {
                title: '持续优化',
                collapsable: false,
                children: [
                    'optimize/cache',
                    'optimize/optimize',
                    'optimize/prerender',
                ]
            }, {
                title: 'node',
                collapsable: false,
                children: [
                    'node/npm',
                    'node/stream',
                    'node/cookie',
                    'node/cors',
                    'node/download',
                    'node/require',
                    'node/path',
                    'node/contos',
                ],
            }, {
                title: 'Vue',
                collapsable: false,
                children: [
                    'vue/v-model',
                    'vue/vueRouterHistory',
                ]
            }, {
                title: '异步',
                collapsable: false,
                children: [
                    'async/callback',
                    'async/promise',
                    'async/async',
                ]
            }, {
                title: '工具收藏',
                collapsable: false,
                children: [
                    'tool/driver',
                    'tool/validator',
                ],
            }, {
                title: '好记性不如烂笔头',
                collapsable: false,
                children: [
                    'useful/charles',
                    'useful/codetype',
                    'useful/favicon',
                    'useful/git',
                    'useful/github',
                    'useful/webstorm',
                ]
            }, {
                title: '未分类',
                collapsable: false,
                children: [
                    ['note/', 'Introduction'],
                    'note/this',
                    'note/闭包和高阶函数',
                    'note/singleton',
                    'note/socket.io',
                    'note/es6'
                ]
            },
        ]
    }
};
