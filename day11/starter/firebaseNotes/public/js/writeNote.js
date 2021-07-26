let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if(user){
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
                userId = googleUser.uid;
            }else{
                window.location="index.html";
            }
        });
}

const submitNote=()=>{
    const note=document.querySelector("#noteText").value;
    const title=document.querySelector("#noteTitle").value;
    const category=document.querySelector("#categoryText").value;

    categories=category.split(",");
    categories=categories.map(function(label){
        return label.trim();
    });

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note,
            categories: categories
        }
    )
    .then(() => {
        document.querySelector("#noteText").value="";
        document.querySelector("#noteTitle").value="";
    })
    .catch(error => {
        console.log(`something bad happened ... \/${error}`);
    });
};