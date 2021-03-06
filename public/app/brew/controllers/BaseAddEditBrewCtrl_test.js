﻿(function () {
    'use strict';

    describe('brew/BaseAddEditBrewCtrl', function () {

        var $scope;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            inject(function ($rootScope, $controller) {

                $scope = $rootScope.$new();

                $controller('BaseAddEditBrewCtrl', {
                    $scope: $scope,
                });
            });
        });

        it('Can retrieve new/updated brew information from $scope.', function () {
            $scope.brewId = 986;
            $scope.brewBatchSize = 6;
            $scope.brewDescription = 'brew test';
            $scope.brewRecipe = {
                _id: 3574
            };
            $scope.brewStatusCde = {
                id: 2
            };
            $scope.brewBrewDate = '3/14/2015';
            $scope.brewBottleDate = '3/28/2015';
            $scope.brewChillDate = '4/15/2015';
            
            var updatedData = $scope.getFormBrewData();
            
            expect(updatedData.id).toEqual(986);
            expect(updatedData.batchSize).toEqual(6);
            expect(updatedData.description).toEqual('brew test');
            expect(updatedData.recipeId).toEqual(3574);
            expect(updatedData.statusCde).toEqual(2);
            expect(updatedData.brewDate).toEqual('3/14/2015');
            expect(updatedData.bottleDate).toEqual('3/28/2015');
            expect(updatedData.chillDate).toEqual('4/15/2015');
        });
    });
})();
