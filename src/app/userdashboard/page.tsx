// src/app/dashboard/page.tsx
'use client';

import Sidebar from '../componentsuser/sidebar';
import { useState } from 'react';

// Import individual content components
import Home from '../componentsuser/pages/HomeContent';
import Library from '../componentsuser/pages/LibraryContent';
import PostContent from '../componentsuser/pages/HomeContent';
import ChatContent from '../components/pages/ChatContent';
import SchedulesContent from '../componentsuser/pages/SchedulesContent';
import NewsContent from '../componentsuser/pages/NewsContent';
import Bookmark from '../componentsuser/pages/Bookmark';
import UploadContent from '../componentsuser/pages/UploadContent';
import QuizContent from '../componentsuser/pages/QuizContent';


export default function Dashboard() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activePage, setActivePage] = useState('dashboard'); // State to track the active page

    const renderContent = () => {
        switch (activePage) {
            case 'home':
                return <Home />;
            case 'library':
                return <Library />;
            case 'posts':
                return <PostContent />;
                case 'chat':
                    return <ChatContent />;
            case 'schedules':
                return <SchedulesContent />;
            case 'news':
                return <NewsContent />;
            case 'bookmark':
                return <Bookmark />;
            case 'upload':
                return <UploadContent />;
            case 'quiz':
                return <QuizContent />;

            default:
                return <Home />;
        }
    };

    return (
        <div className="flex h-screen bg-black">
            <Sidebar onCollapseChange={setIsSidebarCollapsed} onPageSelect={setActivePage} />
            <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'flex justify-center items-center' : 'p-10'}`}>
                {renderContent()}
            </div>
        </div>
    );
}
