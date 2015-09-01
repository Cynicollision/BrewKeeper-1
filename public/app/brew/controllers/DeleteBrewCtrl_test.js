describe('brew/DeleteBrewCtrl', function () {
    'use strict';

    var $scope, Brew, 
        mockBrewId = 825;
        
    beforeEach(function () {
        module('BrewKeeper');
            
        inject(function ($rootScope, $controller, _Brew_) {
            $scope = $rootScope.$new();
            Brew = _Brew_;
                
            $controller('DeleteBrewCtrl', {
                $scope: $scope,
                $routeParams : {
                    id: mockBrewId
                },
                Brew: Brew
            });
        });
    });

    it('Calls the Brew service to delete the brew.', function () {
        spyOn(Brew, 'delete').and.callThrough();
        $scope.onConfirmDelete();
        expect(Brew.delete).toHaveBeenCalled();
    });

});
