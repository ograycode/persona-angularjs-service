angular.factory('Persona', function ($rootScope) {

  var gthat;

  var Persona = function (onLoginSuccess, onLoginError, onLogout) {
    this.isLoggedIn = false;
    this.userInfo = {};
    this.onLoginSuccess = onLoginSuccess;
    this.onLoginError = onLoginError;
    this.onLogout = onLogout;
    gthat = this;
  };

  Persona.prototype.login = function (success, error) {
    if (success) this.onLoginSuccess = success;
    if (error) this.onLoginError = error;
    gthat = this;
    navigator.id.request();
  };

  Persona.prototype.logout = function (callback) {
    if (callback) this.onLogout = callback;
    gthat = this;
    navigator.id.logout();
  };

  navigator.id.watch({
    onlogin: function (assertion) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/persona/verify", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.addEventListener("loadend", function (e) {
        var data = JSON.parse(this.responseText);
        if (data && data.status === "okay") {
          console.log('logged in');
          gthat.isLoggedIn = true;
          gthat.userInfo = data;
          $rootScope.$apply();
          if(gthat.onLoginSuccess) {
            gthat.onLoginSuccess(data);
          }
        } else {
          console.log('error logging in ' + JSON.stringify(data));
          gthat.isLoggedIn = false;
          gthat.userInfo = null;
          $rootScope.$apply();
          if(gthat.onLoginError) gthat.onLoginError(data);
        }
      }, false);

      xhr.send(JSON.stringify({ assertion: assertion }));
    },
    onlogout: function () {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/persona/logout", true);
      xhr.addEventListener("loadend", function (e) {
        console.log('logged out');
        gthat.isLoggedIn = false;
        gthat.userInfo = null;
        $rootScope.$apply();
        if(gthat.onLogout) gthat.onLogout();
      });
      xhr.send();
    }
  });

  return Persona;
});
