// scaleLinear  0->0, 100->600, 50->300 にマッピング
var linearScale =
  d3.scaleLinear()
      .domain([0,100])  // input limit
      .range([0,600])   // output limit
      .clamp(true);     // if actual input exceed the limitation,

console.log("**---------------scaleLinear---------------**\n");
console.log(linearScale(50));
console.log(linearScale(-20));
console.log(linearScale(105));
console.log(linearScale.invert(300));
console.log("**-----------------------------------------**\n");

// scaleTime
var timeScale
  = d3.scaleTime()
  // 2016/1/1 から今まで
  .domain([new Date(2016, 0, 1), new Date()])
  .range([0, 100]);

console.log("**---------------scaleTime---------------**\n");
// 2016/1/1 から今までの中間の時間
console.log(timeScale.invert(50));
console.log("**---------------------------------------**\n");

// scaleQuantize 一番近くの値に変換
var quantizeScale
  = d3.scaleQuantize()
  .domain([0,100])
  .range(["red", "white", "green"]);

console.log("**---------------scaleQuantize---------------**\n");
console.log(quantizeScale(22));
console.log(quantizeScale(50));
console.log(quantizeScale(88));
console.log(quantizeScale.invertExtent('white'));
console.log("**--------------------------------------------**\n");


console.log("**---------------loading data---------------**\n");
d3.json('data/dummy.json', function (data) {
  console.log(data);
  var minAge = d3.min(data, function (d) {
    return d.age;
  });

  var extent = d3.extent(data, function (d) {
    return d.age;
  });

  var ages = d3.set(data, function (d) {
    return d.age;
  });

  console.log("minimum age : " + minAge);
  console.log("min and max age : " + extent);
  console.log(ages.values());
});


d3.select('.title')  // get element with title class
  .append('button')  // create button and add it
    .attr('href', 'http://google.com')
    .style('color', 'red')
    .html('Inventory <b>SALE</b>');


var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];

d3.select('.chart')
  .selectAll('div')
  .data(scores)
  .enter()
    .append('div')
    .text(function (d) {
      return d.name;
    })
    .style('width', d => d.score + 'px')
    .attr('class', 'bar');

var bar = d3.select('.chart-svg')
  // create svg
  .append('svg')
    .attr('width', 225)
    .attr('height', 300)
  .selectAll('g')
  .data(scores)
  .enter()
  // create g, like a div element in svg
    .append('g')
    .attr('transform', (d, i) => 'translate(0, ' + i * 35 + ')');

// create a rect in g element
bar.append('rect')
  .style('width', d => d.score)
  .attr('class', 'bar-svg')
  .on('mouseover', function (d, i, elements) {
    d3.select(this)
      .call(scaleBar, 2)
      .call(setFill, 'orange');

    // make not hovered element fade
    d.selectAll(elements)
      .filter(':not(:hover)')
      .call(fade, 0.5);
  })
  .on('mouseout', function (d, i, elements) {
    d3.select(this)
      .call(scaleBar, 1)
      .call(setFill, 'lightgreen');
  })

// create a text, y=0 is bottom of g
bar.append('text')
  .attr('y', 20)
  .text(function (d) {
    return d.name;
  });


function scaleBar(selection, scale) {
  selection.style('transform', 'scaleX(' + scale + ')');
}
function fade(selection, opacity) {
  selection.style('fill-opacity', opacity);
}
function setFill(selection, color) {
  selection.style('fill', color)
}