// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.directives'])

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



.controller('Ctrl',function($scope,$ionicModal,$ionicListDelegate,$ionicPlatform,$ionicLoading) {


      $ionicPlatform.ready(function() {

        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        $scope.map = map;
    });



          $scope.allLots = [{ Num: 1,
                              Parked: false}, 
                            { Num: 2,
                              Parked: false
                            }]

          


           $ionicModal.fromTemplateUrl('templates/scanResult.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.scanResult = modal;
        });

         $ionicModal.fromTemplateUrl('templates/statusModal.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.statusModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/extendBooking.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.extendBooking = modal;
        });

        $ionicModal.fromTemplateUrl('templates/endBooking.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.endBooking = modal;
        });

        //Success Modal
        $ionicModal.fromTemplateUrl('templates/success.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.successModal = modal;
        });

        //Home Model

        $ionicModal.fromTemplateUrl('templates/home.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.indexModal = modal;
        });

        $scope.showHome = function() {
          $scope.statusModal.hide();
          $scope.emptyStatusModal.hide();
          $scope.scanResult.hide();
          $scope.searchModal.hide();
        
        }

          //EmptyStatus Model

        $ionicModal.fromTemplateUrl('templates/emptyStatus.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.emptyStatusModal = modal;
        });


         //Search Model

        $ionicModal.fromTemplateUrl('templates/search.html', {
          scope: $scope,
          animation: 'slide-in-left'
        }).then(function(modal){ 
          $scope.searchModal = modal;
        });

        //search function
        $scope.count = 0;
        $scope.searchFunction = function() {
          $scope.emptyStatusModal.hide();
          $scope.statusModal.hide();
          $scope.count=0;
          for (var i = $scope.allLots.length - 1; i >= 0; i--) {
            if(!$scope.allLots[i].Parked) {
              $scope.count++;
            }
          };
          /*$scope.map = new google.maps.Map(document.getElementById("map"),{
                        center: {lat: 1.344215, lng: 103.6791292},
                        zoom: 14
                    });
*/
          $scope.searchModal.show();
        }
       
        $scope.Lot = null;
        $scope.option = {
          duration: null
        };
        $scope.past = null;
        $scope.future = null;

          $scope.scan = function()
            {
              //$scope.scanResult.show();
              
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        if(!result.cancelled)
                        {
                            if(result.format == "QR_CODE")
                            {
                                    var value = result.text;

                                    $scope.Lot = value.split("---");


                                    $scope.scanResult.show();

                            }
                        }
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
               );
                
            }


            $scope.from = null;
            $scope.to = null;
            $scope.showStatus = function() {
              if($scope.Lot[1] == 1) {
                $scope.allLots[0].Parked = true;
              } else {
                $scope.allLots[1].Parked = true;
              }
              $scope.from = new Date().getHours() + ":" + new Date().getMinutes();
              $scope.past = new Date();
              $scope.future = new Date();
              $scope.future.setTime($scope.future.getTime() + (parseFloat($scope.option.duration)*60*60*1000));
              $scope.to = $scope.future.getHours() + ":" + $scope.future.getMinutes();
           
              $scope.statusModal.show();
            }

            $scope.statusTab = function() {
              if($scope.Lot == null) {
                $scope.emptyStatusModal.show();
              } else {
               $scope.statusModal.show();
               }
            }

            $scope.extend = function() {
              $scope.extendBooking.show();
            }

            $scope.extendFinish = function() {
              $scope.future.setTime($scope.future.getTime() + (parseFloat($scope.option.duration)*60*60*1000));
              $scope.to = $scope.future.getHours() + ":" + $scope.future.getMinutes();
              $scope.extendBooking.hide(); 
            }

            $scope.price = null;
            $scope.showEndBooking = function() {
              $scope.price = parseFloat(Math.ceil((($scope.future.getTime() - $scope.past.getTime())*2)/(1000*60*60)))/2;
              $scope.endBooking.show();
            }


            $scope.showSuccess = function() {
              $scope.successModal.show();
            }

            $scope.done = function() {
              $scope.successModal.hide();
              $scope.endBooking.hide();
                $scope.statusModal.hide();
                $scope.scanResult.hide();
                $scope.allLots[0].Parked = false;
                $scope.allLots[1].Parked = false;
                $scope.price = null;
                $scope.future = null;
                 $scope.past = null;
                  $scope.from = null;
                   $scope.to = null;
                    $scope.option.duration = null;
                     $scope.Lot = null;


            }

})

