const margin = { top: 50, right: 50, bottom: 50, left: 50 };

// Function to create SVG
function createSVG(containerId, width, height) {
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  return svg;
}

// Function to create rectangles
function createRectangles(svg, data, className, width, height, fill) {
  svg.selectAll(`rect.${className}`)
    .data(data)
    .enter()
    .append("rect")
    .attr("class", className)
    .attr("width", width)
    .attr("height", height)
    .attr("x", d => xScale(d.Number))
    .attr("y", d => yScale(d.Number))
    .attr("fill", fill)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
}

// Load your dataset
d3.csv("data/BigNumbers_Clean.csv", data => {
  // Create scales
  const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Number)]).range([0, 800]);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Number)]).range([0, 1250000]);

  // SVG 1
  const svg1Container = d3.select("#svg-container-1");
  const svg1 = createSVG("svg-container-1", "100%", "auto");

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

  // SVG 2
  const svg2 = createSVG("svg-container-2", "100%", "auto");
  createRectangles(svg2, data, "rect2", 100, 100, "black");

  // SVG 3
  const svg3 = createSVG("svg-container-3", "100%", "auto");
  createRectangles(svg3, data, "rect3", 800, 1250, "black");

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

  // Highlight specific pixels based on the dataset
  const highlights = svg4.selectAll("rect.highlight")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "highlight")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", d => xScale(d.Number) % 800) // Remainder for x
    .attr("y", d => Math.floor(yScale(d.Number) / 800)) // Division for y
    .attr("fill", "cyan")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  // Create lines and dynamic tooltips in the margins
  const tooltipMargin = 10; // Adjust as needed

  data.forEach((d, index) => {
    const xPosition = xScale(d.Number) % 800;
    const yPosition = Math.floor(yScale(d.Number) / 800);

    // Create a line from the pixel/rectangle to the tooltip
    svg4.append("line")
      .attr("class", "tooltip-line")
      .attr("x1", xPosition)
      .attr("y1", yPosition)
      .attr("x2", xPosition)
      .attr("y2", yPosition)
      .attr("stroke", "white");

    // Append foreignObject for the dynamic tooltip to the tooltipContainer
    const foreignObject = tooltipContainer.append("div")
      .attr("class", "dynamic-tooltip")
      .style("position", "absolute")
      .style("left", `${svg4Container.node().getBoundingClientRect().left + xPosition + margin.left + tooltipMargin}px`)
      .style("top", `${svg4Container.node().getBoundingClientRect().top + yPosition + margin.top + tooltipMargin + window.scrollY}px`)
      .attr("data-index", index);

    // Append xHTML content to the foreignObject
    const tooltipDiv = foreignObject.append("xhtml:div")
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
    foreignObject.style("height", `${tooltipHeight}px`);
  });

  // Mouseover event handler
  function handleMouseOver(d) {
    // Select the corresponding tooltip
    const tooltip = d3.select(`.dynamic-tooltip[data-index='${d.index}']`);

    // Transition the tooltip's opacity to full over 0.5 seconds
    tooltip.transition().duration(500).style("opacity", 1);

    // Log information
    console.log("mouseover", d.index);
  }

  // Mouseout event handler
  function handleMouseOut(d) {
    // Select the corresponding tooltip
    const tooltip = d3.select(`.dynamic-tooltip[data-index='${d.index}']`);

    // Transition the tooltip's opacity to 0 over 2 seconds
    tooltip.transition().duration(2000).style("opacity", 0);

    // Log information
    console.log("mouseout", d.index);
  }
});