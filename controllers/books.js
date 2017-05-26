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
                    if ($scope.books.length > 0) {
                        $scope.unidentified = true;
                    } else {
                        $scope.unidentified = false;
                        $scope.result = "Chưa có sách trong thể loại này";
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

    $scope.qty = 1;
    $scope.all = service.total;

    $scope.sum = function() {
        service.total.totalQty = 0;
        service.total.totalPrice = 0;
        for (var i = 0; i < $scope.cart.length; i++) {

            service.total.totalPrice += $scope.cart[i].price * $scope.cart[i].quantity;
            service.total.totalQty += $scope.cart[i].quantity;
        }





    }



    $scope.addCart = function(item) {
        if ($scope.qty > 0) {

            if (service.cart.length > 0) {
                for (var i = 0; i < service.cart.length; i++) {
                    if (service.cart[i]._book === item._id) {
                        $scope.addedItem = true;
                        service.cart[i].quantity += $scope.qty;
                        service.item.quantity = service.cart.quantity;
                        $cookieStore.put('cart', service.cart);
                        $cookieStore.put('order', service.item);
                        $scope.cart = service.cart;
                    }


                }
                if ($scope.addedItem) {
                    $scope.addedItem = false;

                } else {
                    service.cart.push({ _book: item._id, title: item.title, price: item.sellingPrice, image: item.images.main, quantity: $scope.qty });
                    service.item.push({ _book: item._id, price: item.sellingPrice, quantity: $scope.qty });
                    console.log(item._id)
                    $cookieStore.put('order', service.item);
                    $cookieStore.put('cart', service.cart);
                    $scope.cart = service.cart;

                }
            } else {
                service.cart.push({ _book: item._id, title: item.title, price: item.sellingPrice, image: item.images.main, quantity: $scope.qty });
                service.item.push({ _book: item._id, price: item.sellingPrice, quantity: $scope.qty });
                $cookieStore.put('order', service.item);
                $cookieStore.put('cart', service.cart);
                $scope.cart = service.cart;

            }

        }
        $scope.sum();

    }


    /*------------order--------------*/
    $scope.order = {};
    $scope.order.books = [];

    $scope.checkout = function() {
        if ($scope.cart.length > 0 && $scope.all.totalPrice > 0) {

            $scope.order._user = $scope.user._id;
            $scope.order.books = service.item;
            $scope.order.total = $scope.all.totalPrice;

            console.log($scope.order)

            $http.post(root + 'api/orders', $scope.order).success(function(response) {
                console.log('success');
                $cookieStore.remove('cart');
                $cookieStore.remove('order');
                service.item = [];
                service.cart.splice(0, service.cart.length);
                $scope.all.totalPrice = 0;
                $scope.all.totalQty = 0;
                $location.url("/")
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });



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
        $cookieStore.put('order', service.item);
        $cookieStore.put('cart', service.cart);

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
                window.location.reload();
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
        $scope.editProfile = $cookieStore.get('user');
        $scope.token = $cookieStore.get('token');
        service.cart = $cookieStore.get('cart');
        $scope.cart = service.cart;
        service.item = $cookieStore.get('order');
        if ($scope.order !== undefined && $scope.cart !== undefined) {
            $scope.sum();
        } else {
            service.cart = [];

            service.item = [];
            $scope.cart = service.cart;
            $scope.all.totalQty = 0;
        };

        console.log($scope.order);
        $scope.loadLogin = function() {
            var token = $cookieStore.get('token');
            if (token !== undefined) {
                $location.url("/")
            }
        }
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
            $scope.user = response;
            $cookieStore.put('user', response.user);
            $scope.user = $cookieStore.get('user');
            $location.url("#/user");
        });
    }

    $scope.getOrder = function() {
        $http.get(root + 'api/orders').success(function(response) {
            $scope.orders = response;

        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });

    }
    $scope.getUserOder = function() {
        console.log(root + 'api/orders/user/' + $scope.user._id)
        $http.get(root + 'api/orders/user/' + $scope.user._id).success(function(response) {
            $scope.orders = response;
            console.log($scope.orders)

        }).error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }
}])