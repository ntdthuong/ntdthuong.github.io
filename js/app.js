
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
    controller  : 'CategogiesController'
  })
  .when('/categogies/adventure', {
    templateUrl : 'pages/categogies.html',
    controller  : 'CategogiesController'
  }).when('/categogies/biographical',{
    templateUrl : 'pages/categogies.html',
    controller  : 'CategogiesController'
  }).when('/categogies/romantic', {
    templateUrl : 'pages/categogies.html',
    controller  : 'CategogiesController'
  })
  .when('/contact', {
    templateUrl : 'pages/contact.html',
    controller  : 'ContactController'
  })
  .when('/categogies/details', {
    templateUrl : 'pages/categogies/details.html',
    controller  : 'CategogiesController'
  })
  .when('/signin', {
    templateUrl : 'pages/signin.html',
    controller  : 'SignInController'
  })
  .when('/signup', {
    templateUrl : 'pages/signup.html',
    controller  : 'AboutController'
  })
  .when('/cart', {
    templateUrl : 'pages/cart.html',
    controller  : 'CartController'
  })
  .otherwise({redirectTo: '/'});
});
app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

app.controller('CategogiesController', function($scope) {
  $scope.message = 'Hello from CategogiesController';
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Hello from AboutController';
});