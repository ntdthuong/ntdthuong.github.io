app.controller("BooksController", ['$scope', 'service', '$http', '$routeParams', '$location', '$anchorScroll', '$cookieStore', '$route', 'uibDateParser', function($scope, service, $http, $routeParams, $location, $anchorScroll, $cookieStore, $route, uibDateParser) {
    var root = 'https://green-web-bookstore.herokuapp.com/';
    var config = {
        headers: {
            'Accept': 'application/json;odata=verbose',
            "x-access-token": $scope.token
        }
    };

    $scope.loaded = false;
    $scope.paging = function() {

        $scope.totalItems = $scope.books.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;
        $scope.maxSize = 5;
        $scope.changePage = function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
            $scope.filteredBooks = $scope.books.slice(begin, end);
        };
        $scope.changePage();
    };
    $scope.getBooks = function() {
        var id = $routeParams.id;
        $http.get(service.getBooks).success(function(response) {
            $scope.books = response;
            $scope.paging();


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
            $scope.loaded = true;
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
            $scope.genreName = function() {
                for (var i = 0; i < $scope.genres.length; i++) {
                    if ($scope.genres[i]._id === $routeParams.id) {

                        return $scope.genres[i].name;

                    }
                }
            }
            $scope.paging();
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
        // $scope.urlSearch = '#/search/' + $scope.textSearch;
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

    /*-----cmt---*/
    $scope.getBook = function() {
        var id = $routeParams.id;
        console.log(id);
        $http.get(service.getBooks + id).success(function(response) {
            $scope.book = response;
            $scope.book.createDate = new Date($scope.book.createDate);
            $scope.book.releaseDate = new Date($scope.book.releaseDate);
            console.log(response)
            var rateTotal = 0;
            $scope.book.comments.rate;
            for (var i = 0; i < $scope.book.comments.length; i++) {
                rateTotal += $scope.book.comments[i].rate
            }

            if (rateTotal == 0) {
                $scope.rateAvr = 5
            } else {
                $scope.rateAvr = rateTotal / $scope.book.comments.length;
            }
            $scope.save = Math.round(100 - ($scope.book.sellingPrice / $scope.book.previousPrice) * 100);
        });
    };

    $scope.comment = {};

    $scope.addComment = function(post) {
        $scope.comment.createdDate = Date.now();
        $scope.comment.userId = $scope.user._id;
        $scope.comment.bookId = $scope.book._id;
        post.comments.push($scope.comment);
        console.log($scope.comment);
        var req = {
            method: 'POST',
            url: service.getComment,
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.comment
        }
        $http(req).then(function() {
                console.log('success')
            },

            function() {
                console.log('error')
            });
        console.log(post);
        $http(req).then(function() {
            console.log('success')
            window.location.reload();

        })

    };

    $scope.getComment = function() {
        $http.get(service.getComment).success(function(response) {
            $scope.comment = response;
            console.log(response)
        });
    };


    /*--------Cart ---------*/
    $scope.qtyCart = 0;
    $scope.countCart = function() {
        $scope.qtyCart++;
    };
    $scope.qty = 1;
    $scope.addCart = function(item) {
        if (service.cart.length > 0) {
            for (var i = 0; i < service.cart.length; i++) {
                if (service.cart[i].item.sku === item.sku) {
                    $scope.addedItem = true;
                    service.cart[i].qty += $scope.qty;
                    service.item[i].qty += $scope.qty;
                }


            }
            if ($scope.addedItem) {
                $scope.addedItem = false;

            } else {
                service.cart.push({ item, qty: 1 });
                service.item.push({ item, qty: 1 });
            }
        } else {
            service.cart.push({ item, qty: $scope.qty });
            service.item.push({ item, qty: $scope.qty });
        }

        console.log("addCart ìf ok")
    }
    $scope.cart = service.cart;

    /*------------Bill--------------*/
    $scope.total = 0;
    $scope.sum = function() {
        for (var i = 0; i < service.cart.length; i++) {
            $scope.total += service.cart[i].item.sellingPrice * service.cart[i].qty;

        }
    }
    $scope.sum();
    $scope.bill = {};

    $scope.checkout = function() {
        if ($scope.cart.length > 0) {
            $scope.bill.items = service.item;
            $scope.bill.date = Date.now();
            $scope.bill.total = $scope.total;
            service.bills.push($scope.bill);
            console.log(service.bills)
            service.item = [];
            service.cart.splice(0, service.cart.length);
            $scope.total = 0;


        }
    }
    $scope.changeQty = function(index) {
        service.item[index].qty = service.cart[index].qty;
        $scope.total = 0;
        $scope.sum();
    }
    $scope.bills = service.bills;

    $scope.removeCart = function(item) {
        console.log(item.qty)

        service.cart.splice(item, 1);
        service.item.splice(item, 1);
        $scope.total = 0;
        $scope.sum();

    }


    /*--------scrooll ---------*/
    $scope.scroll = function() {
        $anchorScroll();
    };

    /*--------login logout ---------*/
    $scope.loadLogin = function() {
        var token = $cookieStore.get('token');
        if (token !== undefined) {
            $location.url("/")
        }
        console.log("loadlogin")
    }

    $scope.logOut = function() {
        $cookieStore.remove('token');
        $cookieStore.remove('user');
    }

    $scope.viewProfile = function() {
        var token = $cookieStore.get('token');
        if (token === undefined) {
            $location.url("/login")
        }
        $scope.loaded = true;
    }


    $scope.summitLogin = function() {
        $http.post('https://green-web-bookstore.herokuapp.com' + '/api/users/auth', $scope.loginUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

    $scope.summitSignup = function() {
        $http.post('https://green-web-bookstore.herokuapp.com' + '/api/users/signup/', $scope.signUpUser).success(function(response) {
            var isSuccess = response.success;
            if (isSuccess) {
                $cookieStore.put('token', response.token);
                $cookieStore.put('user', response.user);
                $scope.user = $cookieStore.get('user');
                $scope.token = $cookieStore.get('token');
                //Redirect here
                $location.url("/")
            } else {
                //Raise Error
                alert(response.message);
            }
        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }

    $scope.init = function() {
        $scope.user = $cookieStore.get('user');
        $scope.token = $cookieStore.get('token');
    }

    $scope.isLogged = function() {
        return $cookieStore.get('token') != undefined;
    }
    $scope.getUsers = function() {
        $http.get(service.getUsers).success(function(response) {
            $scope.users = response;
        })
    }
    $scope.editUser = $scope.user;
    $scope.updateUser = function() {
        $http.put(service.getUsers, $scope.editUser).success(function(response) {
            console.log($scope.user)
            window.location.href = '#/user/';
        });
    }
}])