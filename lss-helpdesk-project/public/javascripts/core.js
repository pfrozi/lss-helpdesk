$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();

    $('.dateTimeField').each(function() {
        $(this).text(formatDate($(this).text()));
    });
});

// Functions
function formatDate(dateStr) {

    var date = new Date(dateStr);

    //var month = date.getMonth() + 1; //months from 1-12
    //var day = date.getDate();
    //var year = date.getFullYear();

    //newdate = day + "/" + month + "/" + year;
    return date.toLocaleString();

    //var hours = date.hours;
    //var minutes = date.minutes;

    //var strTime = hours + ':' + minutes;
    //return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
