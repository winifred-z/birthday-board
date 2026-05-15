import Pin from '../Pin/Pin';
import styles from './TitleNote.module.css';

export default function TitleNote() {
    return (
        <div className={styles.container}>
            <div className={styles.noteContainer}>
                <Pin color={'#eb1438'}></Pin>
                <p className={styles.thirdNoteText}>{'celebrating the life of MATTHEW CAVANAUGH'}</p>
            </div>
        </div>
    );
}
