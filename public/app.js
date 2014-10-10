var width = $(window).width()
var height = $(window).height()

var force, link, node;

d3.json("./data.json", function(data){
  var nodes = data.nodes
  var links = data.links

  force = d3.layout.force()
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

  link = svg.selectAll(".link");
  node = svg.selectAll(".node");
  group = svg.selectAll(".group")

  update();
})



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
  node
    .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.size || 7; })
      .style("fill", function(d){ return d.color || "#7c7c7c" })
      .text(function(d){ return d.title })
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
