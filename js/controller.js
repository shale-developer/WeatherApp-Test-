angular.module('app' , ['controller','uiGmapgoogle-maps'])

// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=53f9d8e4213222cf517d86dc406d67fc example API

.controller('mainCtrl', function($scope,$http,uiGmapGoogleMapApi)  {

 $scope.myLocation = {
    lng : '',
    lat: ''
  }

  $scope.options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
  };


$scope.loading = true;

    var getInfo = function(lat,lng) {

  


            $scope.info = [];
            $scope.moreDetails = [];
            lng = $scope.myLocation.lng.toFixed(2);
            lat = $scope.myLocation.lat.toFixed(2);
            console.log(lat);
            console.log(lng);
            $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&APPID=53f9d8e4213222cf517d86dc406d67fc')
            .success(function(data){
                console.log(data);
                $scope.location = data.name;
                console.log(data.weather[0]);
                $scope.info = data.weather;
                $scope.moreDetails = [data.main];
                console.log($scope.moreDetails);
                $scope.loading = false;
            })
            .catch(function(data){
                console.log(data);
                $scope.loading = false;
            })


            
 
         }

  $scope.drawMap = function(position) {
    //$scope.$apply is needed to trigger the digest cycle when the geolocation arrives and to update all the watchers
    $scope.$apply(function() {
      $scope.myLocation.lng = position.coords.longitude;
      $scope.myLocation.lat = position.coords.latitude;

     
      
      getInfo();
      
    });
  }

$scope.update = function () {
    $scope.loading = true;
     getInfo();
}

  navigator.geolocation.getCurrentPosition($scope.drawMap, $scope.handleError, $scope.options);  


});