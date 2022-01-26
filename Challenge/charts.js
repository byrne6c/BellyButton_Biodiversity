function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // console.log(samples); 
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    //var result = resultArray[0];
    // Create a variable that holds the first sample in the metadata array.
    //var metadata = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // Create a variable that holds the washing frequency.
    var frequency = parseFloat(metadata.wfreq);

    var PANEL = d3.select("#sample-samples");
  
    PANEL.html("");
    PANEL.append("h6").text(result.location);
  });

  //function optionChanged(newSample) {
    //console.log(newSample);
  //}
  //function optionChanged(newSample) {
    //buildCharts(newSample);
  //}

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_Ids = data.samples[result].otu_ids;
    var otu_Labels = data.samples[result].otu_labels;
    var sample_Values = data.samples[result].sample_values;

    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    top_otu_Ids = otu_Ids.slice(0,10);
    top_otu_Ids = otu_Ids.map(s => `OTU ${s}`).reverse();
    top_otu_Labels = otu_Labels.slice(0,10);
    top_sample_Values = sample_Values.slice(0,10);

    // 7. Create the yticks for the bar chart.

    var yticks = top_otu_Ids;

    // 8. Create the trace for the bar chart. 
    var trace = { 
        x: top_sample_Values,
        y: top_otu_Ids,
        text: [otu_Labels]
        type: bar,
        orientation: 'h'

    }
    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(barData, layout);
    
    // DELIVERABLE 2//
    // 1. Create the trace for the bubble chart.
    var trace = { 
      x: top_sample_Values,
      y: top_otu_Ids,
      type: bar,
      orientation: 'h'
    }
    var bubbleData = [trace]; 

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot();
  });
}
