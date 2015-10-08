(function () {
    'use strict';

    describe('recipe/ViewRecipeCtrl', function () {
        var testRecipeId = 423531,
            $scope, $location, RecipeMock;

        beforeEach(function () {
            module('BrewKeeper');
            RecipeMock = jasmine.createSpyObj('RecipeMock', ['getCount', 'getByRecipeId']);

            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();

                RecipeMock.getByRecipeId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({ name: 'no wai!' });
                    return dfd.promise;
                });

                $controller('ViewRecipeCtrl', {
                    $scope: $scope,
                    $routeParams : {
                        id: testRecipeId
                    },
                    $location: $location,
                    Recipe: RecipeMock
                });
            });
        });

        it('Retrieves a single brew by the recipe ID specified in the route.', function () {
            expect(RecipeMock.getByRecipeId).toHaveBeenCalledWith(testRecipeId);
        });

        it('Sets the current recipe.', function () {

        });
        
        it('Sets how many times the recipe was brewed.', function () {

        });

        it('Can append "http://" onto the recipe URL if it\'s not there.', function () {

        });

        it('Can load the "edit recipe" page".', function () {

        });

        it('Can load the "delete recipe" page".', function () {

        });
    });
})();
