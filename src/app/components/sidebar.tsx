'use client';

import { useState } from 'react';
import {
    FaHome,
    FaUser,
    FaFileAlt,
    FaCalendar,
    FaCloudUploadAlt,
    FaChartLine,
    FaNewspaper,
    FaQuestionCircle,
    FaMoon,
    FaSun,
    FaComments,
} from 'react-icons/fa';
import Image from 'next/image';

type SidebarProps = {
    onCollapseChange: (collapsed: boolean) => void;
    onPageSelect: (page: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
};

export default function Sidebar({ onCollapseChange, onPageSelect, isDarkMode, toggleDarkMode }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        const newCollapsedState = !isCollapsed;
        setIsCollapsed(newCollapsedState);
        onCollapseChange(newCollapsedState);
    };

    return (
        <div className="flex h-screen p-4">
            <div
                className={`relative ${
                    isCollapsed ? 'w-20' : 'w-64'
                } transition-all duration-300 p-5 flex flex-col rounded-[15px] ${
                    isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-400 text-black'
                }`}
            >
                <div className="mb-8">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mx-auto" />
                </div>
                <div className="flex flex-col gap-6">
                    <MenuItem icon={<FaHome />} label="Dashboard" isCollapsed={isCollapsed} onClick={() => onPageSelect('dashboard')} />
                    <MenuItem icon={<FaUser />} label="Audience" isCollapsed={isCollapsed} onClick={() => onPageSelect('audience')} />
                    <MenuItem icon={<FaFileAlt />} label="Posts" isCollapsed={isCollapsed} onClick={() => onPageSelect('posts')} />
                    <MenuItem icon={<FaCalendar />} label="Schedules" isCollapsed={isCollapsed} onClick={() => onPageSelect('schedules')} />
                    <MenuItem icon={<FaCloudUploadAlt />} label="Upload" isCollapsed={isCollapsed} onClick={() => onPageSelect('upload')} />
                    <MenuItem icon={<FaQuestionCircle />} label="Quiz" isCollapsed={isCollapsed} onClick={() => onPageSelect('quiz')} />
                </div>
                <div className="mt-auto mb-6" />
                <div
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'
                    }`}
                    onClick={toggleDarkMode}
                >
                    <span className="flex items-center gap-2">
                        <FaSun />
                        {!isCollapsed && <span>Light</span>}
                    </span>
                    <span className="flex items-center gap-2">
                        <FaMoon />
                        {!isCollapsed && <span>Dark</span>}
                    </span>
                </div>
                <button
                    onClick={toggleCollapse}
                    className="absolute top-5 -right-3 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center focus:outline-none"
                >
                    {isCollapsed ? '>' : '<'}
                </button>
            </div>
        </div>
    );
}

function MenuItem({ icon, label, isCollapsed, onClick }) {
    return (
        <div className="flex items-center gap-4 cursor-pointer p-2 hover:bg-gray-600 rounded-md" onClick={onClick}>
            <span className="text-lg">{icon}</span>
            {!isCollapsed && <span>{label}</span>}
        </div>
    );
}
