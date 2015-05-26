angular.module('app').controller('mvMainCtrl', function ($scope) {
    $scope.myVar = "Hello Angular";
    $scope.brews = [
        { name: "Everyday IPA", featured: false, brewedOn: new Date('8/25/2014') },
        { name: "Bruxelles Blonde", featured: false, brewedOn: new Date('11/1/2014') },
        { name: "Warrior Double IPA", featured: false, brewedOn: new Date('2/19/2015') },
        { name: "Summer Wheat", featured: true, brewedOn: new Date('4/23/2015') },
        { name: "American Wheat", featured: true, brewedOn: new Date('5/4/2015') },
        { name: "Midnight IPA", featured: true, brewedOn: new Date('12/25/2014') },
        { name: "Black IPA", featured: false, brewedOn: new Date('3/16/2014') }
    ];
});