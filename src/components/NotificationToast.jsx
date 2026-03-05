import ToastBody from "react-bootstrap/esm/ToastBody";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function NotificationToast({ show, message, onCLose, success = true }) {
    const bgColor = success ? "success" : "danger"
    const txtColor = success ? "text-white" : "text-black"

    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast bg={bgColor} text={txtColor} onClose={onCLose} show={show} delay={3000} autohide>
                <ToastBody>{message}</ToastBody>
            </Toast>
        </ToastContainer>
    )
}