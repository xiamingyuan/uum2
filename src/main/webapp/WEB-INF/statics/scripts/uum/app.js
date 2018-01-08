var app = angular.module('app', [
    'ui.bootstrap',
    'ngRoute',
    'controllers',
    'directives',
    'filters',
    'services'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                redirectTo: '/org'
            }).
            when('/org', {
                templateUrl: 'orgtpl',
                controller: 'orgCtrl'
            }).when('/org/search/:queryKey', {
                templateUrl: 'orgtpl',
                controller: 'orgCtrl'
            }).
            when('/app', {
                templateUrl: 'apptpl',
                controller: 'appCtrl'
            }).
            when('/app/search/:queryKey/p:currentPage', {
                templateUrl: 'apptpl',
                controller: 'appCtrl'
            }).
            when('/app/p:currentPage', {
                templateUrl: 'apptpl',
                controller: 'appCtrl'
            }).
            when('/app/search/:queryKey', {
                templateUrl: 'apptpl',
                controller: 'appCtrl'
            }).
            when('/role', {
                templateUrl: 'roletpl',
                controller: 'roleCtrl'
            }).
            when('/role/p:currentPage', {
                templateUrl: 'roletpl',
                controller: 'roleCtrl'
            }).
            when('/role/search/:queryKey', {
                templateUrl: 'roletpl',
                controller: 'roleCtrl'
            }).
            when('/role/search/:queryKey/p:currentPage', {
                templateUrl: 'roletpl',
                controller: 'roleCtrl'
            }).
            when('/user', {
                templateUrl: 'usertpl',
                controller: 'userCtrl'
            }).
            when('/user/search/:queryKey', {
                templateUrl: 'usertpl',
                controller: 'userCtrl'
            }).
            when('/perm', {
                templateUrl: 'permtpl',
                controller: 'permCtrl'
            }).
            when('/perm/search/:queryKey/appId/:currentAppId', {
                templateUrl: 'permtpl',
                controller: 'permCtrl'
            }).
            when('/perm/appId/:currentAppId', {
                templateUrl: 'permtpl',
                controller: 'permCtrl'
            }).
            when('/perm/search/:queryKey', {
                templateUrl: 'permtpl',
                controller: 'permCtrl'
            }).
            when('/auth', {
                templateUrl: 'authtpl',
                controller: 'authCtrl'
            }).
            when('/online', {
                templateUrl: 'onlinetpl',
                controller: 'onlineCtrl'
            }).
            when('/online/p:currentPage', {
                templateUrl: 'onlinetpl',
                controller: 'onlineCtrl'
            }).
            when('/online/search/:queryKey', {
                templateUrl: 'onlinetpl',
                controller: 'onlineCtrl'
            }).
            when('/online/search/:queryKey/p:currentPage', {
                templateUrl: 'onlinetpl',
                controller: 'onlineCtrl'
            }).
            //when('/', {
            //      templateUrl: 'list',
            //      controller: 'PhoneListCtrl7'
            //  }).
            //when('/detail/:phoneId', {
            //    templateUrl: 'detail',
            //    controller: 'PhoneDetailCtrl7'
            //}).
            otherwise({
                redirectTo: '/org'
            });
    }]
).factory("httpInterceptor", [ "$q", "$window", function($q, $window) {
    return {
        request: function(config) {
            console.log(config);
// do something on request success
            return config || $q.when(config);
        },
        requestError: function(rejection) {
            console.log(rejection);
            return $q.reject(rejection)
        },
        response: function(response) {
            if (typeof response.data === 'string' && response.data.indexOf("<title>用户管理系统</title>")>-1) {
                console.log("LOGIN!!");
                $window.location.href = "logout";
                return $q.reject(response);
            }
            return response || $q.when(response);
        },
        responseError : function(rejection) {
            if(rejection.status==405){
                $window.location.href = "logout";
            }
            return $q.reject(rejection);
        }
    };
}]).config(["$httpProvider", function($httpProvider) {
    $httpProvider.interceptors.push("httpInterceptor");
}]);

