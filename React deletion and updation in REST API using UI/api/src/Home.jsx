import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
// Import Insert, Update, Select & Delete Components
import Insert from './Insert';
import Update from './Update';
import Select from './Select';
import Delete from './Delete';
import Login from './Login';
import { Card } from '@mui/material';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Home(props) {
  const { window } = props;
  const router = useDemoRouter('/home');

  const [isLoggedout, setIsLoggedout] = useState(false);

  // State to track active component
  const [activeComponent, setActiveComponent] = useState(null);

  // Detect when user navigates in sidebar and update activeComponent
  useEffect(() => {
    if (router.pathname === '/insert') {
      setActiveComponent('insert');
    } else if (router.pathname === '/update') {
      setActiveComponent('update');
    } else if (router.pathname === '/select') {
      setActiveComponent('select');
    } else if (router.pathname === '/delete') {
      setActiveComponent('delete');
    } else if(router.pathname==='/logout'){
      setIsLoggedout(true);
    }
    else {
      setActiveComponent(null);
    }
  }, [router.pathname]);

  return (
 <>
 {isLoggedout?(
  <Login/>
):(
  <AppProvider
  navigation={[
    { segment: 'insert', title: 'Create New Visitor Entry', icon: <DescriptionIcon /> },
    { segment: 'update', title: 'Update Visitor Details', icon: <DescriptionIcon /> },
    { segment: 'select', title: 'See All Visitor Details', icon: <DescriptionIcon /> },
    { segment: 'delete', title: 'Delete Visitor Entry', icon: <DescriptionIcon /> },
    {
      segment: 'logout',
      title: 'Logout',
      icon: (
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: deepOrange[500] }} alt="User Avatar" src="/src/assets/chh.jpg"> 
             B 
          </Avatar>
        </Stack>
      ),
    },
  ]}

 
  router={router}
  theme={demoTheme}
  window={window !== undefined ? window() : undefined}
>
  <DashboardLayout sx={{ margin: 0, padding: 0, height: '100vh' }}>
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, scrollbarWidth: 'none',overflowY:'scroll' }}>
    {activeComponent === null && (
            <Typography variant="h3" color="orange">
              Welcome To Visitor Management Dashboard
            </Typography>
          )}

      <Box sx={{ mt: 4, width: '80%' }}>
        {activeComponent === 'insert' && <Insert />}
        {activeComponent === 'update' && <Update />}
        {activeComponent === 'select' && <Select />}
        {activeComponent === 'delete' && <Delete />}
        {activeComponent === 'logout' } 

      </Box>
    </Box>
  </DashboardLayout>
</AppProvider>
)
 


}
 
 </>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;

