window.onload = start;

function start() {
    d3.csv('data.csv', function(error, data) {

        //Filter out any data without longitude and latitude since we can't map those
        var incidents = data.filter(function (d) {
            return (d.Longitude != "" && d.Latitude != "");
        });
        console.log(incidents);
    });
}
