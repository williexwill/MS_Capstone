const margin = { top: 50, right: 50, bottom: 50, left: 50 }; // Add margins as needed

//SVG 1
const svg1 = d3.select("#svg-container-1")
  .append("svg")
  .attr("width", "100%")  // Set width to 100% for flexibility
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a cyan circle
svg1.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 20)
  .attr("fill", "none")
  .attr("stroke", "cyan")
  .attr("stroke-width", 2);

// Create a black pixel within the circle
svg1.append("rect")
  .attr("width", 1)
  .attr("height", 1)
  .attr("x", -1)  
  .attr("y", -1)  
  .attr("fill", "black");

//SVG 2
const svg2 = d3.select("#svg-container-2")
  .append("svg")
  .attr("width", "100%")  
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a 1,000 pixel rectangle
svg2.append("rect")
.attr("width", 100)
.attr("height", 100)
.attr("x", 0)  
.attr("y", 0)  
.attr("fill", "black");

//SVG 3
const svg3 = d3.select("#svg-container-3")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 1250)
  //.attr("height", "auto")   
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a 1,000,000 pixel rectangle
svg3.append("rect")
.attr("width", 800)
.attr("height", 1250)
.attr("x", 0)  
.attr("y", 0)  
.attr("fill", "black");


// SVG 4
const svg4Container = d3.select("#svg-container-4");
const svg4 = svg4Container
  .append("svg")
  .attr("width", "100%")
  .attr("height", 1250000)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a 1,000,000,000 pixel rectangle
svg4.append("rect")
  .attr("width", 800)
  .attr("height", 1250000)
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "black");

// Create a separate container for tooltips
const tooltipContainer = svg4Container
  .append("div")
  .attr("class", "tooltip-container");

// Load your dataset
d3.csv("data/BigNumbers_Clean.csv", (data) => {
  // Highlight specific pixels based on the dataset
  const highlights = svg4.selectAll("rect.highlight")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "highlight")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", d => d.Number % 800) // Remainder for x
    .attr("y", d => Math.floor(d.Number / 800)) // Division for y
    .attr("fill", "cyan")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  // Create tooltips with unique data-index attribute
  const tooltips = tooltipContainer.selectAll(".dynamic-tooltip")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "dynamic-tooltip")
    .attr("data-index", (d, i) => i) // Use index as a unique identifier
    .style("position", "absolute")
    .style("left", 0)
    .style("top", 0)
    .style("opacity", 0)
    .style("background", "white")
    .style("padding", "5px")
    .style("border", "1px solid black");

  tooltips.append("p")
    .text(d => `Number: ${d.Number}`);

  tooltips.append("p")
    .text(d => `Description: ${d.Description_short}`);

  tooltips.each(function () {
    const tooltipHeight = this.getBoundingClientRect().height;
    d3.select(this).style("height", `${tooltipHeight}px`);
  });

  // Store the foreignObject in the data
  highlights.each(function (d) {
    d.foreignObject = tooltipContainer.select(`[data-index="${d.index}"]`);
  });

  // Mouseover event handler
  function handleMouseOver(d) {
    // Select the corresponding tooltip using data-index attribute
    const tooltip = tooltipContainer.select(`[data-index="${d.index}"]`);

    // Transition the tooltip's opacity to full over 0.5 seconds
    tooltip.transition().duration(500).style("opacity", 1);

    // Log information
    console.log("mouseover", d.index);
  }

  // Mouseout event handler
  function handleMouseOut(d) {
    // Select the corresponding tooltip using data-index attribute
    const tooltip = tooltipContainer.select(`[data-index="${d.index}"]`);

    // Transition the tooltip's opacity to 0 over 2 seconds
    tooltip.transition().duration(2000).style("opacity", 0);

    // Log information
    console.log("mouseout", d.index);
  }
});
