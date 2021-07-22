const submitMessage = () => {
    //console.log("here");
    const passcodeInput=document.querySelector("#passcode");
    const messageInput=document.querySelector("#message");
    const passcodeValue=passcodeInput.value;
    const messageValue=messageInput.value;

    //Send to firebase
    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue
    });
    
    messageInput.value="";
    passcodeInput.value="";    
};

const sendMessageButton = document.querySelector(".button");

sendMessageButton.addEventListener('click', e =>{
    //console.log(e);
    submitMessage();   
});