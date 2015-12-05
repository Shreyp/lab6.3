$(document).ready(function() {
  $(".btn-default").on("click", function(e){
    e.preventDefault();
    var userAddress = $("#userAddress").val();
    var googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    googleApiUrl += "key=AIzaSyA_Xc6XLbSKUd3en0i9HAfcwvQ7Tgw_Gs4";
    googleApiUrl += "&address=" + userAddress;

    $.ajax({
      type: "GET",
      url: googleApiUrl,
      success: googleApiSuccessHandler
    });

  });

  function buildThumbnail(photoData) {
    var photoUrl = "https://farm" + photoData.farm;
    photoUrl += ".staticflickr.com/" + photoData.server;
    photoUrl += "/" + photoData.id;
    photoUrl += "_" + photoData.secret + ".jpg";

    var colDiv = $("<div>").addClass("col-md-3");
    var thumbnailDiv = $("<div>").addClass("thumbnail");
    var photoImg = $("<img>").attr("src", photoUrl);
    var captionDiv = $("<div>").addClass("caption");
    var picTitle = $("<p>").append(photoData.title);

    colDiv.append(thumbnailDiv
      .append(photoImg)
      .append(captionDiv
        .append(picTitle)
      )
    );

    return colDiv;

  }

  function googleApiSuccessHandler(response) {

    var geoLocation = response.results[0].geometry.location;
    var flickrApiUrl = "https://api.flickr.com/services/rest/?";
    var flickrApiParams = {
      api_key: "a43d559b6384720c02c090ef01afaa7d",
      method: "flickr.photos.search",
      format: "json",
      nojsoncallback: 1,
      lat: geoLocation.lat,
      lon: geoLocation.lng
    } 
    
    $.ajax({
      type: "GET",
      url: flickrApiUrl + $.param(flickrApiParams),
      success: flickrSuccessHandler
    });
  }

  function flickrSuccessHandler(response) {
    var locationPhotos = response.photos.photo;
    for(var i = 0; i < locationPhotos.length; i++) {
      var newCol = buildThumbnail(locationPhotos[i]);
      $("#locationphotos").append(newCol);
    }
  }
});