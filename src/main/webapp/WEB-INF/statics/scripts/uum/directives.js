var directives = angular.module('directives', []);

directives.directive('span1', function () {
    alert('xxxxxxxxx');
    return {
        template: 'name:xxx'
    };

    
});


//提示工具
directives.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {

            var model = $(element).attr('ng-bind');
            scope.$watch(model, function (a, g) {
                if (a != undefined) {
                    $(element).tooltip()
                }
            })
        }
    }
});

//回车事件指令
directives.directive('enterSubmit', function() {
    return {
        restrict: 'A',
        link: function (scope, element) {
            function enterToGo() {
                $("input[type='text'],input[type='password'],input[type='number']",$(element)).keydown(function (event){
                    var keyCode = event.keyCode || event.which;//兼容性问题,event.which兼容firefox
                    if(keyCode==13)
                    {
                        $(".enter-default",$(element)).eq(0).click();
                        return false;//取消submit按钮的默认事件
                    }
                });
            };
            enterToGo();
        }
    };
});