
(function() {
'use strict';

    angular
        .module('SimpleMarket')
        .controller('GitHubController', GitHubController);

    GitHubController.inject = ['GitHubService', '$route', '$routeParams'];
    function GitHubController(GitHubService, $route, $routeParams) {
        var self = this;
    

        self.autorizar = function () {
            GitHubService.pedirAutorizacao();
        }

        self.$postLink = function () {

            self.route = $route;
            self.routeParams = $routeParams;

        }
    }
})();