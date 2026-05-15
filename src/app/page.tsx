import styles from './page.module.css';
import Note from '../components/Note/Note';
import Picture from '../components/Picture/Picture';
import BoardInteraction from '@/components/BoardInteraction/BoardInteraction';
import { getNotes } from '@/lib/retrieveNotes';
import { getPictures } from '@/lib/retrievePictures';
import TitleNote from '@/components/TitleNote/TitleNote';

export const dynamic = 'force-dynamic';

type NoteData = {
    kind: 'note';
    color: string;
    font: string;
    message: string;
    sender: string;
    margin: number;
};

type PictureData = {
    kind: 'picture';
    image: string;
    sender: string;
    margin: number;
};

type BoardItem = NoteData | PictureData;

export default async function Home() {
    const [notes, pictures] = await Promise.all([getNotes(), getPictures()]);
    const boardItems: BoardItem[] = [...notes, ...pictures].sort((a, b) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return aTime - bTime;
    });
    if (boardItems.length > 0) {
        boardItems[0].margin = 0;
    }

    return (
        <div>
            <p className={styles.signature}>
                Happy Birthday Matthew!
            </p>
            <BoardInteraction></BoardInteraction>
            <div className={styles.page}>
                <TitleNote></TitleNote>
                <div>
                    {boardItems.map((item, index) => {
                        if (item.kind === 'picture') {
                            return (
                                <Picture
                                    key={index}
                                    image={item.image}
                                    sender={item.sender}
                                    placement={
                                        index % 3 == 0
                                            ? 'center'
                                            : index % 2 == 0
                                              ? 'left'
                                              : 'right'
                                    }
                                    margin={item.margin}
                                />
                            );
                        } else if (item.kind === 'note') {
                            return (
                                <Note
                                    key={index}
                                    color={item.color}
                                    font={item.font}
                                    message={item.message}
                                    sender={item.sender}
                                    placement={
                                        index % 3 == 0
                                            ? 'center'
                                            : index % 2 == 0
                                              ? 'left'
                                              : 'right'
                                    }
                                    margin={item.margin}
                                ></Note>
                            );
                        }
                    })}
                </div>
            </div>
            <p className={styles.signature}>
                code by James (thanks!) :)
            </p>
        </div>
    );
}
