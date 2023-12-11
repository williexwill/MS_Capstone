//Set universal variables
const margin = { top: 50, right: 50, bottom: 50, left: 50 }; // Add margins 


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

// // SVG 4
// const svg4Container = d3.select("#svg-container-4");
// const svg4 = svg4Container
//   .append("svg")
//   .attr("width", "100%")
//   .attr("height", 1250000)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// // Create a 1,000,000,000 pixel rectangle
// svg4.append("rect")
//   .attr("width", 800)
//   .attr("height", 1250000)
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("fill", "black");

// // Create a separate container for tooltips
// const tooltipContainer = svg4Container
//   .append("div")
//   .attr("class", "tooltip-container")
//   .style("opacity", 0);  // Set opacity to 0 to hide tooltips by default

// // Load your dataset
// d3.csv("data/BigNumbers_Clean.csv", d => d).then(data => {
//   // Highlight specific pixels based on the dataset
//   const highlights = svg4.selectAll("rect.highlight")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "highlight")
//     .attr("width", 1)
//     .attr("height", 1)
//     .attr("x", d => d.Number % 800) // Remainder for x
//     .attr("y", d => Math.floor(d.Number / 800)) // Division for y
//     .attr("fill", "cyan");

//   // Create invisible rectangles for trigger areas
//   const triggerAreas = svg4.selectAll("g.trigger-area")
//     .data(data)
//     .enter()
//     .append("g")
//     .attr("class", "trigger-area")
//     .on("mouseover", function (event, d) {
//       handleMouseOver(event, d);
//     })
//     .on("mouseout", function () {
//       // Removed the handleMouseOut function to prevent hiding tooltips
//     });

//   triggerAreas.append("rect")
//     .attr("class", "trigger-area-rect")
//     .attr("width", 10)
//     .attr("height", 10)
//     .attr("x", d => d.Number % 800 - 5) // Adjust x position
//     .attr("y", d => Math.floor(d.Number / 800) - 5) // Adjust y position
//     .attr("fill", "none")
//     .attr("pointer-events", "all"); // Ensure the invisible rectangle captures events

//   // Create dynamic tooltips in the margins
//   const tooltipMargin = 10; // Adjust as needed

//   data.forEach(d => {
//     const xPosition = d.Number % 800;
//     const yPosition = Math.floor(d.Number / 800);

//     // Append foreignObject for the dynamic tooltip to the tooltipContainer
//     const tooltipContainer = svg4Container
//       .append("div")
//       .attr("class", `tooltip-container tooltip-container-${d.Number}`)
//       .style("opacity", 0)
//       .style("position", "absolute")
//       .style("left", `${svg4.node().getBoundingClientRect().left + xPosition + margin.left + tooltipMargin}px`)
//       .style("top", `${svg4.node().getBoundingClientRect().top + yPosition + margin.top + tooltipMargin}px`);

//     // Append xHTML content to the foreignObject
//     const tooltipDiv = tooltipContainer.append("xhtml:div")
//       .style("background", "white")
//       .style("padding", "5px")
//       .style("border", "1px solid black");

//     // Add text to the tooltip
//     tooltipDiv.append("p")
//       .text(`Number: ${d.Number}`);

//     tooltipDiv.append("p")
//       .text(`Description: ${d.Description_short}`);

//     // Calculate and set height based on content
//     const tooltipHeight = tooltipDiv.node().getBoundingClientRect().height;
//     tooltipContainer.style("height", `${tooltipHeight}px`);
//   });

//   // Function to handle mouseover event
//   const handleMouseOver = (event, d) => {
//     // Show tooltip immediately with no transition
//     svg4Container.selectAll(".tooltip-container").style("opacity", 0);
//     const tooltip = svg4Container.select(`.tooltip-container-${d.Number}`);
//     tooltip.style("opacity", 1).style("z-index", 9999);

//     // Update tooltip content based on data
//     tooltip.html(`
//       <p>Number: ${d.Number}</p>
//       <p>Description: ${d.Description_short}</p>
//     `);
//   };
// });

// SVG4 1 billion points of light
const svg4Container = d3.select("#svg-container-4");
const svg4 = svg4Container
  .append("svg")
  .attr("width", "100%")
  .attr("height", 1250000)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

svg4.append("rect")
  .attr("width", 800)
  .attr("height", 1250000)
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "black");

// Use a single tooltip container for all tooltips
const tooltipContainer = d3.select("#tooltip-svg4");

d3.csv("data/BigNumbers_Clean.csv", d => d).then(data => {
  // Console log for data loading
  console.log("Loaded data:", data);

  // Sort data based on Number property
  data.sort((a, b) => a.Number - b.Number);

  const highlights = svg4.selectAll("rect.highlight")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "highlight")
    .attr("width", 1)
    .attr("height", 1)
    .attr("x", d => d.Number % 800)
    .attr("y", d => Math.floor(d.Number / 800))
    .attr("fill", "cyan")
    .style("opacity", 1);

  const triggerAreas = svg4.selectAll("g.trigger-area")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "trigger-area")
    .on("mouseover", function (event, d) {
      handleMouseOver(event, d);
    });

  triggerAreas.append("rect")
    .attr("class", "trigger-area-rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", d => d.Number % 800 - 5)
    .attr("y", d => Math.floor(d.Number / 800) - 5)
    .attr("fill", "none")
    .attr("pointer-events", "all");

  const tooltipMargin = 10;

  data.forEach(d => {
    const xPosition = d.Number % 800;
    const yPosition = Math.floor(d.Number / 800);

    const tooltipDiv = tooltipContainer.append("div")
      .attr("class", 'tooltip')
      .attr("id", `tooltip-container-${d.Number}`)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("left", `${svg4.node().getBoundingClientRect().left + xPosition + margin.left + tooltipMargin}px`)
      .style("top", `${svg4.node().getBoundingClientRect().top + yPosition + margin.top + tooltipMargin}px`);

    const tooltipContent = tooltipDiv.append("div")
      .style("background", "white")
      .style("padding", "5px")
      .style("border", "1px solid black");

    tooltipContent.append("p")
      .text(`Number: ${d.Number}`);

    tooltipContent.append("p")
      .text(`Description: ${d.Description_short}`);

    const tooltipHeight = tooltipContent.node().getBoundingClientRect().height;
    tooltipDiv.style("height", `${tooltipHeight}px`);
  });

  // Unique names for ScrollMagic controller and scene
  const controller4 = new ScrollMagic.Controller();

  // Unique name for GSAP timeline
  //const timeline4 = gsap.timeline();
  const timeline4 = gsap.timeline({ duration: 5 }); // Adjust the duration as needed
  timeline4.add(() => console.log('Inside Timeline'));

  // // Scene enter event using the unique controller and timeline
  // const scene4 = new ScrollMagic.Scene({
  //   triggerElement: "#trigger-point",
  //   triggerHook: 0.5,
  // })
  // .on("enter", (event) => {
  //   console.log('ScrollMagic Enter Event:', event, 'Scroll Direction:', event.scrollDirection); 
  //   showTooltips();
  // })
  // .addTo(controller4);

  // // Callback to show tooltips when the animation starts
  // function showTooltips() {
  //   console.log("Showing Tooltips");
  
    // Scene enter event using the unique controller and timeline
const scene4 = new ScrollMagic.Scene({
  triggerElement: "#trigger-point",
  triggerHook: 0.5,
})
  .on("enter", (event) => {
    console.log('ScrollMagic Enter Event:', event, 'Scroll Direction:', event.scrollDirection); 
    showTooltips();
  })
  .addTo(controller4);

// Callback to show tooltips when the animation starts
function showTooltips() {
  console.log("Showing Tooltips");

  data.forEach((d, index) => {
    const tooltip = d3.select(`#tooltip-container-${d.Number}`);
    timeline4.to(tooltip.node(), { opacity: 1 });

    // Find the associated highlight rectangle by ID
    const highlight = svg4.select(`#highlight-${d.Number}`).node();
    const highlightRect = highlight.getBoundingClientRect();
    console.log(`Highlight Rect:`, highlightRect);

    // Calculate yOffset based on the highlight's position
    const yOffset = highlightRect.top + window.scrollY - window.innerHeight / 2;
    console.log(`Calculated Y Offset: ${yOffset}`);

    // Log scroll information
    console.log(`Scrolling to ${index}:`, yOffset);

    // Use GSAP ScrollToPlugin
    gsap.to(window, { scrollTo: { y: yOffset, autoKill: false }, duration: 0.5 });
  });
}
  // function showTooltips() {
  //   console.log("Showing Tooltips");
  //   data.forEach((d, index) => {
  //     const tooltip = d3.select(`#tooltip-container-${d.Number}`);
  //     timeline4.to(tooltip.node(), { opacity: 1 });
  
  //     // Log tooltip information
  //     const tooltipNode = tooltip.node();
  //     const tooltipRect = tooltipNode.getBoundingClientRect();
  //     console.log(`Tooltip Rect:`, tooltipRect);
  
  //     // Calculate yOffset
  //     const yOffset = tooltipRect.top - window.innerHeight / 2;
  //     console.log(`Calculated Y Offset: ${yOffset}`);
  
  //     // Log scroll information
  //     console.log(`Scrolling to ${index}:`, yOffset);
  
  //     // Scroll to the tooltip
  //     console.log('Before Scroll');
  //     //window.scrollTo({ top: yOffset, behavior: 'smooth' });
  //     window.scrollTo({ top: yOffset });
  //     console.log('After Scroll');
  //   });
  // }
  
  

  // Console log for successful setup
  console.log("ScrollMagic and GSAP setup complete");

  function showTooltips() {
    console.log("Showing Tooltips");
    data.forEach(d => {
      const tooltip = d3.select(`#tooltip-container-${d.Number}`);
      timeline4.to(tooltip.node(), { opacity: 1 })
             .to(tooltip.node(), { opacity: 0, delay: 3 });
    });
  }

  function handleMouseOver(event, d) {
    showTooltip(d.Number);
  }

  function showTooltip(number) {
    d3.selectAll(".tooltip").style("opacity", 0);
    const tooltip = d3.select(`#tooltip-container-${number}`);
    tooltip.style("opacity", 1).style("z-index", 9999);
  }
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
    .domain([0, 650000000])
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

// Function to define the categorical color scale for SVG6
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

// // SVG 7 - Combined Stacked Bar Chart
// //Load and combine and order data:
// d3.csv("data/BLS_2021_clean.csv", d => ({
//     Category: d.Category,
//     Spending: +d.Spending
//   })).then(dataBLS => {
//     dataBLS.sort((a, b) => b.Spending - a.Spending); // Sort in descending order
    
//     const totalSpendingBLS = d3.sum(dataBLS, d => d.Spending);

//     dataBLS.forEach(d => d.totalSpendingBySet = totalSpendingBLS);
    
//     // Load the second dataset and sort by spending
//     return d3.csv("data/StLou_clean.csv", d => ({
//       Category: d.Department,
//       Spending: +d.Spending
//     })).then(dataStLou => {
//       dataStLou.sort((a, b) => b.Spending - a.Spending); // Sort in descending order
  
//       const totalSpendingStLou = d3.sum(dataStLou, d => d.Spending);

//       dataStLou.forEach(d => d.totalSpendingBySet = totalSpendingStLou);

//     // Combine datasets and add a 'Set' property
//     const combinedData = [
//         ...dataBLS.map(d => ({ Category: d.Category, Spending: d.Spending, totalSpendingBySet: d.totalSpendingBySet, Set: 'Yearly household expenses' })),
//         ...dataStLou.map(d => ({ Category: d.Category, Spending: d.Spending, totalSpendingBySet: d.totalSpendingBySet, Set: 'Yearly municipal expenses' }))
//       ];
//     console.log(combinedData);
      
    
//     //Isolate Set names 
//     const setNames = combinedData.map(d => d.Set);

//     //Isolate Category names 
//     const categoryNames = combinedData.map(d =>d.Category);
//     console.log('Category Names array:', categoryNames);

//     //Isolate Spending
//     const spending = combinedData.map(d => d.Spending);
//     console.log('Spending Array:', spending);

//     //Isolate Total Spending by Set
//     const totalSpendingSet = combinedData.map (d => d.totalSpendingBySet);
//     console.log('Total Spending by Set:', totalSpendingSet);

//     // Define xScale7
//     const xScale7 = d3.scaleBand()
//         .domain(setNames)
//         .range([0, 600])
//         .padding(0.1);    

//     const yScale7 = d3.scaleLinear()
//         .domain([0, 1000000000]) 
//         .range([400, 0]);

//     const colorScale7 = d3.scaleOrdinal()
//         .domain(categoryNames)
//         .range(d3.schemeCategory10);

//     const xAxis7 = d3.axisBottom()
//         .scale(xScale7)
//         .tickSize(0);

//     const yAxis7 = d3.axisLeft()
//         .scale(yScale7)
//         .ticks(5)
//         .tickSizeInner(-600)
//         .tickSizeOuter(0);
        

//     // Create SVG and Viewbox
//     const svg7 = d3.select("#svg-container-7")
//         .append("svg")
//         .attr("preserveAspectRatio", "xMinYMin meet")
//         .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
//         .classed("svg-content-responsive", true)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);
    
//     // Append X and Y axes for SVG7
//     svg7.append("g")
//         .attr("class", "x-axis")
//         .attr("transform", `translate(${margin.left}, ${margin.top + 400})`) // Adjust as needed
//         .call(xAxis7)
//         .selectAll("text")
//         .attr("y", 10)
//         .attr("x", -5)
//         .attr("dy", ".35em")
//         .attr("transform", "rotate(-45)")
//         .style("text-anchor", "end");

//     svg7.append("g")
//         .attr("class", "y-axis")
//         .attr("transform", `translate(${margin.left}, ${margin.top})`) // Adjust as needed
//         .call(yAxis7);

//     // Create layers
//     const layers = categoryNames.map(function(categoryName) {
//         return combinedData
//             .filter(d => d.Category === categoryName)
//             .map(function(d) {
//                 return {
//                     'x': xScale7(d.Set),
//                     'y': d.Spending,
//                     'categoryName': categoryName,
//                     'set': d.Set
//                 };
//             });
//     });

//     // Transpose the layers to group by x values
//     const transposedLayers = d3.transpose(layers);

//     // Log the original data before stacking
//     console.log('Original Data:', transposedLayers);

//     // Use d3.stack() on the transposed layers
//     const stacked = d3.stack().keys(categoryNames)(transposedLayers);
//     console.log('Stacked:', stacked);

//     // Flatten the layers
//     const flatLayers = stacked.map((dataPoint, i) => {
//         const values = dataPoint.map((d, j) => {
//             if (isNaN(d[1])) {
//                 console.log('Problematic Value:', transposedLayers[j][i]);
//             }
//             return {
//                 x: transposedLayers[j][i].x,
//                 y: d[1],  // Use the upper value of the stack
//                 y0: d[0], // Use the lower value of the stack
//                 categoryName: transposedLayers[j][i].categoryName,
//                 set: transposedLayers[j][i].set
//             };
//         });
//         return values;
//     }).flat();
    
//     // Append bars to the SVG
//     svg7.selectAll(".bar")
//         .data(layers)
//         .enter().append("g")
//         .attr('class', 'layer');

//     svg7.selectAll("rect")
//         .data(d => d)
//         .enter().append("rect")
//         .attr("x", d => d.x + 50) 
//         .attr("y", d => yScale7(d.y + d.y0))
//         .attr("width", xScale7.rangeBand())
//         .attr('height', (d,i) => 650 - yScale7(d.y))
//         .attr("fill", (d,i) => colorScale7(d.categoryName))     
//         .on("mouseover", function (event, d) {
//         const set = d.data.Set;
//         handleMouseOverSVG7(event, d.data, set);
//         })
//         .on("mouseout", function () {
//         const setClass = d3.select(this).attr("class");
//         if (setClass) {
//             const set = setClass.split(" ")[1]; // Extract set from class if it exists
//             d3.select(`#tooltip-svg7-${set}`).transition().duration(500).style("opacity", 0);
//         }
//         });
    

//     // Function to format number as currency
//     const formatCurrency = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     });

//     // Function to handle mouseover event for SVG7
//     const handleMouseOverSVG7 = (event, data, set) => {
//     console.log('Mouseover Event Triggered'); 
//     const tooltip7 = d3.select(`#tooltip-svg7-${set.replace(/\s+/g, '').toLowerCase()}`);
//     console.log('Tooltip Container:', tooltip7.node());
//     tooltip7.transition().duration(200).style("opacity", 0.9);

//     tooltip7.html(`
//         <p>Set: ${set}</p>
//         <p>Category: ${data.Category}</p>
//         <p>Spending: ${formatCurrency.format(data.Spending)}</p>
//     `)
//         .style("left", `${event.pageX}px`)
//         .style("top", `${event.pageY - 28}px`);
//         console.log('Mouse Event Coordinates:', event.pageX, event.pageY);
//     };
//     });
// });

// SVG8 - Animated multiple of average household spending
// Initialize ScrollMagic controller
const controller = new ScrollMagic.Controller();

// SVG 8
const svg8 = d3.select("#svg-container-8")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define the total number of rectangles
const totalRectangles = Math.floor(1000000000 / 87432);
const rectangleSize = 5;
const marginBetweenRectangles = 1;
const rectanglesPerRow = 800 / (rectangleSize + marginBetweenRectangles);

// Create the first rectangle
const firstRectangle = svg8.append("rect")
  .attr("width", rectangleSize)
  .attr("height", rectangleSize)
  .attr("fill", "cyan")
  .attr("stroke", "rgba(191, 163, 63, 0.2)")
  .attr("stroke-width", 1)
  .attr("x", 0)
  .attr("y", 0)
  .style("opacity", 1) // Make the first rectangle visible initially
 ;

// Create the rest of the rectangles
for (let i = 1; i < totalRectangles; i++) {
  const row = Math.floor(i / rectanglesPerRow);
  const col = i % rectanglesPerRow;
  const x = col * (rectangleSize + marginBetweenRectangles);
  const y = row * (rectangleSize + marginBetweenRectangles);

  const rectangle = svg8.append("rect")
    .attr("width", rectangleSize)
    .attr("height", rectangleSize)
    .attr("fill", "cyan")
    .attr("stroke", "rgba(191, 163, 63, 0.2)")
    .attr("stroke-width", 1)
    .attr("x", x)
    .attr("y", y)
    .style("opacity", 0)
};

// Create the observer with a callback function
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start the transition when the element is in view
      startTransition();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 }); // Adjust the threshold as needed

// Observe the target element
observer.observe(document.querySelector("#svg-container-8"));

// Function to start the transition
function startTransition() {
  // Transition to make the rectangles visible
  svg8.selectAll("rect")
    .transition()
    .delay((d, i) => i * 2) // Adjust the delay as needed
    .style("opacity", 1);
}