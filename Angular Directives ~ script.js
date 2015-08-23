// Code goes here

// In recent versions of Angular, controllers may no longer be defined in
// global; namespace, but must instead be held in a module. Modules are
// defined and registered in IFFE so that they stay out of global namespace.
(function() {

  // Define the module in which controller is stored.
  //
  // Variable name can be anything, but must be used when registering the controller.
  //
  // First parameter is module name, which must match the string used in 
  // NG-APP directive in HTML page
  //
  // Second parameter is an array  of dependencies for this module - in this
  // case none, so pass empty array
  var app = angular.module("GithubViewer", []);

  // Main Controller
  // CONTROLLER component of MVC
  var MainCtrl = function($scope, $http) {

    // Data within the controller is the MODEL component of MVC
    //
    // $scope is Angular data model directive
    //
    // $http is Angular HTTP comms parameter
    //   - Uses standard get / post / put / delete methods
    //   - Note: "http" and methods are all lower case in controller code!
    $scope.Message = "GitHub user lookup";
 
    // Sample HTTP call in controller
    // NOTE: HTTP REQUEST is asynchronous, so use a "promise" construct that
    //       populates values (in myresult) when asynch data is available from HTTP RESPONSE.
    //  *******************************************************
    //  var promise = $http.get("http://get_my_result");

    //    promise.then(function(response){
    //      $scope.myresult = response.data;
    //    });
    //  *******************************************************
    //
    // Above can be also be written as follows:
    //  *******************************************************
    //  Declare a function to be called when response is received (i.e. PROMISE)
    //  var onDataReceived = function(response){
    //    $scope.TargetData = response.data;
    //  };
    //
    //  Define the HTTP REQUEST that returns the PROMISED response, together with
    //  call to function in ".then" part of statement
    //  $http.get("http://get_my_result")
    //    .then(onDataReceived);
    //  *******************************************************

    // Place my Github user details in page using HTTP call.
    // Angular HTTP requests automatically convert returned JSON
    // data into an Angular object
    //
    // Declare response promise function event
    var onMyDataReturned = function(response) {
      // Copy returned response object data to my user data object
      $scope.User = response.data;
    }

    // Declare an error handler; will be called with parameter set to
    // object storing error information
    var onMyDataError = function(reason) {
      $scope.errmsg = "Error reading Github data";
      $scope.err = reason;
    };

    // Make HTTP request to Github to retrieve data for "userID" value
    // passed from HTMP page. The "userID" parameter was declared via the
    // NG-MODEL directive. The "search" function was declared in the SUBMIT
    // event of the search box form.
    $scope.search = function(userID) {

      // Concatenate passed userID value into GitHub search URL
      $http.get("https://api.github.com/users/" + userID)
        // Set PROMISE to function above when data returned; also define an error
        // function in case an error occurs.
        .then(onMyDataReturned, onMyDataError);
    };

  };

  // After controller is defined, must be registered using same variable name
  // as for the module definition.
  // Registration consists of the controller name followed by an array of
  // parameters; last parameter in the array is controller type.
  app.controller("MainCtrl", ["$scope", "$http", MainCtrl]);

}());
