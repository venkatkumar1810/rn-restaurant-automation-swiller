// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import { StatusBar } from 'expo-status-bar';
// const Stack = createStackNavigator();

// const AppStack = () => {
//     return (
//         <>
//             <Stack.Navigator>
//                 <Stack.Screen name="Home" options={{ header: () => null }} component={HomeScreen} />
//             </Stack.Navigator>
//             <StatusBar style="auto" />
//         </>
//     );
// }

// export default AppStack;


import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import StaffList from '../screens/StaffList';
import AddCard from '../screens/AddCards';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Staff Details"
            component={StaffList}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#dee2ff',

                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 24,
                },
                headerStyle: {
                    backgroundColor: '#10002b',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                        <FontAwesome5.Button
                            name="plus"
                            size={22}
                            backgroundColor="#10002b"
                            color="#dee2ff"
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="AddPost"
            component={AddCard}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="HomeProfile"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);

const MessageStack = ({ navigation }) => (
    <Stack.Navigator>
        {/* <Stack.Screen name="Message" component={MessagesScreen} /> */}
        <Stack.Screen
            name="Chat"
            component={ChatScreen}
            // options={({ route }) => ({
            //     title: route.params.userName,
            //     headerBackTitleVisible: false,
            //     headerShown: false,
            // })}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profilee"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        />
    </Stack.Navigator>
);

const AppStack = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBarOptions={{
                activeTintColor: '#dee2ff',
                activeBackgroundColor: '#240046',
                inactiveBackgroundColor: '#240046',
                style : [
                    {
                        display: 'flex',
                    },
                    null
                ]
            }}>
            <Tab.Screen
                name="Home"
                component={FeedStack}

                options={({ route }) => ({
                    tabBarLabel: 'Home',

                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Menu"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    // Or Hide tabbar when push!
                    // https://github.com/react-navigation/react-navigation/issues/7677
                    // tabBarVisible: route.state && route.state.index === 0,
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="md-menu-sharp"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AppStack;
