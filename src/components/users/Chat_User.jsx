import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../style/users/Chat_User.css';

const Chat_User = () => {
  return (
    <div className="vk-chat-user-page">
      <Navbar activeNav="chats" />

      <main className="vk-chat-user-main">
        <div className="vk-chat-user-container">
          <h1 className="vk-chat-user-title">Chat Page</h1>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat_User;
