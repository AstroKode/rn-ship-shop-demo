import React from 'react';
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import{ HeaderButtons, Item } from 'react-navigation-header-buttons';

import ShipList from '../components/ShipList';
import CustomHeaderButton from '../components/HeaderButtons';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {
    const favShips = useSelector(state => state.ships.favoriteShips)
    if (favShips.length === 0 || !favShips) {
        return <View style={styles.content}><DefaultText>No favorite ships found.</DefaultText></View>
    }
    return <ShipList listData={favShips} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favorite ships',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;