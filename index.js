import * as maptalks from 'maptalks';

window.BMap = {};

/**
 * 渲染百度路况数据的maptalks扩展图层
 * @author yy
 */
export class BaiduTrafficCanvasLayer extends maptalks.CanvasTileLayer {

    constructor(id, options){

        if(options.urlTemplate) {

            const url = options.urlTemplate;
            options.urlTemplate = function(x, y, z, domains) {
                const fn = "BMap._t" + parseInt(x + "" + y + z).toString(36);
                return  url + '&x=' + x+'&y='+y+'&z='+z+'&fn='+fn;
            }
        }
        options.spatialReference= {
            projection : 'baidu'
        }
        super(id, options)
        this._arrFeaturesStyles = {
            0: [2, "rgba(0,192,73,0.99609375)", 2, 2, 0, [], 0, 0],
            1: [2, "rgba(0,192,73,0.99609375)", 3, 2, 0, [], 0, 0],
            10: [2, "rgba(242,48,48,0.99609375)", 2, 2, 0, [], 0, 0],
            11: [2, "rgba(242,48,48,0.99609375)", 3, 2, 0, [], 0, 0],
            12: [2, "rgba(242,48,48,0.99609375)", 4, 2, 0, [], 0, 0],
            13: [2, "rgba(242,48,48,0.99609375)", 5, 2, 0, [], 0, 0],
            14: [2, "rgba(242,48,48,0.99609375)", 6, 2, 0, [], 0, 0],
            15: [2, -1, 4, 0, 0, [], 0, 0],
            16: [2, -1, 3, 0, 0, [], 0, 0],
            17: [2, -1, 4, 0, 0, [], 0, 0],
            18: [2, -1, 5, 0, 0, [], 0, 0],
            19: [2, -1, 6, 0, 0, [], 0, 0],
             2: [2, "rgba(0,192,73,0.99609375)", 4, 2, 0, [], 0, 0],
             3: [2, "rgba(0,192,73,0.99609375)", 5, 2, 0, [], 0, 0],
             4: [2, "rgba(0,192,73,0.99609375)", 6, 2, 0, [], 0, 0],
             5: [2, "rgba(255,159,25,0.99609375)", 2, 2, 0, [], 0, 0],
             6: [2, "rgba(255,159,25,0.99609375)", 3, 2, 0, [], 0, 0],
             7: [2, "rgba(255,159,25,0.99609375)", 4, 2, 0, [], 0, 0],
             8: [2, "rgba(255,159,25,0.99609375)", 5, 2, 0, [], 0, 0],
             9: [2, "rgba(255,159,25,0.99609375)", 6, 2, 0, [], 0, 0]
        };
    }

    /**
     * The interface method to draw on canvsa tile
     */
    drawTile(canvas, tileContext, onComplete) {

        const tileUrl = tileContext.url +'&t=' + new Date().getTime();
        const bmapFn = tileUrl.substring(tileUrl.indexOf('BMap')+5, tileUrl.lastIndexOf("&t="))
        let that = this;
        this._jsonp(tileUrl, bmapFn, function(err, res){
            if(res.content && res.content.tf) {
                that._drawTrafficFeatures(res.content.tf, canvas);
                onComplete(null);
            }else{
                onComplete(res);
            }
        })
       
    }

    _jsonp(url, name, callback) {
        
        if (url.match(/\?/)) url += '&callback=BMap.' + name;
        else url += '?callback=BMap.' + name;

        // Create script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Setup handler
        window.BMap[name] = function (data) {
            callback(null, data);
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window.BMap[name];
        };
        // Load JSON
        document.getElementsByTagName('head')[0].appendChild(script);
        return this;
    }

    _drawTrafficFeatures(t, e) {

        var i = e.getContext('2d'), 
            n = (this._getRGBA, this._getLineCap),
            o = this._getLineJoin,
            a = 10;
        for (var s = 0, r = t.length; r > s; s++) {
            var l = t[s],
                d = l[1],
                c = this._arrFeaturesStyles[l[3]],
                h = (this._arrFeaturesStyles[l[4]],
                d[0]/a),
                u = d[1]/a;
            i.beginPath();
            i.moveTo(h, u);
            for (var p = 2, _ = d.length; _ > p; p +=2 )
                h += d[p] /a, u += d[p+1] /a, i.lineTo(h, u);
            i.strokeStyle = c[1],
            l[3] >= 15 && l[3] <=19 && (i.strokeStyle = "rgba(186, 0, 0, 1)"),
            i.lineWidth = c[2] - 1,
            i.lineCap = n(c[3]),
            i.lineJoin = o(c[4])
            i.stroke()
        }
    }

    _getRGBA(t) {
        t >>>= 0;
        var e = t >> 24 & 255,
            i = t >> 16 & 255,
            n = t >> 8 & 255,
            O = (255 & t) /256;
        return "rgba("+ e + "," + i + "," + n + "," + o + ")"
    }
    
    _getLineCap(t) {
        return ["butt", "square", "round"][t]
    }
    
    _getLineJoin(t) {
        return ["miter", "bevel", "round"][t]
    }
    
}

BaiduTrafficCanvasLayer.registerRenderer('canvas', maptalks.renderer.CanvasTileLayerCanvasRenderer)
BaiduTrafficCanvasLayer.registerRenderer('gl', maptalks.renderer.CanvasTileLayerGLRenderer)
