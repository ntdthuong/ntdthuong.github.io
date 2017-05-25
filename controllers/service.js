app.service('service', function() {
    this.getBooks = 'https://green-web-bookstore.herokuapp.com/api/books/'
    this.getGenres = 'https://green-web-bookstore.herokuapp.com/api/genres/'
    this.getGenre = 'https://green-web-bookstore.herokuapp.com/api/books/genre/'
    this.getBanners = 'https://green-web-bookstore.herokuapp.com/api/banners/'
    this.getComment = 'https://green-web-bookstore.herokuapp.com/api/books/comment'
    this.getUsers = 'https://green-web-bookstore.herokuapp.com/api/users/'
    this.cart = [];
    this.item = [];
    this.bills = [];
    this.total = [];
    this.getInfo = {
        'userName': 'Thương Đăng',
        'userAvatarUrl': 'http://sv1.upsieutoc.com/2017/05/11/FullSizeRender2.jpg',
        'userEmail': 'thuong@maxdota.com',
        'address': '21/15 Vạn Kiếp, phường 3, quận Bình Thạnh',
        'phone': '0931 334 424',
        'like': []
    }
    this.bills = [];
    this.item = [];
})