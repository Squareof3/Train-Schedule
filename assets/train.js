


var config = {
    apiKey: "AIzaSyB4TzeZ7CjYafkX68759mxDfkyZOCt-MKA",
    authDomain: "train-schedule-9b701.firebaseapp.com",
    databaseURL: "https://train-schedule-9b701.firebaseio.com",
    projectId: "train-schedule-9b701",
    storageBucket: "train-schedule-9b701.appspot.com",
    messagingSenderId: "1093000012665"
  };
    firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destName = $("#destination-input").val().trim();
      var firstTrainTime = moment($("#first-train-time-input").val(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainName,
          destination: destName,
          time: firstTrainTime,
          frequency: frequency
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      alert("Ye have added a train, you Master of all Trains");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destName = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destName);
    console.log(firstTrainTime);
    console.log(frequency);


    var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
    var timeRemainder = moment().diff(moment.unix(firstTrainTime), "minutes") % frequency;
    var minutes = frequency - timeRemainder;

    var nextArrival = moment().add(minutes, "m").format("hh:mm A");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" + frequency + "mins" + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>" );

    
    
});