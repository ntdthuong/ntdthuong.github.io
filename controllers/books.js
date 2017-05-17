app.controller("BooksController", ['$scope', 'service', '$http', '$routeParams', '$location', '$anchorScroll', function($scope, service, $http, $routeParams, $location, $anchorScroll) {

    $scope.getBooks = function() {
        $http.get(service.getBooks).success(function(response) {
            $scope.books = response;

        })
    };
    $scope.getBook = function() {
        var id = $routeParams.id;
        console.log(id);
        $http.get(service.getBooks + id).success(function(response) {
            $scope.book = response;
            console.log(response)
        });
    };

    $scope.addBook = function() {
        console.log($scope.book);
        var reqBook = {
            method: 'POST',
            url: service.getBooks,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.book
        }
        $http(reqBook).then(function() {
            console.log('success')
            window.location.href = '#/admin/';
        })

    }

    $scope.updateBook = function() {
        var id = $routeParams.id;
        $http.put(service.getBooks + id, $scope.book).success(function(response) {
            window.location.href = '#/admin/';
        });
    }

    $scope.removeBook = function(id) {
        $http.delete(service.getBooks + id).success(function(response) {
            window.location.href = '#/admin/';
        });
    }

    // date

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    // end date


    $scope.getGenres = function() {
        $http.get(service.getGenres).success(function(response) {
            $scope.genres = response;

        })
    };
    $scope.getBanners = function() {
        $http.get(service.getBanners).success(function(response) {
            $scope.banners = response;
        })
    };

    $scope.getBookByGenre = function() {
        var id = $routeParams.id;
        $http.get(service.getGenre + id).success(function(response) {
            $scope.books = response;
            $scope.text = function() {
                for (var i = 0; i < $scope.genres.length; i++) {
                    if ($scope.genres[i]._id === $routeParams.genreId) {

                        return $scope.genres[i].name;

                    }
                }

            }
        })
    }
    $scope.myInterval = 2000;

    /*-----Search---*/
    $scope.textSearch = $routeParams.text;
    $scope.searchBy = 'search'
    $scope.search = function() {
        $http.get(service.getBooks + $scope.searchBy + '/' + $scope.textSearch).success(function(response) {
            $scope.searchBook = response;
            $scope.bigTotalItems = $scope.searchBook.length;
        })
    }
    $scope.submitSearch = function() {
        console.log(service.getBooks + $scope.searchBy + $scope.textSearch)
        window.location.href = '#/search/' + $scope.textSearch;
    }
    $scope.showSearch = false;
    $scope.SearchFunc = function() {
        $scope.showSearch = !$scope.showSearch;
    }

    /*-----Rating---*/
    /*-----rate ---*/

    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
    };
    $scope.ratingStates = [
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' }
    ];

    /*-----End Rating---*/
    /*-----User---*/
    $scope.user = service.user;
    /*-----cmt---*/
    $scope.comment = {};
    $scope.addComment = function(post) {
        $scope.comment.date = Date.now();
        $scope.comment.userName = $scope.user.userName;
        $scope.comment.userAvatarUrl = $scope.user.userAvatarUrl;
        post.comments.push($scope.comment);
        var req = {
            method: 'PUT',
            url: service.books + $routeParams.itemId,
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
        console.log(post);
    };
    /*--------Cart ---------*/

    $scope.scroll = function() {
        $anchorScroll();
    };

}])