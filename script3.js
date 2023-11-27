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
  .attr("class", "tooltip-container")
  .style("opacity", 0);  // Set opacity to 0 to hide tooltips by default

// Load your dataset
d3.csv("data/BigNumbers_Clean.csv", d => d).then(data => {
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
    .attr("fill", "cyan");

  // Create invisible rectangles for trigger areas
  const triggerAreas = svg4.selectAll("g.trigger-area")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "trigger-area")
    .on("mouseover", function (event, d) {
      handleMouseOver(event, d);
    })
    .on("mouseout", function () {
      // Removed the handleMouseOut function to prevent hiding tooltips
    });

  triggerAreas.append("rect")
    .attr("class", "trigger-area-rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", d => d.Number % 800 - 5) // Adjust x position
    .attr("y", d => Math.floor(d.Number / 800) - 5) // Adjust y position
    .attr("fill", "none")
    .attr("pointer-events", "all"); // Ensure the invisible rectangle captures events

  // Create dynamic tooltips in the margins
  const tooltipMargin = 10; // Adjust as needed

  data.forEach(d => {
    const xPosition = d.Number % 800;
    const yPosition = Math.floor(d.Number / 800);

    // Append foreignObject for the dynamic tooltip to the tooltipContainer
    const tooltipContainer = svg4Container
      .append("div")
      .attr("class", `tooltip-container tooltip-container-${d.Number}`)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("left", `${svg4.node().getBoundingClientRect().left + xPosition + margin.left + tooltipMargin}px`)
      .style("top", `${svg4.node().getBoundingClientRect().top + yPosition + margin.top + tooltipMargin}px`);

    // Append xHTML content to the foreignObject
    const tooltipDiv = tooltipContainer.append("xhtml:div")
      .style("background", "white")
      .style("padding", "5px")
      .style("border", "1px solid black");

    // Add text to the tooltip
    tooltipDiv.append("p")
      .text(`Number: ${d.Number}`);

    tooltipDiv.append("p")
      .text(`Description: ${d.Description_short}`);

    // Calculate and set height based on content
    const tooltipHeight = tooltipDiv.node().getBoundingClientRect().height;
    tooltipContainer.style("height", `${tooltipHeight}px`);
  });

  // Function to handle mouseover event
  const handleMouseOver = (event, d) => {
    // Show tooltip immediately with no transition
    svg4Container.selectAll(".tooltip-container").style("opacity", 0);
    const tooltip = svg4Container.select(`.tooltip-container-${d.Number}`);
    tooltip.style("opacity", 1).style("z-index", 9999);

    // Update tooltip content based on data
    tooltip.html(`
      <p>Number: ${d.Number}</p>
      <p>Description: ${d.Description_short}</p>
    `);
  };
});