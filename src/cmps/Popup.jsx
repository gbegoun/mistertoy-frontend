import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Popup({ onClose, title, onYes, onNo, onCancel, onOk, children }) {

    function Header() {
        return (
            <div className="header">
                <h1>{title}</h1>
            </div>
        )
    }

    function Footer() {
        return (
            <div className="footer">
                {onYes && <button onClick={onYes}>Yes</button>}
                {onNo && <button onClick={onNo}>No</button>}
                {onCancel && <button onClick={onCancel}>Cancel</button>}
                {onOk && <button onClick={onOk}>OK</button>}
            </div>
        )
    }

    function Main({ children }) {
        return (
            <div className="main">
                {children}
            </div>
        )
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="popup">
            <button className="close" onClick={onClose}>X</button>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
}

Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    onYes: PropTypes.func,
    onNo: PropTypes.func,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    children: PropTypes.node.isRequired,
};