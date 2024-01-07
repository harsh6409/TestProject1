import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function MyBottom(props) {

    return (
        <View style={styles.mainHead}>
            <Text style={styles.heading}>${props.title}</Text>
            <Text style={styles.cartText}>View Cart  ( {props.itemcount} )</Text>
            <TouchableOpacity style={styles.buttonArrow}>
                <Image style={styles.imageSrc} source={require('../Assets/rightArrow.png')}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        mainHead: {
            backgroundColor: '#fcba03',
            height: 80,
            flexDirection: 'row',
            bottom: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        heading: {
            height: 20,
            width: 80,
            marginLeft: 25,
            marginTop: 15,
            fontSize: 16,
            fontWeight: '700',
            color: 'white',
        },
        imageSrc: {
            height: 20,
            width: 20,
            margin: 5,
            alignSelf: 'center',
            tintColor: 'white',
        },
        buttonArrow: {
            justifyContent: 'center',
            width: 50,
            position: 'absolute',
            right: 10,
            top: 10,
        },
        cartText: {
            position: 'absolute',
            right: 50,
            top: 15,
            height: 20,
            width: 150,
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'right',
            color: 'white',
        },
    }
);