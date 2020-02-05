import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryShipsScreen from '../screens/CategoryShipsScreen';
import ShipDetailsScreen from '../screens/ShipDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import CartScreen from '../screens/CartScreen'
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    //title: 'A Screen',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: { // IOS only
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    //headerTitleStyle: {fontWeight: 'bold'},
}

const ShipsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            // navigationOptions: {
            //     headerTitle: 'Ship Details',
            //     headerStyle: {
            //         backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            //     },
            //     headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
            // }
        },
        CategoryShips: {
            screen: CategoryShipsScreen,
        },
        ShipDetail: {
            screen: ShipDetailsScreen,
        },
        Cart: CartScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        //initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
    
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        ShipDetail: ShipDetailsScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const tabsScreenConfig = {
    Ships: {
        screen: ShipsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <FontAwesome name='ship' size={22} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Ships</Text> : 'Ships'
        }
    },
    Fovorites: {
        screen: FavNavigator,
        navigationOptions: {
            //tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            }, // tabBarColor only works with shifting
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites'
        }
    }
}

const ShipsFavTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(
            tabsScreenConfig,
            {
                activeTintColor: 'white',
                shifting: true
                // shifting: false,
                // barStyle: {
                //     backgroundColor: Colors.primaryColor
                // }
            })
        : createBottomTabNavigator(
            tabsScreenConfig,
            {
                tabBarOptions: {
                    labelStyle: {
                        fontFamily: 'open-sans'
                    },
                    activeTintColor: Colors.accentColor
                }
            }
        );

// Enable header in Favorites screen
const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        // navigationOptions: {
        //     drawerLabel: 'Filters'
        // },
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const MainNavigator = createDrawerNavigator(
    {
        ShipsFavs: {
            screen: ShipsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Ships'
            }
        },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
)

export default createAppContainer(MainNavigator);