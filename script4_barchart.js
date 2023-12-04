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

// SVG 5
const svg5 = d3.select("#svg-container-5")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load your dataset
d3.csv("data/StLou_clean.csv", d => ({
  Department: d.Department,
  Spending: +d.Spending
})).then(data => {
  // Set up scales and axes
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Department))
    .range([0, 600])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, 300000000])
    .range([400, 0])
    .nice();

  const xAxis = d3.axisBottom(xScale)
    .tickSize(0);

  const yAxis = d3.axisLeft(yScale)
    .ticks(5)
    .tickSizeInner(-600)
    .tickSizeOuter(0);

  // Append X and Y axes
  svg5.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(50, ${400})`)
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg5.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(50, 0)`) // Adjust the left margin for the y-axis

    .call(yAxis);

  // Function to format number as currency
const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Function to handle mouseover event for SVG5
const handleMouseOverSVG5 = (event, d) => {
  const tooltip5 = d3.select("#tooltip-svg5");
  tooltip5.transition().duration(200).style("opacity", 0.9);

  tooltip5.html(`
    <p>Department: ${d.Department}</p>
    <p>Spending: ${formatCurrency.format(d.Spending)}</p>
  `)
    .style("left", `${event.pageX}px`)
    .style("top", `${event.pageY - 28}px`);
};

// Function to define the categorical color scale for SVG5
const colorScaleSVG5 = d3.scaleOrdinal()
  .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);


// Append bars for SVG5 with categorical color
svg5.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", d => 50 + xScale(d.Department))
  .attr("width", xScale.bandwidth())
  .attr("y", d => yScale(d.Spending))
  .attr("height", d => 400 - yScale(d.Spending))
  .attr("fill", d => colorScaleSVG5(d.Department))
  .on("mouseover", function (event, d) {
    handleMouseOverSVG5(event, d);
  })
  .on("mouseout", function () {
    d3.select("#tooltip-svg5").transition().duration(500).style("opacity", 0);
  });
});   

// SVG 6
const svg6 = d3.select("#svg-container-6")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load your new dataset
d3.csv("data/BLS_2021_clean.csv", d => ({
  Category: d.Category,
  Spending: +d.Spending
})).then(data => {
  // Sort data in descending order based on Spending
  data.sort((a, b) => b.Spending - a.Spending);

  // Set up scales and axes for SVG6
  const xScale6 = d3.scaleBand()
    .domain(data.map(d => d.Category))
    .range([0, 600])
    .padding(0.1);

  const yScale6 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Spending)])
    .range([400, 0])
    .nice();

  const xAxis6 = d3.axisBottom(xScale6)
    .tickSize(0);

  const yAxis6 = d3.axisLeft(yScale6)
    .ticks(5)
    .tickSizeInner(-600)
    .tickSizeOuter(0);

  // Append X and Y axes for SVG6
  svg6.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(50, ${400})`)
    .call(xAxis6)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg6.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(50, 0)`) // Adjust the left margin for the y-axis
    .call(yAxis6);

  // Function to format number as currency
    const formatCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
  // Function to handle mouseover event for SVG6
  const handleMouseOverSVG6 = (event, d) => {
    const tooltip6 = d3.select("#tooltip-svg6");
    tooltip6.transition().duration(200).style("opacity", 0.9);

    tooltip6.html(`
      <p>Category: ${d.Category}</p>
      <p>Spending: ${formatCurrency.format(d.Spending)}</p>
    `)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY - 28}px`);
  };

// Function to define the categorical color scale for SVG5
const colorScaleSVG6 = d3.scaleOrdinal()
  .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);


// Append bars for SVG6 with categorical color
svg6.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", d => 50 + xScale6(d.Category))
.attr("width", xScale6.bandwidth())
.attr("y", d => yScale6(d.Spending))
.attr("height", d => 400 - yScale6(d.Spending))
.attr("fill", d => colorScaleSVG6(d.Category))
.on("mouseover", function (event, d) {
  handleMouseOverSVG6(event, d);
})
.on("mouseout", function () {
  d3.select("#tooltip-svg6").transition().duration(500).style("opacity", 0);
});
});

// SVG 7 - Combined Stacked Bar Chart
const svg7 = d3.select("#svg-container-7")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load both datasets
Promise.all([
  d3.csv("data/BLS_2021_clean.csv", d => ({
    Category: d.Category,
    Spending: +d.Spending
  })),
  d3.csv("data/StLou_clean.csv", d => ({
    Category: d.Department, // Rename Department to Category for consistency
    Spending: +d.Spending
  }))
]).then(data => {
  const [dataBLS, dataStLou] = data;

  // Combine datasets and add a 'Set' property
  const combinedData = [
    ...dataBLS.map(d => ({ Category: d.Category, Spending: d.Spending, Set: 'Yearly household expenses' })),
    ...dataStLou.map(d => ({ Category: d.Category, Spending: d.Spending, Set: 'Yearly municipal expenses' }))
  ];

  // Set up scales and axes for SVG7
const xScale7 = d3.scaleBand()
.domain([...new Set(combinedData.map(d => d.Set))])
.range([0, 600])
.padding(0.1);

const yScale7 = d3.scaleLinear()
.domain([0, 100000]) // Set initial y-axis domain to 0–100,000
.range([400, 0])
.nice();

const xAxis7 = d3.axisBottom(xScale7)
.tickSize(0);

const yAxis7 = d3.axisLeft(yScale7)
.ticks(5)
.tickSizeInner(-600)
.tickSizeOuter(0);

// Append X and Y axes for SVG7
svg7.append("g")
.attr("class", "x-axis")
.attr("transform", `translate(50, ${400})`)
.call(xAxis7)
.selectAll("text")
.attr("y", 10)
.attr("x", -5)
.attr("dy", ".35em")
.attr("transform", "rotate(-45)")
.style("text-anchor", "end");

svg7.append("g")
.attr("class", "y-axis")
.attr("transform", `translate(50, 0)`)
.call(yAxis7);

  // Stack the data
  const stack = d3.stack()
    .keys(['Spending'])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  const stackedData = stack(combinedData);

  // Function to define the categorical color scale for SVG7
  const colorScaleSVG7 = d3.scaleOrdinal()
    .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

// Append stacked bars for BLS data in SVG7 with categorical color
const barsHousehold = svg7.selectAll(".bar-household")
  .data(stackedData.filter(d => d.key === "Yearly household expenses")) // Filter for the desired set
  .enter().append("g")
  .attr("class", d => `bar-household ${d.key.toLowerCase()}`);

barsHousehold.selectAll("rect")
  .data(d => d)
  .enter().append("rect")
  .attr("class", d => `bar-household ${d.data.Set.replace(/\s+/g, '').toLowerCase()}`)
  .attr("x", d => 50 + xScale7(d.data.Set))
  .attr("width", xScale7.bandwidth())
  .attr("y", d => yScale7(d[1]))
  .attr("height", d => yScale7(d[0]) - yScale7(d[1]))
  .attr("fill", d => colorScaleSVG7(d.data.Category))
  .on("mouseover", function (event, d) {
    const set = d.data.Set;
    handleMouseOverSVG7(event, d.data, set);
  })
  .on("mouseout", function () {
    const setClass = d3.select(this).attr("class");
    if (setClass) {
      const set = setClass.split(" ")[1];
      d3.select(`#tooltip-svg7-${set}`).transition().duration(500).style("opacity", 0);
    }
  });

// Append stacked bars for municipal data in SVG7 with categorical color
const barsMunicipal = svg7.selectAll(".bar-municipal")
  .data(stackedData.filter(d => d.key === "Yearly municipal expenses"))
  .enter().append("g")
  .attr("class", d => `bar-municipal ${d.key.toLowerCase()}`);

barsMunicipal.selectAll("rect")
  .data(d => d)
  .enter().append("rect")
  .attr("class", d => `bar-municipal ${d.data.Set.replace(/\s+/g, '').toLowerCase()}`)
  .attr("x", d => 50 + xScale7(d.data.Set))
  .attr("width", xScale7.bandwidth())
  .attr("y", d => yScale7(d[1]))
  .attr("height", d => yScale7(d[0]) - yScale7(d[1]))
  .attr("fill", d => colorScaleSVG7(d.data.Category))
  .on("mouseover", function (event, d) {
    const set = d.data.Set;
    handleMouseOverSVG7(event, d.data, set);
  })
  .on("mouseout", function () {
    const setClass = d3.select(this).attr("class");
    if (setClass) {
      const set = setClass.split(" ")[1];
      d3.select(`#tooltip-svg7-${set}`).transition().duration(500).style("opacity", 0);
    }
  });

// Add a click event listener to the "Compare" button
document.getElementById('compare-button').addEventListener('click', () => {
  // Remove the "Compare" button
  d3.select('#compare-button').remove();

  // Transition for y-axis domain change
  yScale7.domain([0, 1000000000]).nice();

  // Update the y-axis with the new scale
  svg7.select(".y-axis")
    .transition()
    .duration(1000) // Adjust the duration as needed
    .call(yAxis7);

  // Transition for "Yearly municipal expenses" stack
  barsMunicipal.selectAll("rect")
    .transition()
    .duration(1000) // Adjust the duration as needed
    .attr("y", d => yScale7(d[1]))
    .attr("height", d => yScale7(d[0]) - yScale7(d[1]));
});
});

 // Function to format number as currency
 const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Function to handle mouseover event for SVG7
const handleMouseOverSVG7 = (event, data, set) => {
  const tooltip7 = d3.select(`#tooltip-svg7-${set.replace(/\s+/g, '').toLowerCase()}`);
  tooltip7.transition().duration(200).style("opacity", 0.9);

  tooltip7.html(`
    <p>Set: ${set}</p>
    <p>Category: ${data.Category}</p>
    <p>Spending: ${formatCurrency.format(data.Spending)}</p>
  `)
    .style("left", `${event.pageX}px`)
    .style("top", `${event.pageY - 28}px`);
};

// Add a click event listener to the "Compare" button
document.getElementById('compare-button').addEventListener('click', () => {
  // Remove the "Compare" button
  d3.select('#compare-button').remove();

  // Transition for y-axis domain change
  yScale7.domain([0, 1000000000]).nice();

  // Update the y-axis with the new scale
  svg7.select(".y-axis")
    .transition()
    .duration(1000) // Adjust the duration as needed
    .call(yAxis7);

  // Select and transition the existing bars for the "Yearly municipal expenses" stack
  svg7.selectAll(".bar rect")
    .transition()
    .duration(1000) // Adjust the duration as needed
    .attr("y", d => yScale7(d[1]))
    .attr("height", d => yScale7(d[0]) - yScale7(d[1]));
});