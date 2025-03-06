export function Modal({ children, onClose }) {
    return (
        <>
            <div className="modal-overlay" onClick={onClose}/>
            <div className="modal-contant">
                {children}
            </div>
        </>
    );
}