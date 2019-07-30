module.exports = {
    title: 'xr-wheel 官网',
    description: '一个基于 Vue 的 UI 组件',
    themeConfig: {
        sidebar: [
            '/install/', // 目录的话最后要加斜杠
            '/start/',
            {
                title: '组件',
                children: [
                    '/components/button',
                    '/components/button-group'
                ]
            }
        ]
    }
}