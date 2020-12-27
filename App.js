import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

import AppContainer from './navigation/AppContainer';

enableScreens();

const fetchFonts = () => {

  return Font.loadAsync({
    "open-sans": require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading 
      startAsync={fetchFonts} 
      onFinish={()=>{setIsFontLoaded(true)}} 
      onError={(err)=>console.log(err)}
      />
    )
  }

  return (
    <Provider store={store} >
      <AppContainer />
    </Provider>
  );
}


