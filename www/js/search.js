


$(document).ready(function () {

    $('#btnSearch').click(function () {
        $.ajax({
            beforeSend: function () { $.mobile.showPageLoadingMsg(); }, //Show spinner
            complete: function () { $.mobile.hidePageLoadingMsg() }, //Hide spinner
            type:"POST",
            url: baseURL + '/monitor/searchBasket',
            data: { searchTerm: $('#searchText').val() },
            dataType: 'json',
            success: function (data) {

                if (data.success == false) {
                    alert("Failed: " + data.error);
                }
                else {

                    var markup = [];

                    $.each(data.baskets, function (i, obj) {
                        markup.push("<li>");
                        markup.push("<h1>" + obj.CustomerName + "</h1>");
                        markup.push("<p>" + obj.EMailAddress + "</p>");
                        if (obj.BasketItems != undefined) {
                            $.each(obj.BasketItems, function (i, item) {
                                markup.push("<p>");
                                markup.push(formatJSONDate(item.DateAdded) + " " + item.Quantity + " x " + item.ProductName + ': ' + item.ProductOptions);
                                markup.push("</p>");
                            });
                        }
                        markup.push("</li>");
                    });

                    $('#searchResults').html(markup.join(""));
                    $('#searchResults').listview('refresh');
                }
            },
            error: function (data) {
                alert('Failed');
            }
        });
    });

});

