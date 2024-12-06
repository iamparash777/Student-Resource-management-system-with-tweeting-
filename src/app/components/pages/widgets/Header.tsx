import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 13+ routing
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig'; // Import the already initialized auth

const HeaderWithTitle: React.FC = () => {
  const [chatAnchor, setChatAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenChat = (event: React.MouseEvent<HTMLElement>) => setChatAnchor(event.currentTarget);
  const handleCloseChat = () => setChatAnchor(null);

  const handleOpenNotif = (event: React.MouseEvent<HTMLElement>) => setNotifAnchor(event.currentTarget);
  const handleCloseNotif = () => setNotifAnchor(null);

  const handleOpenAvatar = (event: React.MouseEvent<HTMLElement>) => setAvatarAnchor(event.currentTarget);
  const handleCloseAvatar = () => setAvatarAnchor(null);

  // Log out function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to the home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Navigate to Profile Settings
  const handleProfileSettings = () => {
    router.push('/profileSettings'); // This should work if the file is in the pages directory
    handleCloseAvatar(); // Close the avatar menu
  };

  return (
    <div>
      {/* Title Component and Header in the Same Line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '5px' }}>
        <header
          style={{
            width: '100%',
            maxWidth: '250px',
            height: '88px',
            borderRadius: '17px',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(25, 25, 25)',
            color: 'white',
            padding: '10px 20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* Chat Button */}
            <IconButton style={{ minWidth: '40px', height: '40px', color: 'white' }} onClick={handleOpenChat}>
              <ChatBubbleOutlineIcon style={{ color: 'white', fontSize: '1.5rem' }} />
            </IconButton>
            <Menu
              anchorEl={chatAnchor}
              open={Boolean(chatAnchor)}
              onClose={handleCloseChat}
              PaperProps={{
                style: {
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  width: '300px',
                  borderRadius: '10px',
                  padding: '10px',
                },
              }}
            >
              <input placeholder="Search" style={{ width: '100%', marginBottom: '10px', padding: '5px', borderRadius: '5px', border: 'none' }} />
              {/* Example Chat Items */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <Avatar style={{ marginRight: '10px' }}>P</Avatar>
                <div>
                  <p style={{ margin: 0 }}>Prime Shakya</p>
                  <small>Okz · 3d</small>
                </div>
              </div>
            </Menu>

            {/* Notification Button */}
            <IconButton style={{ minWidth: '40px', height: '40px', color: 'white' }} onClick={handleOpenNotif}>
              <NotificationsNoneIcon style={{ color: 'white', fontSize: '1.5rem' }} />
            </IconButton>
            <Menu
              anchorEl={notifAnchor}
              open={Boolean(notifAnchor)}
              onClose={handleCloseNotif}
              PaperProps={{
                style: {
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  width: '300px',
                  borderRadius: '10px',
                  padding: '10px',
                },
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#2c2c2c', borderRadius: '5px', marginBottom: '5px' }}>
                <NotificationsNoneIcon style={{ marginRight: '10px' }} />
                <div>
                  <p style={{ margin: 0 }}>Notification message</p>
                  <small>2024/01/01</small>
                </div>
              </div>
            </Menu>

            {/* Avatar Button */}
            <IconButton style={{ minWidth: '40px', height: '40px', color: 'white' }} onClick={handleOpenAvatar}>
              <Avatar style={{ backgroundColor: 'gray', width: '40px', height: '40px' }} />
            </IconButton>
            <Menu
              anchorEl={avatarAnchor}
              open={Boolean(avatarAnchor)}
              onClose={handleCloseAvatar}
              PaperProps={{
                style: {
                  backgroundColor: '#1c1c1c',
                  color: 'white',
                  width: '200px',
                  borderRadius: '10px',
                },
              }}
            >
              <MenuItem onClick={handleProfileSettings}>
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ color: 'white' }} />
                </ListItemIcon>
                Profile settings
              </MenuItem>
              <Divider style={{ backgroundColor: 'gray' }} />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: 'white' }} />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>
          </div>
        </header>
      </div>
    </div>
  );
};

export default HeaderWithTitle;
