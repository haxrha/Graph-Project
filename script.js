 // Sample data for the grouped bar chart
 var data = [
    { month: 'Jan', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Feb', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'March', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'April', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'May', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'June', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'July', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Aug', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Sep', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Oct', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Nov', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
    { month: 'Dec', group1: Math.floor(Math.random() * 100), group2: Math.floor(Math.random() * 100) },
  ];

  
  var colors = ['#aa204f',
'#2f36ba'];

  // Set up the D3.js chart
  var margin = { top: 30, right: 30, bottom: 50, left: 50 };
  var width = 1000 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  var yScale = d3.scaleLinear()
    .domain([0, 100]) // Assuming the range of y-axis data is between 0 and 100
    .range([height, 0]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  var dottedLineYValues = [10, 20, 30,40,50,60,70,80,90,100]; // Adjust as needed
  var dottedLines = svg.selectAll(".dotted-line")
    .data(dottedLineYValues)
    .enter()
    .append("line")
    .attr("class", "dotted-line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", function(d) { return yScale(d); })
    .attr("y2", function(d) { return yScale(d); });
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  var groups = svg.selectAll("g.group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", function(d) { return "translate(" + xScale(d.month) + ",0)"; });

  var barWidth = xScale.bandwidth() / 3; // Separation between bars in each group
  var tooltip = d3.select("#chart-container")
    .append("div")
    .attr("class", "tooltip")
    .style("display", "none");
  var bars = groups.selectAll("rect")
      
    .data(function(d) { return [d.group1, d.group2]; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) { return i * (barWidth + 2); }) // Adjusted positioning of bars
    .attr("y", function(d) { return yScale(d) - 1; }) // Adjusted to make the bottom flat
    .attr("width", barWidth)
    .attr("height", function(d) { return height - yScale(d) + 1; }) // Adjusted to make the bottom flat
    .attr("fill", function(d, i) { return colors[i]; })
    .attr("rx", 14) // Set the border-radius for rounded corners
    .on("mouseover", function(event, d) {
      tooltip.style("display", "block");
      var month = d3.select(this.parentNode).datum().month;
      tooltip.html(month +": "+ d)
      .style("top", (event.pageY-200)+"px")
          .style("left",(event.pageX-200)+"px")
      })
      .on("mouseout", function() {
          tooltip.style("display", "none");
      })
    .attr("ry", 10);
   