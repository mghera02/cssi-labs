const signIn = () => {
    console.log("Calling sign in");
    //const provider = new firebase.auth.GoogleAuthProvider();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            //do something with result
            console.log(`Result is: ${result}`);
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.uid);
            window.location = "writeNote.html";
        })
        .catch(error => {
            //Something bad happened
            console.log(error); 
        });
};

const signInWithEmail=()=>{
    password=document.querySelector("#password").value;
    email=document.querySelector("#email").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        window.location = "writeNote.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorMessage=="The email address is already in use by another account."){
            //sign them in
            window.location = "writeNote.html";
        }
        console.log(errorMessage);
    });

}