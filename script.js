//Set universal margins
const margin = { top: 50, right: 50, bottom: 50, left: 50 }; 


//SVG 1
const svg1 = d3.select("#svg-container-1")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 100)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create a circle
svg1.append("circle")
  .attr("cx", 0 + margin.left)
  .attr("cy", 0)
  .attr("r", 20)
  .attr("fill", "none")
  .attr("stroke", "#CCFFCC")
  .attr("stroke-width", 2);

// Create a black pixel within the circle
svg1.append("rect")
  .attr("width", 1)
  .attr("height", 1)
  .attr("x", -1 + margin.left)  
  .attr("y", -1)  
  .attr("fill", "#000000");

//SVG 2
const svg2 = d3.select("#svg-container-2")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 150)  
  .append("g")
  .attr("transform", `translate(${margin.left})`);

// Create a 1,000 pixel rectangle
svg2.append("rect")
.attr("width", 100)
.attr("height", 100)
.attr("x", 0)  
.attr("y", 25)  
.attr("fill", "#000000");

//SVG 3
const svg3 = d3.select("#svg-container-3")
  .append("svg")
  .attr("width", "100%")
  .attr("height", 1300)   
  .append("g")
  .attr("transform", `translate(${margin.left})`);

// Create a 1,000,000 pixel rectangle
svg3.append("rect")
.attr("width", 800)
.attr("height", 1250)
.attr("x", 0)  
.attr("y", 25)  
.attr("fill", "#000000");

// SVG4 one-billion pixel block
// Constants
const svgWidth = 800;
const svgHeight = 1250000;
const tooltipMargin = 3;

const svg4Container = d3.select("#svg-container-4");
const svg4 = svg4Container
  .append("svg")
  .attr("width", 1000)
  .attr("height", 1250075)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

svg4.append("rect")
  .attr("width", 800)
  .attr("height", 1250000)
  .attr("x", 0)
  .attr("y", 0)
  .attr("fill", "#000000");

// Append the axis to the right side of the SVG
const axisScale = d3.scaleLinear()
  .domain([0, 1000000000])
  .range([0, svgHeight]);

const axis = d3.axisRight(axisScale)
  .tickValues(d3.range(0, 1000000000, 500000))
  .tickFormat(d3.format(",.0f"));

svg4.append("g")
  .attr("class", "axis")
  .attr("transform", `translate(${svgWidth}, 0)`)
  .call(axis);

// Use a single tooltip container for all tooltips
const tooltipContainer = d3.select("#tooltip-svg4");

// Function to create tooltips
function createTooltips(data) {
  // Tooltip creation logic
  const tooltipDiv = tooltipContainer.append("div")
    .attr("class", 'tooltip')
    .style("opacity", 0);

    // Loop through the data to create tooltips for each data point
    data.forEach(d => {
        const xPosition = d.Number % svgWidth;
        const yPosition = Math.floor(d.Number / svgWidth);
    
        // Adjust the tool tip position 
        const adjustedX = xPosition - 30;
        const adjustedY = yPosition - 30;
    
        const tooltipDiv = tooltipContainer.append("div")
            .attr("class", 'tooltip')
            .attr("id", `tooltip-container-${d.Number}`)
            .style("opacity", 0)
            .style("position", "absolute")
            .style("left", `${svg4.node().getBoundingClientRect().left + adjustedX + margin.left + tooltipMargin}px`)
            .style("top", `${svg4.node().getBoundingClientRect().top + adjustedY + margin.top + tooltipMargin}px`);
    
        tooltipDiv.append("p")
            .attr("id", 'tooltip-number')
            .text(`${d.Number_format}`);
    
        tooltipDiv.append("p")
            .attr("id", 'tooltip-description')
            .text(`${d.Description_short}`);
    
        // Set the height dynamically based on the content
        const tooltipHeight = tooltipDiv.node().getBoundingClientRect().height;
        tooltipDiv.style("height", `${tooltipHeight}px`);
    });
}

// Function to load and process data
function loadDataAndProcess() {
  d3.csv("data/BigNumbers_Clean.csv", d => d)
    .then(data => {
      console.log("Loaded data:", data);

      // Sort data based on Number property
      data.sort((a, b) => a.Number - b.Number);

      // Append highlights
      const highlights = svg4.selectAll("rect.highlight")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "highlight")
        .attr("width", 1)
        .attr("height", 1)
        .attr("x", d => d.Number % svgWidth)
        .attr("y", d => Math.floor(d.Number / svgWidth))
        .attr("fill", "#FFFFCC")
        .style("opacity", 1);

      // Call the tooltip creation function
      createTooltips(data);

      // Append trigger areas after tooltips
      const triggerAreas = svg4.selectAll("g.trigger-area")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "trigger-area")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      triggerAreas.append("rect")
        .attr("class", "trigger-area-rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", d => d.Number % svgWidth - 5)
        .attr("y", d => Math.floor(d.Number / svgWidth) - 5)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .style("z-index", 9999);

      // Select and raise the trigger areas to the front
      svg4.selectAll("g.trigger-area")
        .raise()
        .selectAll("rect")
            .raise()
            .style("z-index", 9999); //This is supposed to keep the tool tip triggers above the hidden tool tip containers, but it isn't working

      // Unique names for ScrollMagic controller and scene
      const controller4 = new ScrollMagic.Controller();

      // Unique name for GSAP timeline for fade-in
      const timelineFadeIn = gsap.timeline();

      // Scene enter event using the unique controller and timeline
      const scene4 = new ScrollMagic.Scene({
        triggerElement: "#trigger-point",
        triggerHook: 0.5,
        reverse: false,
      }).on("enter", ({ scrollDirection }) => {
        console.log('ScrollMagic Enter Event:', scrollDirection);
        showTooltips();
      }).addTo(controller4);

      // Function to show tooltips
      function showTooltips() {
        console.log("Showing Tooltips");

        // Create a timeline for tooltips
        const tooltipTimeline = gsap.timeline();

        // Iterate over data and add animations to the timeline
        data.forEach((d, index) => {
          const tooltip = d3.select(`#tooltip-container-${d.Number}`);

          // Fade in tooltip with no delay
          tooltipTimeline.to(tooltip.node(), { opacity: .75, duration: 1 });

          // Fade out tooltip after a fixed delay
          tooltipTimeline.to(tooltip.node(), { opacity: 0, duration: 1, delay: 3 });
        });

        // Add the tooltip timeline to the main timeline
        timelineFadeIn.add(tooltipTimeline);
      };

      // Create a timeline for tooltips
      const timelineFadeOutMouseOut = gsap.timeline();  
    })
    .catch(error => console.error("Error loading data:", error));
}

// Function to handle mouseover event
function handleMouseOver(event, d) {
  showTooltip(d.Number);
}

// Function to handle mouseout event
function handleMouseOut(event, d) {
  hideTooltip(d.Number);
}

// Function to show tooltip
function showTooltip(number) {
  d3.selectAll(".tooltip").style("opacity", 0);
  const tooltip = d3.select(`#tooltip-container-${number}`);
  tooltip.style("opacity", 0.75).style("z-index", 9999);
}

// Function to hide tooltip
function hideTooltip(number) {
  const tooltip = d3.select(`#tooltip-container-${number}`);
  tooltip.style("opacity", 0);
}

// Call the main function
loadDataAndProcess();

// Function to add "skip to bottom" button and handle its behavior
function addSkipToBottomButton() {
  // Append the button to the body
  const skipToBottomButton = d3.select("body")
    .append("button")
    .attr("class", "button")
    .attr("id", "skipToBottomButton")
    .text("SKIP TO BOTTOM")
    .style("position", "fixed")
    .style("bottom", "10px")
    .style("right", "10px")
    .style("display", "none"); 

  // Unique name for ScrollMagic controller for the button
  const controllerButton = new ScrollMagic.Controller();

  // Scene enter event using the unique controller for the button
  const sceneButton = new ScrollMagic.Scene({
    triggerElement: "#svg-container-4", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Show the button when the SVG container is in view
    skipToBottomButton.style("display", "block");
  }).on("leave", () => {
    // Hide the button when the SVG container is out of view
    skipToBottomButton.style("display", "none");
  }).addTo(controllerButton);

  // Scene for hiding the button when reaching the trigger-hide-button
  const sceneHideButton = new ScrollMagic.Scene({
    triggerElement: "#trigger-hide-button", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Hide the button when reaching the trigger-hide-button
    skipToBottomButton.style("display", "none");
  }).on("leave", () => {
    // Show the button when leaving the trigger-hide-button
    skipToBottomButton.style("display", "block");
  }).addTo(controllerButton);

  // Add click event to the "skip to bottom" button
  skipToBottomButton.on("click", () => {
    // Scroll to the top of the "trigger-hide-button" element smoothly
    const scrollHeight = document.getElementById("trigger-hide-button").offsetTop - 150;

    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  });
}

// Call the function to add the button and handle its behavior
addSkipToBottomButton();

// Variable to keep track of the last highlighted index
let lastHighlightIndex = -1;

// Function to find the next highlight beyond the current view
function findNextHighlight(currentWindowPosition) {
  const highlights = d3.selectAll("rect.highlight").nodes();
  const windowHeight = window.innerHeight;

  // Start searching for highlights from the last highlighted index + 1
  for (let i = lastHighlightIndex + 1; i < highlights.length; i++) {
    const highlight = highlights[i];
    const highlightPosition = highlight.getBoundingClientRect().top + window.scrollY;

    console.log('Highlight index:', i);
    console.log('Highlight top:', highlightPosition);

    // Skip highlights that are above or at the current view
    if (highlightPosition <= currentWindowPosition) {
      continue;
    }

    // Update the last highlighted index
    lastHighlightIndex = i;

    return {
      data: highlight.__data__,
      position: highlightPosition,
    }; // Return the data associated with the next highlight
  }

  return null; // Return null if no next highlight is found
}

// Function to add "Next" button and handle its behavior
function addNextButton() {
  // Append the button to the body
  const nextButton = d3.select("body")
    .append("button")
    .attr("class", "button")
    .attr("id", "nextButton")
    .text("NEXT")
    .style("position", "fixed")
    .style("bottom", "77px")
    .style("right", "10px")
    .style("display", "none"); 

  // Unique name for ScrollMagic controller for the button
  const controllerButton = new ScrollMagic.Controller();

  // Scene enter event using the unique controller for the button
  const sceneButton = new ScrollMagic.Scene({
    triggerElement: "#svg-container-4", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Show the button when the SVG container is in view
    nextButton.style("display", "block");
  }).on("leave", () => {
    // Hide the button when the SVG container is out of view
    nextButton.style("display", "none");
  }).addTo(controllerButton);

  // Scene for hiding the button when reaching the trigger-hide-button
  const sceneHideButton = new ScrollMagic.Scene({
    triggerElement: "#trigger-hide-button", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Hide the button when reaching the trigger-hide-button
    nextButton.style("display", "none");
  }).on("leave", () => {
    // Show the button when leaving the trigger-hide-button
    nextButton.style("display", "block");
  }).addTo(controllerButton);

  // Add click event to the "Next" button
  nextButton.on("click", () => {
    // Recalculate the current window position on each click
    const currentWindowPosition = window.scrollY;

    // Find the next highlight beyond the current view using the updated currentWindowPosition
    const nextHighlight = findNextHighlight(currentWindowPosition);

    if (nextHighlight) {
      // Scroll to the position of the next highlight, centering it in the window
      const scrollPosition = nextHighlight.position - window.innerHeight / 2;

      // Use native window scroll method for smooth scrolling
      window.scroll({
        top: scrollPosition,
        behavior: "smooth",
      });
    } else {
      console.log('No next highlight found.');
    }
  });
}

// Call the function to add the "Next" button and handle its behavior
addNextButton();

// Function to add "Back to Top" button and handle its behavior
function addBackToTopButton() {
  // Append the button to the body
  const backToTopButton = d3.select("body")
    .append("button")
    .attr("class", "button")
    .attr("id", "backToTopButton")
    .text("BACK TO TOP")
    .style("position", "fixed")
    .style("bottom", "130px") 
    .style("right", "10px")
    .style("display", "none"); 

  // Unique name for ScrollMagic controller for the button
  const controllerButton = new ScrollMagic.Controller();

  // Scene enter event using the unique controller for the button
  const sceneButton = new ScrollMagic.Scene({
    triggerElement: "#svg-container-4", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Show the button when the SVG container is in view
    backToTopButton.style("display", "block");
  }).on("leave", () => {
    // Hide the button when the SVG container is out of view
    backToTopButton.style("display", "none");
  }).addTo(controllerButton);

  // Scene for hiding the button when reaching the trigger-hide-button
  const sceneHideButton = new ScrollMagic.Scene({
    triggerElement: "#trigger-hide-button", 
    triggerHook: 1, 
  }).on("enter", () => {
    // Hide the button when reaching the trigger-hide-button
    backToTopButton.style("display", "none");
  }).on("leave", () => {
    // Show the button when leaving the trigger-hide-button
    backToTopButton.style("display", "block");
  }).addTo(controllerButton);

  // Add click event to the "Back to Top" button
  backToTopButton.on("click", () => {
    // Scroll to the top of SVG4
    window.scrollTo({
      top: document.getElementById("svg-container-4").offsetTop - window.innerHeight / 3,
      behavior: "smooth",
    });
  });
}

// Call the function to add the "Back to Top" button and handle its behavior
addBackToTopButton();

// SVG 5 - Municipal Spending bar chart
const svg5 = d3.select("#svg-container-5")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load municipal spending dataset
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
      <p>${d.Department}</p>
      <p>Spending: ${formatCurrency.format(d.Spending)}</p>
    `)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY - 28}px`);
  };

  // Function to handle mouseout event for SVG5
  const handleMouseOutSVG5 = (event, d) => {
    const tooltip5 = d3.select("#tooltip-svg5");
    tooltip5.transition().duration(200).style("opacity", 0); // Fade out tooltip
  };

  // Function to define the categorical color scale for SVG5
  const colorScaleSVG5 = d3.scaleOrdinal()
    .range(['#FF9933', "#0000FF", "#FF0033", "#009900", "#FFFF00", "#660099", "#FF3399", "#990000", "#003300", "#000066", "#666600"]);

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
    })
    .on("mouseout", function (event, d) {
      handleMouseOutSVG5(event, d);
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
    .delay((d, i) => i * 300) 
    .attr("y", d => yScale(d.Spending)) 
    .attr("height", d => 400 - yScale(d.Spending));
}
});

// SVG 6 - Household Spending bar chart
const svg6 = d3.select("#svg-container-6")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Load household spending dataset
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
      <p>${d.Category}</p>
      <p>Spending: ${formatCurrency.format(d.Spending)}</p>
    `)
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY - 28}px`);
  };

  // Function to handle mouseout event for SVG6
  const handleMouseOutSVG6 = (event, d) => {
    const tooltip6 = d3.select("#tooltip-svg5");
    tooltip6.transition().duration(200).style("opacity", 0); // Fade out tooltip
  };

  // Function to define the categorical color scale for SVG6
  const colorScaleSVG6 = d3.scaleOrdinal()
    .range(['#FF9933', "#0000FF", "#FF0033", "#009900", "#FFFF00", "#660099", "#FF3399", "#990000", "#003300", "#000066", "#666600"]);

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
    })
    .on("mouseout", function (event, d) {
      handleMouseOutSVG6(event, d);
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
      .delay((d, i) => i * 300) 
      .attr("y", d => yScale6(d.Spending)) 
      .attr("height", d => 400 - yScale6(d.Spending)); 
  }
});

// SVG 7 - compared spending bar chart was removed

// SVG 8 - Animated multiple of average household spending
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
  .attr("fill", "#CCFFCC")
  .attr("stroke", "#000000")
  .attr("stroke-width", .8)
  .attr("x", 0)
  .attr("y", 0)
  .style("opacity", 1) // Make the first rectangle visible initially
 ;

// Create the first label 
const firstLabel = svg8.append("text")
  .attr("x", 0)
  .attr("y", -10) 
  .style("font-size", "16px") 
  .style("font-family", "Josefin Sans")
  .style("fill", "#333333")
  .style("opacity", 1) // Make the first label visible initially
  .text("The average American household spent $87,432 in 2021");
 
// Create the rest of the rectangles
for (let i = 1; i < totalRectangles; i++) {
  const row = Math.floor(i / rectanglesPerRow);
  const col = i % rectanglesPerRow;
  const x = col * (rectangleSize + marginBetweenRectangles);
  const y = row * (rectangleSize + marginBetweenRectangles);

  const rectangle = svg8.append("rect")
    .attr("width", rectangleSize)
    .attr("height", rectangleSize)
    .attr("fill", "#CCFFCC")
    .attr("stroke", "#000000")
    .attr("stroke-width", .3)
    .attr("x", x)
    .attr("y", y)
    .style("opacity", 0)
};

// Calculate the x-position of the last rectangle
const lastRectangleX = (totalRectangles % rectanglesPerRow) * (rectangleSize + marginBetweenRectangles);

// Create the last label (below the last rectangle)
const lastLabel = svg8.append("text")
  .attr("x", 800 + margin.left + margin.right - lastRectangleX)
  .attr("y", totalRectangles / rectanglesPerRow * (rectangleSize + marginBetweenRectangles) + 20) 
  .style("font-size", "16px") 
  .style("font-family", "Josefin Sans")
  .style("fill", "#333333")
  .style("opacity", 0) // Make the last label initially invisible
  .text("A single billionaire could cover the costs of 11,437 American families for a year.");

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
  svg8.selectAll("rect, text")
    .transition()
    .delay((d, i) => i * 2) // Adjust the delay as needed
    .style("opacity", 1);
}

// SVG9a - Minimum Wage bubble
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

// Color scale 
const colorScale9a = d3.scaleOrdinal().domain(hourlyData.map((d) => d.category)).range(['#FF9933', "#0000FF", "#FF0033", "#009900", "#FFFF00", "#660099", "#FF3399", "#990000", "#003300", "#000066", "#666600"]);

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
  .style("font-size", "16px") 
  .style("font-weight", "semi-bold")
  .style("font-family", "Josefin Sans")
  .style("fill", "#FFFFCC")
  .style("opacity", 0);

// Append the first line of text
text9a
  .append("tspan")
  .text(`${hourlyData[0].category} Wage:`)
  .attr("dy", "0.35em")
  .style("text-anchor", "middle"); 

// Append the second line of text
text9a
  .append("tspan")
  .text(`$${hourlyData[0].wage.toLocaleString(2)}`)
  .attr("dy", "1em")
  .style("text-anchor", "middle"); 


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
      .to(circle9a.node(), { duration: 1, opacity: 1 }) // Transition for the circle
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
      .range(['#FF9933', "#0000FF", "#FF0033", "#FFFF00", "#009900", "#660099", "#FF3399", "#990000", "#003300", "#000066", "#666600"]);

    // Bubble chart for SVG9
    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(wages, d => d.wage)])
      .range([0, 200]);

    const simulation = d3.forceSimulation(wages)
      .force("x", d3.forceX(400 + margin.left).strength(0.05)) // Center the bubbles
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
      .style("opacity", 1);

    // Find the data of the largest bubble for SVG9
    const maxData = wages.reduce((maxData, d) => d.wage > maxData.wage ? d : maxData, wages[0]);

    // Append text only to the largest bubble for SVG9
    const textLabel = svg9.append("text")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "16px") 
      .style("font-weight", "semi-bold")
      .style("font-family", "Josefin Sans")
      .style("fill", "#FFFFCC")
      .text(`${maxData.category} Wage:\n$${maxData.wage.toLocaleString()}`);

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
      .style("font-family", "Josefin Sans Light")
      .style("font-size", "12px")
      .style("opacity", 0);

    bubbles.on("mouseover", function (event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(`${d.category}<br>Wage: $${d.wage.toLocaleString(2)}`)
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

// SVG10 - Minimum Wage Lifetime Bubbles
const svg10 = d3.select("#svg-container-10")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${400 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true);

// Unique names for ScrollMagic controller and scene
const controller10 = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline for SVG10
const scene10 = new ScrollMagic.Scene({
  triggerElement: "#svg-container-10",
  triggerHook: 0.5,
  reverse: false,
})
  .on("enter", () => {
    // Wages Data for SVG10
    const wages10 = [
      { category: "Hourly", wage: 7.25 },
      { category: "Daily", wage: 58 },
      { category: "Weekly", wage: 290 },
      { category: "Monthly", wage: 1160 },
      { category: "Yearly", wage: 14500 },
      { category: "Lifetime", wage: 725000 },
    ];

    // Ordinal color scale for SVG10
    const colorScale10 = d3.scaleOrdinal()
      .domain(wages10.map(d => d.category))
      .range(['#FF9933', "#0000FF", "#FF0033", "#FFFF00", "#009900", "#CCFFCC"]);

    // Bubble chart for SVG10
    const radiusScale10 = d3.scaleSqrt()
      .domain([0, d3.max(wages10, d => d.wage)])
      .range([0, 200]);

    const simulation10 = d3.forceSimulation(wages10)
      .force("x", d3.forceX(400 + margin.left).strength(0.05)) // Center the bubbles
      .force("y", d3.forceY(200).strength(0.1)) // Adjust the vertical position
      .force("collide", d3.forceCollide(d => radiusScale10(d.wage) + 2).iterations(2)); // Prevent overlapping

    const bubbles10 = svg10.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .selectAll("circle")
      .data(wages10)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale10(d.wage))
      .style("fill", d => colorScale10(d.category))
      .style("opacity", 1);

    // Find the data of the largest bubble for SVG10
    const maxData10 = wages10.reduce((maxData, d) => d.wage > maxData.wage ? d : maxData, wages10[0]);

    // Append text only to the largest bubble for SVG10
    const textLabel10 = svg10.append("text")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "16px") 
      .style("font-weight", "semi-bold")
      .style("font-family", "Josefin Sans")
      .style("fill", "white")
      .text(`${maxData10.category} Wage:\n$${maxData10.wage.toLocaleString()}`);

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
      .style("font-family", "Josefin Sans Light")
      .style("font-size", "12px")
      .style("opacity", 0);

    bubbles10.on("mouseover", function (event, d) {
      tooltip10.transition()
        .duration(200)
        .style("opacity", .75);
      tooltip10.html(`${d.category}<br>Wage: $${d.wage.toLocaleString(2)}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
      .on("mouseout", function (d) {
        tooltip10.transition()
          .duration(500)
          .style("opacity", 0);
      });
  })
  .addTo(controller10);


// SVG11 - One Billion Years of Lifetime Bubbles
const svg11 = d3.select("#svg-container-11")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${800 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true);

// Unique names for ScrollMagic controller and scene
const controller11 = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline for SVG11
const scene11 = new ScrollMagic.Scene({
  triggerElement: "#svg-container-11",
  triggerHook: 0.5,
  reverse: false,
})
  .on("enter", () => {
    // Wages Data for SVG11
    const wages11 = Array.from({ length: 1379 }, () => ({ category: "Lifetime", wage: 725000 }));

    // Bubble chart for SVG11
    const radiusScale11 = d3.scaleSqrt()
      .domain([0, d3.max(wages11, d => d.wage)])
      .range([0, 8.5]);

    const simulation11 = d3.forceSimulation(wages11)
      .force("x", d3.forceX(400 + margin.left).strength(0.2)) 
      .force("y", d3.forceY(400 + margin.top).strength(0.2)) 
      .force("collide", d3.forceCollide(d => radiusScale11(d.wage) + 2).iterations(4));

    const bubbles11 = svg11.selectAll("circle")
      .data(wages11)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale11(d.wage))
      .style("fill", "#CCFFCC")
      .style("stroke", "#000000")
      .style("stroke-width", "0.1px")
      .style("opacity", 1)
      .on("mouseover", function (event, d) {
        tooltip11.transition()
          .duration(200)
          .style("font-family", "Josefin Sans Light")
          .style("font-size", "12px")
          .style("opacity", .75);
        tooltip11.html(`${d.category}<br>Wage: $${d.wage.toLocaleString()}`)
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
  })
  .addTo(controller11);


// SVG12 - Wealth Bubbles
const svg12 = d3.select("#svg-container-12")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${400 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true);

// Unique names for ScrollMagic controller and scene
const controller12 = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline for SVG12
const scene12 = new ScrollMagic.Scene({
  triggerElement: "#svg-container-12",
  triggerHook: 0.5,
  reverse: false,
})
  .on("enter", () => {
    // Wealth Data for SVG12
    const wealth12 = [
      { name: "One Billion Dollars", wealth: 1000000000 },
      { name: "Top One Percent", wealth: 11100000 },
      { name: "Lifetime Minimum Wage", wealth: 725000 },
    ];

    // Color scale for SVG12
    const colorScale12 = d3.scaleOrdinal()
      .domain(wealth12.map(d => d.name))
      .range(["#000000", "#FF9933", "#CCFFCC"]);

    // Bubble chart for SVG12
    const radiusScale12 = d3.scaleSqrt()
      .domain([0, d3.max(wealth12, d => d.wealth)])
      .range([0, 200]);

    const simulation12 = d3.forceSimulation(wealth12)
      .force("x", d3.forceX(400 + margin.left).strength(0.05))
      .force("y", d3.forceY(200 + margin.top).strength(0.1)) 
      .force("collide", d3.forceCollide(d => radiusScale12(d.wealth) + 2).iterations(2)); 

    const bubbles12 = svg12.selectAll("circle")
      .data(wealth12)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale12(d.wealth))
      .style("fill", d => colorScale12(d.name))
      .style("opacity", 1);

    // Find the data of the largest bubble for SVG12
    const maxData12 = wealth12.reduce((maxData, d) => d.wealth > maxData.wealth ? d : maxData, wealth12[0]);

    // Append text only to the largest bubble for SVG12
    const textLabel12 = svg12.append("text")
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "16px") 
      .style("font-weight", "semi-bold")
      .style("font-family", "Josefin Sans")
      .style("fill", "#FFFFCC")
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
      .style("font-family", "Josefin Sans Light")
      .style("font-size", "12px")
      .style("opacity", 0);

    bubbles12.on("mouseover", function (event, d) {
      tooltip12.transition()
        .duration(200)
        .style("opacity", .75);
      tooltip12.html(`<strong>${d.name}</strong><br>$${d.wealth.toLocaleString()}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
      .on("mouseout", function (d) {
        tooltip12.transition()
          .duration(500)
          .style("opacity", 0);
      });
  })
  .addTo(controller12);

// SVG13 - Wealth Bubbles
const svg13 = d3.select("#svg-container-13")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", `0 0 ${900 + margin.left + margin.right} ${1000 + margin.top + margin.bottom}`)
  .classed("svg-content-responsive", true);

// Unique names for ScrollMagic controller and scene
const controller13 = new ScrollMagic.Controller();

// Scene enter event using the unique controller and timeline for SVG13
const scene13 = new ScrollMagic.Scene({
  triggerElement: "#svg-container-13",
  triggerHook: 0.5,
  reverse: false,
})
  .on("enter", () => {
    // Wealth Data for SVG13
    const wealth13 = [
      { name: "Elon Musk", wealth: 245700000000 },
      { name: "Bernard Arnault & family", wealth: 197400000000 },
      { name: "Jeff Bezos", wealth: 167900000000 },
      { name: "Larry Ellison", wealth: 145200000000 },
      { name: "Warren Buffett", wealth: 119700000000 },
      { name: "One Billion Dollars", wealth: 1000000000 },
      { name: "Top One Percent", wealth: 11100000 },
      { name: "Lifetime Minimum Wage", wealth: 725000 },
    ];

    // Ordinal color scale for SVG13
    const colorScale13 = d3.scaleOrdinal()
      .domain(wealth13.map(d => d.name))
      .range(["#660099", "#FF3399", "#990000", "#003300", "#000066", "#000000", "#FF9933", "#CCFFCC"]); 
    
    // Bubble chart for SVG13
    const radiusScale13 = d3.scaleSqrt()
      .domain([0, d3.max(wealth13, d => d.wealth)])
      .range([0, 200]);

    const simulation13 = d3.forceSimulation(wealth13)
      .force("x", d3.forceX(450 + margin.left).strength(0.1)) // Center the bubbles 
      .force("y", d3.forceY(500).strength(0.1)) // Adjust the vertical position 
      .force("collide", d3.forceCollide(d => radiusScale13(d.wealth) + 2).iterations(2)); // Prevent overlapping 
      
    const bubbles13 = svg13.selectAll("circle")
      .data(wealth13)
      .enter()
      .append("circle")
      .attr("r", d => radiusScale13(d.wealth))
      .style("fill", d => colorScale13(d.name))
      .style("opacity", 1);

    // Append text only to the bubbles with 'wealth' value > 1000000001 for SVG13
    const textLabels13 = svg13.selectAll(".text-label")
      .data(wealth13.filter(d => d.wealth > 1000000001))
      .enter()
      .append("text")
      .attr("class", "text-label")
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "16px") 
      .style("font-weight", "semi-bold")
      .style("font-family", "Josefin Sans")
      .style("fill", "#FFFFCC")
      .text(d => `${d.name}`)
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
      .style("font-family", "Josefin Sans Light")
      .style("font-size", "12px")
      .style("opacity", 0);

    bubbles13.on("mouseover", function (event, d) {
      tooltip13.transition()
        .duration(200)
        .style("opacity", .75);
      tooltip13.html(`<strong>${d.name}</strong><br>Wealth: $${d.wealth.toLocaleString()}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
      .on("mouseout", function (d) {
        tooltip13.transition()
          .duration(500)
          .style("opacity", 0);
      });
  })
  .addTo(controller13);
