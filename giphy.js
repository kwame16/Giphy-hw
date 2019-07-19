   
   // on click of button new images will occur
    // <button class="sports" data-tag=>Team of New York</button>
    // <button class="sports" data-tag="">NY Laughing Stock</button>
    // <button class="sports" data-tag="">Bronx Bommers</button>
    // <button class="sports" data-tag="">NY Laughing Stock #2</button>
    // <button class="sports" data-tag="">Big Blue</button>
    // <button class="sports" data-tag="">Gang Green</button>
    var sports = ["Nets","Knicks","Yankees","Mets","NY-Giants","NY-Jets"]
   
   function renderButtons(){
       $("#button-view").empty();

       for (var i = 0; i< sports.length; i++){
           var b  = $("<button>"); 
           b.addClass("sports btn btn-outline-primary");
          b.attr("data-tag", sports[i]);
           b.text(sports[i]);
           $("#button-view").append(b);
        }
   }
   renderButtons();
   
    $('.sports').on("click", function () {
        var teams = $(this).attr("data-tag");


        // var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + 
        // teams + "api_key=X3mY7cmmtPhxTKbdKKGtYHsQaEyM94Uw&q=&limit=25&offset=0&rating=G&lang=en";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            teams + "&api_key=X3mY7cmmtPhxTKbdKKGtYHsQaEyM94Uw&limit=10&rating=G";

       callGifs(queryURL);

      

});

       // on click of button new images will occur
    $('.dog').on("click", function () {
        var userSearch = $(".search").val().trim();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        userSearch + "&api_key=X3mY7cmmtPhxTKbdKKGtYHsQaEyM94Uw&limit=10&rating=G";
      
        callGifs(queryURL)
        renderButtons();
    })

    function callGifs (queryURL){
         // preforming AJAX GET Request to pull from the API
         $.ajax({
            url: queryURL,
            method: 'GET'
        })

        // after data is recieved from AJAX request, we handle that
        .then(function (response) {
                console.log(queryURL);
                console.log(response);

                // stores the data from AJAX into the results variable
                var results = response.data;

                // looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // creating & storing a div tag
                    var teamsDiv = $("<div>");

                    // creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Results: " + results[i].rating);

                    // creating & storing a img tag
                    var teamImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    teamImage.attr("data-still", results[i].images.fixed_height_still.url);
                    teamImage.attr("src", results[i].images.fixed_height_still.url);
                    teamImage.attr("data-animate", results[i].images.fixed_height.url);
                    teamImage.attr("data-state", "still");
                    teamImage.addClass("gifs");

                    // appending the paragraph and image tag to the teamsDiv
                    teamsDiv.append(p);
                    teamsDiv.append(teamImage);

                    // prepending the teamDiv to the HTML page in the "images" div
                    $("#images").prepend(teamsDiv);
        }


    })

    }
    $(document).on("click",".gifs", function(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }else {
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state", "still");
          };
    });

