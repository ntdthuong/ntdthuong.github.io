var gmap = new google.maps.LatLng(10.802247, 106.693645);
var marker;
function initialize()
{
    var mapProp = {
         center:new google.maps.LatLng(10.802247, 106.693645),
         zoom:16,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
 
    var map=new google.maps.Map(document.getElementById("googleMap")
    ,mapProp);
 
  var styles = [
    {
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { hue: '#fff' },
        { saturation: 100 },
        { lightness: -48 },
        { visibility: 'on' }
      ]
    },{
      featureType: 'road',
      elementType: 'all',
      stylers: [
 
      ]
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#adc9b8' }
        ]
    },{
        featureType: 'landscape.natural',
        elementType: 'all',
        stylers: [
            { hue: '#809f80' },
            { lightness: -35 }
        ]
    }
  ];
 
  var styledMapType = new google.maps.StyledMapType(styles);
  map.mapTypes.set('Styled', styledMapType);
 
  marker = new google.maps.Marker({
    map:map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    position: gmap
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
}
 
function toggleBounce() {
 
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
 
google.maps.event.addDomListener(window, 'load', initialize);