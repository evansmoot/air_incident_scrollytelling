window.onload = start;
var firstArray;
var tenthArray;
var temp;

var byMake;

var incidents;
var svg = d3.select("svg");

var projection = d3.geoAlbersUsa().translate(960/2 + 300,600/2);


function displayMap() {
  
  var path = d3.geoPath();

  svg.attr("transform", "translate(300, 0)")
    
  svg.position
  d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error) throw error;

    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);

    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

    var point = [623, 220];
    svg.selectAll("circle")
        .data(point).enter()
        .append("circle")
        .attr("cx", function (d) { 
          return 623; })  
        .attr("cy", function (d) { 
          return 220; })
        .attr("r", "8px")
        .attr("fill", "red");
  });
}


function start() {
  d3.csv('data.csv', function(error, data) {

      //Filter out any data without longitude and latitude since we can't map those
      incidents = data;

      //Sort incidents by date since we want our scrolling to be time-based
      incidents.sort(function(a,b) {
          return new Date(a.Event_Date) - new Date(b.Event_Date);
      });
      //Probably should break the data into ~10 different arrays based on years
      //so they can appear/disappear easily as we scroll

      

      byMake = d3.nest()
        .key(function(d) { return d.Make; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(data);

      byCarrier = d3.nest()
        .key(function(d) { 
          if (d.Air_Carrier.toLowerCase().includes("delta")) {
            return "Delta";
          }
          if (d.Air_Carrier.toLowerCase().includes("mesa")) {
            return "Mesa";
          }
          if (d.Air_Carrier.toLowerCase().includes("skywest")) {
            return "SkyWest";
          }
          if (d.Air_Carrier.toLowerCase().includes("united")) {
            return "United";
          }
          if (d.Air_Carrier.toLowerCase().includes("virgin")) {
            return "Virgin";
          }
          if (d.Air_Carrier.toLowerCase().includes("continental")) {
            return "Continental";
          }
          if (d.Air_Carrier.toLowerCase().includes("american")) {
            return "American";
          }
          if (d.Air_Carrier.toLowerCase().includes("southwest") || d.Air_Carrier.toLowerCase().includes("soutwest")) {
            return "Southwest";
          }
          if (d.Air_Carrier.toLowerCase().includes("jet") && d.Air_Carrier.toLowerCase().includes("blue")) {
            return "JetBlue";
          }
          if (d.Air_Carrier.toLowerCase().includes("northwest")) {
            return "Northwest";
          }
          if (d.Air_Carrier.toLowerCase().includes("alaska")) {
            return "Alaska";
          }
          if (d.Air_Carrier.toLowerCase().includes("federal") && d.Air_Carrier.toLowerCase().includes("express") || d.Air_Carrier.toLowerCase().includes("fedex")) {
            return "FedEx";
          }
          if (d.Air_Carrier.toLowerCase().includes("us") && d.Air_Carrier.toLowerCase().includes("air")) {
            return "US Airways";
          }
          if (d.Air_Carrier.toLowerCase().includes("america") && d.Air_Carrier.toLowerCase().includes("west")) {
            return "America West";
          }
          if (d.Air_Carrier.toLowerCase().includes("horizon")) {
            return "Horizon";
          }
          if (d.Air_Carrier.toLowerCase().includes("british")) {
            return "British Airways";
          }
          if (d.Air_Carrier.toLowerCase().includes("republic")) {
            return "Republic";
          }
          if (d.Air_Carrier.toLowerCase().includes("atlantic") && d.Air_Carrier.toLowerCase().includes("southeast")) {
            return "Atlantic Southeast";
          }
          if (d.Air_Carrier.toLowerCase().includes("air") && d.Air_Carrier.toLowerCase().includes("china")) {
            return "Air China";
          }
          if (d.Air_Carrier.toLowerCase().includes("air") && d.Air_Carrier.toLowerCase().includes("tran")) {
            return "Airtran";
          }
          if (d.Air_Carrier.toLowerCase().includes("tower")) {
            return "Tower Air";
          }
          if (d.Air_Carrier.toLowerCase().includes("asiana")) {
            return "Aisana";
          }
          if (d.Air_Carrier.toLowerCase().includes("alitalia")) {
            return "Alitalia";
          }
          return d.Air_Carrier;
         })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(data);

        byCarrier = byCarrier.filter(function (v) {
          return v.value.total > 40 && v.key != "";
        })

      byCountry = d3.nest()
        .key(function(d) { return d.Country; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(data);

      byCountry = byCountry.filter(function (v) {
        return v.value.total > 28 && v.key != "";
      })

      byCond = d3.nest()
        .key(function(d) { return d.Weather_Condition; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(data);

        byCond = byCond.filter(function (v) {
          return v.key != "";
        })
  
      
      console.log(byCond);

      var index = 1;

      firstArray = incidents.splice(0,64);
      console.log(firstArray);
      temp = incidents.splice(incidents.length - 84, incidents.length - 1);
      tenthArray = temp.splice(0, 70)
      console.log(tenthArray);

      aircraftDamage1995 = d3.nest()
        .key(function(d) { return "1995 " + d.Aircraft_Damage; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(firstArray);

      aircraftDamage1995 = aircraftDamage1995.filter(function (v) {
        return v.key != "";
      })

      aircraftDamage2015 = d3.nest()
        .key(function(d) { return "2015 " + d.Aircraft_Damage; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(tenthArray);

      aircraftDamage2015 = aircraftDamage2015.filter(function (v) {
        return v.key != "";
      })

      phaseOf = d3.nest()
        .key(function(d) { return d.Broad_Phase_of_Flight; })
        .rollup(function(v) { return {
          total: d3.sum(v, function(d) { return 1; })
        }})
        .entries(data);

        phaseOf = phaseOf.filter(function (v) {
          return v.key != "";
        })
      
      display();
  });
}

function display() {
  var scroll = scroller().container(d3.selectAll("#graphic"));
  scroll(d3.selectAll(".step"));

  scroll.on('active', function(index) {
    d3.selectAll(".step").style('opacity', function(d, i) {return i === index ? 1 : 0.1; });
  });

  var prevIndex;

  scroll.on('progress', function (index, progress) {
    // map.update(index, progress);
    // Here is where we can add code to update map vis based on scrolling progress

    //This code makes sure rest of method only executes if new step happens so we don't do animations twice
    if (index == prevIndex) {
      return;
    }
    prevIndex = index;
    
    switch(index) {
      case 0:
        svg.selectAll("*").remove();
        break;
      case 1:
        d3.selectAll("svg > *").remove();
        displayMap();
        //console.log(point);
        /*svg.selectAll("circle")
          .data(point).enter()
          .append("circle")
          .attr("cx", function (d) { 
            return 623; })  
		      .attr("cy", function (d) { 
            return 220; })
          .attr("r", "8px")
          .attr("fill", "red");*/
        break;
      case 2:
          d3.selectAll("svg > *").remove();
          svg.attr("transform", "translate(300, 0)")
          var yScale = d3.scaleLinear().domain([0, 50]).range([550, 50]);
          var xScale = d3.scaleOrdinal().domain(["1995 Minor", "2015 Minor", "1995 Substantial", "2015 Substantial", "1995 Destroyed", "2015 Destroyed"]).range([100, 230, 380, 510, 660, 790]);
          var xAxis = d3.axisBottom().scale(xScale);
          var yAxis = d3.axisLeft().scale(yScale).ticks(5);

          svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(yAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
          svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(xAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(400, 595)').text('Aircraft Damage by Year');

          svg.selectAll("bar").data(aircraftDamage1995).enter().append("rect")
            .style("fill", function(d) {
              if (d.key == "1995 Minor") return "black";
              if (d.key == "1995 Substantial") return "blue";
              if (d.key == "1995 Destroyed") return "red";
            })
            .attr("x", function(d) { return xScale(d.key); })
            .attr("y",  function(d) { return yScale(0); })
            .attr("width", 60)
            .attr("height", 0)
            .transition().duration(750)
            .attr("y", function(d) { return yScale(d.value.total); })
            .attr("height", function(d) { return Math.abs(yScale(d.value.total) - yScale(0)); });
          svg.selectAll("bar").data(aircraftDamage2015).enter().append("rect")
            .style("fill", function(d) {
              if (d.key == "2015 Minor") return "black";
              if (d.key == "2015 Substantial") return "blue";
              if (d.key == "2015 Destroyed") return "red";
            })
            .attr("x", function(d) { return xScale(d.key); })
            .attr("y",  function(d) { return yScale(0); })
            .attr("width", 60)
            .attr("height", 0)
            .transition().duration(750)
            .attr("y", function(d) { return yScale(d.value.total); })
            .attr("height", function(d) { return Math.abs(yScale(d.value.total) - yScale(0)); });
          break;
      case 3:
          d3.selectAll("svg > *").remove();
          svg.attr("transform", "translate(300, 0)")
          var yScale = d3.scaleLinear().domain([0, 200]).range([550, 50]);
          var xScale = d3.scaleOrdinal().domain(["STANDING", "TAXI", "TAKEOFF", "CLIMB", "CRUISE", "MANEUVERING", "DESCENT", "APPROACH", "LANDING", "UNKNOWN", "UNKNOWN", "UNKNOWN"]).range([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]);
          var xAxis = d3.axisBottom().scale(xScale);
          var yAxis = d3.axisLeft().scale(yScale).ticks(5);
    
          svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(yAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
          svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(xAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(470, 595)').text('Phase of Flight');
    
          svg.selectAll("bar").data(phaseOf).enter().append("rect")
          .style("fill", function(d) {
            if (d.key == "STANDING") return "red";
            if (d.key == "TAXI") return "yellow";
            if (d.key == "TAKEOFF") return "blue";
            if (d.key == "CLIMB") return "green";
            if (d.key == "CRUISE") return "orange";
            if (d.key == "MANEUVERING") return "purple";
            if (d.key == "DESCENT") return "brown";
            if (d.key == "APPROACH") return "pink";
            if (d.key == "LANDING") return "gray";
            if (d.key == "UNKNOWN") return "black";
          })
          .attr("x", function(d) { return xScale(d.key); })
          .attr("y",  function(d) { return yScale(0); })
          .attr("width", 60)
          .attr("height", 0)
          .transition().duration(750)
          .attr("y", function(d) { return yScale(d.value.total); })
          .attr("height", function(d) { return Math.abs(yScale(d.value.total) - yScale(0)); });
            break;
        break;
      case 4:
          d3.selectAll("svg > *").remove();        
          svg.attr("transform", "translate(300, 0)")
          var crashScale = d3.scaleLinear().domain([0, 1000]).range([550, 50]);
          var countryScale = d3.scaleOrdinal().domain(["United States", "Japan", "France", "Indonesia", "China", "United Kingdom", "Canada", "Brazil", "Germany", "Australia"]).range([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
          var countryAxis = d3.axisBottom().scale(countryScale);
          var crashAxis = d3.axisLeft().scale(crashScale).ticks(5);
  
          svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(crashAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
          svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(countryAxis);
          svg.append('text').attr('class', 'label').attr('transform', 'translate(450, 595)').text('Country');
  
          svg.selectAll("bar").data(byCountry).enter().append("rect")
          .style("fill", function(d) {
            if (d.key == "United States") return "#A07A19";
            if (d.key == "Japan") return "#AC30C0";
            if (d.key == "France") return "#EB9A72";
            if (d.key == "Indonesia") return "navy";
            if (d.key == "China") return "red";
            if (d.key == "United Kingdom") return "blue";
            if (d.key == "Canada") return "cyan";
            if (d.key == "Brazil") return "green";
            if (d.key == "Germany") return "gold";
            if (d.key == "Australia") return "navy";
          })
          .attr("x", function(d) { return countryScale(d.key); })
          .attr("y",  function(d) { return crashScale(0); })
          .attr("width", 60)
          .attr("height", 0)
          .transition().duration(750)
          .attr("y", function(d) { return crashScale(d.value.total); })
          .attr("height", function(d) { return Math.abs(crashScale(d.value.total) - crashScale(0)); });
        break;
      case 5:  
      
      d3.selectAll("svg > *").remove();     
      svg.attr("transform", "translate(300, 0)")
      var crashScale = d3.scaleLinear().domain([0, 1000]).range([550, 50]);
      var condScale = d3.scaleOrdinal().domain(["VMC", "IMC", "UNK"]).range([100, 300, 500]);
      var condAxis = d3.axisBottom().scale(condScale);
      var crashAxis = d3.axisLeft().scale(crashScale).ticks(5);

      svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(crashAxis);
      svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
      svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(condAxis);
      svg.append('text').attr('class', 'label').attr('transform', 'translate(250, 595)').text('Weather Condition');

      svg.selectAll("bar").data(byCond).enter().append("rect")
      .style("fill", function(d) {
        if (d.key == "VMC") return "#A07A19";
        if (d.key == "IMC") return "#AC30C0";
        if (d.key == "UNK") return "#EB9A72";
      })
      .attr("x", function(d) { return condScale(d.key); })
      .attr("y",  function(d) { return crashScale(0); })
      .attr("width", 60)
      .attr("height", 0)
      .transition().duration(750)
      .attr("y", function(d) { return crashScale(d.value.total); })
      .attr("height", function(d) { return Math.abs(crashScale(d.value.total) - crashScale(0)); });
        break;
      case 6:
        d3.selectAll("svg > *").remove();        
        svg.attr("transform", "translate(300, 0)")
        var crashScale = d3.scaleLinear().domain([0, 100]).range([550, 50]);
        var carrierScale = d3.scaleOrdinal().domain(["Delta", "American", "United", "Southwest"]).range([100, 300, 500, 700]);
        var carrierAxis = d3.axisBottom().scale(carrierScale);
        var crashAxis = d3.axisLeft().scale(crashScale).ticks(5);

        svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(crashAxis);
        svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
        svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(carrierAxis);
        svg.append('text').attr('class', 'label').attr('transform', 'translate(450, 595)').text('Carrier');

        svg.selectAll("bar").data(byCarrier).enter().append("rect")
        .style("fill", function(d) {
          if (d.key == "Delta") return "#A07A19";
          if (d.key == "American") return "#AC30C0";
          if (d.key == "United") return "#EB9A72";
          if (d.key == "Southwest") return "navy";
        })
        .attr("x", function(d) { return carrierScale(d.key); })
        .attr("y",  function(d) { return crashScale(0); })
        .attr("width", 60)
        .attr("height", 0)
        .transition().duration(750)
        .attr("y", function(d) { return crashScale(d.value.total); })
        .attr("height", function(d) { return Math.abs(crashScale(d.value.total) - crashScale(0)); });
        break;
      case 7:
        // console.log(byMake);
        // bar graph number of crashes by airplane make
        d3.selectAll("svg > *").remove();
        svg.attr("transform", "translate(300, 0)")
        var crashScale = d3.scaleLinear().domain([0, 1500]).range([550, 50]);
        var carrierScale = d3.scaleOrdinal().domain(["Bombardier", "Boeing", "McDonnell Douglas", "Embraer", "Airbus"]).range([100, 300, 500, 700, 900]);
        var carrierAxis = d3.axisBottom().scale(carrierScale);
        var crashAxis = d3.axisLeft().scale(crashScale).ticks(5);

        svg.append('g').attr('class', 'y axis').attr('transform', 'translate(65, 0)').call(crashAxis);
        svg.append('text').attr('class', 'label').attr('transform', 'translate(15, 350) rotate(270)').text('Number of Crashes');
        svg.append('g').attr('class', 'x axis').attr('transform', 'translate(25, 550)').call(carrierAxis);
        svg.append('text').attr('class', 'label').attr('transform', 'translate(450, 595)').text('Make');

        svg.selectAll("bar").data(byMake).enter().append("rect")
        .style("fill", function(d) {
          if (d.key == "Bombardier") return "#A07A19";
          if (d.key == "Boeing") return "#AC30C0";
          if (d.key == "McDonnell Douglas") return "#EB9A72";
          if (d.key == "Embraer") return "navy";
          if (d.key == "Airbus") return "teal";
        })
        .attr("x", function(d) { return carrierScale(d.key); })
        .attr("y",  function(d) { return crashScale(0); })
        .attr("width", 60)
        .attr("height", 0)
        .transition().duration(750)
        .attr("y", function(d) { return crashScale(d.value.total); })
        .attr("height", function(d) { return Math.abs(crashScale(d.value.total) - crashScale(0)); });
        break;
    }
  });
}
