var margin = { top: 20, right: 30, bottom: 60, left: 40 };
var width = 425 - margin.left - margin.right;
var height = 625 - margin.top - margin.bottom;
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


var yScale = d3.scaleLinear()
  .domain([0,100])
  .range([height, 0])
  .nice();

var yAxis = d3.axisLeft(yScale);
svg.call(yAxis);

var xScale =
  d3.scaleLinear()
    .domain([0,100])
    .range([0, width]);

var xAxis = d3.axisBottom(xScale)
  .ticks(5);

// attach xAxis at the bottom
svg
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);



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
