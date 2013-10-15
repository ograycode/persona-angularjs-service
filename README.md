persona-angularjs-service
=========================

An AngularJS Service which works with Persona.

##Usage
Include the service.js file and replace angular. with myApp. Then in your controller inject the service and call

``$scope.persona = new Persona();``

##Commands

Login: ``$scope.persona.login(onSuccessFunction, onErrorFunction);``
Logout: ``$scope.persona.logout(onLogoutFunction);``

##Notes

The constructor can take the ``onLoginSuccessFunction``, ``onLoginErrorFunction``, and ``onLogoutFunction`` as well, and will be called when persona tries to do the login or logout commands on its own when it first loads.
