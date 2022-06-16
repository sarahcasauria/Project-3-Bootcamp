
const url = "/visualisation"

/// making a chart
d3.csv(url).then(data => {

    console.log(data)
});

// //First populate the dropdown options to match the platform names list using an `init` function
// function init() {
//     // use D3 to select the #selDataset ID, which we will be appending to
//     var selDropdown = d3.select("#selDataset");
//     // Use d3 to read in the JSON data
//     d3.csv("../data/platform_summary.csv").then(data => {
//         console.log(data);

//         //Now we want to append this name to a new option in the dropdown
//         data.forEach(platform => {
//             selDropdown
//             .append("option")
//             .text(platform.Platform)
//             .property("value",platform.Platform)
//             /* add an <option> element, with the text being the platform, and add a 
//             "value" property to the element being the platform string*/
//         });
//     })
// }

// init();

// // Display the sample metadata, i.e., an individual's demographic information.
// // Get the data from the JSON source again
// function buildMetadata(platform) {
//     d3.csv(url).then(data => {
//         // From the JSON file, put the bacteria sample data into a variable
//         data.forEach((platform) => {
//         var platformName = platform.Platform
//         var yearMin = +platform.Year_of_Release_min;
//         var yearMax = +platform.Year_of_Release_max;
//         var numGames = +platform.AO_Rating_sum 
//                         + +platform["E10+_Rating_sum"] 
//                         + +platform.E_Rating_sum 
//                         + +platform["K-A_Rating_sum"]
//                         + +platform.M_Rating_sum
//                         + +platform.T_Rating_sum;
//         console.log(`------------------------`);
//         console.log(`Metadata list:`);
//         console.log(yearMin);
//         console.log(yearMax);
//         console.log(numGames);
//         })
    
//         // Create a variable that filters the sampleData array to match the desired patientID when selected
//         var array = platformName.filter(demo => demo.id === parseInt(patientID));
//         var patientDemo = array[0];
//         console.log(`------------------------`)
//         console.log(`patientDemo variable:`)
//         console.log(patientDemo);

//         // // Use the <div> element with "sample-metadata" ID to append the demographic data
//         // var demographicsBox = d3.select("#sample-metadata");
//         // // Clear the existing data in the box (if exists)
//         // demographicsBox.html("");

//         // // Then append the current ID's demographic data to the box
//         // Object.entries(patientDemo).forEach(([key, value]) => {
//         //     demographicsBox.append("p").text(`${key}: ${value}`)
//         // });
//     });
// };

// buildMetadata();
//     // // Create bar chart function
//     // var labels = groupBy.map(x => x.Platform);
//     // var barData = groupBy.map(x => x.globalSales);
//     // console.log(barData)

//     // const barID = document.getElementById('platformChart');
//     // const barChart = new Chart(barID, {
//     //     type: "bar",
//     //     data: {
//     //         labels: labels,
//     //         datasets: [{
//     //             label: 'Global sales by platform',
//     //             data: barData
//     //         }]
//     //     }
//     // })

// //     // Create a dummy bar chart
// //     var labelsrating = groupByrating.map(x => x.Rating);
// //     var barDatarating = groupByrating.map(x => x.globalSales);
// //     console.log(barData)

// //     const barIDrating = document.getElementById('ratingChart');
// //     const barChartrating = new Chart(barIDrating, {
// //         type: "bar",
// //         data: {
// //             labels: labelsrating,
// //             datasets: [{
// //                 label: 'Global sales by rating',
// //                 data: barDatarating
// //             }]
// //         }
// //     })