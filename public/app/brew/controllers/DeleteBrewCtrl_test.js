describe('brew/DeleteBrewCtrl', function () {
    'use strict';

    var $scope, Brew, location,
        mockBrewId = 825;
        
    beforeEach(function () {
        module('BrewKeeper');
            
        inject(function ($rootScope, $controller, $location, _Brew_) {
            $scope = $rootScope.$new();
            location = $location;
            Brew = _Brew_;
                
            $controller('DeleteBrewCtrl', {
                $scope: $scope,
                $location: $location,
                $routeParams : {
                    id: mockBrewId
                },
                Brew: Brew
            });
        });
    });

    it('Calls the Brew service to delete the brew and redirects to /brew.', function () {
        spyOn(Brew, 'delete').and.callThrough();
        $scope.onConfirmDelete();
        expect(Brew.delete).toHaveBeenCalled();
    });

    it('Redirects to /brew after deleting a brew.', function () {
        $scope.successRedirect();
        expect(location.path()).toBe('/brew');
    });
});
