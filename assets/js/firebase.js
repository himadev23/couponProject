


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDzJqDInGFMAPpq0c4kBsDDr4CLCKdpyM8",
    authDomain: "coupon-project-1517945338567.firebaseapp.com",
    databaseURL: "https://coupon-project-1517945338567.firebaseio.com",
    projectId: "coupon-project-1517945338567",
    storageBucket: "",
    messagingSenderId: "6770785770"
  };
  firebase.initializeApp(config);


var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });

}
