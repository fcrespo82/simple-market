
(function () {
    'use strict';

    angular
        .module('SimpleMarket')
        .controller('GitHubController', GitHubController);

    GitHubController.inject = ['GitHubService', '$window', '$route'];
    function GitHubController(GitHubService, $window, $route) {
        var self = this;

        self.criar = function (texto) {
            var arquivos = {
                "produtos.json": {
                    "content": texto
                },
                "teste.txt": null
            }
            GitHubService.criarGist(arquivos).then(function (response) {
                self.criado = response;
            });
        };

        self.editar = function (id, arquivos) {
            GitHubService.editarGist(id, arquivos).then(function (response) {
                self.criado = response;
            });
        }

        self.listar = function () {
            GitHubService.dadosUsuario().then(function (response) {
                self.usuario = response;
            });
            GitHubService.obterGist().then(function (response) {
                self.usuario.gists = response;
            });
        };

        self.carrega = function (id) {
            GitHubService.obterGist(id).then(function (response) {
                self.gist = response;
            });
        };

    }
})();