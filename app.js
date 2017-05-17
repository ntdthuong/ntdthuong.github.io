var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'BooksController'
        })
        .when('/all', {
            templateUrl: 'views/books.html',
            controller: 'BooksController'
        })

    .when('/books/details/:id', {
            templateUrl: 'views/book_details.html',
            controller: 'BooksController'
        })
        .when('/books/category/:id', {
            templateUrl: 'views/genre.html',
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
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UserController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'BooksController'
        })
        .when('/edit/:id', {
            templateUrl: 'views/edit.html',
            controller: 'BooksController'
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'BooksController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .otherwise({ redirectTo: '/' });
});


// $.noConflict();
// jQuery(document).ready(function() {
//     jQuery(".uploadImg").on("click", function() {
//         jQuery(".inputImg").click();

//     });
// })