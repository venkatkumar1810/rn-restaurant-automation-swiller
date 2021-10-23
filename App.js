import React from 'react';
import Providers from './navigation';
import { StatusBar } from 'expo-status-bar';
import StaffList from './screens/StaffList';

const App = () => {
  return (
    <>
      <Providers />
      {/* <StaffList /> */}
      <StatusBar style="light" />
    </>
  );
}

export default App;
