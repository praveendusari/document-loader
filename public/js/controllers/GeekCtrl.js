angular.module('GeekCtrl', ['ngFileUpload']).controller('GeekController', function($scope,Upload,$window) {

	$scope.tagline = 'The square root of life is pi!';	
    $scope.submit = function(){ //function to call on form submit
        if ($scope.upload_form.file.$valid && $scope.upload_form.file) { //check if from is valid
            $scope.upload($scope.file); //call upload function
        }
    }
    
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:8080/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    }
});