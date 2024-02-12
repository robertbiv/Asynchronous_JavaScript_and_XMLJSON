var form = new FormData();
var settings = {
    "url": "https://api.imgur.com/3/gallery/search/viral/all/1?q=cats",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "Client-ID 0af8b98e102f5cd"
    },
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
};
/*var form = new FormData();
var settings = {
    "url": "https://api.imgur.com/3/credits",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "Client-ID 0af8b98e102f5cd"
    },
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
};*/

$.ajax(settings).done(function (response) {
    console.log(response);
});