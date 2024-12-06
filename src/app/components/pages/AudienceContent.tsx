import React from 'react';
import Header from './widgets/Header';
import UserManagement from '../../componentsuser/pages/AudienceWidgets/UserManagement';

const AudienceContent = () => (
  <div className="flex flex-col h-screen w-full  text-gray-200">
        <div className="flex items-center justify-between ">
      <h1 className="font-bold text-3xl font-sans">Audience</h1> {/* Updated Title */}
      <Header />
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
    <div className="h-screen w-full bg-gray-900 text-gray-200">
    <UserManagement />
  </div>
    </div>
  </div>
);

export default AudienceContent;
