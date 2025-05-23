import './globals.css';
import Head from './head';
import Link from './link';
import ClientLayoutLogic from '../components/ClientlayoutLogic';

export const metadata = {
    title: 'Moaka',
    description: 'Moaka is a portfolio website for an artist to showcase their work.',
};

export default function RootLayout({ children }) {
    //NEED TO CHANGE LATER
    const isAuthenticated = true;
    const unreadNotificationsCount = 5;

    return (
        <html lang="en">
            <head>
                {/*also CHANGE*/}
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

                {/* dark mode script --> runs immediately to prevent issues*/}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        if (localStorage.getItem('theme') === 'dark') {
                            document.documentElement.classList.add('dark-mode');
                        }
                        `,
                    }}
                />
            </head>

            <body>
                <ClientLayoutLogic isAuthenticated={isAuthenticated} unreadNotificationsCount={unreadNotificationsCount}>
                    {children}
                </ClientLayoutLogic>

            </body>
        </html>
    );
}