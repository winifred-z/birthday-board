import styles from './Picture.module.css';
import Pin from '../Pin/Pin';

type PictureProps = {
    image: string;
    sender: string;
    placement: string;
    margin: number;
};

export default function Picture({ image, sender, placement, margin }: PictureProps) {
    const getPlacementStyle = () => {
        if (placement === 'left') return styles.placeLeft;
        if (placement === 'right') return styles.placeRight;
        return styles.placeCenter;
    };

    return (
        <div style={{ marginTop: margin + 'px' }} className={getPlacementStyle()}>
            <div style={{ marginTop: margin + 'px' }} className={styles.container}>
                <Pin color={'#d12c3c'}></Pin>
                <img src={image} className={styles.image}></img>
            </div>
        </div>
    );
}
