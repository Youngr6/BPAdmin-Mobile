


$(document).ready(function () {

});

function refreshOrders() {
    $.ajaxSetup({ cache: false });

    $("#refreshOrdersButton").attr("disabled", true);

    $.ajax
    ({
        type: "POST",
        url: baseURL + "/monitor/GetTodaysData",
        dataType: 'json',
        success: function (jsonData) {
            var markup = [];

            $.each(jsonData.stats.TodaysOrders, function (i, obj) {
                markup.push("<li>");
                markup.push("<a href=/ViewOrder?id=" + obj.OrderId + ">");
                markup.push("<h1>" + obj.CustomerName + " £" + parseFloat(Math.round(obj.OrderAmount * 100)/100).toFixed(2) + "</h1>");
                markup.push("<p>" + obj.DeliveryCity + "</p>");
                markup.push("</a></li>");
            });

            $('#todaysOrders').html(markup.join(""));
            $('#todaysOrders').listview('refresh');
            $("#refreshOrdersButton").attr("disabled", false);
        },
        error: function (request, error) {
            alert('failed ' + error);
            $("#refreshOrdersButton").attr("disabled", false);
        }
    });

}
