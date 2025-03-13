import { useState, useCallback, useRef, useEffect } from "react";
import { debounce } from "../services/util.service.js";
import { toyService } from '../services/toy.service.js';

export function Chat() {

    const [messages, setMessages] = useState([]);


    const inputRef = useRef(null);

    useEffect(() => {
        const location = window.location;
        const parts = location.hash.split("/");
        const toyId = parts.includes('toy') ? parts[parts.indexOf('toy') + 1] : null;

        if (toyId) {
            toyService.get(toyId)
                .then(toy => {
                    console.log(toy)
                    setMessages(prevMessages => [...prevMessages, { user: "bot", text: `I see you are interested in the ${toy.name}`, img: toy.img }]);
                    }
                );                
        } else {
            setMessages(prevMessages => [...prevMessages, { user: "bot", text: "How can I help you today?" }]);
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && document.activeElement === inputRef.current) {
                onMessageSend();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const onBotAnswer = useCallback(debounce(() => {
        addMessage("bot", "Can Do");
    }, 2000), []);

    const addMessage = (user, text) => {
        setMessages(prevMessages => [...prevMessages, { user, text }]);
    };

    const onMessageSend = () => {
        const text = inputRef.current.value;
        if (!text) return;
        inputRef.current.value = '';
        inputRef.current.focus();
        addMessage("user", text);
        onBotAnswer();
    }

    return (
        <div className="chat">
            <ul className="chat-window">
                {messages.map((message, idx) => {
                    return (
                        <>
                        <li key={idx} className={message.user}>
                            {message.user}: {message.text}
                        </li>
                        <li>
                            {message.img && <img src={message.img} alt={message.text} />}
                        </li>
                        </>
                    );
                })}
            </ul>
            <div className="chat-input">
                <input type="text" className="chat-text" ref={inputRef} placeholder="Enter your message here..." />
                <button className="send-button" onClick={onMessageSend}>Send</button>
            </div>
        </div>
    );
}