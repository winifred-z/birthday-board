import { useState } from 'react';
import styles from './NoteModal.module.css';
import Pin from '../Pin/Pin';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

type NoteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
};

/* fonts
regular sans-serif (geist)
handwriting (kalam)
cursive (cerdarville)
comic sans (comic)
goth (rocker)
pixel (jersey
*/
export default function NoteModal({ isOpen, onClose, onSubmit }: NoteModalProps) {
    const [font, setFont] = useState('var(--font-geist-sans)');
    const [pinColor, setPinColor] = useState('#38632a');
    const [noteText, setNoteText] = useState('');
    const [senderText, setSenderText] = useState('');
    const router = useRouter();

    if (!isOpen) return null;

    // font control
    const fonts: string[] = [
        'var(--font-geist-sans)',
        'var(--font-kalam)',
        'var(--font-dancing-script)',
        'var(--font-comic-relief)',
        'var(--font-new-rocker)',
        'var(--font-jersey-10)',
    ];
    const cycleFont = () => {
        setFont((prevFont) => {
            const currentIndex = fonts.indexOf(prevFont);
            return fonts[(currentIndex + 1) % fonts.length];
        });
    };

    // pin color control
    const pinColors: string[] = ['#28c2cd', '#d631d3', '#cf8a13', '#a4c416', '#5507d4', '#d90f0f'];
    const cyclePinColor = () =>
        setPinColor((prevColor) => {
            const currentIndex = pinColors.indexOf(prevColor);
            return pinColors[(currentIndex + 1) % pinColors.length];
        });

    const saveNote = async () => {
        try {
            setPinColor('#38632a');
            setFont('var(--font-geist-sans)');
            setNoteText('');
            setSenderText('');
            onSubmit();

            await addDoc(collection(db, 'notes'), {
                message: noteText,
                sender: senderText,
                color: pinColor,
                font: font,
                margin: Math.round(Math.random() * -60),
                createdAt: new Date(),
            });

            router.refresh();
        } catch (error) {
            console.error('Having trouble saving note:', error);
        }
    };

    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button className={`${styles.button} ${styles.square}`} onClick={onClose}>
                        x
                    </button>
                    <div className={styles.settings}>
                        <button
                            style={{ fontFamily: font }}
                            className={styles.button}
                            onClick={cycleFont}
                        >
                            Font
                        </button>
                        <button
                            style={{ backgroundColor: pinColor }}
                            className={`${styles.button} ${styles.square}`}
                            onClick={cyclePinColor}
                        ></button>
                    </div>
                </div>
                <div
                    style={{ fontFamily: font, lineHeight: '34px' }}
                    className={styles.noteContainer}
                >
                    <div className={styles.pinWrapper}>
                        <Pin color={pinColor}></Pin>
                    </div>
                    <textarea
                        className={styles.noteInputArea}
                        name="noteDescription"
                        placeholder="Write your message here!"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows={5}
                        cols={25}
                    ></textarea>
                    <div className={styles.senderWrapper}>
                        <label htmlFor="sender">-</label>
                        <textarea
                            id="sender"
                            className={styles.senderInputArea}
                            name="noteSender"
                            placeholder="And name here"
                            value={senderText}
                            onChange={(e) => setSenderText(e.target.value)}
                            rows={1}
                            cols={25}
                        ></textarea>
                    </div>
                </div>
                <button
                    className={styles.button}
                    disabled={!noteText.trim() || !senderText.trim()}
                    onClick={() => saveNote()}
                >
                    All done, pin it!
                </button>
            </div>
        </div>
    );
}
