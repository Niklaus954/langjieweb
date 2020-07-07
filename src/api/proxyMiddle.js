const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target: "http://mp.weixin.qq.com",
            changeOrigin: true
        })
    )
    app.use(
        createProxyMiddleware('/loc', {
            target: "http://192.168.50.80:9001",
            changeOrigin: true
        })
    )
}