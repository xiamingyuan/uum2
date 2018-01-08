var filters = angular.module('filters', []);

filters.filter('greet', function () {
    return function (name) {
        return '您好, ' + name + '!';
    };
});

filters.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

