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
  reverse: false,
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
    .attr("id", "x-axis-trigger-5")
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
    .attr("transform", `translate(50, 0)`)
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
    .range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);

  // Append bars for SVG5 with categorical color
  svg5.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => 50 + xScale(d.Department))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(0)) // Initialize bars at the bottom
    .attr("height", d => 0) // Initialize height to 0
    .attr("fill", d => colorScaleSVG5(d.Department))
    .on("mouseover", function (event, d) {
      handleMouseOverSVG5(event, d);
    });

  // Set up the ScrollMagic controller for SVG5
const controller5 = new ScrollMagic.Controller();

// Create a scene for SVG5 enter event
const scene5 = new ScrollMagic.Scene({
  triggerElement: "#x-axis-trigger-5", 
  triggerHook: 0.9,
  reverse: false, 
})
  .on("enter", (event) => {
    console.log('SVG5 ScrollMagic Enter Event:', event, 'Scroll Direction:', event.scrollDirection);
    startSVG5Animation();
  })
  .addTo(controller5);

// Function to start the SVG5 animation
function startSVG5Animation() {
  // Select all bars in SVG5 and start the animation
  svg5.selectAll(".bar")
    .transition()
    .delay((d, i) => i * 1000) // Adjusted delay for a slower animation
    .attr("y", d => yScale(d.Spending)) // Move bars to their actual position
    .attr("height", d => 400 - yScale(d.Spending)); // Set the final height
}
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
    .attr("id", "x-axis-trigger-6")
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
    .attr("transform", `translate(50, 0)`)
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
    .range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);

  // Append bars for SVG6 with categorical color
  svg6.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => 50 + xScale6(d.Category))
    .attr("width", xScale6.bandwidth())
    .attr("y", d => yScale6(0)) // Initialize bars at the bottom
    .attr("height", d => 0) // Initialize height to 0
    .attr("fill", d => colorScaleSVG6(d.Category))
    .on("mouseover", function (event, d) {
      handleMouseOverSVG6(event, d);
    });

  // Set up the ScrollMagic controller for SVG6
const controller6 = new ScrollMagic.Controller();

// Create a scene for SVG6 enter event
const scene6 = new ScrollMagic.Scene({
  triggerElement: "#x-axis-trigger-6", 
  triggerHook: 0.9,
  reverse: false, 
})
  .on("enter", (event) => {
    console.log('SVG6 ScrollMagic Enter Event:', event, 'Scroll Direction:', event.scrollDirection);
    startSVG6Animation();
  })
  .addTo(controller6);

// Function to start the SVG6 animation
function startSVG6Animation() {
  // Select all bars in SVG6 and start the animation
  svg6.selectAll(".bar")
    .transition()
    .delay((d, i) => i * 1000) // Adjusted delay for a slower animation
    .attr("y", d => yScale6(d.Spending)) // Move bars to their actual position
    .attr("height", d => 400 - yScale6(d.Spending)); // Set the final height
}
});


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

// SVG9a - Minimum Wage
const svg9a = d3
  .select("#svg-container-9a")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${100 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Hourly Data
const hourlyData = [{ category: "Hourly", wage: 7.25 }];

// Color scale (using the same color scale as SVG9)
const colorScale9a = d3.scaleOrdinal().domain(hourlyData.map((d) => d.category)).range(d3.schemeCategory10);

// Circle
const circle9a = svg9a
  .selectAll("circle")
  .data(hourlyData)
  .enter()
  .append("circle")
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("r", 75)
  .style("fill", (d) => colorScale9a(d.category))
  .style("opacity", 0);

// Text in Circle
const text9a = svg9a
  .append("text")
  .attr("x", 50)
  .attr("y", 50)
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .style("font-size", "12px") // Adjust the font size as needed
  .style("font-weight", "bold")
  .style("font-family", "sans-serif")
  .style("fill", "white")
  .text(`${hourlyData[0].category} Wage:\n$${hourlyData[0].wage.toFixed(2)}`)
  .style("opacity", 0);

// Unique names for ScrollMagic controller and scene
const controller9a = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline
const scene9a = new ScrollMagic.Scene({
  triggerElement: "#svg-container-9a",
  triggerHook: 0.5,
  reverse: false, 
})
  .on("enter", () => {
    // GSAP timeline for SVG9a animation
    const timeline9a = gsap.timeline();

    // Add animations to the timeline
    timeline9a
      .to(circle9a.node(), { duration: 1, opacity: 0.7 }) // Transition for the circle
      .to(text9a.node(), { duration: 1, opacity: 1 }, "-=0.5"); // Transition for the text in the circle

    // Add the timeline to the scene
    scene9a.setTween(timeline9a);
  })
  .addTo(controller9a);


// SVG9 - Minimum Wage Bubbles
const svg9 = d3.select("#svg-container-9")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${400 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true);

// Unique names for ScrollMagic controller and scene
const controller9 = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline for SVG9
const scene9 = new ScrollMagic.Scene({
  triggerElement: "#svg-container-9",
  triggerHook: 0.5,
  reverse: false,
})
  .on("enter", () => {
    // Wages Data for SVG9
    const wages = [
      { category: "Hourly", wage: 7.25 },
      { category: "Daily", wage: 58 },
      { category: "Weekly", wage: 290 },
      { category: "Monthly", wage: 1160 },
      { category: "Yearly", wage: 14500 },
    ];

    // Ordinal color scale for SVG9
    const colorScale = d3.scaleOrdinal()
      .domain(wages.map(d => d.category))
      .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "cyan", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);

    // Bubble chart for SVG9
    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(wages, d => d.wage)])
      .range([0, 200]);

    const simulation = d3.forceSimulation(wages)
      .force("x", d3.forceX(400).strength(0.05)) // Center the bubbles
      .force("y", d3.forceY(200).strength(0.1)) // Adjust the vertical position
      .force("collide", d3.forceCollide(d => radiusScale(d.wage) + 2).iterations(2)); // Prevent overlapping

    const bubbles = svg9.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("circle")
      .data(wages)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale(d.wage))
      .style("fill", d => colorScale(d.category))
      .style("opacity", 0.7);

    // Find the data of the largest bubble for SVG9
    const maxData = wages.reduce((maxData, d) => d.wage > maxData.wage ? d : maxData, wages[0]);

    // Append text only to the largest bubble for SVG9
    const textLabel = svg9.append("text")
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "14px") // Adjust the font size as needed
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .style("fill", "white")
      .text(`${maxData.category} Wage:\n$${maxData.wage.toFixed(2)}`);

    simulation.nodes(wages)
      .on("tick", () => {
        bubbles
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        // Update text position along with the largest bubble for SVG9
        textLabel
          .attr("x", maxData.x)
          .attr("y", maxData.y);
      });

    // Tooltip for SVG9
    const tooltip = d3.select("#svg-container-9").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    bubbles.on("mouseover", function (event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(`<strong>${d.category}</strong><br>Wage: $${d.wage.toFixed(2)}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  })
  .addTo(controller9);

// SVG10 - Minimum Wage Bubbles
const svg10 = d3.select("#svg-container-10")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${400 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Wages Data for SVG10
const wages10 = [
  { category: "Yearly", wage: 14500 },
  { category: "Lifetime", wage: 725000 },
  { category: "Hourly", wage: 7.25 },
  { category: "Daily", wage: 58 },
  { category: "Weekly", wage: 290 },
  { category: "Monthly", wage: 1160 },
];

// Bubble chart for SVG10
const radiusScale10 = d3.scaleSqrt()
  .domain([0, d3.max(wages10, d => d.wage)])
  .range([0, 200]);

const simulation10 = d3.forceSimulation(wages10)
  .force("x", d3.forceX(400).strength(0.05)) // Center the bubbles
  .force("y", d3.forceY(200).strength(0.1)) // Adjust the vertical position
  .force("collide", d3.forceCollide(d => radiusScale10(d.wage) + 2).iterations(2)); // Prevent overlapping

const bubbles10 = svg10.selectAll("circle")
  .data(wages10)
  .enter()
  .append("circle")
  .attr("r", d => radiusScale10(d.wage))
  .style("fill", d => colorScale(d.category))
  .style("opacity", 0.7);

// Find the data of the largest bubble for SVG10
const maxData10 = wages10.reduce((maxData, d) => d.wage > maxData.wage ? d : maxData, wages10[0]);

// Append text only to the largest bubble for SVG10
const textLabel10 = svg10.append("text")
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .style("font-size", "14px") // Adjust the font size as needed
  .style("font-weight", "bold")
  .style("font-family", "sans-serif")
  .style("fill", "white")
  .text(`${maxData10.category} Wage:\n$${maxData10.wage.toFixed(2)}`);

simulation10.nodes(wages10)
  .on("tick", () => {
    bubbles10
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // Update text position along with the largest bubble for SVG10
    textLabel10
      .attr("x", maxData10.x)
      .attr("y", maxData10.y);
  });

// Tooltip for SVG10
const tooltip10 = d3.select("#svg-container-10").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

bubbles10.on("mouseover", function (event, d) {
  tooltip10.transition()
    .duration(200)
    .style("opacity", .9);
  tooltip10.html(`<strong>${d.category}</strong><br>Wage: $${d.wage.toFixed(2)}`)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
})
  .on("mouseout", function (d) {
    tooltip10.transition()
      .duration(500)
      .style("opacity", 0);
  });

// SVG11 - Lifetime Bubbles
const svg11 = d3.select("#svg-container-11")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${800 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Wages Data for SVG11
const wages11 = Array.from({ length: 1379 }, () => ({ category: "Lifetime", wage: 725000 }));

// Bubble chart for SVG11
const radiusScale11 = d3.scaleSqrt()
  .domain([0, d3.max(wages11, d => d.wage)])
  .range([0, 8.5]);

const simulation11 = d3.forceSimulation(wages11)
  .force("x", d3.forceX(400).strength(0.2)) // Center the bubbles with higher strength
  .force("y", d3.forceY(400).strength(0.2)) // Adjust the vertical position with higher strength
  .force("collide", d3.forceCollide(d => radiusScale11(d.wage) + 2).iterations(4)) // Prevent overlapping with more iterations

const bubbles11 = svg11.selectAll("circle")
  .data(wages11)
  .enter()
  .append("circle")
  .attr("r", d => radiusScale11(d.wage))
  .style("fill", "cyan")
  .style("opacity", 0.7)
  .on("mouseover", function (event, d) {
    tooltip11.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip11.html(`<strong>${d.category}</strong><br>Wage: $${d.wage.toFixed(2)}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
  })
  .on("mouseout", function (d) {
    tooltip11.transition()
      .duration(500)
      .style("opacity", 0);
  });

simulation11.nodes(wages11)
  .on("tick", () => {
    bubbles11
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });

// Tooltip for SVG11
const tooltip11 = d3.select("#svg-container-11").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// SVG12 - Wealth Bubbles
const svg12 = d3.select("#svg-container-12")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${400 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Wealth Data for SVG12
const wealth12 = [
  { name: "One Billion Dollars", wealth: 1000000000 },
  { name: "Top One Percent", wealth: 11100000 },
];

// Color scale for SVG12
const colorScale12 = d3.scaleOrdinal()
  .domain(wealth12.map(d => d.name))
  .range(["#00FFFF", "#FFA500"]);

// Bubble chart for SVG12
const radiusScale12 = d3.scaleSqrt()
  .domain([0, d3.max(wealth12, d => d.wealth)])
  .range([0, 200]);

const simulation12 = d3.forceSimulation(wealth12)
  .force("x", d3.forceX(400).strength(0.2)) // Center the bubbles with higher strength
  .force("y", d3.forceY(200).strength(0.2)) // Adjust the vertical position with higher strength
  .force("collide", d3.forceCollide(d => radiusScale12(d.wealth) + 2).iterations(2)); // Prevent overlapping with more iterations

const bubbles12 = svg12.selectAll("circle")
  .data(wealth12)
  .enter()
  .append("circle")
  .attr("r", d => radiusScale12(d.wealth))
  .style("fill", d => colorScale12(d.name))
  .style("opacity", 0.7);

// Find the data of the largest bubble for SVG12
const maxData12 = wealth12.reduce((maxData, d) => d.wealth > maxData.wealth ? d : maxData, wealth12[0]);

// Append text only to the largest bubble for SVG12
const textLabel12 = svg12.append("text")
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .style("font-size", "14px") // Adjust the font size as needed
  .style("font-weight", "bold")
  .style("font-family", "sans-serif")
  .style("fill", "white")
  .text(`${maxData12.name}`);

simulation12.nodes(wealth12)
  .on("tick", () => {
    bubbles12
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // Update text position along with the largest bubble for SVG12
    textLabel12
      .attr("x", maxData12.x)
      .attr("y", maxData12.y);
  });

// Tooltip for SVG12
const tooltip12 = d3.select("#svg-container-12").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

bubbles12.on("mouseover", function (event, d) {
  tooltip12.transition()
    .duration(200)
    .style("opacity", .9);
  tooltip12.html(`<strong>${d.name}</strong><br>$${d.wealth.toFixed()}`)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
})
  .on("mouseout", function (d) {
    tooltip12.transition()
      .duration(500)
      .style("opacity", 0);
  });

// SVG13 - Wealth Bubbles
const svg13 = d3.select("#svg-container-13")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${870 + margin.left + margin.right} ${1000 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Wealth Data for SVG13
const wealth13 = [
  { name: "Elon Musk", wealth: 245700000000 },
  { name: "Bernard Arnault & family", wealth: 197400000000 },
  { name: "Jeff Bezos", wealth: 167900000000 },
  { name: "Larry Ellison", wealth: 145200000000 },
  { name: "Warren Buffett", wealth: 119700000000 },
  { name: "One Billion Dollars", wealth: 1000000000 },
  { name: "Top One Percent", wealth: 11100000 },
];

// Ordinal color scale for SVG13
const colorScale13 = d3.scaleOrdinal()
  .domain(wealth13.map(d => d.name))
  .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#00FFFF", "#FFA500"]); // Cyan, Orange, Purple, Green colors

// Bubble chart for SVG13
const radiusScale13 = d3.scaleSqrt()
  .domain([0, d3.max(wealth13, d => d.wealth)])
  .range([0, 200]);

const simulation13 = d3.forceSimulation(wealth13)
  .force("x", d3.forceX(435).strength(0.2)) // Center the bubbles with higher strength
  .force("y", d3.forceY(500).strength(0.2)) // Adjust the vertical position with higher strength
  .force("collide", d3.forceCollide(d => radiusScale13(d.wealth) + 2).iterations(2)); // Prevent overlapping with more iterations

const bubbles13 = svg13.selectAll("circle")
  .data(wealth13)
  .enter()
  .append("circle")
  .attr("r", d => radiusScale13(d.wealth))
  .style("fill", d => colorScale13(d.name))
  .style("opacity", 0.7);

// Append text only to the bubbles with 'wealth' value > 1000000001 for SVG13
const textLabels13 = svg13.selectAll(".text-label")
  .data(wealth13.filter(d => d.wealth > 1000000001))
  .enter()
  .append("text")
  .attr("class", "text-label")
  .attr("dy", "0.35em")
  .style("text-anchor", "middle")
  .style("font-size", "14px") // Adjust the font size as needed
  .style("font-weight", "bold")
  .style("font-family", "sans-serif")
  .style("fill", "white")
  .text(d => `${d.name}\n$${d.wealth.toFixed()}`)
  .attr("x", d => d.x)
  .attr("y", d => d.y);

simulation13.nodes(wealth13)
  .on("tick", () => {
    bubbles13
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // Update text position along with the bubbles for SVG13
    textLabels13
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });

// Tooltip for SVG13
const tooltip13 = d3.select("#svg-container-13").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

bubbles13.on("mouseover", function (event, d) {
  tooltip13.transition()
    .duration(200)
    .style("opacity", .9);
  tooltip13.html(`<strong>${d.name}</strong><br>Wealth: $${d.wealth.toFixed()}`)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
})
  .on("mouseout", function (d) {
    tooltip13.transition()
      .duration(500)
      .style("opacity", 0);
  });