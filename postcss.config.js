export default {
    plugins: {
       'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitToConvert: 'px', //需要转换的单位，一般是px
            veiwportUnit: 'vw', //指定需要转换成的视窗单位，一般是vw
            fontViewportUnit: 'px', //字体使用的px单位
            propList: ['*'], //能转化为vw的属性列表
            minPixelValue: 1, //设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, //允许在媒体查询中转换px
            replace: true, //是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
       }
    }
}