
function initMap() {
            var uluru = {lat: 10.785502, lng: 106.699664};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
            // var map2 = new google.maps.Map(document.getElementById('map2'), {
            //   zoom: 15,
            //   center: uluru
            // });
            // var marker = new google.maps.Marker({
            //   position: uluru,
            //   map: map2
            // });
          }
