// import React from "react";
// import { StreamChat } from "stream-chat";
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from "stream-chat-react";

// import "stream-chat-react/dist/css/index.css";
// const key = process.env.REACT_APP_KEY;
// const userToken = process.env.REACT_APP_TOKEN;
// const userID = 'Cody';
// console.log(userToken);

// const chatClient = StreamChat.getInstance(key);

// chatClient.connectUser(
//   {
//     id: userID,
//     name: userID,
//     image:
//       "https://media.geeksforgeeks.org/wp-content/uploads/20200619190327/avatar_default_19_A06A42.png",
//   },
//   userToken
// );

// const channel = chatClient.channel("messaging", "Channel-2", {
//   // add as many custom fields as you'd like
//   image: "https://www.drupal.org/files/project-images/react.png",
//   name: "Talk about React",
//   members: [userID],
// });

// const App = () => (
//   <Chat client={chatClient} theme="messaging light">
//     <Channel channel={channel}>
//       <Window>
//         <ChannelHeader />
//         <MessageList />
//         <MessageInput />
//       </Window>
//       <Thread />
//     </Channel>
//   </Chat>
// );

// export default App;



// ********************************



import React, { useEffect, useState, Fragment } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import Login from "./components/Login";

import "stream-chat-react/dist/css/index.css";

const key = process.env.REACT_APP_KEY;
const userID = "Zachery";

// const filters = { type: "messaging" }; // not allowed to read other users' channels
const filters = { type: "messaging", members: { $in: [userID] } };
const sort = { last_message_at: -1 };

const App = () => {
  const [chatClient, setChatClient] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(key);

      // await client.connectUser(
      //   {
      //     id: userID,
      //     name: userID,
      //     image:
      //       "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg",
      //   },
      //   userToken
      // );

      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging dark">
      {chatClient.user ? (
        <Fragment>
          <ChannelList filters={filters} sort={sort} />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Fragment>
      ) : (
        <Login
          client={chatClient}
          setLoggedIn={setLoggedIn}
        />
      )}
    </Chat>
  );
};

export default App;
