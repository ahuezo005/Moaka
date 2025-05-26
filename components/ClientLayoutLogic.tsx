"use client";

import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface ClientLayoutLogicProps {
  children: ReactNode;
  isAuthenticated: boolean;
  unreadNotificationsCount: number;
}

export default function ClientLayoutLogic({ children, isAuthenticated, unreadNotificationsCount}: ClientLayoutLogicProps) {
    const router = useRouter();
    const currentPath = usePathname();
    const [sidebarCollpased, setSidebarCollapsed] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const storedSidebarState = localStorage.getItem('sidebarState');
        if (storedSidebarState === 'collapsed') {
            setSidebarCollapsed(true);
            document.body.classList.add('sidebar-collapsed');
        }
        else{
            setSidebarCollapsed(false);
            document.body.classList.remove('sidebar-collapsed');
        }

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
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
    };

    const toggleDarkMode = () => {
        const darkModeState = !darkMode;
        setDarkMode(darkModeState);
        document.documentElement.classList.toggle('dark-mode', darkModeState);
        localStorage.setItem('theme', darkModeState ? 'dark' : 'light');
    };

    return (
        <>
            <button id="sidebarToggleBtn" className="sidebar-toggle-btn" aria-label="Toggle sidebar" onClick={toggleSidebar}>
                <span></span><span></span><span></span>
            </button>

        {isAuthenticated && (
            <div className="notification-bell-wrapper">
                  <Link href="/notifications">
                      <span className="notification-bell">
                          🔔
                          {unreadNotificationsCount > 0 && (
                              <span className="notification-count">{unreadNotificationsCount}</span>
                          )}
                        </span>
                  </Link>
            </div>
        )}

        <aside className="sidebar">
            <div className="sidebar-header">
                <Link href={isAuthenticated ? "/home" : "/login"}>
                    <span className="sidebar-brand" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <img src="/assets/Bobcat_board_logo_Small.png" alt="Bobcat Board" style={{ maxWidth: '100px', height: 'auto' }} />
                    </span>
                </Link>
            </div>

            <ul className="sidebar-nav">
                {isAuthenticated ? (
                    <>
                        <li><Link href="/home" className={currentPath === '/home' ? 'active' : ''}>Home</Link></li>
                        <li><Link href="/topics" className={currentPath && currentPath.startsWith('/topics') ? 'active' : ''}>Topics</Link></li>
                        <li><Link href="/my-profile" className={currentPath === '/my-profile' ? 'active' : ''}>My Profile</Link></li>
                        <li><Link href="/logout">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link href="/login" className={currentPath === '/login' ? 'active' : ''}>Login</Link></li>
                        <li><Link href="/register" className={currentPath === '/register' ? 'active' : ''}>Register</Link></li>
                    </>
                )}
            </ul>
            <div className="sidebar-footer">
                <button id="darkModeToggleBtn" className="dark-mode-toggle-btn" onClick={toggleDarkMode}>
                    {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
                </button>
            </div>
        </aside>

        <main className={'main-content ${sidebarCollpased ? "sidebar-collapsed" : ""}'}>
            <div className="main-header">
                {children}
            </div>
        </main>
    </>
    );
}