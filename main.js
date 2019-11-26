window.onload = start;


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
    });

    

}
