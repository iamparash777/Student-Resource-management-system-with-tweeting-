'use client';

import Sidebar from '../components/sidebar';
import { useState, useEffect } from 'react';

// Import individual content components
import DashboardContent from '../components/pages/DashboardContent';
import AudienceContent from '../components/pages/AudienceContent';
import PostContent from '../components/pages/PostsContent';
import SchedulesContent from '../components/pages/SchedulesContent';
import UploadContent from '../components/pages/UploadContent';
import QuizContent from '../components/pages/QuizContent';

export default function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Track dark mode state
    const [activePage, setActivePage] = useState('dashboard'); // State to track the active page

    useEffect(() => {
        const handleResize = () => {
            // Logic to handle responsive design can be added here if needed
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'audience':
                return <AudienceContent />;
            case 'posts':
                return <PostContent />;
            case 'schedules':
                return <SchedulesContent />;
            case 'upload':
                return <UploadContent />;
            case 'quiz':
                return <QuizContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div
            className={`flex h-screen overflow-hidden transition-colors duration-300 ${
                isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
            }`}
        >
            <Sidebar
                onCollapseChange={setIsSidebarCollapsed}
                onPageSelect={setActivePage}
                isDarkMode={isDarkMode}
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
            <div
                className={`flex-1 transition-all duration-300 ${
                    isSidebarCollapsed ? 'flex justify-center items-center' : 'p-4 md:p-10 lg:p-16'
                }`}
            >
                {renderContent()}
            </div>
        </div>
    );
}
