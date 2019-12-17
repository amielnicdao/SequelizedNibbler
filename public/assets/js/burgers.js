// $(document).ready(function () {

//     $.ajax("/burgers", {
//         type: "GET"
//     }).then(function (data) {
//         var menu = $("#burgers");
//         var eatenBurgers = $("#hasEaten");

//         var burgers = data.burgers;
//         var len = burgers.length;

//         for (let i = 0; i < len; i++) {

//             var devour_elem =
//                 "<li>" + burgers[i].burger_name + "<button class='devour-burger' data-id='" + burgers[i].id +
//                 "' data-devour='" + !burgers[i].devoured + "'>Devour</button></div></li>";
//             var delete_elem =
//                 "<li>" + burgers[i].burger_name + "<button class='delete-burger' data-id='" + burgers[i].id + "'>Delete</button></div</li>";

//             if (!burgers[i].devoured) {
//                 menu.append(devour_elem);
//             } else if (burgers[i].devoured) {
//                 eatenBurgers.append(delete_elem);
//             }
//         }
//     });

//     // Create a new burger
//     $("#addburger").on("submit", function (event) {
//         event.preventDefault();

//         var newBurger = {
//             burger: $("#faveburger").val().trim(),
//             devoured: false
//         }

//         $.ajax("/burgers", {
//             type: "POST",
//             data: JSON.stringify(newBurger),
//             dataType: "json",
//             contentType: "application/json",
//         }).then(function () {
//             location.reload();
//         });
//     });

//     // Change a burger to devoured
//     $(document).on("click", ".devour-burger", function (event) {
//         event.preventDefault();

//         var id = $(this).data("id");
//         var devourBurger = $(this).data("devour") === true;
//         var newDevoured = {
//             devoured: devourBurger
//         };

//         $.ajax("/burgers/" + id, {
//             type: "PUT",
//             data: JSON.stringify(newDevoured),
//             dataType: 'json',
//             contentType: 'application/json'
//         }).then(function () {
//             // Reload the page to get the updated list
//             location.reload();
//         });
//     });

//     // Delete a burger
//     $(document).on("click", ".delete-burger", function (event) {
//         event.preventDefault();

//         var id = $(this).data("id");

//         $.ajax("/burgers/" + id, {
//             type: "DELETE",

//         }).then(function () {
//             location.reload();
//         });
//     });
// });

//sequelized

$(document).ready(function() {
    /* global moment */
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;
  
    // This function grabs posts from the database and updates the view
    function getPosts(category) {
      var categoryString = category || "";
      if (categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/posts" + categoryString, function(data) {
        console.log("Posts", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deletePost(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id
      })
        .then(function() {
          getPosts(postCategorySelect.val());
        });
    }
  
    // Getting the initial list of posts
    getPosts();
    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer
    function initializeRows() {
      blogContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewRow(posts[i]));
      }
      blogContainer.append(postsToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(post) {
      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostCategory = $("<h5>");
      newPostCategory.text(post.category);
      newPostCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      var newPostBody = $("<p>");
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostCategory);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", post);
      return newPostCard;
    }
  
    // This function figures out which post we want to delete and then calls
    // deletePost
    function handlePostDelete() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      deletePost(currentPost.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty() {
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
      blogContainer.append(messageH2);
    }
  
    // This function handles reloading new posts when the category changes
    function handleCategoryChange() {
      var newPostCategory = $(this).val();
      getPosts(newPostCategory);
    }
  
  });
  
