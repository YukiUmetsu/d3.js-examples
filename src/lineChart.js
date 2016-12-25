var margin = { top: 20, right: 50, bottom: 60, left: 50 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var fullWidth = width + margin.left + margin.right;
var fullHeight = height + margin.top + margin.bottom;

// create g element whose axis already moved to top-right
var svg = d3.select('.chart')
  .append('svg')
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  .call(responsivefy)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

d3.json('../data/stocks.json', function(err, data){

  var parseTime = d3.timeParse("%Y/%m/%d");
  var circleDataA = [];
  var circleDataB = [];

 data.forEach(company => {
    company.values.forEach(value => {
      value.date = parseTime(value.date);
      value.close = +value.close;
      if (company.ticker == "AMZN") {
        circleDataA.push({date: value.date, close: value.close});
      } else {
        circleDataB.push({date: value.date, close: value.close});
      }
    });
  });

  var xScale = d3.scaleTime()
    .domain([
      // companies の中の values の中の date の最小と最大
      d3.min(data, co=> d3.min(co.values, d=> d.date)),
      d3.max(data, co=> d3.max(co.values, d=> d.date))
    ])
    .range([0, width]);

  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5));

  var yScale = d3.scaleLinear()
      .domain([
        d3.min(data, co=> d3.min(co.values, d=> d.close)),
        d3.max(data, co=> d3.max(co.values, d=> d.close))
      ])
      .range([height, 0]);

  // attach xAxis at the bottom
  svg
    .append('g')
    .call(d3.axisLeft(yScale));

  // line creation
  var line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.close))
    .curve(d3.curveCatmullRom.alpha(0.5));

  // draw line
  svg
    .selectAll('.line')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => ['#FF9900', '#2980b9'][i])
    .style('stroke-width', 2)
    .style('fill', 'none');

    drawDots(circleDataA, 'ball', xScale, yScale, 3, '12px', 'red', 'red');
    drawDots(circleDataB, 'dots', xScale, yScale, 3, '12px', 'blue', 'blue');

    drawAxisLabel(svg, '#FF9900', 'Amazon', 'black', '12px', 50, 30);
    drawAxisLabel(svg, '#2980b9', 'Google', 'black', '12px', 50, 50);
});

function drawAxisLabel(svg, lineColor, text, textColor, textSize, x, y){
  svg.append('line')
    .attr('class', 'label')
    .attr('x1', x)
    .attr('x2', x + 25)
    .attr('transform', 'translate(0,' + y + ')')
    .style('stroke', lineColor)
    .style('stroke-width', 2)
    .style('fill', 'none');

  svg.append('text')
    .style('text-anchor', 'middle')
    .style('fill', textColor)
    .style('font-size', textSize)
    .attr('transform', `translate(${x+50},${y})`)
    .attr('class', 'labeltext')
    .attr('y', 4)
    .text(text);
}

function drawDots(givenData, className, xScale, yScale, radius = 3, textSize = '10px', textColor = 'black', dotColor = 'black'){
  var gForCircles = svg
    .selectAll('.' + className)
    .data(givenData)
    .enter()
    .append('g')
    .attr('class', className)
    .attr('transform', d => {
      return `translate(${xScale(d.date)}, ${yScale(d.close)})`;
    });

  // drawing circles on g
  gForCircles
    .append('circle')
    .attr('cx', d => 0)
    .attr('cy', d => 0)
    .attr('r', radius)
    .style('fill-opacity', 0.5)
    .style('fill', dotColor);

  // adding text to g
  gForCircles
    .append('text')
    .style('text-anchor', 'middle')
    .style('fill', textColor)
    .style('font-size', textSize)
    .attr('class', 'dot-text')
    .attr('y', 4)
    .text(d => `${d.close}-${dateFormat(d)}`);

}


function dateFormat(d) {
  return d.date.getFullYear() + '/' + (d.date.getMonth() + 1) + '/' + d.date.getDate();
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
