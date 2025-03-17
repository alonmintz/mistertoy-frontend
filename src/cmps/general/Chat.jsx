import { useState, useRef, useEffect } from "react";
import { toyService } from "../../service/toy.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export function Chat() {
  const [msgs, setMsgs] = useState([]);
  const [currentMsg, setCurrentMsg] = useState("");
  const chatContentRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [msgs]);

  function handleMsgChange({ target }) {
    setCurrentMsg(target.value);
  }

  function handleMsgSubmit(ev) {
    ev.preventDefault();
    const userMsg = createUserMsg();
    setMsgs((prevMsgs) => [...prevMsgs, userMsg]);
    setCurrentMsg("");
    toyService
      .askChatBot(userMsg)
      .then((responseMsg) => setMsgs((prevMsgs) => [...prevMsgs, responseMsg]));
  }

  function createUserMsg() {
    return { author: "user", txt: `${currentMsg}`, time: Date.now() };
  }
  return (
    <section className="chat">
      <section className="chat-content" ref={chatContentRef}>
        {msgs.map((msg) => (
          <ChatMsg key={msg.time} msg={msg} />
        ))}
      </section>
      <section className="chat-input">
        <form onSubmit={handleMsgSubmit}>
          <input
            type="text"
            name="msg"
            id="msg"
            value={currentMsg}
            onChange={handleMsgChange}
            placeholder="Type your message..."
          />
          <button>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </section>
    </section>
  );
}

function ChatMsg({ msg }) {
  const { author, txt, time } = msg;
  const authorClass = author === "user" ? "user-msg" : "bot-msg";
  const authorDisplay = author === "user" ? "You" : "Bot";
  return (
    <article className={`chat-msg ${authorClass}`}>
      <span className="author">{`${authorDisplay}: `}</span>
      <span>{txt}</span>
    </article>
  );
}
