((): void => {
    'use strict';
    
    angular.module('electron', ['ngMaterial', 'ngRoute']);

    angular.module('electron')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider.when('/', {
            templateUrl: 'Electron.App/Home/Home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
        })
    }
})();
