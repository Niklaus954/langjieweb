const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware('/wxApi', {
            target: "https://api.weixin.qq.com",
            changeOrigin: true,
            ws:true,
            pathRewrite:{
                '^/wxApi':''
            }

        })
    )
    app.use(
        createProxyMiddleware('/getToken', {
            target: "https://www.langjie.com",
            changeOrigin: true,
            ws:true,
            pathRewrite:{
                '^/getToken':''
            }

        })
    )
}