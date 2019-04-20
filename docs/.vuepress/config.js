module.exports = {
    base: '/blog-book/',
    title: '前端日志',
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
                title: '准备工作',
                collapsable: false,
                children: [
                    ['note/', 'Introduction'],
                    'note/codetype',
                    'note/favicon',
                ]
            }
        ]
    }
};
