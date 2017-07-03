(function () {

  'use strict';

  angular
    .module('app')
    .controller('LoginController', loginController);

  loginController.$inject = ['authService', '$rootScope', 'angularAuth0'];

  function loginController(authService, $rootScope, angularAuth0) {

    var vm = this;
    vm.auth = authService;

    vm.signup = signup;
    vm.login = login;
    vm.loginSocial = loginSocial;

    //////

    function signup(email, password) {
      $rootScope.webAuth.signup({
          connection: 'Username-Password-Authentication',
          email: email,
          password: password
      }, function (err) {
          if (err) return alert('Something went wrong: ' + err.message);
          else login(email, password);
      });
    }

    function login(username, password) {
      $rootScope.webAuth.client.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
        scope: 'openid',
        responseType: 'code'
      },
      function(err, authResult) {
        if (err) {
          console.log(err);
          //alert(`Error: ${err.description}`);
          return;
        } else {
          vm.auth.handleAuthentication(authResult);
        }
      });
    }

    function loginSocial(type) {
      let social = (type == 0) ? 'facebook' : 'google-oauth2'; 
      $rootScope.webAuth.authorize({
        connection: social,
        responseType: 'token',
        scope: 'openid',
        redirectUri: 'http://localhost:3000/callback'
      });
    }

  }

})();