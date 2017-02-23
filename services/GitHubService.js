(function () {
    'use strict';

    angular.module('SimpleMarket').service('GitHubService', GitHubService);

    GitHubService.inject = ['$http', '$window'];
    function GitHubService($http, $window) {
        var self = this;

        self.CLIENT_ID = '3a7fbc75ac6605d7d4fb';
        self.CLIENT_SECRET = '2733247303fd391bdd349de35b07ddbe9c5d472a';

        self.pedirAutorizacao = function () {
            var url = "https://github.com/login/oauth/authorize"

            var payload = {
                client_id: self.CLIENT_ID,
                redirect_uri: "http://localhost:8000#!/github/authorized",
                scope: "gist",
                state: "",
                allow_signup: "true"
            };

            url += "?" + Object.keys(payload).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
            }).join('&')

            $window.open(url, "_blank");
        }

        self.pegarTokenDeAcesso = function (code) {
            var url = "https://github.com/login/oauth/access_token";
            var payload = {
                client_id: self.CLIENT_ID,
                client_secret: self.CLIENT_SECRET,
                code: code,
                redirect_uri: "http://localhost:8000#!/github/authorized",
                state: ""
            };

            $http.post(url, payload).then(function (response) {
                console.log(response);
            });
        };

    }
})();