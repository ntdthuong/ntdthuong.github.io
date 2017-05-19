var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'textAngular', 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'BooksController'
        })
        .when('/category', {
            templateUrl: 'views/category.html',
            controller: 'BooksController'
        })
        .when('/category/:id', {
            templateUrl: 'views/genre.html',
            controller: 'BooksController'
        })
        .when('/book/details/:id', {
            templateUrl: 'views/book_details.html',
            controller: 'BooksController'
        })
        .when('/search/:text', {
            templateUrl: 'views/search.html',
            controller: 'BooksController'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'BooksController'
        })

    .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'BooksController'
        })
        .when('/add', {
            templateUrl: 'views/addBook.html',
            controller: 'BooksController'
        })
        .when('/edit/:id', {
            templateUrl: 'views/editBook.html',
            controller: 'BooksController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'BooksController'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'BooksController'
        })

    .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'BooksController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'BooksController'
        })
        .otherwise({ redirectTo: '/' });
});