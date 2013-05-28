


$(document).ready(function () {

    $('#btnSearch').click(function () {
        $.ajax({
            type:"POST",
            url: baseURL + '/monitor/searchBasket',
            data: { searchTerm: $('#searchText').val() },
            dataType: 'json',
            success: function (data) {
                var markup = [];

                $.each(data.baskets, function (i, obj) {
                    markup.push("<li>");
                    markup.push("<h1>" + obj.CustomerName + " " + obj.EMailAddress + "</h1>");
                    if (obj.Basket != undefined) {
                        markup.push("<p>" + obj.Basket.DateAdded + "</p>");
                        $.each(obj.Basket.Items, function (i, item) {
                            markup.push("<p>");
                            markup.push(item.ProductName + ' - ' + item.ProductOptions);
                            markup.push("</p>");
                        });
                    }
                    markup.push("</li>");
                });

                $('#searchResults').html(markup.join(""));
                $('#searchResults').listview('refresh');
            },
            error: function (data) {
                alert('Failed');
            }
        });
    });

});

