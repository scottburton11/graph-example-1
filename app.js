var width = $(window).width()
var height = $(window).height()

var nodes = [
  {id: 1, size: 15, color: "#1f77b4", x: width/2, y: height/2},
  {id: 2, size: 12, color: "#bcbd22"},
  {id: 3, size: 12, color: "#bcbd22"},
  {id: 4, size: 12, color: "#bcbd22"},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10}
]

var links = [
  {source: 0, target: 1, length: 120},
  {source: 0, target: 2, length: 120},
  {source: 0, target: 3, length: 120},
  {source: 1, target: 4},
  {source: 1, target: 5},
  {source: 2, target: 6},
  {source: 2, target: 7},
  {source: 3, target: 8},
  {source: 3, target: 9},
]

var force = d3.layout.force()
  .nodes(nodes)
  .links(links)
  .size([width, height])
  .linkStrength(0.1)
  .friction(0.9)
  .distance(function(d) { return d.length || 20 })
  .charge(-50)
  .gravity(0.001)
  .theta(0.8)
  .alpha(0.05)
  .on("tick", tick)


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");


function update() {
  var nodes = force.nodes();
  var links = force.links();
  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update the links…
  link = link.data(links, function(d) { return d.target.id; });
  node = node.data(nodes, function(d) { return d.id; });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Exit any old nodes.
  node.exit().remove();

  // Enter any new nodes.
  node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.size || 7; })
      .style("fill", function(d){ return d.color || "#7c7c7c" })
      .call(force.drag)
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

update();