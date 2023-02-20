"use strict";

//? Selectors
const arrNumberOfMessages = document.querySelectorAll(".friends-section .friend .number-of-messages"),
  searchInpContainer = document.querySelector(".friends-section .search-input"),
  searchInp = document.querySelector(".friends-section .search-input input"),
  userPictures = document.querySelectorAll(".chat .user-picture img"),
  friends = document.querySelectorAll(".friends-section .friends-menu .friend"),
  friendsPictures = document.querySelectorAll(".friends-section .friends-menu .friend .friend-picture img"),
  stateUser = document.querySelector(".top-side .selected-friend .state"),
  closeProfile = document.querySelector(".friend-profile-section .close"),
  friendProfileSection = document.querySelector(".friend-profile-section"),
  friendsSectionMenu = document.querySelector(".friends-section"),
  friendsSectionIcon = document.querySelector(".main-chat-section .top-side .selected-friend i"),
  friendSectionClose = document.querySelector(".friends-section .settings .icons i.close"),
  sendMsgInput = document.querySelector(".send-message-container .send-input input"),
  sendMsgButton = document.querySelector(".send-message-container .options i.send-message"),
  messagesPlace = document.querySelector(".chat .test-messages"),
  chatArea = document.querySelector(".main-chat-section .chat");




//? Variables
let selectedFriend;
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let flag = "AM";
let userImg =
  "https://cdn.pixabay.com/photo/2021/04/25/14/30/man-6206540_1280.jpg";




//? Functions
function getdateNow() {
  if (hours > 12) {
    hours = hours - 12;
    flag = "PM";
  } else flag = "AM";

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}${flag}`;
}


function sendMessage() {
  if (sendMsgInput.value.length !== 0) {
    const message = {
      text: sendMsgInput.value,
      date: getdateNow(),
      sentUser: selectedFriend,
      state: "unsent",
    };

    createMessage(message);
    chatArea.scrollTo(0, chatArea.clientHeight * messagesPlace.children.length);
    sendMsgInput.value = "";
  }
}


function createMessage(data) {
  // Container
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("friend-message");
  messagesPlace.appendChild(messageContainer);

  // info message container
  const infoMessage = document.createElement("div");
  infoMessage.classList.add("info-message");
  messageContainer.appendChild(infoMessage);

  // Image holder
  const imgHolder = document.createElement("div");
  imgHolder.classList.add("friend-picture");
  infoMessage.appendChild(imgHolder);

  // User picture
  const userPicture = document.createElement("img");
  userPicture.src = userImg;
  imgHolder.appendChild(userPicture);

  // info message container
  const dateMsg = document.createElement("span");
  dateMsg.classList.add("date-message");
  dateMsg.innerHTML = data.date;
  infoMessage.appendChild(dateMsg);

  // Message text
  const textMsg = document.createElement("p");
  textMsg.classList.add("the-message");
  textMsg.innerHTML = data.text;
  messageContainer.appendChild(textMsg);
}



//? Events
// Hide number of messages if element have no text
arrNumberOfMessages.forEach((ele) => {
  if (ele.textContent.length === 0) ele.style.visibility = "hidden";
});


// Focus on input
searchInpContainer.addEventListener("click", () => {
  searchInp.focus();
});


closeProfile.addEventListener("click", () => {
  friendProfileSection.style.right = "-500px";
});


friendsSectionIcon.addEventListener("click", () => {
  friendsSectionMenu.style.left = "0";
});


friendSectionClose.addEventListener("click", () => {
  friendsSectionMenu.style.left = "";
});


sendMsgButton.addEventListener("click", sendMessage);


window.addEventListener("keypress", (e) =>
  e.code === "Enter" ? sendMessage() : ""
);





//? on fire
// Set messages pictures to selected user picture
for (let i = 0; i < friends.length; i++) {
  if (friends[i].classList.contains("selected")) {
    // Set name of selected friend
    selectedFriend = friends[i].children[0].children[1].children[0].textContent;

    // Set messages picture to selected friend
    userPictures.forEach((pic) => {
      pic.src = friendsPictures[i].src;

      // click on image to open profile friend menu
      pic.addEventListener(
        "click",
        () => (friendProfileSection.style.right = "0")
      );
    });
  }
}


// Make scroll bar go to the end at the bottom
chatArea.scrollTo(0, chatArea.clientHeight * messagesPlace.children.length);
