var demoApp = angular.module('demoAppControllers', []);

demoApp.service('ConfigsService', function($http, $q) {
    var data = [];
    this.getAppsList = function() {
        var deferred = $q.defer();
        $http.get('https://demo-app-configs.s3.amazonaws.com/configs.json').then(function(result) {
            data = result.data;
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    this.getApp = function(id) {
        if (data.length > 0) {
            var appArray = data.filter(function(app) {
                return app.id === id;
            });
            return $q.when(appArray[0]);
        } else {
            return this.getAppsList().then(function(data) {
                var appArray = data.filter(function(app) {
                    return app.id === id;
                });
                return $q.when(appArray[0]);
            });
        }
    }
});


demoApp.controller('AppListController',
    ['$scope', '$location', '$rootScope', 'ConfigsService',
        function ($scope, $location, $rootScope, ConfigsService) {
    ConfigsService.getAppsList().then(function (data) {
        $scope.apps = data;
    });
    $scope.openApp = function (appId) {
        $location.path("/apps/" + appId);
    };
}]);

demoApp.directive('leftMenuItem', function() {
    return {
        restrict: "AE",
        scope: { app: '=' },
        template: '<a href="/apps/{{app.id}}">{{app.name}}</a>',
        controller: function($scope, $rootScope, $element) {
            var that = this;
            that.el = $element;
            that.appId = $scope.app.id;
            $scope.onMouseOver = function (appId) {
                console.log("onMouseOver1:" + appId);
                $rootScope.$broadcast('leftMenuItemMouseOver', appId);
            };
            $scope.onMouseOut = function (appId) {
                console.log("onMouseOut1:" + appId);
                $rootScope.$broadcast('leftMenuItemMouseOut', appId);
            };
            $rootScope.$on('appListItemMouseOver', function (event, appId) {
                if (appId == that.appId) {
                    that.el.addClass("hovered");
                    console.log("IM HERE1:" + appId);
                }
            });
            $rootScope.$on('appListItemMouseOut', function (event, appId) {
                if (appId == that.appId) {
                    that.el.removeClass("hovered");
                    console.log("IM HERE1:" + appId);
                }
            });
        }
    }
});

demoApp.directive('gridItem', function($compile) {
    var template = '<img ng-src="https://demo-app-configs.s3.amazonaws.com/{{app.thumbnail_image_link}}" alt="Image A" style="border-bottom: 1px solid lightgray"/><div style="text-align: center; font-family: Roboto,Arial,sans-serif; font-weight: 600">{{app.name}}</div>';
    var linker = function(scope, element, attrs) {
        element.html(template);
        $compile(element.contents())(scope);
    };
    var controller = function($scope, $rootScope, $element) {
        var that = this;
        that.appId = $scope.app.id;
        var that = this;
        that.el = $element;
        $scope.onMouseOver = function (appId) {
            console.log("onMouseOver2:" + appId);
            $rootScope.$broadcast('appListItemMouseOver', appId);
        };
        $scope.onMouseOut = function (appId) {
            console.log("onMouseOut2:" + appId);
            $rootScope.$broadcast('appListItemMouseOut', appId);
        };
        $scope.onClick = function(appId) {
            $scope.onMouseOut(appId);
            $scope.openApp(appId);
        };
        $rootScope.$on('leftMenuItemMouseOver', function (event, appId) {
            if (appId == that.appId) {
                that.el.addClass("hovered");
                console.log("IM HERE2:" + appId);
            }
        });
        $rootScope.$on('leftMenuItemMouseOut', function (event, appId) {
            if (appId == that.appId) {
                that.el.removeClass("hovered");
                console.log("IM HERE2:" + appId);
            }
        });
    };
    return {
        restrict: "AE",
        link: linker,
        controller: controller
    }
});

demoApp.directive('appsGrid', ['$compile', function($compile) {
    return {
        restrict : 'E',
        link : function (scope, element, attrs) {
            scope.$watch('apps', function() {
                if (scope.apps) {
                    var html = '<table><tr>';
                    var columnCount = 4;
                    for (var i = 0, j = 0; i < scope.apps.length; ++i, ++j) {
                        if (j == columnCount) {
                            j = 0;
                            html += '</tr><tr>';
                        }
                        html += '<td>' + scope.apps[i].name + '</td>';
                    }
                    html += '</tr></table>';
                    var compiled = $compile(html)(scope);
                    element.replaceWith(compiled);
                    element = compiled;
                }
            });
        }
    }
}]);

demoApp.controller('MainController', ['$scope', 'ConfigsService', function($scope, ConfigsService) {
    ConfigsService.getAppsList().then(function(data) {
        $scope.apps = data;
    });
}]);

demoApp.controller('AppDetailsController', ['$scope', '$routeParams', 'ConfigsService', function($scope, $routeParams, ConfigsService) {
    ConfigsService.getApp($routeParams.appId).then(function(result) {
        $scope.app = result;
    });
}]);