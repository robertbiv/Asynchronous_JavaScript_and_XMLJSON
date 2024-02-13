/*var form = new FormData();
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
};*/
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

/*$.ajax(settings).done(function (response) {
    console.log(response);
});*/
const url = "imgurCache.json";
//  .get(URL:string, CALLBACK:function)
let allData
$.getJSON(url, (data) => {
    console.log(data)
    allData = data
    const container = document.getElementById('accordion');
    console.log(allData)
    allData.data.forEach((result, idx) => {
        if (result.images[0].type==="image/jpeg"||result.images[0].type==="image/gif") {
            console.log(result + idx)
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';
            console.log(result.images)
            console.log(result.images[0].link)

            // Construct card content
            const content = `
        <div class="col s12 l6">
            <div class="card">
            <div class="card-header" id="heading-${idx}">
                <div class="card-image">
                    <img src=${result.images[0].link} alt="">
                </div>  
            </div>
              <div class="card-body">
        
                <h5>${result.title}</h5>
                <p>Likes: ${result.ups}</p>
                <p>Views: ${result.views}</p>
              </div>
              <div class="card-action">
                <a href="">Comments</a>
                <a href=${result.link}>More Details</a>
              </div>
          </div>
        </div>
      `;

            // Append newyly created card element to the container
            container.innerHTML += content;
        }
        })
});


/*const apiResult = [{
    title: "title1",
    description: "desc1",
    output: "out1"
}, {
    title: "title2",
    description: "desc2",
    output: "out2"
}, {
    title: "title3",
    description: "desc3",
    output: "out3"
}];*/


/*const container = document.getElementById('accordion');

apiResult.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'card-body';

    // Construct card content
    const content = `
    <div class="card">
    <div class="card-header" id="heading-${idx}">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${idx}" aria-expanded="true" aria-controls="collapse-${idx}">

        </button>
      </h5>
    </div>

    <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
      <div class="card-body">

        <h5>${result.title}</h5>
        <p>${result.description}</p>
        <p>${result.output}</p>
        ...
      </div>
    </div>
  </div>
  `;

    // Append newyly created card element to the container
    container.innerHTML += content;
})*/
