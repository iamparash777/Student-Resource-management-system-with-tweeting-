    // src/app/components/sidebar.tsx
    'use client';

    import { useState } from 'react';
    import { FaHome, FaCloudUploadAlt, FaChartLine, FaNewspaper, FaQuestionCircle, FaCog, FaComments, FaMoon, FaSun } from 'react-icons/fa';
    import { FaHome as FaHomeOutlined, FaCloudUploadAlt as FaCloudUploadAltOutlined, FaChartLine as FaChartLineOutlined, FaNewspaper as FaNewspaperOutlined, FaQuestionCircle as FaQuestionCircleOutlined, FaCog as FaCogOutlined } from 'react-icons/fa';
    import Image from 'next/image';

    type SidebarProps = {
        onCollapseChange: (collapsed: boolean) => void;
        onPageSelect: (page: string) => void;
    };

    export default function Sidebar({ onCollapseChange, onPageSelect }: SidebarProps) {
        const [isCollapsed, setIsCollapsed] = useState(false);
        const [isDarkMode, setIsDarkMode] = useState(true);

        const toggleCollapse = () => {
            const newCollapsedState = !isCollapsed;
            setIsCollapsed(newCollapsedState);
            onCollapseChange(newCollapsedState);
        };

        const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

        return (
            <div className="flex h-screen p-4">
                <div className={`relative ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 p-5 flex flex-col rounded-[15px] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                    <div className="mb-8">
                        <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mx-auto" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <MenuItem 
                            icon={isDarkMode ? <FaHomeOutlined /> : <FaHome />} 
                            outlinedIcon={<FaHomeOutlined />} 
                            label="Home" 
                            isCollapsed={isCollapsed}  
                            isDarkMode={isDarkMode}
                            onClick={() => onPageSelect('posts')} 
                        />
                        <MenuItem 
                            icon={isDarkMode ? <FaHomeOutlined /> : <FaHome />} 
                            outlinedIcon={<FaHomeOutlined />} 
                            label="Library" 
                            isCollapsed={isCollapsed}  
                            isDarkMode={isDarkMode}
                            onClick={() => onPageSelect('library')} 
                        />
                        <MenuItem 
                            icon={isDarkMode ? <FaCloudUploadAltOutlined /> : <FaCloudUploadAlt />} 
                            outlinedIcon={<FaCloudUploadAltOutlined />} 
                            label="Event" 
                            isCollapsed={isCollapsed} 
                            isDarkMode={isDarkMode}
                            onClick={() => onPageSelect('upload')} 
                        />
                       
                        <MenuItem 
                            icon={isDarkMode ? <FaChartLineOutlined /> : <FaChartLine />} 
                            outlinedIcon={<FaChartLineOutlined />} 
                            label="Bookmark" 
                            isCollapsed={isCollapsed}  
                            isDarkMode={isDarkMode}
                            onClick={() => onPageSelect('bookmark')} 
                        />
           
                        <MenuItem 
                            icon={isDarkMode ? <FaQuestionCircleOutlined /> : <FaQuestionCircle />} 
                            outlinedIcon={<FaQuestionCircleOutlined />} 
                            label="Quiz" 
                            isCollapsed={isCollapsed}  
                            isDarkMode={isDarkMode}
                            onClick={() => onPageSelect('quiz')} 
                        />
                        
                    </div>
                    <div className="mt-auto mb-6">
                       
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 cursor-pointer" onClick={toggleDarkMode}>
                        <span className="flex items-center gap-2">
                            <FaSun />
                            {!isCollapsed && <span>Light</span>}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaMoon />
                            {!isCollapsed && <span>Dark</span>}
                        </span>
                    </div>
                    <button onClick={toggleCollapse} className="absolute top-5 -right-3 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center focus:outline-none">
                        {isCollapsed ? '>' : '<'}
                    </button>
                </div>
            </div>
        );
    }

    type MenuItemProps = {
        icon: JSX.Element;
        outlinedIcon: JSX.Element;
        label: string;
        isCollapsed: boolean;
        isDarkMode: boolean;
        onClick: () => void;
    };

    function MenuItem({ icon, outlinedIcon, label, isCollapsed, isDarkMode, onClick }: MenuItemProps) {
        return (
            <div className="flex items-center gap-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md" onClick={onClick}>
                <span className="text-lg">{isDarkMode ? outlinedIcon : icon}</span>
                {!isCollapsed && <span>{label}</span>}
            </div>
        );
    }
