(function () {

  'use strict';

  angular
    .module('app')
    .service('commonService', commonService);

  function commonService() {

    /**
     * Parse Callback URL from Auth0
     * @param {*} url 
     */
    function parseCallbackUrl(url) {
        var result = {};
        url = url.split("#")[1];
        url.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        result = convertAuthResultNames(result);
        return result;
    }

    /**
     * Convert AuthResult names if they are with underscores
     * @param {*} authResult 
     */
    function convertAuthResultNames(authResult) {
        if(authResult.access_token) {
            authResult.accessToken = authResult.access_token;
        }
        if(authResult.id_token) {
            authResult.idToken = authResult.id_token;
        }
        return authResult;
    }
    
    return {
      parseCallbackUrl: parseCallbackUrl,
      convertAuthResultNames: convertAuthResultNames
    }
  }
})();
