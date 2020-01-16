$( document ).ready(function() {
var topics = ["The Office", "Parks and Recreation", "Schitts Creek", "Fleabag", 
            "Friends", "The Americans", "The Marvelous Mrs. Maisel"];

  function showButtons(){
    $("#gifs").empty();

    for(i = 0; i < topics.length; i++){
      var a = $("<button>");
      a.addClass("show");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#gifs").append(a);
  }
}
showButtons(); 
 
  $("button").on("click", function(){
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Z6CItVp0vuxji42m4eq3FU3ppmr9UqQF&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      console.log(response);
      var results = response.data;
     for (var j = 0; j < results.length; j++) {
        var topicDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[j].rating);
        var topicImage = $("<img>");
        topicImage.attr("src", results[j].images.fixed_height_still.url);
        topicImage.attr("data-still", results[j].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[j].images.fixed_height.url);
        topicImage.attr("data-state", "still");
        //topicImage.addClass("gif")
        topicDiv.append(p);
        topicDiv.append(topicImage);
        $("#gifs").append(topicDiv);
    }
  })
})

$("#gifs").on("click",function(event){
  event.preventDefault();
  var state = $(this).attr("data-state");
    
  if(state === "still"){
    var animateVal = $(this).attr("data-animate");
    $(this).attr("src", animateVal);
    $(this).attr("data-state", "animate");
      
    
  }else{
    var stillVal = $(this).attr("data-still");
    $(this).attr("src", stillVal);
    $(this).attr("data-state", "still");
  }
 
})

})
