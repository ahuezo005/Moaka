import Head from 'next/head';
import Link from 'nexet/link';
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react';
import '../app/globals.css';

export default function Layout({children, title = 'portfolio'}) {
    const router = useRouter();
    const [sidebarCollpased, setSidebarCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect( () => {
        const storedSidebarState = localStorage.getItem('sidebarState');
        if (storedSidebarState === 'collapsed') {
            setSidebarCollapsed(true);
            document.body.classList.add('sidebar-collapsed');
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark-mode');
            setDarkMode(true);
        }
        else{
            document.documentElement.classList.remove('dark-mode');
            setDarkMode(false);
        }
    }, []);


    const toggleSidebar = () => {
        const collapsedState = !sidebarCollpased;
        setSidebarCollapsed(collapsedState);
        document.body.classList.toggle('sidebar-collapsed', collapsedState);
        localStorage.setItem('sidebarState', collapsedState ? 'collapsed' : 'expanded');
    }

    const toggleDarkMode = () => {
        const darkModeState = !darkMode;
        setDarkMode(darkModeState);
        document.documentElement.classList.toggle('dark-mode', darkModeState);
        localStorage.setItem('theme', darkModeState ? 'dark' : 'light');
    }

    //testing
    const isAuthenticated = true;
    const unreadNotification = 6;
    //testing

    return (
        <>
            <Head>
                <title>{Moaka}</title>
                <meta charSet={'utf-8'} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                {/*CHANGE LATER  --> Icon and Font*/}
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            {/*ui buttons*/}
            <button id="sidebarButton" className="sidebar-toggle-btn" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
                <span></span><span></span><span></span>
            </button>

            {isAuthenticated && (
                <div className="notification-bell-wrapper">
                    <Link href="/notifications" legacyBehavior>
                        <a className="notification-bell">
                            🔔
                            {unreadNotification > 0 && <span className="notification-count">{unreadNotification}</span>}
                        </a>
                    </Link>
                </div>
            )
            }

            {/*Sidebar*/}
            <aside className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed-visual-state' : ''}`}>
                <div className="sidebar-header">
                    <Link href={isAuthenticated ? "/home" : "/login"} legacyBehavior>
                        <a className="sidebar-brand" style={{ display: 'flex',justifyContent: 'center' , alignItems: 'center' }}>
                            <img src="/logo.svg" alt="Moaka"  style={{ maxWidth: '100px', maxHeight: 'auto' }}/>
                        </a>
                    </Link>
                </div>

                <ul className="sidebar-menu">
                    {isAuthenticated ? (
                        <>
                            <li className="sidebar-menu-item">
                                <Link href="/home" legacyBehavior>
                                    <a className={router.pathname === '/home' ? 'active' : ''}>Home</a>
                                </Link>
                            </li>
                            <li className="sidebar-menu-item">
                                <Link href="/profile" legacyBehavior>
                                    <a className={router.pathname === '/profile' ? 'active' : ''}>Profile</a>
                                </Link>
                            </li>
                            <li className="sidebar-menu-item">
                                <Link href="/settings" legacyBehavior>
                                    <a className={router.pathname === '/settings' ? 'active' : ''}>Settings</a>
                                </Link>
                            </li>
                            <li className="sidebar-menu-item">
                                {/* Logout link - actual logout logic will need to be implemented */}
                                <Link href="/logout" legacyBehavior><a>Logout</a></Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="sidebar-menu-item">
                                <Link href="/login" legacyBehavior>
                                    <a className={router.pathname === '/login' ? 'active' : ''}>Login</a>
                                </Link>
                            </li>
                            <li className="sidebar-menu-item">
                                <Link href="/register" legacyBehavior>
                                    <a className={router.pathname === '/register' ? 'active' : ''}>Register</a>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <div className="sidebar-footer">
                    <button id = "darkModeButton" className="sidebar-dark-mode-toggle-btn" aria-label="Toggle Dark Mode" onClick={toggleDarkMode}>
                        {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <main className="main">
                <div className="main-header">
                    {children}
                </div>
            </main>
        </>
    );
}
