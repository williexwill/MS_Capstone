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
d3.csv("data/BigNumbers_Clean.csv", (data, i) => {
  // Assign an index to each data point
  data.index = i;

  // Highlight specific pixels based on the dataset
  svg4.selectAll("rect.highlight")
    .data([data]) // Use an array with a single element for each data point
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

  // Create lines and dynamic tooltips in the margins
  const tooltipMargin = 10; // Adjust as needed

  const xPosition = data.Number % 800 + margin.left + tooltipMargin;
  const yPosition = Math.floor(data.Number / 800) + margin.top + tooltipMargin;

  // Append foreignObject for the dynamic tooltip to the tooltipContainer
  const foreignObject = tooltipContainer.append("div")
    .attr("class", "dynamic-tooltip")
    .style("position", "absolute")
    .style("left", `${svg4Container.node().getBoundingClientRect().left + xPosition}px`)
    .style("top", `${svg4Container.node().getBoundingClientRect().top + yPosition}px`)
    .style("opacity", 0); // Set initial opacity to 0

  // Append xHTML content to the foreignObject
  const tooltipDiv = foreignObject.append("xhtml:div")
    .style("background", "white")
    .style("padding", "5px")
    .style("border", "1px solid black");

  // Add text to the tooltip
  tooltipDiv.append("p")
    .text(`Number: ${data.Number}`);

  tooltipDiv.append("p")
    .text(`Description: ${data.Description_short}`);

  // Store the foreignObject in the data
  data.foreignObject = foreignObject;
});

// Handle mouseover event
function handleMouseOver(data) {
  data.foreignObject.style("opacity", 1); // Set opacity to 1 on mouseover
  console.log("mouseover", data.index);
}

// Handle mouseout event
function handleMouseOut(data) {
  data.foreignObject.style("opacity", 0); // Set opacity to 0 on mouseout
  console.log("mouseout", data.index);
}