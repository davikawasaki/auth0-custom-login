(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];

  function authService($state, angularAuth0, $timeout) {

    function login() {
      $state.go('login');
      //angularAuth0.authorize();
    }
    
    function handleAuthentication(authResult) {
      //angularAuth0.parseHash(function(err, authResult) {
      console.log(authResult)
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        $state.go('home');
      } else {
        $timeout(function() {
          $state.go('login');
        });
        console.log('Login was not made correct. Try again.');
        //alert('Error: ' + err.error + '. Check the console for further details.');
      }
      //});
    }

    function setSession(authResult) {
      localStorage.clear();
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      if(authResult.socialType) localStorage.setItem('social_type', authResult.socialType);
    }
    
    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      $state.go('login');
    }
    
    function isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
