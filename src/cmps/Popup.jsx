import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Popup({ onClose, title, children }) {
    


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
            {title && <h2>{title}</h2>}
            {children}
        </div>
    );
}

Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};