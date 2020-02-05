import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButtons';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/ships';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props;
    const [isSunk, setIsSunk] = useState(false);
    const [isWW1Era, setIsWW1Era] = useState(false);

    const dispatch = useDispatch()

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            sunk: isSunk,
            ww1Era: isWW1Era
        }

        dispatch(setFilters(appliedFilters));
        props.navigation.navigate('ShipsFavs');
    }, [isSunk, isWW1Era, dispatch])

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available filters / Restrictions</Text>
            <FilterSwitch
                label='Only ships lost in battle'
                state={isSunk}
                onChange={newValue => setIsSunk(newValue)}
            />
            <FilterSwitch
                label='Took part in both WW1 and WW2'
                state={isWW1Era}
                onChange={newValue => setIsWW1Era(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter ships',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item title='Menu' iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item title='Save' iconName='ios-save'
                onPress={() => {
                    navData.navigation.getParam('save')();
                }} 
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;