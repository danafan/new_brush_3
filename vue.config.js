const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = {	
	devServer: {
		proxy: {
			'/mobile': {
				// target:'http://jd.loveismakeup.com/',
        target:'http://jd.alinxn.com/',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	},
	productionSourceMap:false,  // 设置上线后是否加载webpack文件
	configureWebpack: (config) => {
    //  引入uglifyjs-webpack-plugin
    let UglifyPlugin = require('uglifyjs-webpack-plugin');

    if (process.env.NODE_ENV == 'production') {
      // 为生产环境修改配置
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        minimizer: [new UglifyPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                  drop_console: true, 
                  drop_debugger: false,
                  pure_funcs: ['console.log'] 
                }
            }
         })]
      }
      Object.assign(config, {
        optimization
      })
    } else {
      // 为开发环境修改配置
      config.mode = 'development'
   }
  }
}