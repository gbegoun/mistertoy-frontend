import { useState, useCallback,useRef,useEffect } from "react";
import { debounce } from "../services/util.service.js";

export function Chat() {

    const [messages, setMessages] = useState([{ user: "bot", text: "Hi, How can i help you today?" }]);

    const inputRef = useRef(null);

    useEffect(() => {
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
                        <li key={idx} className={message.user}>{message.user}: {message.text}</li>
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