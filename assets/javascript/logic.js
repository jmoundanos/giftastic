$( document ).ready(function() {
var topics = ["The Office", "Parks and Recreation", "Schitts Creek", "Fleabag", 
          "The Americans","The Crown", "The Marvelous Mrs. Maisel"];
var show = "";
var a;

  function showButtons(){
    $("#buttons").empty();

    for(i = 0; i < topics.length; i++){
      a = $("<button>");
      a.addClass("shows");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons").append(a);
  }
}
showButtons();

$("#add-show").on("click", function(event){
  event.preventDefault();
  
  show = $("#show-input").val().trim();
  topics.push(show);
  $("#show-input").empty();
  showButtons();
  displayGifs();
  $("#show-input").val("");
})

function displayGifs(){
  $("button").on("click", function(){
  var topic = $(this).attr("data-name");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Z6CItVp0vuxji42m4eq3FU3ppmr9UqQF&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      console.log(response);
      var results = response.data;
      $("#showGifs").empty();
     for (var j = 0; j < results.length; j++) {
        var topicDiv = $("<div>");
        var rating = $("<p>").text("Rating: " + results[j].rating);
        var title = $("<p>").text("Title: " + results[j].title);
        var topicImage = $("<img>");

        topicImage.attr("src", results[j].images.fixed_height_still.url);
        topicImage.attr("data-still", results[j].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[j].images.fixed_height.url);
        topicImage.attr("data-state", "still");
       
        topicImage.addClass("gif")
        topicDiv.append(topicImage);
        topicDiv.append(title);
        topicDiv.append(rating);
        $("#showGifs").append(topicDiv);
        
    }
  })
 
})
}
$("#showGifs").on("click",".gif", function(event){
  event.preventDefault(event);
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
$("#show-more-gifs").on("click", function(event){
})
displayGifs();

})
