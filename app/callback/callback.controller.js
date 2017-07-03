(function () {

  'use strict';

  angular
    .module('app')
    .controller('CallbackController', callbackController);

  callbackController.$inject = ['$rootScope', '$state', '$location', 'authService'];

  function callbackController($rootScope, $state, $location, authService) {
    
    var vm = this;
    vm.auth = authService;
    vm.init = init;

    //////

    init();

    function init() {
      $rootScope.webAuth.parseHash($location.hash(), function(err, authResult) {
        if (err) {
          return console.log(err);
        } else {
          authResult.socialType = authResult.idTokenPayload.sub.split("|")[0];
          vm.auth.handleAuthentication(authResult);
        }

        //$rootScope.webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          // Now you have the user's information
          //console.log(user)
        //});
      });
    }

  }

})();