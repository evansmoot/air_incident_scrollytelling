window.onload = start;
var firstArray;
var secondArray;
var thirdArray;
var fourthArray;
var fifthArray;
var sixthArray;
var seventhArray;
var eighthArray;
var ninthArray;
var tenthArray;

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

      var index = 1;

      while(incidents.length) {
          switch(index) {
              case 1:
                firstArray = incidents.splice(0,200);
                console.log(firstArray);
                break;
              case 2:
                secondArray = incidents.splice(0,200);
                console.log(secondArray);
                break;
              case 3:
                thirdArray = incidents.splice(0,200);
                console.log(thirdArray);
                break;
              case 4:
                fourthArray = incidents.splice(0,200);
                console.log(fourthArray);
                break;
              case 5:
                fifthArray = incidents.splice(0,200);
                console.log(fifthArray);
                break;
              case 6:
                sixthArray = incidents.splice(0,200);
                console.log(sixthArray);
                break;
              case 7:
                seventhArray = incidents.splice(0,200);
                console.log(seventhArray);
                break;
              case 8:
                eighthArray = incidents.splice(0,200);
                console.log(eighthArray);
                break;
              case 9:
                ninthArray = incidents.splice(0,200);
                console.log(ninthArray);
                break;
              case 10:
                tenthArray = incidents.splice(0,200);
                console.log(tenthArray);
                break;
            }
          index++;
      }
      display();
  });
}

function display() {
  var scroll = scroller().container(d3.selectAll("#graphic"));
  scroll(d3.selectAll(".step"));

  scroll.on('active', function(index) {
    d3.selectAll(".step").style('opacity', function(d, i) {return i === index ? 1 : 0.1; });
  });

  scroll.on('progress', function (index, progress) {
    // map.update(index, progress);
    // Here is where we can add code to update map vis based on scrolling progress
    switch(index) {
      case 0:
        svg.selectAll("*").remove();
        break;
      case 1:
        displayMap();
        var point = [623, 220];
        //console.log(point);
        svg.selectAll("circle")
          .data(point).enter()
          .append("circle")
          .attr("cx", function (d) { 
            return 623; })  
		      .attr("cy", function (d) { 
            return 220; })
          .attr("r", "8px")
          .attr("fill", "black");
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
    }
  });
}
