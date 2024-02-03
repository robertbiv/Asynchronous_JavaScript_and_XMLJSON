// List of words
let myWordz = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate"]
let words2=["model", "exemplar", "good example", "case", "instance", "illustration", "representative", "deterrent example", "lesson", "object lesson", "exercise"]
//console.log(myWordz)
//findWords("example")
//makeCloud(words2)
let wordcloudWords = []
function getInputValue() {
    // Selecting the input element and get its value
    let inputVal = document.getElementsByClassName("inputClass")[0].value;
    // Displaying the value
    runIt(inputVal);
}
async function findWords(theWord) {
    const url = 'https://wordsapiv1.p.rapidapi.com/words/'+theWord+'/synonyms';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8a97ef1df6msh56c3a97e0be09dcp1c69b6jsn156016bab5f4',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        let parsedResult = await JSON.parse(result).synonyms

        await parsedResult.forEach(d => wordcloudWords.push(d))

        //wordcloudWords.push((parsedResult.synonyms))


    } catch (error) {
        console.error(error);
    }
}
async function runIt(theWord) {
    wordcloudWords = []
    await findWords(theWord)
    console.log(wordcloudWords);
    findWordLoop()
}
function findWordLoop() {
    //wordcloudWords.forEach(d => findWords(d))
    console.log(wordcloudWords)
    makeCloud(wordcloudWords)
}


function makeCloud(myWords) {
    console.log("Make Cloud")
    console.log(myWords)
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 700 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#my_dataviz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    var layout = d3.layout.cloud()
        .size([width, height])
        .words(myWords.map(function(d) { return {text: d}; }))
        .padding(10)
        .fontSize(40)
        .on("end", draw);
    layout.start();

// This function takes the output of 'layout' above and draw the words
// Better not to touch it. To change parameters, play with the 'layout' variable above
    function draw(words) {
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
}
