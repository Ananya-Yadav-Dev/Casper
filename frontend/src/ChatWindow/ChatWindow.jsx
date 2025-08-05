import "./ChatWindow.css";
import { useContext, useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import { MyContext } from "../MyContext.jsx";
import { ScaleLoader } from "react-spinners";

export default function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    setNewChat,
    setPrevChats,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    // console.log("message:", prompt, "threadId", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options); //metadata,not actual reply
      const data = await response.json();
      setReply(data.reply);
    } catch (err) {
      console.log("Fetch error:", err);
    }
    setLoading(false);
  };

  //append new chat to prev chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats =>( [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]));
    }
    setPrompt("");
  }, [reply]);
  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>Casper</span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i class="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask Casper"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? getReply() : "")}
          ></input>
          <div className="submit" onClick={getReply}>
            <i className="fa-solid fa-arrow-up"></i>
          </div>
        </div>
        <p className="info">Casper can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}
