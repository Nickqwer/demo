/* App Module */
'use strict';

var app = angular.module("demoApp", [
    'ngRoute',
    'demoAppControllers'
]);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/apps', {
                templateUrl : 'partials/appslist.html',
                controller : 'AppListController'
            }).
            when('/apps/:appId', {
                templateUrl : 'partials/app-details.html',
                controller: 'AppDetailsController'
            }).
            otherwise({
                redirectTo : '/apps'
            });
        $locationProvider.html5Mode(true);
}]);