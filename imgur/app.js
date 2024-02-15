//Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function randomWord() {
    let animals = ["cat","dog","fish","car","airplane","phone","computer","llama","fire","water"]
    return animals[Math.floor(Math.random() * 10)]
}

var form = new FormData();
var settings = {
    "url": "https://api.imgur.com/3/gallery/search/viral/all/1?q="+randomWord(),
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
const url = "imgurCache.json";
//  .get(URL:string, CALLBACK:function)
let allData
$.getJSON(settings, (data) => {
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
                <p>Comments: ${result.comment_count}</p>
              </div>
              <div class="card-action">
                <a onclick="comments('${result.id}')">Comments</a>
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

function comments(id) {
    let modalText = ""
    let form1 = new FormData();
    form1.append("access_token", "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwMmZkODgwOTNmNTQ2Mjg1MDY2YTNmNGQxNGNiMzBhZTZhY2MyM2YifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhdWQiOiI4NDEzNTkzNTM5ODgtcml0aWhjNDRhdjVwZGwydTBlZWticWI3NzlvaGg2Ym4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY3OTQ2NzEyMzA5MjA4NTQ0MTUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODQxMzU5MzUzOTg4LThiMzVsNWFwZTFuYzdyYzR0cm9pYWpqbHRwbWI5cXFkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJkcGFzdHVzZWtAZ21haWwuY29tIiwiaWF0IjoxNDU1MTQwMDQyLCJleHAiOjE0NTUxNDM2NDIsIm5hbWUiOiJEYW4gUGFzdHVzZWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0yMXV3LVVaMmttMC9BQUFBQUFBQUFBSS9BQUFBQUFBQUZsdy9QcjVLdDdVckxaay9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiRGFuIiwiZmFtaWx5X25hbWUiOiJQYXN0dXNlayIsImxvY2FsZSI6ImVuIn0.DcCxKOoMHVUBIppiJDBqLMPUoJk_FMv9RAQNl8mh7HNia3iq5jQCNIea0h3B6-akf7vxfp__b4f3N59qnOcmd4zdAYCT7zO5YubHhyeoOXENwueoTbKzexoNmZMPDZUrKqj-4sAqscHuiJmT2Nwwkdu2g8cFxI0-TpQVHAspJJJ5r_oMP45kdeRpwYV2R7Azct-vYs6QxQaQMn6_azm9Va7HckEop4my8wMoCfAbF1gDiB-JNW63QSzBFBK7SMNXOcrkssoGP3zXdfqjIdU1MK3Wx6i8zqEiV1IrI8XglvWnhIO7z0R_8AAG37DruKNg3HtGRgNtt0grE48ELnQ-zA");

    let settings1 = {
        "url": "https://api.imgur.com/3/gallery/"+id+"/comments/best",
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

    $.getJSON(settings1, (data2) => {
        console.log(data2);
        data2.data.forEach((result, idx) => {
            console.log(result)
            modalText += result.author + ": " + result.comment + "\n"
            console.log(modalText)
            let text = document.getElementById("textBox");
            text.innerText = modalText
        })

    });

    // When the user clicks the button, open the modal
    let text = document.getElementById("textBox");
    text.innerText = modalText
    modal.style.display = "block";

}