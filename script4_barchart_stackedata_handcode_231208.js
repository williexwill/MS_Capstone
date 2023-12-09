//Load and combine and order data:
d3.csv("data/BLS_2021_clean.csv", d => ({
    Category: d.Category,
    Spending: +d.Spending
  })).then(dataBLS => {
    dataBLS.sort((a, b) => b.Spending - a.Spending); // Sort in descending order
  
    // Load the second dataset and sort by spending
    return d3.csv("data/StLou_clean.csv", d => ({
      Category: d.Department,
      Spending: +d.Spending
    })).then(dataStLou => {
      dataStLou.sort((a, b) => b.Spending - a.Spending); // Sort in descending order
  
    // Combine datasets and add a 'Set' property
    const combinedData = [
        ...dataBLS.map(d => ({ Category: d.Category, Spending: d.Spending, Set: 'Yearly household expenses' })),
        ...dataStLou.map(d => ({ Category: d.Category, Spending: d.Spending, Set: 'Yearly municipal expenses' }))
      ];
    console.log(combinedData);
      
    // combinedData = fruitConsumption 
    //Isolate Set names (seasonNames)
    const setNames = combinedData.map(d => d.Set);

    //Isolate Category names (fruitNames)
    const categoryNames = combinedData.map(d =>d.Category)

    combinedData.forEach(function(d) {
        //spendingByCategory = fruitsConsumed
        d.spendingByCategory = categoryNames.map(function(category){
            return{
                "categoryName": category,
                "spendingCount": d[category]};
            });
    
        d.totalSpending = d3.sum( d.spendingByCategory, function(d) {
            return d.spendingCount;});
        });

    // Define xScale7
    const xScale7 = d3.scale.ordinal()
        .domain(setNames)
        .range([0, 600])
        .padding(0.1);    

    const yScale7 = d3.scaleLinear()
        .domain([0, 1000000000]) 
        .range([400, 0]);

    const colorScale7 = d3.scaleordinal()
        .domain(categoryNames)
        .range(d3.schemeCategory10);

    const xAxis7 = d3.axisBottom()
        .scale(xScale7)
        .tickSize(0);

    const yAxis7 = d3.axisLeft()
        .scale(yScale7)
        .ticks(5)
        .tickSizeInner(-600)
        .tickSizeOuter(0);
        

    // Create SVG and Viewbox
    const svg7 = d3.select("#svg-container-7")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${800 + margin.left + margin.right} ${550 + margin.top + margin.bottom}`)
        .classed("svg-content-responsive", true)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Append X and Y axes for SVG7
    svg7.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top + 400})`) // Adjust as needed
        .call(xAxis7)
        .selectAll("text")
        .attr("y", 10)
        .attr("x", -5)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg7.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`) // Adjust as needed
        .call(yAxis7);

    //Create layers
    const layers = categoryNames.map(function(categoryName) {
        return combinedData.map(function(d) {
            return {'x': x(d.Set),
                    'y': d[categoryName],
                    'categoryName': categoryName};
        });
    });
    console.log('Layers Structure:', layers);

    //Create stack from layers
    const stack = d3.layout.stack();
    stack(layers);
    
    // Append bars to the SVG
    svg7.selectAll(".bar")
        .data(layers)
        .enter().append("g")
        .attr('class', 'layer');

    svg7.selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => d.x + 50) 
        .attr("y", d => yScale7(d.y + d.y0))
        .attr("width", xScale7.rangeBand())
        .attr('height', (d,i) => 650 - yScale7(d.y))
        .attr("fill", (d,i) => colorScale7(d.categoryName)) 
    });
});


