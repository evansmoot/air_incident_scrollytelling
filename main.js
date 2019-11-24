window.onload = start;

function start() {
    d3.csv('data.csv', function(error, data) {

        //Filter out any data without longitude and latitude since we can't map those
        var incidents = data.filter(function (d) {
            return (d.Longitude != "" || d.Latitude != "");
        });

        //Sort incidents by date since we want our scrolling to be time-based
        incidents.sort(function(a,b) {
            return new Date(a.Event_Date) - new Date(b.Event_Date);
        });
        //Probably should break the data into ~10 different arrays based on years
        //so they can appear/disappear easily as we scroll

        console.log(incidents);
    });
}
