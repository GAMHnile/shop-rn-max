import React from 'react';
import { enableScreens } from 'react-native-screens';
//redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

import ShopNavigator from './navigation/ShopNavigator';


enableScreens();

export default function App() {
  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}


