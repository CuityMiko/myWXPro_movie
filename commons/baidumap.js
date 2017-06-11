/**
 * 封装百度地图API
 */
import bmap from '../libs/bmap-wx.min.js'
import Config from './config.js'

export default class BDMap{
    /**
     * 获取经纬度
     */
    getlatandlong(){
        return new Promise((resolve, reject)=>{
            wx.getLocation({
            type: 'wgs84', //返回可以用于wx.openLocation的经纬度
            success: function(res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    let opit={
                        latitude:res.latitude,
                        longitude:res.longitude
                    }
                    resolve(opit);
                },
            fail:(err)=>{
                    reject(err);
                }
            })
        })
    }

    /**
     * 定位当前城市天气
     */
    static getCurrentWeather(){
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: Config.AppConfig.bmapwxkey 
        }); 
        console.log(BMap)
        return new Promise((resolve, reject)=>{
            // 发起weather请求 
            BMap.weather({ 
                success: (data)=>{
                    console.log('ssss')
                    console.log(data);
                    var weatherData = data.currentWeather[0]; 
                    let locationdata={
                        currentCity: weatherData.currentCity, // 城市：
                        pm25: weatherData.pm25, // PM2.5
                        date: weatherData.date, // 日期
                        temperature: weatherData.temperature, // 温度
                        weatherDesc: weatherData.weatherDesc, // 天气
                        wind: weatherData.wind // 风力
                    }
                    resolve(locationdata);
                },
                fail: (err)=>{
                    console.log('44444')
                    reject(err);
                }
            }); 
        })
    }

    /**
     * 获取当前城市
     * 支持bd09mc（百度墨卡托坐标）、bd09ll（百度经纬度坐标）和gcj02（国测局坐标）
     */
    static getLocation(){
        return new Promise((resolve, reject)=>{
            wx.request({
                url: Config.BmapAPIURL.getLocationUrl,
                data: {},
                success: (res)=> {
                    let _location={
                        province:res.data.content.address_detail.province,
                        city:res.data.content.address_detail.city,
                        city_code:res.data.content.address_detail.city_code,
                        address:res.data.content.address,
                        long:res.data.content.point.x,
                        lat:res.data.content.point.y
                    }
                    resolve(_location);
                },
                fail:(err)=>{
                    reject(err);
                }
            })
        })
    }
}