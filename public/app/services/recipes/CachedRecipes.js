angular.module('app').factory('CachedRecipes', function (Recipe) {
    var recipeList;
    
    return {
        query: function () {
            if (!recipeList) {
                recipeList = Recipe.query();
            }
            
            return recipeList;
        }
    };
});