(function () {
    'use strict';

    angular.module('SimpleMarket').factory('GitHubService', GitHubService);

    GitHubService.inject = ['$http', '$window', '$q'];
    function GitHubService($http, $window, $q) {
        var self = this;

        self.PERSONAL_TOKEN = 'token';

        self.PAYLOAD = {
            access_token: self.PERSONAL_TOKEN,
        };

        self.dadosUsuario = function () {
            var deferred = $q.defer();

            var url = "https://api.github.com/user";
            url += "?" + objectToUriCompoment(self.PAYLOAD);

            $http.get(url).then(function (response) {
                console.log(response);
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        self.criarGist = function (arquivos) {
            var deferred = $q.defer();

            var url = "https://api.github.com/gists";
            url += "?" + objectToUriCompoment(self.PAYLOAD);

            var payload = {
                files: arquivos,
                description: "Simple Market data",
                public: false
            };

            $http.post(url, payload).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        };

        self.editarGist = function (idGist, arquivos) {
            var deferred = $q.defer();

            var url = "https://api.github.com/gists";
            if (idGist) {
                url += "/" + idGist;
            }

            url += "?" + objectToUriCompoment(self.PAYLOAD);

            var payload = {
                files: arquivos,
                description: "Simple Market data"
            };

            $http.patch(url, payload).then(function (response) {
                console.log(response);
                deferred.resolve(response.data);
            });
            return deferred.promise;
        };

        self.obterGist = function (idGist) {
            var deferred = $q.defer();

            var url = "https://api.github.com/gists";
            if (idGist) {
                url += "/" + idGist;
            }
            url += "?" + objectToUriCompoment(self.PAYLOAD);

            $http.get(url).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        };

        return self;
    }

    function objectToUriCompoment(payload) {
        return Object.keys(payload).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k])
        }).join('&')
    }
})();