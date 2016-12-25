var data = [
  {name: 'Alice', math: 37, science: 62, language: 54},
  {name: 'Billy', math: null, science: 34, language: 85},
  {name: 'Cindy', math: 86, science: 48, language: null},
  {name: 'David', math: 44, science: null, language: 65},
  {name: 'Emily', math: 59, science: 73, language: 29},
];

var margin = { top: 10, right: 50, bottom: 60, left: 50 };
var width = 650 - margin.left - margin.right;
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


var yScale = d3.scaleLinear()
  .domain([0,100])
  .range([height, 0]);

var yAxis = d3.axisLeft(yScale);
svg.call(yAxis);

var xScale =
  d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2);

var xAxis = d3.axisBottom(xScale)
  .ticks(5)
  .tickSizeInner(10)
  .tickSizeOuter(20)
  .tickPadding(15);

// attach xAxis at the bottom
svg
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('transform', 'rotate(-45)');

render();

function render(subject = 'math') {
  var t = d3.transition().duration(1000);

  var update = svg.selectAll('rect')
    .data(data.filter(d => d[subject]), d => d.name); // it has to have subject property

  // remove element without no data
  update.exit()
    .transition(t)
    .attr('y', height)
    .attr('height', 0)
    .remove();

  update
    .transition(t)
    .attr('y', d=> yScale(d[subject]))
    .attr('height', d=> height - yScale(d[subject]));

  // new element
  var enter =
    update.enter()
    .append('rect')
      .attr('y', height) // starting point = bottom of y axis
      .attr('height', 0) // initial height = 0
      .attr('x', d=> xScale(d.name))
      .attr('width', d=> xScale.bandwidth())
      .transition(t)
      .attr('y', d => yScale(d[subject]))
      .attr('height', d => height - yScale(d[subject]));

  enter
    .append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '12px')
    //.attr('class', 'dot-text')
    .attr('y', 4)
    .text(d => d[subject]);
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
