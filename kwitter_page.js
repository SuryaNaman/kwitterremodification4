var firebaseConfig = {
    apiKey: "AIzaSyBsVgNfBLfCKeHRTet9Zra7UAmlwVwqKsk",
    authDomain: "projectkwittermode.firebaseapp.com",
    databaseURL: "https://projectkwittermode-default-rtdb.firebaseio.com",
    projectId: "projectkwittermode",
    storageBucket: "projectkwittermode.appspot.com",
    messagingSenderId: "314159630802",
    appId: "1:314159630802:web:d68c48279e1c0f2c16e00b",
    measurementId: "G-FZMVELEQPT"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("User_Name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database.ref(room_name).push({ name: user_name, message: msg, like: 0 });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function logout() {
    window.location = "index.html";
    localStorage.removeItem("User_Name");
    localStorage.removeItem("room_name");
}

function updateLike(message_id) {
    button_id = message_id;
    var likes = Number(document.getElementById(button_id).value);
    updatedlikes = likes + 1;
    firebase.database.ref(room_name).child(messege_id).update({ like: updatedlikes });
}