import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InitalRouteProps, StackProps } from './types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { Platform, Text } from 'react-native';
import { COLORS } from '../themes/colors';

const { Navigator, Screen } = createNativeStackNavigator<StackProps>();

const Routes = () => {
    return (
        <Navigator screenOptions={{
            headerShown:false,
        }}>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Details" component={DetailsScreen} />
        </Navigator>
    );
}

const Stack = createNativeStackNavigator<InitalRouteProps>();

const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Tabs" component={MyTabs}/>
        </Stack.Navigator>
    )
}



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        screenOptions={{ 
            headerShown:false,
            tabBarStyle:{ 
                height:Platform.OS === 'android'? 60 : 90,
                alignItems:'center'
            },
            tabBarActiveTintColor:COLORS.primary,
        }}
        >
            <Tab.Screen 
                name="Home" 
                component={Routes} 
                options={{
                    tabBarIcon:({color})=> (
                        <Icon name="home" size={20} color={color} />
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={[
                            { marginBottom:8 }, 
                            { color: focused ? COLORS.primary : 'gray' }
                        ]}>
                            Home
                        </Text>
                    )
                }}
            />

            <Tab.Screen 
                name="Favorites" 
                component={FavoritesScreen}
                options={{
                    tabBarIcon:({color})=> (
                        <Icon name="heart" size={20} color={color}  />
                    ),
                    tabBarLabel: ({ focused }) =>(
                        <Text style={[
                            { marginBottom:8 }, 
                            { color: focused ? COLORS.primary : 'gray' }
                        ]}>
                            Favoritos
                        </Text>
                    )
                    
                }}    
                
            />
        </Tab.Navigator>  
  );
}

export default MyStack;