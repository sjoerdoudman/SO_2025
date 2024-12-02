module.exports = {
    apps: [
        {
            name: 'GLR25',
            port: '2025',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            args: 'start'
        }
    ]
}