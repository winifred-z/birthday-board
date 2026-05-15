'use client';
import { useEffect, useState } from 'react';
import NoteModal from '../NoteModal/NoteModal';
import styles from './BoardInteraction.module.css';
import MessageModal from '../MessageModal/MessageModal';
import PictureModal from '../PictureModal/PictureModal';
import { BsImage } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';

export default function BoardInteraction() {
    const [messageModalOpen, setMessageModalOpen] = useState(true);
    const [messageModalText, setMessageModalText] =
        useState(`Hi! Please leave kind messages and pics for Matthew!
- Winnie`);
    const [messageModalButtonText, setMessageModalButtonText] = useState('Sounds good');
    const [noteModalOpen, setNoteModalOpen] = useState(false);
    const [pictureModalOpen, setPictureModalOpen] = useState(false);

    // preventing background scrolling while modal is open
    useEffect(() => {
        if (noteModalOpen || messageModalOpen || pictureModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [noteModalOpen, messageModalOpen, pictureModalOpen]);

    const openMessageModal = (message: string, buttonText: string) => {
        setMessageModalText(message);
        setMessageModalButtonText(buttonText);
        setMessageModalOpen(true);
    };

    return (
        <div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => setNoteModalOpen(true)}>
                    Add a note {''}
                    <BsPencil size={20} />
                </button>
                <button className={styles.button} onClick={() => setPictureModalOpen(true)}>
                    Add a photo {''}
                    <BsImage size={20} />
                </button>
            </div>
            <MessageModal
                message={messageModalText}
                buttonText={messageModalButtonText}
                isOpen={messageModalOpen}
                onClose={() => {
                    setMessageModalOpen(false);
                }}
            ></MessageModal>
            <PictureModal
                isOpen={pictureModalOpen}
                onClose={() => setPictureModalOpen(false)}
                onSubmit={() => {
                    setPictureModalOpen(false);
                    openMessageModal(
                        "Your picture has been added :) Wait a couple seconds and it'll appear at the bottom of the board.",
                        'Yay',
                    );
                }}
            ></PictureModal>
            <NoteModal
                isOpen={noteModalOpen}
                onClose={() => setNoteModalOpen(false)}
                onSubmit={() => {
                    setNoteModalOpen(false);
                    openMessageModal(
                        "Your note has been pinned! Wait a couple seconds and it'll appear at the bottom of the board.",
                        'Yay',
                    );
                }}
            ></NoteModal>
        </div>
    );
}
