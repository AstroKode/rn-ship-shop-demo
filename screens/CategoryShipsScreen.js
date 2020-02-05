import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES, classNameLookup } from '../data/dummy-data';
import ShipList from '../components/ShipList';
import DefaultText from '../components/DefaultText';

const CategoryShipsScreen = props => {
    const catId = props.navigation.getParam('categoryId');

    const availableShips = useSelector(state => state.ships.filteredShips);
    const displayedShips = availableShips.filter(
        ship => ship.categoryIds === catId
    );
    if (displayedShips.length === 0) {
        return (
            < View style={styles.content}>
                <DefaultText>No ships found, maybe check your filters?</DefaultText>
            </View >)
    }

    return (
        <ShipList listData={displayedShips} navigation={props.navigation} />
    );
};

CategoryShipsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    let shipClass = `${classNameLookup(selectedCategory.id)}s`;
    return {
        headerTitle: shipClass
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryShipsScreen;