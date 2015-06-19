angular.module('app').factory('mvBrew', function ($resource) {
    var BrewResource = $resource('/api/brews/:_id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });

    return BrewResource;
});