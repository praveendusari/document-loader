angular.module('NerdCtrl', []).controller('NerdController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';
 $scope.formAllGood = function () {
        return ($scope.usernameGood && $scope.passwordGood && $scope.passwordCGood)
    }
});