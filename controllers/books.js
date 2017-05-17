var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
    console.log('BooksController loaded...');
    var root = 'https://green-web-bookstore.herokuapp.com';

    $scope.getBooks = function() {
        $http.get(root + '/api/books/').success(function(response) {
            $scope.books = response;
            $scope.viewby = 5;
            $scope.totalItems = $scope.books.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 10;
            $scope.pageCount = function() {
                return Math.ceil($scope.books.length / $scope.itemsPerPage);
            };
            $scope.$watch('currentPage + itemsPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;

                $scope.filteredBooks = $scope.books.slice(begin, end);
            });
            console.log($scope.filteredBooks)
        });
    }

    $scope.getBook = function() {
            var id = $routeParams.id;
            console.log(id);
            $http.get(root + '/api/books/' + id).success(function(response) {
                $scope.book = response;
                console.log(response)
            });
        }
        // add book
    $scope.addBook = function() {
            console.log($scope.book);
            $http.post(root + '/api/books/', $scope.book).success(function(response) {
                window.location.href = '#/all';
            });
        }
        // end add book
        // edit book
    $scope.updateBook = function() {
            var id = $routeParams.id;
            $http.put(root + '/api/books/' + id, $scope.book).success(function(response) {
                window.location.href = '#/admin/';
            });
        }
        // end edit book
        // remove book
    $scope.removeBook = function(id) {
        $http.delete(root + '/api/books/' + id).success(function(response) {
            window.location.href = '#/admin/';
        });
    }


    $scope.getGenres = function() {
        $http.get(root + '/api/genres/').success(function(response) {
            $scope.genres = response;
            var genreName = '';
            for (var i = 0; i < genres.length; i++) {
                if (genres[i]._id === id) {
                    genreName = genres[i].name;
                }
            }
        });

    }
    $scope.showGenres = false;
    $scope.GenresFunc = function() {
        $scope.showGenres = !$scope.showGenres;
    }
    $scope.getBookByGenre = function() {
        var id = $routeParams.id;
        $http.get(root + '/api/books/genre/' + id).success(function(response) {
            $scope.books = response;
        });
    }
    $scope.getBanners = function() {
        $http.get(root + '/api/banners/').success(function(response) {
            $scope.banners = response;
        });
    }
    $scope.myInterval = 2500;

    // cmt
    $scope.user = {
        'userName': 'Thương Đăng',
        'userAvatarUrl': 'http://sv1.upsieutoc.com/2017/05/11/FullSizeRender2.jpg',
        'userEmail': 'ntdangthuong@gmail.com',
        'address': '21/15 Vạn Kiếp, phường 3, quận Bình Thạnh',
        'phone': '0931 334 424'
    }
    $scope.comment = {};
    $scope.addComment = function(post) {
            $scope.comment.date = Date.now();
            $scope.comment.userName = $scope.user.userName;
            $scope.comment.userAvatarUrl = $scope.user.userAvatarUrl;
            post.comments.push($scope.comment);
            var req = {
                method: 'PUT',
                url: "https://green-web-bookstore.herokuapp.com/api/books/" + $routeParams.itemId,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: post
            }
            $http(req).then(function() {
                    console.log('success')
                },

                function() {
                    console.log('error')
                });
            // $http.put(bookservice.getBook + $routeParams.itemId, $scope.post).success(function(response) {
            //     console.log('success')
            // });

            console.log(post);

        }
        // cmt

    // rating
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];
    // end rating
    /*---validate--*/
    $scope.submitForm = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        }
        /*-----Search---*/
    $scope.textSearch = $routeParams.text;
    $scope.searchBy = 'search'
    $scope.search = function() {
        $http.get(root + '/api/books/' + $scope.searchBy + '/' + $scope.textSearch).success(function(response) {
            $scope.searchBook = response;
            $scope.bigTotalItems = $scope.searchBook.length;
        })
    }
    $scope.submitSearch = function() {
            console.log(root + '/api/books/' + $scope.searchBy + $scope.textSearch)
            window.location.href = '#/search/' + $scope.textSearch;
        }
        // end search

    // cart

    // end cart
}]);