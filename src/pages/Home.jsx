import { Popup } from "../cmps/Popup.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { useState } from 'react';

export function Home() {
    const [showPopup, setShopPopup] = useState(false);

    function testPopup() {
        setShopPopup(true);
    }

    const onYes = () => {
        showSuccessMsg('Yes clicked');
    }

    return (
        <section className="home">
            <h1>Welcom To Mister Toy</h1>
            {showPopup && <Popup onClose={() => setShopPopup(false)} onYes={onYes} title="Test Popup">
                <p>Test Popup Content</p>
            </Popup>}
            <button onClick={testPopup}>Test Popup</button>
        </section>
    );
}