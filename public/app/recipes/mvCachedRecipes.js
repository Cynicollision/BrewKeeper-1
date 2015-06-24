angular.module('app').factory('mvCachedRecipes', function (mvRecipe) {
    var recipeList;
    
    return {
        query: function () {
            if (!recipeList) {
                recipeList = mvRecipe.query();
            }
            
            return recipeList;
        }
    };
});