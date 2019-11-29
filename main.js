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

var projection = d3.geoMercator();

function start() {
  d3.csv('data.csv', function(error, data) {

      //Filter out any data without longitude and latitude since we can't map those
      var incidents = data.filter(function (d) {
          return (d.Longitude != "" || d.Latitude != "") && d.Country == "United States";
      })

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
                firstArray = incidents.splice(0,56);
                console.log(firstArray);
                break;
              case 2:
                secondArray = incidents.splice(0,56);
                console.log(secondArray);
                break;
              case 3:
                thirdArray = incidents.splice(0,56);
                console.log(thirdArray);
                break;
              case 4:
                fourthArray = incidents.splice(0,56);
                console.log(fourthArray);
                break;
              case 5:
                fifthArray = incidents.splice(0,56);
                console.log(fifthArray);
                break;
              case 6:
                sixthArray = incidents.splice(0,56);
                console.log(sixthArray);
                break;
              case 7:
                seventhArray = incidents.splice(0,56);
                console.log(seventhArray);
                break;
              case 8:
                eighthArray = incidents.splice(0,56);
                console.log(eighthArray);
                break;
              case 9:
                ninthArray = incidents.splice(0,56);
                console.log(ninthArray);
                break;
              case 10:
                tenthArray = incidents.splice(0,56);
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
        svg.selectAll("circle")
        .attr("fill", null);
        break;
      case 1:
        var point = projection(firstArray[0].Latitude, firstArray[0].Longitude);
        svg.selectAll("circle")
          .data(point).enter()
          .append("circle")
          .attr("cx", function (d) { return projection(d)[0]; })
		      .attr("cy", function (d) { return projection(d)[1]; })
		      .attr("r", "8px")
		      .attr("fill", "red");
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
