var margin = { top: 5, right: 60, bottom: 5, left: 200 };
var width = 600 - margin.left - margin.right;
var height = 330 - margin.top - margin.bottom;
var fullWidth = width + margin.left + margin.right;
var fullHeight = height + margin.top + margin.bottom;

var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal()
  .range(["#1abc9c", "#3498db", "#9b59b6", "#6b486b", "#f1c40f", "#e67e22", "#95a5a6"]);

// create g element whose axis already moved to top-right
var svg = d3.select('.chart')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .call(responsivefy)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('transform', 'translate(' + radius + ',' + radius + ')');


var arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

var labelArc = d3.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

var pie = d3.pie()
  .value(function(d) { return d.population; });

d3.csv("../data/age-population.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .style("fill", function(d) { return color(d.data.age); })
    .transition()
    .duration(2000)
    .attrTween("d", tweenPie);

  g.append("text")
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .transition()
    .delay(2000)
    .text(function(d) { return d.data.age; });

  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
    return function(t) { return arc(i(t)); };
  };
});

function type(d) {
  d.population = +d.population;
  return d;
}

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}