
const url = "/visualisation_data"

// First populate the dropdown options to match the platform names list using an `init` function
function init() {
    // use D3 to select the #selDataset ID, which we will be appending to
    var selDropdown = d3.select("#selDataset");

    // Use d3 to read in JSON data
    d3.json(url).then((data) => {
        //Now we want to append each platform string to a new option in the dropdown
        data.forEach(data => {
            selDropdown
            .append("option")
            .text(data.Platform)
            .property("value", data.Platform)
            /* add an <option> element, with the text being the platform, and add a 
            "value" property to the element being the platform string*/
        });

        // Define first platform which will load graphs upon page loading
        var firstPlatform = data[0].Platform;
        console.log(`------------------------`)
        console.log(`firstID variable:`)
        console.log(firstPlatform);
        buildMetadata(firstPlatform);
        buildBar(firstPlatform);
        buildPie(firstPlatform);
        buildGauge(firstPlatform);
    })
};

init();

function buildMetadata(platformID) {
        
    // Read in JSON data
    d3.json(url).then(data => {
    
        // Use the <div> element with "sample-metadata" ID to append the demographic data
        var metadataBox = d3.select("#sample-metadata");
        // Clear the existing data in the box (if exists)
        metadataBox.html("");

        var searchData = data.filter(data => data.Platform === platformID);
        console.log(searchData)
        console.log('------------');
        var selectedData = searchData[0];
        console.log(selectedData);
        var metadata = {"Earliest Year of Release": selectedData.Year_of_Release_min,
                        "Latest Year of Release": selectedData.Year_of_Release_max,
                        "Number of Games": selectedData.AO_Rating_sum
                                        + selectedData["E10+_Rating_sum"]
                                        + selectedData.E_Rating_sum
                                        + selectedData["K-A_Rating_sum"]
                                        + selectedData.M_Rating_sum
                                        + selectedData.RP_Rating_sum
                                        + selectedData.T_Rating_sum};
        console.log(metadata);

        // Then append the current ID's demographic data to the box
        Object.entries(metadata).forEach(([key, value]) => {
            metadataBox.append("p").text(`${key}: ${value}`)
        });
    })
}

// Create bar chart
function buildBar(platformID) {

    // Read in JSON data
    d3.json(url).then(data => {
        console.log(data);
        
        // Filter data based on platform
        var searchData = data.filter(data => data.Platform === platformID);
        console.log(searchData)
        console.log('------------');
        var selectedData = searchData[0];
        console.log(selectedData);

        // Get bar graph values into variables (in this case sales data)
        var NASales = selectedData.NA_Sales_mean;
        var JPSales = selectedData.JP_Sales_mean;
        var otherSales = selectedData.Other_Sales_mean;
        var globalSales = selectedData.Global_Sales_mean;
        var EUSales = selectedData.EU_Sales_mean;

        var labels = [selectedData.Platform];

        // Destroy the chartt before creating a new one
        let chartStatus = Chart.getChart("barChart"); // canvas ID
        if (chartStatus!= undefined) {
            chartStatus.destroy()
        }

        var barID = document.getElementById('barChart');
        var barChart = new Chart(barID, {
            type: "bar",
            data: {
                // X-axis label (had to put it in list so it showed the full text as one bar)
                labels: labels,
                datasets: [
                    {
                        label: "North America",
                        data: [NASales],
                        backgroundColor: "red"
                    },
                    {
                        label: "Japan",
                        data: [JPSales],
                        backgroundColor: "blue"},
                    {
                        label: "Europe",
                        data: [EUSales],
                        backgroundColor: "orange"},
                    {
                        label: "Other",
                        data: otherSales,
                        backgroundColor: "purple"
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                        display: true,
                        title: {
                            text: "Platform",
                            display: true
                        }
                    }, 
                    y: {
                        stacked: true,
                        display: true,
                        title: {
                            display: true,
                            text: "Average Sales (Units Sold (Million))"
                        }
                    },
                    maintainAspectRaio: false,
                    responsive: true
                }
            }
            
        });
    })
}

// Create pie charts
function buildPie(platformID) {
    
    // Read in data
    d3.json(url).then(data => {
    
        // Filter data based on platform
        var searchData = data.filter(data => data.Platform === platformID);
        console.log(searchData)
        console.log('------------');
        var selectedData = searchData[0];
        console.log(selectedData);

        // Put all ratings and genres into variables
        var AORating = selectedData.AO_Rating_sum;
        var E10Rating = selectedData["E10+_Rating_sum"];
        var ERating = selectedData.E_Rating_sum;
        var KARating = selectedData['K-A_Rating_sum'];
        var MRating = selectedData.M_Rating_sum;
        var RPRating = selectedData.RP_Rating_sum;
        var TRating = selectedData.T_Rating_sum;

        var actionGenre = selectedData.Action_Genre_sum;
        var adventureGenre = selectedData.Adventure_Genre_sum;
        var fightingGenre = selectedData.Fighting_Genre_sum;
        var miscGenre = selectedData.Misc_Genre_sum;
        var platformGenre = selectedData.Platform_Genre_sum;
        var puzzleGenre = selectedData.Puzzle_Genre_sum;
        var racingGenre = selectedData.Racing_Genre_sum;
        var shooterGenre = selectedData.Shooter_Genre_sum;
        var simulationGenre = selectedData.Simulation_Genre_sum;
        var sportsGenre = selectedData.Sports_Genre_sum;
        var strategyGenre = selectedData.Strategy_Genre_sum;

        // Destroy the chartt before creating a new one
        let chartStatusRating = Chart.getChart("pieChartRating"); // canvas ID
        if (chartStatusRating!= undefined) {
            chartStatusRating.destroy()
        }

        // Generate Rating Pie chart
        var ratingPieID = document.getElementById('pieChartRating');
        var pieChartRating = new Chart(ratingPieID, {
            type: "pie",
            data: {
                labels: ["AO Rating", "E Rating", "E10+ Rating","K-A Rating","M Rating","RP Rating", "T Rating"],
                datasets: [{
                    label: "Game Rating Counts",
                    data: [AORating, E10Rating, ERating, KARating, MRating, RPRating, TRating],
                    backgroundColor: ['#82E0AA','#DB4848','#EE9522','#45E9DF','#4AA4CE','#6F73E0','#A55EF5']
                }]
            }
        });
        
        // Destroy the chart before creating a new one
        let chartStatusGenre = Chart.getChart("pieChartGenre"); // canvas ID
        if (chartStatusGenre!= undefined) {
            chartStatusGenre.destroy()
        }
        var genrePieID = document.getElementById('pieChartGenre');
        var pieChartGenre = new Chart(genrePieID, {
            type: "pie",
            data: {
                labels: ["Action", "Adventure", "Fighting","Miscellaneous","Platform","Puzzle", "Racing","Shooter","Simulation","Sports","Strategy"],
                datasets: [{
                    label: "Game Genre Counts",
                    data: [actionGenre, adventureGenre, fightingGenre, miscGenre, platformGenre, puzzleGenre, racingGenre, shooterGenre, simulationGenre, sportsGenre, strategyGenre],
                    backgroundColor: ['#82E0AA',
                                    '#DB4848',
                                    '#EE9522',
                                    '#45E9DF',
                                    '#4AA4CE',
                                    '#6F73E0',
                                    '#A55EF5',
                                    '#E4AFEA',
                                    '#BBBBBB',
                                    '#A4FFD3',
                                    '#5C70A7']
                }]
            }
        });
    })
}

// Define function to create Gauge Charts
function buildGauge(platformID) {
    
    // Read in data
    d3.json(url).then(data => {
        
        // Filter data based on platform
        var searchData = data.filter(data => data.Platform === platformID);
        console.log(searchData)
        console.log('------------');
        var selectedData = searchData[0];
        console.log(selectedData);

        // Get average critic and user scores into variables
        var criticScore = selectedData.Critic_Score_mean;
        var userScore = selectedData.User_Score_mean;

        // Build critic score chart
        var criticGauge = [{
            value: criticScore,
            title: {
                text: "Average Critic Score"
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,100]},
                steps: [
                    {range: [0,20], color:"#D98880"},
                    {range: [20,40], color:"#E59866"},
                    {range: [40,60], color:"F7DC6F"},
                    {range: [60,80], color:"#7DCEA0"},
                    {range: [80,100], color:"#82E0AA"}
                ]
            }
        }];

        // Build user score chart
        var userGauge = [{
            value: userScore,
            title: {
                text: "Average User Score"
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10]},
                steps: [
                    {range: [0,2], color:"#D98880"},
                    {range: [2,4], color:"#E59866"},
                    {range: [4,6], color:"F7DC6F"},
                    {range: [6,8], color:"#7DCEA0"},
                    {range: [8,10], color:"#82E0AA"}
                ]
            }
        }];

        let layout_gauge_critic = {
            autosize: true,
            margin: {
                b: 10,
                t: 40,
                l: 35,
                r: 35
            },
            height: 200
        };

        let layout_gauge_user = {
            autosize: true,
            margin: {
                b: 10,
                t: 40,
                l: 35,
                r: 35
            },
            height: 200
        };

        let config_gauge = {
            responsive: true
        };

        // Build the two plots into their respective div IDs
        Plotly.newPlot("gauge-critics", criticGauge, layout_gauge_critic, config_gauge);
        Plotly.newPlot("gauge-users", userGauge, layout_gauge_user, config_gauge);
    })
}

    // Define a function that will switch to the current patientID data
    function optionChanged(platformID) {
        buildMetadata(platformID);
        buildBar(platformID);
        buildPie(platformID);
        buildGauge(platformID);
}