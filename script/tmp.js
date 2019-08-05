// https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad

        function buildBar(data){
          var barTooltip = d3.select("body").append("div")
            .attr("class","tooltip")
          
          var margin = {top: 20, right: 80, bottom: 30, left: 80},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
          
          
          var x0 = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          var x1 = d3.scale.ordinal();

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x0)
              .tickSize(0)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var color = d3.scale.ordinal()
              .range(["#92c5de","#d5d5d5","#DDB098","#ca0020"]);


          var svg = d3.select("#filter_container").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var categoriesNames = data.map(function(d) { return d.categorie; });
          var rateNames = data[0].values.map(function(d) { return d.rate; });

          x0.domain(categoriesNames);
          x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
          y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .style('opacity','0')
              .call(yAxis)
          .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .style('font-weight','bold')
              .text("Value");

          svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');


          var slice = svg.selectAll(".slice")
              .data(data)
              .enter().append("g")
              .attr("class", "bar")
              .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

          slice.selectAll("rect")
              .data(function(d) { return d.values; })
          .enter().append("rect")
              .attr("width", x1.rangeBand())
              .attr("x", function(d) { return x1(d.rate); })
              .style("fill", function(d) { return color(d.rate) })
              .attr("y", function(d) { return y(0); })
              .attr("height", function(d) { return height - y(0); })
              .on("mouseover", function(d) {
                  d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
                  barTooltip.transition()
                    .duration(500)
                    .style("opacity", .9);
                  var valueDecimal = d.value;
                  if(d.value<1){
                    valueDecimal = d3.format(",.4f")(valueDecimal);
                  }
                  var tip =  "<strong> Value: </strong> "+ valueDecimal +"<br/>";
                  var tip = tip + "<strong> Category: </strong> "+ d.rate +"<br/>";
                  
                  barTooltip.html(tip)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY -28) + "px");
              })
              .on("mouseout", function(d) {
                  d3.select(this).style("fill", color(d.rate));
                  barTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
              });

          slice.selectAll("rect")
              .transition()
              .delay(function (d) {return Math.random()*1000;})
              .duration(1000)
              .attr("y", function(d) { return y(d.value); })
              .attr("height", function(d) { return height - y(d.value); });

          //Legend
          var legend = svg.selectAll(".legend")
              .data(data[0].values.map(function(d) { return d.rate; }).reverse())
          .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
              .style("opacity","0");

          legend.append("rect")
              .attr("x", width+margin.right - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", function(d) { return color(d); });

          legend.append("text")
              .attr("x", width+margin.right - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) {return d; });

          legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

          
        }


        function updateBar(data){
          d3.select("svg").remove();  
          var barTooltip = d3.select("body").append("div")
            .attr("class","tooltip")
            .style("opacity",0);
          
          var margin = {top: 20, right: 80, bottom: 30, left: 80},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
          
          
          var x0 = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          var x1 = d3.scale.ordinal();

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x0)
              .tickSize(0)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var color = d3.scale.ordinal()
              .range(["#92c5de","#d5d5d5","#DDB098","#ca0020"]);

          var svg = d3.select("#filter_container").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var categoriesNames = data.map(function(d) { return d.categorie; });
          var rateNames = data[0].values.map(function(d) { return d.rate; });

          x0.domain(categoriesNames);
          x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
          y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .style('opacity','0')
              .call(yAxis)
          .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .style('font-weight','bold')
              .text("Value");

          svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
          

          var slice = svg.selectAll(".slice")
              .data(data)
              .enter().append("g")
              .attr("class", "bar")
              .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

          slice.selectAll("rect")
              .data(function(d) { return d.values; })
          .enter().append("rect")
              .attr("width", x1.rangeBand())
              .attr("x", function(d) { return x1(d.rate); })
              .style("fill", function(d) { return color(d.rate) })
              .attr("y", function(d) { return y(0); })
              .attr("height", function(d) { return height - y(0); })
              .on("mouseover", function(d) {
                  d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
                  barTooltip.transition()
                    .duration(500)
                    .style("opacity", .9);
                  var valueDecimal = d.value;
                  if(d.value<1){
                    valueDecimal = d3.format(",.4f")(valueDecimal);
                  }
                  var tip =  "<strong> Value: </strong> "+ valueDecimal +"<br/>";
                  var tip = tip + "<strong> Rate: </strong> "+ d.rate +"<br/>";
                  
                  barTooltip.html(tip)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY -28) + "px");
              })
              .on("mouseout", function(d) {
                  d3.select(this).style("fill", color(d.rate));
                  barTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
              });

          slice.selectAll("rect")
              .transition()
              .delay(function (d) {return Math.random()*1000;})
              .duration(1000)
              .attr("y", function(d) { return y(d.value); })
              .attr("height", function(d) { return height - y(d.value); });

          //Legend
          var legend = svg.selectAll(".legend")
              .data(data[0].values.map(function(d) { return d.rate; }).reverse())
          .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
              .style("opacity","0");

          legend.append("rect")
              .attr("x", width+margin.right - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", function(d) { return color(d); });

          legend.append("text")
              .attr("x", width+margin.right - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) {return d; });

          legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

        }

        d3.json("data/data_property_type.json", function(error, data) {
              buildBar(data[6].info);

              d3.select("select")
                .on("change", function(d,i){
                  var sel = d3.select("#Filter-Type").node().value;
                  updateBar(data[sel].info);
                })


        });


      
