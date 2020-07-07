const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app){
    console.log(app)
    app.use(
        createProxyMiddleware('/mp', {
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