import React from 'react';
import { FlatList, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ShipSummary from './ShipSummary';
import { getNationInfo } from '../data/dummy-data';
import Colors from '../constants/Colors';
import * as cartActions from '../store/actions/cart';

const ShipList = props => {
    const dispatch = useDispatch();
    const favoriteShips = useSelector(state => state.ships.favoriteShips);

    const selectItemHandler = (id, title, isFav) => {
        props.navigation.navigate({
            routeName: 'ShipDetail', params: {
                shipTitle: title,
                shipId: id,
                isFav: isFav
            }
        })
    }

    const isFavorite = false;

    return (
        <FlatList
            data={props.listData}
            renderItem={itemData => (
                <ShipSummary
                    name={itemData.item.name}
                    year={itemData.item.year}
                    nationality={getNationInfo(itemData.item.nationality).fullName}
                    navyName={getNationInfo(itemData.item.nationality).navyName}
                    displacement={itemData.item.displacement}
                    destroyed={itemData.item.destroyed}
                    image={itemData.item.image}
                    onSelectShip={() => {
                        selectItemHandler(itemData.item.id, itemData.item.name, isFavorite)
                    }}
                >
                    <Button
                        color={Colors.primaryColor}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.name, isFavorite);
                        }}
                    />
                    <Button
                        color={Colors.primaryColor}
                        title="Add to Fleet"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ShipSummary>
            )}
        />
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});

export default ShipList;