import "./ChatWindow.css";
import { useContext, useState } from "react";
import Chat from "../Chat/Chat";
import { MyContext } from "../MyContext.jsx";
import { FadeLoader } from "react-spinners";

export default function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId } =
    useContext(MyContext);
  const [loading,setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    console.log("message:", prompt, "threadId", currThreadId);
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
      console.log(data);
      setReply(data.reply);
    } catch (err) {
      console.log("Fetch error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>Casper</span>
        <div className="userIconDiv">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <FadeLoader color="#fff" loading={loading}></FadeLoader>
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
