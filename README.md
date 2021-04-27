# maptalks.baidutrafficcanvaslayer

渲染百度路况数据的maptalks扩展图层

![](https://raw.githubusercontent.com/maptalks/raster-collection/master/screenshots/baidu-traffic.png)

# 使用
maptalks.baidutrafficcanvaslayer必须在maptalks.js之后加载

`urlTemplate` 是路况数据的请求接口地址，该地址请求基于jsonp，返回回调方法。完整地址如下
```javascript
# request
http://ip:port/traffic/?qt=traffic&x=98&y=34&z=9&fn=BMap._t23vx&t=1619493782629&callback=BMap._t23vx

# response
BMap._t23vx&&BMap_t23vx({
    content: {
        tf: [
            ["", [208, 236, 11, 9], -1, 0, -1]
            ...
            ...
        ]
    }
})

```
`urlTemplate` 只需配置 `http://ip:port/traffic/?qt=traffic` 这一部分, 示例如下
```javascript
<!DOCTYPE html>
<html>
<head>
  <title>maptalks.heatmap demo</title>
  <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"></script>
  <script type="text/javascript" src="../dist/maptalks.baidutrafficcanvaslayer.js"></script>
  <style>
    html,body{
        margin:0px;
        height:100%;
        width: 100%;
    }
    #map { width: 100%; height: 100%; }
  </style>
</head>
<body>
<div id="map"></div>
<script>
var map = new maptalks.Map("map",{
    center : [114, 37.90258],
    zoom   :  15,
    spatialReference: {
        projection: 'baidu'
    },
    baseLayer : new maptalks.TileLayer('tile',{
        urlTemplate: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1'
    })
});

new maptalks.BaiduTrafficCanvasLayer('traffic', {
    urlTemplate: 'http://ip:port/traffic/?qt=traffic'
}).addTo(map);

</script>
</body>
</html>
```
# 浏览器支持
IE 9-11, Chrome, Firefox, other modern and mobile browsers.

# API 参考
### `Constructor`

```BaiduTrafficCanvasLayer``` is a subclass of [maptalks.Layer](https://maptalks.github.io/maptalks.js/api/0.x/Layer.html)  and inherits all the methods of its parent.

```javascript
new maptalks.BaiduTrafficCanvasLayer(id, options)
```
* id **String** layer id
* options **Object** options
  * urlTemplate **String** url

## Develop

The only source file is ```index.js```.

It is written in ES6, transpiled by [babel](https://babeljs.io/) and tested with [mocha](https://mochajs.org) and [expect.js](https://github.com/Automattic/expect.js).

### Scripts

* Install dependencies
```shell
$ npm install
```

* Watch source changes and generate runnable bundle repeatedly
```shell
$ gulp watch
```

* Package and generate minified bundles to dist directory
```shell
$ gulp minify
```