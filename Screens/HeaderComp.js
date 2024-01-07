import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function MyHeader() {

    return (
        <View style={styles.mainHead}>
            <TouchableOpacity style={styles.buttonMenu}>
                <Image style={styles.imageSrc} source={require('../Assets/menu.png')}></Image>
            </TouchableOpacity>
            <Text style={[styles.heading]}>Shopping List</Text>
            <TouchableOpacity />
            <TouchableOpacity style={styles.buttonFilter}>
                <Image style={styles.imageSrc} source={require('../Assets/filter.png')}></Image>
                <Text style={styles.buttonTitle}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSearch}>
                <Image style={styles.imageSrc} source={require('../Assets/searchIcon.png')}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        mainHead: {
            backgroundColor: '#1dde70',
            height: 40,
            flexDirection: 'row',
        },
        imageSrc: {
            height: 20,
            width: 20,
            margin: 5,
            alignSelf: 'center',
            tintColor: 'white',
        },
        heading: {
            height: 20,
            width: 150,
            marginLeft: 15,
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'center',
            color: 'white',
        },
        buttonMenu: {
            justifyContent: 'center',
            width: 50,
        },
        buttonSearch: {
            justifyContent: 'center',
            width: 50,
            position: 'absolute',
            right: 0,
            top: 5,
        },
        buttonFilter: {
            position: 'absolute',
            justifyContent: 'center',
            width: 90,
            flexDirection: 'row',
            right: 50,
            top: 5,
        },
        buttonTitle: {
            height: 13,
            marginLeft: 2,
            fontSize: 13,
            fontWeight: '700',
            alignSelf: 'center',
            color: 'white',
        },
    }
);