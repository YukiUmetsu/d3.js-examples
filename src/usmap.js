var election = new Datamap({
  scope: 'usa',
  element: document.getElementById('map'),
  responsive: true,
  geographyConfig: {
    highlightBorderColor: '#bada55',
    popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">' + geography.properties.name + 'Electoral Votes:' +  data.electoralVotes + ' '
    },
    highlightBorderWidth: 3
  },

  fills: {
    'Republican': '#CC4731',
    'Democrat': '#306596',
    'Heavy Democrat': '#667FAF',
    'Light Democrat': '#A9C0DE',
    'Heavy Republican': '#CA5E5B',
    'Light Republican': '#EAA9A8',
    defaultFill: '#EDDC4E'
  },
  data:{
    "AZ": {
      "fillKey": "Republican",
      "electoralVotes": 5
    },
    "CO": {
      "fillKey": "Light Democrat",
      "electoralVotes": 5
    },
    "DE": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "FL": {
      "fillKey": "UNDECIDED",
      "electoralVotes": 29
    },
    "GA": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "HI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ID": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "IL": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "IN": {
      "fillKey": "Republican",
      "electoralVotes": 11
    },
    "IA": {
      "fillKey": "Light Democrat",
      "electoralVotes": 11
    },
    "KS": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "KY": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "LA": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "MD": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ME": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MN": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "MS": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "MO": {
      "fillKey": "Republican",
      "electoralVotes": 13
    },
    "MT": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NC": {
      "fillKey": "Light Republican",
      "electoralVotes": 32
    },
    "NE": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NV": {
      "fillKey": "Heavy Democrat",
      "electoralVotes": 32
    },
    "NH": {
      "fillKey": "Light Democrat",
      "electoralVotes": 32
    },
    "NJ": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "NY": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "ND": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "NM": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "OH": {
      "fillKey": "UNDECIDED",
      "electoralVotes": 32
    },
    "OK": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "OR": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "PA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "RI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "SC": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "SD": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "TN": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "TX": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "UT": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "WI": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "VA": {
      "fillKey": "Light Democrat",
      "electoralVotes": 32
    },
    "VT": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "WA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "WV": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "WY": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "CA": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "CT": {
      "fillKey": "Democrat",
      "electoralVotes": 32
    },
    "AK": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "AR": {
      "fillKey": "Republican",
      "electoralVotes": 32
    },
    "AL": {
      "fillKey": "Republican",
      "electoralVotes": 32
    }
  }
});
election.labels();

// d3.selectAll('svg')
//   .call(responsivefy);


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
