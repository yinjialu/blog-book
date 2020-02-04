function ajax() {
    var url = 'https://app.peopleapp.com/WapApi/610/DetailApi/shareArticleClickLike?article_id=4326738&securitykey=4581aafa0e472d17b1fae621347d47f2&interface_code=610';
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function () {
        var result = JSON.parse(xhr.responseText);
        if (result.result.errorCode === '0') {
            console.log('点赞成功');
            console.log('最新点赞数: ' + result.data.likes_count);
        }
    }
}

var task = function (time) {
    var count = 0;
    var thumbs = setInterval(function () {
        ajax();
        if (time <= ++count) {
            clearInterval(thumbs);
        }
    }, 1000)
};

task(5);

