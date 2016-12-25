let isOpen = false;

function clicked(classname, color) {
  if (!isOpen){
    d3.select(`.${classname}`)
      .transition()
      .call(configure, 100, 1000)
      .style('width', '400px')
      .style('background-color', color);
    isOpen = true;
  } else {
    d3.select(`.${classname}`)
      .transition()
      .call(configure, 100, 1000)
      .style('width', '50px')
      .style('background-color', 'lightgray');
    isOpen = false;
  }
}

function configure(t, delay, duration) {
 return t.delay(delay).duration(duration);
}