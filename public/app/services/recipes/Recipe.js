angular.module('app').factory('Recipe', function ($resource) {
    var RecipeResource = $resource('/api/recipes/:_id', { _id: "@id" }, {
        update: { method: 'PUT', isArray: false }
    });
    
    return RecipeResource;
});
