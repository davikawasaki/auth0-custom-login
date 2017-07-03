(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['authService', '$rootScope'];
    
  function run(authService, $rootScope) {
    // Handle the authentication
    // result in the hash
    //authService.handleAuthentication();

    // Web auth authentication object
    $rootScope.webAuth = new auth0.WebAuth({
      domain:       'davikawasaki.auth0.com',
      clientID:     'DBNk7NnjQ8K55VJMeR4AOwn1ccgupq9A'
    });
  }

})();