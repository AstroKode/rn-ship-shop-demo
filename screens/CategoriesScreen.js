import React from 'react';
import { FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES, classNameLookup } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/HeaderButtons';

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={classNameLookup(itemData.item.id)}
                color= {itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryShips', params: {
                            categoryId: itemData.item.id
                        }
                    });
                }} />
        );
    };

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem} numColumns={2}
        />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Ship classes',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CategoriesScreen;