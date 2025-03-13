import { useState } from "react";
import { Button, Box } from "@mui/material";
import { Chat } from "./Chat.jsx";  
import { Popup } from "./Popup.jsx";

export function ChatButton() {    
    const [isChatOpen, setIsChatOpen] = useState(false);

    const onToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="chat-button">
            <Button 
                variant="contained" 
                color="primary" 
                onClick={onToggleChat} 
                sx={{borderRadius: '50%', width: '70px', height: '70px', position: 'fixed', bottom: '20px', left: '20px'}}
            >
                Chat
            </Button>
            {isChatOpen && (
                <Popup 
                    title="chat" 
                    onClose={() => setIsChatOpen(false)} 
                > 
                    <Chat /> 
                </Popup>
            )}
        </div>
    );
}