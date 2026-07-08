let appID = "167282984541974b8";
let region = "US";
let currentUser = null;

async function initCometChat() {
  await CometChat.init(
    appID,
    new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .autoEstablishSocketConnection(true)
      .setStorageMode(CometChat.StorageMode.SESSION)
      .build()
  );
}

async function loginUser(uid, name) {
  const token = await createToken(uid, name);
  await CometChat.login({ uid, authToken: token });
  currentUser = await CometChat.getLoggedinUser();
  console.log("Logged in user:", currentUser);
}

async function createToken(uid, name) {
  const res = await fetch("https://api.x8r.dev/api/cometchat/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, name }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.data.authToken;
}

async function sendDirectMessage(toUID, text) {
  const receiverID = toUID;
  const messageText = text;
  const messageType = CometChat.MESSAGE_TYPE.TEXT;
  const receiverType = CometChat.RECEIVER_TYPE.USER;

  const textMessage = new CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );

  return CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log("Message sent successfully:", message);
      displayMessage(message, true);
      return message;
    },
    (error) => {
      console.error("Message sending failed:", error);
    }
  );
}

async function createGroup(
  groupId,
  groupName,
  groupType = CometChat.GROUP_TYPE.PUBLIC
) {
  const group = new CometChat.Group(groupId, groupName, groupType, "");
  return CometChat.createGroup(group).then(
    (group) => {
      console.log("Group created successfully:", group);
      return group;
    },
    (error) => {
      console.error("Group creation failed:", error);
    }
  );
}

async function sendGroupMessage(groupId, text) {
  const receiverType = CometChat.RECEIVER_TYPE.GROUP;
  const messageType = CometChat.MESSAGE_TYPE.TEXT;
  const textMessage = new CometChat.TextMessage(groupId, text, receiverType);

  return CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log("Group message sent successfully:", message);
      displayMessage(message, true);
      return message;
    },
    (error) => {
      console.error("Group message sending failed:", error);
    }
  );
}

function displayMessage(message, isMine = false) {
  const container = document.querySelector(".messages-container");
  const div = document.createElement("div");
  div.className = isMine ? "my-message" : "other-message";
  div.textContent = message.text || message.data.text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function subscribeToMessages() {
  const listenerID = "THISISALISTENERPLEASEDONOTLISTENTOITIFYOUARENOTSUPPOSEDTOBELISTENING";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (message) => {
        console.log("Incoming message:", message);
        displayMessage(message, false);
      },
    })
  );
}

(async () => {
  await initCometChat();
  await loginUser("user1", "Kevin");
  subscribeToMessages();

  await createGroup("group123", "Test Group");
  document
    .querySelector("button[onclick='sendMessage()']")
    .addEventListener("click", () => {
      const input = document.querySelector("input");
      sendDirectMessage("user2", input.value);
      input.value = "";
    });
})();
