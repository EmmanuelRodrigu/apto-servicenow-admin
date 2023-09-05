import audio from '@assets/sounds/general.mp3';
import { ToastContainer, toast } from 'react-toastify';

export default function notifyFactory(message, type = 'info') {
    const noty = toast[type](`${message}`, {
        position: toast.POSITION.TOP_RIGHT,
    });
    const audioFile = new Audio(audio);
    audioFile.play();

    return noty;
}
