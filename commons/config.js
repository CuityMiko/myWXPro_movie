let _AppConfig={
        serverurl:'https://api.douban.com/v2/movie/',
        paged:{
            pagesize:10
        },
        bmapwxkey:'8G7VtkLFjArcVCUN3sp2w1yKpUfjRZzZ', // 微信小程序使用的key
        bmapserverkey:'DOccg9buS8Vz1EngbQgfxvZvUNjI4Abl' // 服务端请求访问使用的key
    }
module.exports={
    AppConfig:_AppConfig,
    BmapAPIURL:{
        getLocationUrl:`https://api.map.baidu.com/location/ip?ak=${_AppConfig.bmapserverkey}&coor=bd09ll`
    }
}