import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/home-screen/home-screen';
import DetailScreen from '../screen/detail-screen/detail-screen';
import BottomTabBarNavigator from './bottom-navigator';

const Stack = createNativeStackNavigator();


export default function Navigator() {
    return (
        <NavigationContainer onReady={SplashScreen.hide}>
            <Stack.Navigator initialRouteName="BottomTabBarNavigator">
                <Stack.Screen name="BottomTabBarNavigator" component={BottomTabBarNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}