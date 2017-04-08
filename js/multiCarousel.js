(function (angular) {
  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ui.carousel.config', [])
    .value('ui.carousel.config', {
      debug: true
    });

  // Modules
  angular.module('ui.carousel.providers', []);
  angular.module('ui.carousel.controllers', []);
  angular.module('ui.carousel.directives', []);
  angular.module('ui.carousel', [
    'ui.carousel.config',
    'ui.carousel.directives',
    'ui.carousel.controllers',
    'ui.carousel.providers'
  ]);
})(angular);

var app = angular.module('App', ['ui.carousel', 'ngSanitize']);

app.run(['Carousel', (Carousel) => {
  Carousel.setOptions({});
}]);

app.controller('CarouselDemoCtrl', ['$scope', 'Carousel', function($scope, Carousel) {
  'use strict';

  this.singleInit = () => {
    console.log('single init');
  };

  this.single = {
    slides: [...Array(6).keys()],
    source: '<ui-carousel slides="ctrl.single.slides" dots="true">\n' +
            '  <carousel-item>\n' +
            '    <h3>{{ item + 1 }}</h3>\n' +
            '  </carousel-item>\n' +
            '</ui-carousel><Paste>'
  };
  this.multiple = {
    slides: [...Array(9).keys()],
    source: '<ui-carousel slides="ctrl.multiple.slides" slides-to-show="3" slides-to-scroll="3" dots="true">\n' +
            '  <carousel-item>\n' +
            '    <h3>{{ item + 1 }}</h3>\n' +
            '  </carousel-item>\n' +
            '</ui-carousel>'
  };

  this.autoplay = {
    slides: [...Array(6).keys()],
    source: '<ui-carousel slides="ctrl.autoplay.slides" slides-to-show="3" slides-to-scroll="1" autoplay="true" autoplay-speed="2000" dots="true">\n' +
            '  <carousel-item>\n' +
            '    <h3>{{ item + 1 }}</h3>\n' +
            '  </carousel-item>\n' +
            '</ui-carousel>'
  };

  this.fade = {
    slides: [
      'http://lorempixel.com/560/400/sports/1',
      'http://lorempixel.com/560/400/sports/2',
      'http://lorempixel.com/560/400/sports/3',
    ],
    source: '<ui-carousel slides="ctrl.fade.slides" slides-to-show="3" slides-to-scroll="1">\n' +
            '  <carousel-item>\n' +
            '    <div class="image"><img src="{{ item }}"></div>\n' +
            '  </carousel-item>\n' +
            '</ui-carousel>'
  };

  this.customize=
    '<ui-carousel slides="ctrl.fade.slides" slides-to-show="3" slides-to-scroll="1">\n' +
    '  <!-- For slider render -->\n' +
    '  <carousel-item>\n' +
    '    <!-- placed your item content here -->\n' +
    '    <img src="{{ item.image }}" alt="{{ item.title }}" />\n' +
    '    <h3> {{ item.name }} </h3>\n' +
    '    <p> {{ item.description }} </h3>\n' +
    '    <!-- end -->\n' +
    '  </carousel-item>\n' +
    '  \n' +
    '  <!-- For customize carousel next, previous button -->\n' +
    '  <carousel-prev>\n' +
    '    <!-- placed your previous button here -->\n' +
    '    <button>Prev</button>\n' +
    '    <!-- end -->\n' +
    '  </carousel-prev>\n' +
    '  \n' +
    '  <carousel-next>\n' +
    '    <!-- placed your next button here -->\n' +
    '    <button>next</button>\n' +
    '    <!-- end -->\n' +
    '  </carousel-next>\n' +
    '</ui-carousel>'
  ;
}]);

app.directive('prism', [function() {
  return {
    restrict: 'A',
    link: function ($scope, element, attrs) {
      element.ready(function() {
        Prism.highlightElement(element[0]);
      });
    }
  }
}]);