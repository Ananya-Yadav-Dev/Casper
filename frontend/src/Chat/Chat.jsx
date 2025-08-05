import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  const safePrevChats = Array.isArray(prevChats) ? prevChats : [];

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }
    if (!safePrevChats.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [safePrevChats, reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">
        {safePrevChats.slice(0, -1).map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "botDiv"} key={idx}>
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {safePrevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="botDiv" key={"non-typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {safePrevChats[safePrevChats.length - 1].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="botDiv" key={"typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
