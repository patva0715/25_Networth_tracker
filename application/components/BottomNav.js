import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssetScreen from '../screens/AssetScreen';
import LiabilityScreen from '../screens/LiabilityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image, Text, View } from 'react-native';
import { Feather, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';
const Tab = createBottomTabNavigator();

// let curTheme.focusColor = '#da7'

const BottomNav = ({ changeTheme }) => {
    const curTheme = useContext(ThemeContext)
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    bottom: 20,
                    left: 20,
                    right: 20,
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderTopWidth: 0,
                    zIndex: 500,
                    maxWidth: 900,
                }
            }}
            initialRouteName='Home'
        >
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{ changeTheme: changeTheme }} options={{
                tabBarIcon: (({ focused }) =>
                (
                    <View style={{ alignItems: "center" }}>
                        {/* <Entypo name='list' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} /> */}
                        <MaterialIcons name="grid-view" size={30} color={focused ? curTheme.focusColor : curTheme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={[{ color: focused ? curTheme.focusColor : curTheme.text },
                        ]}>Net Worth</Text>
                    </View>

                ))
            }} />
            <Tab.Screen name="Assets" component={AssetScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <MaterialIcons name="attach-money" size={30} color={focused ? curTheme.focusColor : curTheme.text} style={{ width: 30, fontWeight: '600' }} />
                        {/* <Entypo name='wallet' size={30} color={curTheme.text} style={{ width: 30, fontWeight: '600' }} /> */}
                        <Text style={{ color: focused ? curTheme.focusColor : curTheme.text }}>Asset</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Liability" component={LiabilityScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <MaterialCommunityIcons name="bank-minus" size={30} color={focused ? curTheme.focusColor : curTheme.text} style={{ width: 30, fontWeight: '600' }} />
                        {/* <Entypo name='credit-card' size={30} color={curTheme.text} style={{ width: 30, fontWeight: '600' }} /> */}
                        <Text style={{ color: focused ? curTheme.focusColor : curTheme.text }}>Liability</Text>
                    </View>
                ))
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: (({ focused }) => (
                    <View style={{ alignItems: "center" }}>
                        <Entypo name="area-graph" size={30} color={focused ? curTheme.focusColor : curTheme.text} style={{ width: 30, fontWeight: '600' }} />
                        <Text style={{ color: focused ? curTheme.focusColor : curTheme.text }}>Projection</Text>
                    </View>
                ))
            }} />
        </Tab.Navigator>


    )
}

export default BottomNav