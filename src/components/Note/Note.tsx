import styles from './Note.module.css';
import Pin from '../Pin/Pin';

export type NoteProps = {
    color: string;
    font: string;
    message: string;
    sender: string;
    placement: string;
    margin: number;
};

export default function Note({ color, font, message, sender, placement, margin }: NoteProps) {
    const getPlacementStyle = () => {
        if (placement === 'left') return styles.placeLeft;
        if (placement === 'right') return styles.placeRight;
        return styles.placeCenter;
    };

    const getSize = () => {
        if (message.length > 120) return 220;
        if (message.length > 105) return 200;
        return 160;
    };

    //console.log('Note rendered with message: ', message, 'placement: ', getPlacementStyle());
    console.log('Note rendered with message: ', message, 'margin: ', margin);
    return (
        <div style={{ fontFamily: font, marginTop: margin + 'px' }} className={getPlacementStyle()}>
            <div style={{ width: getSize() + 'px' }} className={styles.container}>
                <Pin color={color}></Pin>
                <p className={styles.text}>{message}</p>
                <p className={styles.senderText}>{`- ` + sender}</p>
            </div>
        </div>
    );
}
