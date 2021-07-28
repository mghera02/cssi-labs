let googleUserId, editedNoteId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  console.log(data);
  let noteItems;

  for(const noteItem in data) {
    
    const note = data[noteItem];
    // For each note create an HTML card
    console.log(data[noteItem].title);
    
    //console.log(Object.entries(note));
    //let title=Object.entries(note)

    cards += createCard(note, noteItem);
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
    return `<div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                     <footer class="card-footer">
                        <a id="${noteId}" href="#" class="card-footer-item"
                            onclick="deleteNote('${noteId}')">
                            Delete
                        </a>
                        <a href="#" class="card-footer-item"
                            onclick="editNote('${noteId}')">
                            Edit
                        </a>
                        <a href="#" class="card-footer-item"
                            onclick="archiveNote('${noteId}')">
                            Archive
                        </a>
                    </footer>
                </div>
            </div>
    `;
};

const deleteNote = (noteId) =>{
    console.log(`Deleting note: ${noteId}`);
    var confirmed=confirm("Are you sure you want to delete the note?");
    if(confirmed==true){
        editedNoteId=noteId;
        firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
    }
    

};

const editNote=(noteId)=>{
    console.log(`Editing note: ${noteId}`);
    editedNoteId = noteId;
    //show modal dialog
    const editNoteModal=document.querySelector("#editNoteModal");

    //get text from note in database
    const notesRef=firebase.database().ref(`users/${googleUserId}/${noteId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();

        //set text into editable form        
        document.querySelector("#editTitleInput").value=data.title;
        document.querySelector("#editTextInput").value=data.text;
    });


    //save updated text to the database

    //hide modal box
    editNoteModal.classList.toggle("is-active");
};

const closeEditModal = () => {
    const editNoteModal=document.querySelector("#editNoteModal");
    editNoteModal.classList.toggle("is-active");
};

const saveEditedNote = () => {
    const newTitle = document.querySelector("#editTitleInput").value;
    const newNote = document.querySelector("#editTextInput").value;
    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            title: newTitle,
            text: newNote
        })
    closeEditModal();
};