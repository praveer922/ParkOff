// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('Ctrl',function($scope,$ionicModal,$ionicListDelegate) {


           $ionicModal.fromTemplateUrl('PaymentPage.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.PaymentPage = modal;
        });

        $scope.Lot = null;

          $scope.scan = function()
            {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        if(!result.cancelled)
                        {
                            if(result.format == "QR_CODE")
                            {
                                    var value = result.text;

                                    $scope.Lot = value.split("---");


                                    $scope.PaymentPage.show();

                            }
                        }
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
               );
            }

        
        



})


