(function () {
    'use strict';

    describe('brew/DeleteBrewCtrl', function () {
        var mockCurrentUserId = 8900,
            $scope, BrewMock, IdentityMock, location, mockBrew;

        beforeEach(function () {
            module('BrewKeeper');
            
            BrewMock = jasmine.createSpyObj('BrewMock', ['getByBrewId', 'remove', 'isBrewOwnedByUser']);
            IdentityMock = jasmine.createSpyObj('IdentityMock', ['getCurrentUserId']);
            
            mockBrew = {
                _id: 825,
                ownerId: mockCurrentUserId
            };
            
            inject(function ($rootScope, $controller, $location, $q) {
                $scope = $rootScope.$new();
                location = $location;
                
                IdentityMock.getCurrentUserId.and.returnValue(mockCurrentUserId);
                
                BrewMock.getByBrewId.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        data: mockBrew
                    });
                    return dfd.promise;
                });

                BrewMock.remove.and.callFake(function () {
                    var dfd = $q.defer();
                    dfd.resolve({
                        success: true
                    });
                    return dfd.promise;
                });
                
                BrewMock.isBrewOwnedByUser.and.callFake(function () {
                    return (mockBrew.ownerId === mockCurrentUserId);
                });
                
                $controller('DeleteBrewCtrl', {
                    $scope: $scope,
                    $location: $location,
                    $routeParams : {
                        id: mockBrew._id
                    },
                    Brew: BrewMock
                });
            });
        });
        
        it('Retrieves the specified brew and saves it if the current user owns it.', function () {
            expect(BrewMock.getByBrewId).toHaveBeenCalledWith(mockBrew._id);
            $scope.$apply();
            expect($scope.brew).toEqual(mockBrew);
        });
        
        it('Retrieves the specified brew and redirects it if the current user does not own it.', function () {
            location.path('/brew/delete/' + mockBrew._id);
            mockBrew.ownerId = -1;
            $scope.getBrew(mockBrew._id);
            $scope.$apply();
            expect(location.path()).toEqual('/');
        });
        
        it('On confirmation, calls the Brew service to delete the brew and redirects to /brew.', function () {
            $scope.onConfirmDelete();
            expect(BrewMock.remove).toHaveBeenCalledWith(mockBrew._id);
            $scope.$apply();
            expect(location.path()).toBe('/brew');
        });
        
        it('Redirects to "view brew" page if cancelling the deletion.', function () {
            $scope.onCancelDelete();
            expect(location.path()).toEqual('/brew/view/' + mockBrew._id);
        });
    });
})();
