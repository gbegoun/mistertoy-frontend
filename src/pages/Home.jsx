import { Chat } from "../cmps/Chat.jsx";
import { Popup } from "../cmps/Popup.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { useState } from 'react';

export function Home() {
    return (
        <section className="home">
            <h1>Welcome To Mister Toy</h1>
        </section>
    );
}