$(function() {
    // 定义给时间补零函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function(dtstr) {
            var dt = new Date(dtstr);
            var y = dt.getFullYear();
            var m = padZero(dt.getMonth() + 1);
            var d = padZero(dt.getDate());
            var hh = padZero(dt.getHours());
            var mm = padZero(dt.getMinutes());
            var ss = padZero(dt.getSeconds());
            return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
        }
        // 获取新闻列表的函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function(res) {
            if (res.status !== 200) {
                return alert('获取新闻列表失败')
            }
            // console.log(res.data);
            for (var i = 0; i < res.data.length; i++) {
                // 把每一项的tags属性从字符串改造成字符串的数组
                res.data[i].tags = res.data[i].tags.split(',');
            }
            // console.log(res);
            var htmlStr = template('tpl-news', res);
            $('#news-list').html(htmlStr);
        })
    }
    getNewsList();
})