// Code goes here

// Define a specific function for a task
var work = function() {
  console.log("Doing the task");
};


// Define generic function to execute any task
var doTask = function(task) {

  console.log("Starting task ...");

  // Execute specified task & trap any exceptions
  try {
    task();
  } catch (except) {
    console.log(except);
  }

  console.log("Task finished!");

}


// Run generic execution function; pass TASK to be executed
doTask(work);


// Encapsulate the complex function below within self-executing 
// IFFE --> Immediately Invoked Function Expression
// This allows the use of fully-encapsulated code WITH NO GLOBAL VARIABLES 
// outside scope of the IFFE
// IFFE starts with open paren
(function() {


  // Define more complex function similar to class with methods
  var createWorker = function() {

    // Define & initialize a local (private) variable
    var counter = 0;

    // Define first function (method)
    var method1 = function() {
      // Increment counter
      counter += 1;
      console.log("First job --> job " + counter);
    }

    // Define second function (method)
    var method2 = function() {
      // Increment counter
      counter += 1;
      console.log("Second job --> job " + counter);
    }

    // Return the member functions (methods)
    return {
      // Alias the returned object names
      job1: method1,
      job2: method2,
      // Can also return an in-line function if desired
      job3: function() {
        counter += 1;
        console.log("Third job --> job " + counter);
      }
    }
  }


  // Create in instance of the complex function (class)
  var myWorker = createWorker();

  // Then call the member functions (methods) using the defined aliases
  myWorker.job1();
  myWorker.job2();
  myWorker.job3();
  // IFFE ends with:
  // curly brace to end the function block;
  // open / close parens to "self-execute" the function;
  // final close paren to terminate IFFE;
  // semi-colon to terminate IFFE call
}());
