var app = angular.module('myApp', []);

/* Set up a simple controller with a few 
 * examples of common actions a controller function
 * might set up on a $scope. */
app.controller('MainCtrl', function ($scope, someService) {
    
    //set some properties
    $scope.foo = 'foo';
    $scope.bar = 'bar';
    
    
    //add a simple function.
    $scope.test1 = function () {
        $scope.foo = $scope.foo + '!!!';
    };
    
    //set up a $watch.
    $scope.$watch('bar', function (v) {
        $scope.baz = v + 'baz';
    });
    
    //make a call to an injected service.
    $scope.test2 = function () {
        //an async call returning a promise that
        //inevitably returns a value to a property.
        someService.someAsyncCall($scope.foo)
      .then(function (data) {
            $scope.fizz = data;
        });
    };
});


/* Simple service example. 
 * This is a service created just to use as an example of
 * some simple service that is making some asynchronous call.
 * A real-life example of something like this would be a 
 * service that is making $http or $resource calls, perhaps. */
app.factory('someService', function ($timeout, $q) {
    return {
        
        // simple method to do something asynchronously.
        someAsyncCall: function (x) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(x + '_async');
            }, 100);
            return deferred.promise;
        }
    };
});