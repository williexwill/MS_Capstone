const margin = { top: 50, right: 50, bottom: 50, left: 50 }; // Add margins as needed

// // Function to calculate the width and height based on the area
// function calculateWidthAndHeight(area, aspectRatio) {
//     const width = Math.sqrt(area * aspectRatio);
//     const height = area / width;
//     return { width, height };
//   }

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

//





// //SVG 3 *dynamic* but container isn't adjusting
// const svg3 = d3.select("#svg-container-3")
//   .append("svg")
//   .attr("width", "100%")
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// // Calculate the total area and aspect ratio for SVG 3
// const areaForSvg3 = 1000000;
// const aspectRatioForSvg3 = 8 / 10; // Adjust the aspect ratio as needed

// // Calculate the width and height for SVG 3 based on the area and aspect ratio
// const { width, height } = calculateWidthAndHeight(areaForSvg3, aspectRatioForSvg3);

// // Set the width and height for SVG 3
// svg3.attr("width", "100%");
// svg3.attr("height", height);

// // Create a rectangle within SVG 3 with the calculated width and height
// svg3.append("rect")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("fill", "black");

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
.attr("height", 2000)
.attr("x", 0)  
.attr("y", 0)  
.attr("fill", "black");