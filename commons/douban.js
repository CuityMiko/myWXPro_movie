import Config from './config.js'
import BDMap from './baidumap.js'
/**
 * 豆瓣API封装
 */
export default class DouBanApi{
    /**
     * 城市名称转换
     * eg 杭州市->杭州
     * @param {*城市名称} city 
     */
    static convertcityname(city){
        let _index= city.indexOf("市");
        if(_index>-1 && _index==city.length-1)  
            return city.substr(0,city.length-1)
        else
            return city;
    }
    
    /**
     * 获取豆瓣电影API数据
     * @param {*电影类型 in_theaters:正在热映 coming_soon:即将上映 top250:TOP250} type 
     * @param {*当前页} pageindex 
     * @param {*返回条数} count 
     * @param {*查询条件} search 
     */
    static fetchApi(type="",pageindex=1,count=0,search=""){
        let _url=Config.AppConfig.serverurl+type;
        let _count=0;
        let _q="";
        if(typeof(count).toString()=="string")
            _q=count;
        else{
            _count=count;
            _q=search;
        }
        let that=this;
        _count=_count>0?_count:Config.AppConfig.paged.pagesize;
        let _start=(pageindex-1)*_count;
        let bmplocation=BDMap.getLocation();
        return new Promise((resolve, reject)=>{
            bmplocation.then((locat)=>{
                let _city= that.convertcityname(locat.city); 
                wx.request({
                    url: _url,
                    data:{
                        "start": _start,
                        "count": _count,
                        "city": _city,
                        "q":_q
                    },
                    header: {
                        'content-type': 'json'
                    },
                    success: (res)=>resolve(res),
                    fail:(err)=>reject(err)
                })
            },(err)=>reject(err)).catch((err)=>reject(err));
        })
    }

    /**
     * 获取电影列表
     * @param {*电影类型 in_theaters:正在热映 coming_soon:即将上映 top250:TOP250} type 
     * @param {*当前页} pageindex 
     * @param {*返回条数} count 
     * @param {*查询条件} search 
     */
    static GetMovieList(type="",pageindex=1,count=0,search=""){
        return this.fetchApi(type,pageindex,count,search);
    }

    /**
     * 获取电影详情
     * @param {*电影Id} id 
     */
    static GetMovieDetail(id){
        let _type=`subject/${id}`;
        return this.fetchApi(_type)
    }
}