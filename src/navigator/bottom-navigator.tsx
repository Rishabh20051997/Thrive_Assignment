import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import HomeScreen from '../screen/home-screen/home-screen';
import PinListScreen from '../screen/pinlist-screen/pinlist-screen';



const BottomTab = createBottomTabNavigator<any>();
const BottomTabBarNavigator = (props : LooseObject) => {
  return (
        <BottomTab.Navigator
          screenOptions={() => ({
            headerShown: true,
            headerStatusBarHeight: 0,
          })}>
            <BottomTab.Screen
              key={'Home'}
              name={'Home'}         
              component={HomeScreen}
            />
             <BottomTab.Screen
              key={'PinList'}
              name={'PinList'}         
              component={PinListScreen}
            />
        </BottomTab.Navigator>
  );
};

export default BottomTabBarNavigator;
