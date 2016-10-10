var app = angular.module('app', ['ui.router', 'appComponents', 'appControllers', 'appServices']);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    // An array of state definitions
    var states = [
      {
        name: 'home', 
        url: '/',
        component: 'home'
      },

      {
        name: 'about',
        url: '/about',
        component: 'about'
      },

      {
        name: 'register',
        url: '/register',
        component: 'register'
      },

      {
        name: 'login',
        url: '/login',
        component: 'login'
      }
    ];

    states.forEach((state) => {
      $stateProvider.state(state);
    });
  }
]);

