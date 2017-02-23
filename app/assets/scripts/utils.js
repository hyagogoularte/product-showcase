function isValidImage(url) {
	var img = new Image();
	img.src = url;
	return img.height > 0;
}

function getJSONP(url, callback){
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] || document.documentElement;

    window['X'] = function(data) {
        head.removeChild(script);
        callback && callback(data);
    };

    script.src = url;
    head.appendChild(script);
}