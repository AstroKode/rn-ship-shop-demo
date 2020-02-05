import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ImageBackground, Platform } from 'react-native'

import DefaultText from '../components/DefaultText';
import Card from './Card'
import Colors from '../constants/Colors';

const ShipItem = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelectShip}>
                    <View>
                        <View style={{ ...styles.shipInfoRow, ...styles.shipHeader }}>
                            <ImageBackground source={props.image} style={styles.bgImage}>
                                <View style={styles.titleContainer}>
                                    <DefaultText style={styles.titleTxt} numberOfLines={1}>{props.name}</DefaultText>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.details}>
                            <View style={{ ...styles.shipInfoRow, ...styles.shipDetail }}>
                                <DefaultText style={styles.dataText}>Built in {props.nationality} for the {props.navyName}</DefaultText>
                            </View>
                            <View style={{ ...styles.shipInfoRow, ...styles.shipDetail }}>
                                <DefaultText style={styles.dataText}>Displacement of {props.displacement} tonnes</DefaultText>
                            </View>
                            <View style={{ ...styles.shipInfoRow, ...styles.shipDetail }}>
                                <DefaultText style={styles.dataText}>Entered service in {props.year}</DefaultText>
                                {props.destroyed && <DefaultText style={styles.dataText}>Sunk in {props.destroyed}</DefaultText>}
                            </View>
                            <Button
                                color={Colors.primaryColor}
                                title="To Cart"
                                onPress={() => {
                                    console.log('Press')
                                }}
                            />
                            {/* <View style={styles.actions}>
                                {props.children}
                            </View> */}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    // shipItem: {
    //     height: 250,
    //     width: '100%',
    //     backgroundColor: '#ccc',
    //     borderRadius: 10,
    //     overflow: 'hidden',
    //     marginVertical: 10,
    //     // flex: 1,
    //     // justifyContent: 'center',
    //     // alignItems: 'center'
    // },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        width: '100%',
    },
    titleTxt: {
        fontFamily: 'open-sans-bold',
        fontSize: 19,
        color: 'white',
        width: '100%',
        textAlign: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start'
    },
    shipInfoRow: {
        flexDirection: 'row'
    },
    shipHeader: {
        height: '60%',
    },
    details: {
        textAlign: 'left',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        padding: 10
    },
    shipDetail: {
        //height: '7.5%',
        width: '100%',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dataText: {
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: '17.5%',
        paddingHorizontal: 20
    }
});
export default ShipItem;