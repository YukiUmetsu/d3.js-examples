var margin = { top: 50, right: 100, bottom: 60, left: 60 };
var width = 625 - margin.left - margin.right;
var height = 350 - margin.top - margin.bottom;
var fullWidth = width + margin.left + margin.right;
var fullHeight = height + margin.top + margin.bottom;

// create g element whose axis already moved to top-right
var svg = d3.select('.chart')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .call(responsivefy)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json('../data/countries.json', function (err, data) {
  if (err){
    console.log(err);
  }
  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.expectancy))
    .range([height, 0])
    .nice();

  var yAxis = d3.axisLeft(yScale);
  svg.call(yAxis);

  var xScale =
    d3.scaleLinear()
      .domain(d3.extent(data, d => d.cost))
      .range([0, width])
      .nice();

  var xAxis = d3.axisBottom(xScale)
    .ticks(5);

// attach xAxis at the bottom
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, 40]);

  var gForCircles = svg
    .selectAll('.ball')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'ball')
    .attr('transform', d => {
      return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`;
    });

  // drawing circles on g
  gForCircles
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => rScale(d.population))
    .style('fill-opacity', 0.5)
    .style('fill', 'steelblue');

  // adding text to g
  gForCircles
    .append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('y', 4)
    .text(d => d.code);

  // Axis Labels
  drawAxisLabel(svg, 'Life Expectancy (yrs)', '9px', 'black', 5, -25);
  drawAxisLabel(svg, 'Medical Cost', '10px', 'black', width + 50, height);
  drawAxisLabel(svg, '*The area of circles represent population', '10px', 'black', 70, height+50);
});

function drawAxisLabel(svg, text, textSize, textColor, x, y){
  svg.append('text')
    .style('text-anchor', 'middle')
    .style('fill', textColor)
    .style('font-size', textSize)
    .attr('transform', `translate(${x},${y})`)
    .attr('class', 'labeltext')
    .attr('y', 4)
    .text(text);
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
