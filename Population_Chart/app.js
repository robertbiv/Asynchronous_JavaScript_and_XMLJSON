window.onload = async () => {
//Read the data
    d3.json("https://datausa.io/api/data?drilldowns=Nation&measures=Population", function(error, d) {

        let data = d.data;
        //data.forEach(function(d){ d.Year,d.Population});

        //console.log(data);
        if (error) throw error;

        var svg = d3.select("svg"),
            margin = {top: 40, right: 30, bottom: 60, left: 70},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .rangeRound([0, width])


        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var line = d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(d.Population); });

        x.domain(d3.extent(data, function(d) { return d.Year }));
        y.domain(d3.extent(data, function(d) { return d.Population; }));

       /* g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            //.attr("x", "-20")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" )
            //.attr("class", "axis")
            //.attr("x",22)
            //.attr("dx", "5em")
            //.remove();*/
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("fill", "#000")
            .attr("x",width)
            .attr("y",-15)
            .attr("dy","0.71em")
            .attr("text-anchor", "end")
            .text("Year");
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("People (In numbers)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    });
}
