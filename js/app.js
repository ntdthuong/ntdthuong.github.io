
var app = angular.module('myApp', []);
app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })

  .when('/categogies',{
    templateUrl : 'pages/categogies.html',
    controller  : 'BlogController'
  })
  .when('/categogies/adventure', {
    templateUrl : 'pages/categogies.html',
    controller  : 'BlogController'
  }).when('/categogies/biographical',{
    templateUrl : 'pages/categogies.html',
    controller  : 'BlogController'
  }).when('/categogies/romantic', {
    templateUrl : 'pages/categogies.html',
    controller  : 'BlogController'
  })
  .when('/contact', {
    templateUrl : 'pages/contact.html',
    controller  : 'AboutController'
  })
  .when('/categogies/details', {
    templateUrl : 'pages/categogies/details.html',
    controller  : 'AboutController'
  })
  .when('/signin', {
    templateUrl : 'pages/signin.html',
    controller  : 'AboutController'
  })
  .when('/signup', {
    templateUrl : 'pages/signup.html',
    controller  : 'AboutController'
  })
  .otherwise({redirectTo: '/'});
});
app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

app.controller('BlogController', function($scope) {
  $scope.message = 'Hello from BlogController';
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Hello from AboutController';
});