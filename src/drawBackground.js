const radius1 = 80;
const radius2 = 180;
const radius3 = 310;
const radius4 = 440;
let margin = { top: 5, right: 60, bottom: 5, left: 100 };
let headerWidth = $('.header').width();
let headerHeight = $('.header').height();
let width = headerWidth - margin.left - margin.right;
let height = headerHeight - margin.top - margin.bottom;
let fullWidth = width + margin.left + margin.right;
let fullHeight = height + margin.top + margin.bottom;
let transX = width/2 + margin.left;
let transY = height/2;

let data1 = createCircleData(radius1, 0, 30, 300);
let data2 = createCircleData(radius2, 90, 15, 400);
let data3 = createCircleData(radius3, 180, 10, 500);
let data4 = createCircleData(radius4, 360, 8, 700);
// create g element whose axis already moved to top-right
let svg = d3.select('.header')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .call(responsivefy)
  .append('g')
    .attr("transform", `translate(${transX}, ${transY})`);

drawDots(svg, radius1, data1, 'bg-ball', 2, null, null, 'none', 'rgb(3,196,235)');
drawDots(svg, radius2, data2, 'bg-ball2', 2, null, null, 'none', 'rgb(3,196,235)');
drawDots(svg, radius3, data3, 'bg-ball3', 2, null, null, 'none', 'rgb(3,196,235)');
drawDots(svg, radius4, data4, 'bg-ball4', 2, null, null, 'none', 'rgb(3,196,235)');

// draw header title
let text =
  svg.append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '2.5rem')
    .attr('class', 'd3-title')
    .text('d3.js chart examples');

function drawDots(svg, circleRadius, givenData, className, radius = 3, textSize = '10px', textColor = 'black', fillColor = 'black', strokeColor = 'black'){
  let svgForCircle =
    svg
    .append('g')
    .attr('width', circleRadius)
    .attr('height', circleRadius)
    .attr('class', `avgFor${className}`)
    .attr('class', 'rotate-animation');

  var gForDot =
    svgForCircle
    .selectAll('.' + className)
    .data(givenData)
    .enter()
    .append('g')
    .attr('class', className)
    .attr('transform', d => {
      return `translate(${d.x}, ${d.y})`;
    });

  gForDot
    .append('circle')
    .attr('cx', d => 0)
    .attr('cy', d => 0)
    .attr('r', radius)
    .style('stroke', strokeColor)
    .style('fill', fillColor);
}


function createCircleData(radius, initialAngle, angle, maxAngle) {
  let data = [];
  let i = initialAngle;
  while(i < maxAngle){
    let x = radius * Math.sin(i * (Math.PI / 180));
    let y = radius * Math.cos(i * (Math.PI / 180));
    data.push({x: x, y: y});
    i += angle;
  }
  return data;
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