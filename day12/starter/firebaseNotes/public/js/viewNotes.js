let userName;
let email;
let cat;
let googleUserId;

// when page loads, check user logged in state
window.onload=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      email=user.email;
      userName=user.displayName;
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

//once logged in, get user's notes from db
    //display notes on page
const getNotes = (userId) => {
    console.log(userId);
    const userRef=firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        writeNotesToHtml(snapshot.val());
    });
};

const writeNotesToHtml=(data)=>{
    const body=document.querySelector("#app");
    for(let noteKey in data){
        //create html string for one note
        console.log(noteKey);
        if(cat){
            console.log(cat);
            if(data[noteKey].labels.includes(cat)){
                console.log(data);
                let noteHtml = createHtmlForNote(data[noteKey]);
                //put all html into page at once
                body.innerHTML+=noteHtml;
            }
        }else{
            let noteHtml = createHtmlForNote(data[noteKey]);
            //put all html into page at once
            body.innerHTML+=noteHtml;
        }
    }
};

//return string of html
const createHtmlForNote=(note)=>{
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    let colorVal;
    const rgb = `rgb(${r},${g},${b})`;
    if((r+g+b)/3<127){
        colorVal="white";
    }else{
        colorVal="#363636";
    }
    return `<div class="column is-one-third">
                <div class="card" style="background:${rgb}">
                    <header class="card-header">
                        <p class="card-header-title" style="color:${colorVal}">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content" style="color:${colorVal}">
                            ${note.text}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content" style="color:${colorVal}">
                            User: ${userName} | email: ${email}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="content" style="color:${colorVal}">
                            labels: ${note.labels}
                        </div>
                    </div>
                </div>
            </div>
    `;
};

const search = () => {
    document.querySelector("#app").innerHTML="";
    category=document.querySelector("#searchCat");
    cat=category.value;
    getNotes(googleUserId);
};