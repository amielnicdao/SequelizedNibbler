$(document).ready(function () {

    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        var menu = $("#burgers");
        var eatenBurgers = $("#hasEaten");

        var burgers = data.burgers;
        var len = burgers.length;

        for (let i = 0; i < len; i++) {

            var devour_elem =
                "<li>" + burgers[i].burger_name + "<button class='devour-burger' data-id='" + burgers[i].id +
                "' data-devour='" + !burgers[i].devoured + "'>Devour</button></div></li>";
            var delete_elem =
                "<li>" + burgers[i].burger_name + "<button class='delete-burger' data-id='" + burgers[i].id + "'>Delete</button></div</li>";

            if (!burgers[i].devoured) {
                menu.append(devour_elem);
            } else if (burgers[i].devoured) {
                eatenBurgers.append(delete_elem);
            }
        }
    });

    // Create a new burger
    $("#addburger").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger: $("#faveburger").val().trim(),
            devoured: false
        }

        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: "json",
            contentType: "application/json",
        }).then(function () {
            location.reload();
        });
    });

    // Change a burger to devoured
    $(document).on("click", ".devour-burger", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devourBurger = $(this).data("devour") === true;
        var newDevoured = {
            devoured: devourBurger
        };

        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newDevoured),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
        });
    });

    // Delete a burger
    $(document).on("click", ".delete-burger", function (event) {
        event.preventDefault();

        var id = $(this).data("id");

        $.ajax("/burgers/" + id, {
            type: "DELETE",

        }).then(function () {
            location.reload();
        });
    });
});


