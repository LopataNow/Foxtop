export interface Position {

}
let location = {
  coords: {
    latitude: 49.8335063,
    longitude: 18.1577964
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    location = position;
  });
}

export function getLocation(callback) {
  if(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        location = position;
        callback(location);
      });
    }
  }
    return location;
}