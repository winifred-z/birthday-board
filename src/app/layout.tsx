import type { Metadata } from 'next';
import {
    Geist,
    Kalam,
    Comic_Relief,
    New_Rocker,
    Jersey_10,
    Dancing_Script,
} from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const kalam = Kalam({
    variable: '--font-kalam',
    subsets: ['latin'],
    weight: '400',
});

const comicRelief = Comic_Relief({
    variable: '--font-comic-relief',
    subsets: ['latin'],
    weight: '400',
});

const newRocker = New_Rocker({
    variable: '--font-new-rocker',
    subsets: ['latin'],
    weight: '400',
});

const jersey10 = Jersey_10({
    variable: '--font-jersey-10',
    subsets: ['latin'],
    weight: '400',
});

const dancingScript = Dancing_Script({
    variable: '--font-dancing-script',
    subsets: ['latin'],
    weight: '400',
});

export const metadata: Metadata = {
    title: "HAPPY 26TH BDAY MATTHEW!",
    description: "BDAY CARD 4 MATTHEW",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`
                ${geistSans.variable} 
                ${kalam.variable}
                ${comicRelief.variable}
                ${newRocker.variable}
                ${jersey10.variable}
                ${dancingScript.variable}
            `}
            >
                {children}
            </body>
        </html>
    );
}

/*
regular sans-serif (geist)
handwriting (kalam)
cursive (cerdarville)
comic sans (comic)
goth (rocker)
pixel (jersey
*/
