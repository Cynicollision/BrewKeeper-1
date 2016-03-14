(function () {
    'use strict';

    describe('brew/BaseAddEditBrewCtrl', function () {

        var $scope, NotifierMock, location;
        
        beforeEach(function () {
            module('BrewKeeper');
            
            NotifierMock = jasmine.createSpyObj('NotifierMock', ['notify']);

            inject(function ($rootScope, $controller, $location) {

                $scope = $rootScope.$new();
                location = $location;
                
                NotifierMock.notify.and.returnValue();
                
                $controller('BaseAddEditBrewCtrl', {
                    $scope: $scope,
                    $location: $location,
                    Notifier: NotifierMock,
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

        it('Can display a success message and redirect to a given path.', function () {
            $scope.successRedirect('hello, brew keeper!', '/somepath/');
            expect(location.path()).toEqual('/somepath/');
            expect(NotifierMock.notify).toHaveBeenCalled();
        });
    });
})();
