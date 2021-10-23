import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation';

const Seats = ({ isSelected, ...rest }) => {

    let trueColor = "#dee2ff";
    if (isSelected == "false") {
        trueColor = "#dee2ff";
    } else {
        trueColor = "#ff4d6d";
    }

    return (
        <TouchableOpacity {...rest}>
            <Icon name="social-delicious" size={60} color={trueColor} />
        </TouchableOpacity>
    )
}

export default Seats;

const styles = StyleSheet.create({

})
