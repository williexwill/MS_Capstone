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

//SVG4 - Billion
// const svg4 = d3.select("#svg-container-4")
//   .append("svg")
//   .attr("width", "100%")
//   .attr("height", 1250000)
//   //.attr("height", "auto")   
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// // Create a 1,000,000 pixel rectangle
// svg4.append("rect")
// .attr("width", 800)
// .attr("height", 1250000)
// .attr("x", 0)  
// .attr("y", 0)  
// .attr("fill", "black");

// SVG 4
const svg4 = d3.select("#svg-container-4")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 1250000 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a 1,250,000 pixel rectangle
svg4.append("rect")
  .attr("width", 800)
  .attr("height", 1250000)
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "black");

// Load your dataset
d3.csv("data/BigNumbers_Clean.csv", d => {
  // Convert "Number" to a number, removing commas
  d.Number = +d.Number.replace(/,/g, '');
  return d;
}).then(data => {
  // Highlight specific pixels based on the dataset
  svg4.selectAll("rect.highlight")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "highlight")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", d => d.Number % 800) // Remainder for x
    .attr("y", d => Math.floor(d.Number / 800)) // Division for y
    .attr("fill", "cyan");

  // Set up the intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Entry is in view, trigger the tooltip
        handleIntersection(entry.target.__data__);
        observer.disconnect(); // Disconnect observer after triggering once
      }
    });
  });

  // Observe each highlighted rectangle
  d3.selectAll("rect.highlight").each(function () {
    observer.observe(this);
  });
});

// Function to handle intersection (similar to mouseover)
function handleIntersection(d) {
  console.log("Intersection observed. Triggering tooltips.");

  // Log the position for debugging
  console.log(`Tooltip position - x: ${d.Number % 800}, y: ${Math.floor(d.Number / 800) * (1250000 / 800)}`);

  // Append foreignObject for the pop-up
  const foreignObject = svg4.append("foreignObject")
    .attr("class", "popup")
    .attr("x", d.Number % 800)
    .attr("y", Math.floor(d.Number / 800) * (1250000 / 800))
    .attr("width", 100)
    .attr("height", 50);

  // Append xHTML content to the foreignObject
  const tooltipDiv = foreignObject.append("xhtml:div")
    .style("width", "100%")
    .style("height", "100%")
    .style("background", "white");

  // Add text to the tooltip
  tooltipDiv.append("p")
    .text(`Number: ${d.Number}`);

  tooltipDiv.append("p")
    .text(`Description: ${d.Description_short}`);
}