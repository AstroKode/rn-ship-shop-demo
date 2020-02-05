import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { classNameLookup, getNationInfo } from '../data/dummy-data';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/HeaderButtons';
import DefaultText from '../components/DefaultText';
import * as shipsActions from '../store/actions/ships'
import * as cartActions from '../store/actions/cart';

const attribNames = ['Displacement:', 'Top speed:', 'Gun caliber:', 'Max. armor:', 'Engine power:'];

const ListItem = props => {
    return <DefaultText style={props.style}>{props.children}</DefaultText>
}

const ShipDetailsScreen = props => {
    const availableShips = useSelector(state => state.ships.ships);
    const shipId = props.navigation.getParam('shipId');
    const currentShipIsFavorite = useSelector(state => state.ships.favoriteShips.some(ship => ship.id === shipId));
    const ship = availableShips.find(ship => ship.id === shipId);
    const dispatch = useDispatch();

    // TODO
    // const submitHandler = useCallback(() => {
    //     dispatch(
    //         shipsActions.createProduct({

    //         }
    //         )
    //       );
    //     props.navigation.goBack();
    //   }, []);

    //   useEffect(() => {
    //     props.navigation.setParams({ submit: submitHandler });
    //   }, [submitHandler]);

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(shipsActions.toggleFavorite(shipId));
    }, [dispatch, shipId]) // Redux ensures dispatch never changes

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: currentShipIsFavorite })
    }, [currentShipIsFavorite])

    const attribVals = [
        `${ship.speed} knots (${ship.getSpeedKMH().toFixed(0)} km/h)`,
        `${ship.displacement} tonnes`, `${ship.gunCaliber} mm (${ship.getCaliberInches()} inch)`,
        `${ship.beltArmor} mm (${ship.getArmorInches()} inch)`, `${ship.power} hp (${ship.getPowerMW()} MW)`
    ];

    return (
        <ScrollView>
            {/* <Image source={{uri: ship.imageUlr}} style={styles.image} /> */}
            <Image source={ship.image} style={styles.image} />
            <Button
                color={Colors.primaryColor}
                title="Add to Fleet"
                onPress={() => {
                    dispatch(cartActions.addToCart(ship));
                }}
            />
            <View style={styles.detailsSection}>
                <DefaultText style={styles.sectionTitle}>History of {ship.name}</DefaultText>
                <DefaultText>{classNameLookup(ship.categoryIds)} built by {getNationInfo(ship.nationality).fullName}.</DefaultText>
                <DefaultText>Entered service in the {getNationInfo(ship.nationality).navyName} in {ship.year}.</DefaultText>
                {ship.destroyed && <DefaultText>Destroyed in battle in {ship.destroyed}.</DefaultText>}
            </View>
            <View style={styles.detailsSection}>
                <DefaultText style={styles.sectionTitle}>Characteristics</DefaultText>
                <View style={styles.containerHorizontal}>
                    <View>
                        {attribNames.map(attrib => (
                            <ListItem key={attrib}>{attrib}</ListItem>
                        ))}
                    </View>
                    <View style={styles.dataCol}>
                        {attribVals.map(attrib => (
                            <ListItem key={attrib} style={styles.dataText}>{attrib}</ListItem>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.detailsSection}>
                <DefaultText style={styles.sectionTitle}>Description</DefaultText>
                <DefaultText>{ship.description}</DefaultText>
            </View>
        </ScrollView>
    );
};

ShipDetailsScreen.navigationOptions = (navigationData) => {
    const shipTitle = navigationData.navigation.getParam('shipTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: shipTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName={isFavorite ? "ios-star" : 'ios-star-outline'}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 200,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
      },
    detailsSection: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-around',

    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 19,
    },
    containerHorizontal: {
        flexDirection: 'row',
    },
    dataCol: {
        marginLeft: 5,
    },
    dataText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
});

export default ShipDetailsScreen;