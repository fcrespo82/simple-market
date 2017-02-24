var app = angular.module('SimpleMarket', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'ProdutosCtrl',
        })
        .when('/github/', {
            templateUrl: 'pages/github.html',
            controller: 'GitHubController',
        })
        .when('/github/authorized', {
            templateUrl: 'pages/github.html',
            controller: 'GitHubController',
        });

    // configure html5 to get links working on jsfiddle
    // Não dá pra usar com servidores simples
    //$locationProvider.html5Mode(true);
});