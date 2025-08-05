import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);
  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/threads");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      //console.log(filteredData);
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllThreads();
  });

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };
  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/threads/${newThreadId}`
      );
      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/threads/${threadId}`,
        { method: "DELETE" }
      );
      const res = await response.json();
      console.log(res);
      //     console.log("Deleted threadId:", threadId);
      // console.log("Current threadId:", currThreadId);
      if (threadId === currThreadId) {
        createNewChat();
      }
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      <img src="/assets/LOGO1.png" alt="gpt logo" className="logo"></img>
      <button onClick={createNewChat}>
        New Chat <i className="fa-solid fa-comment"></i>
      </button>
      <h5>Chats</h5>
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : " "}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Ananya Yadav 👩‍💻</p>
      </div>
    </section>
  );
}
