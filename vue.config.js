module.exports = {	
	devServer: {
		proxy: {
			'/mobile': {
				target: 'http://qwe.qqmmdog.com',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	}
}