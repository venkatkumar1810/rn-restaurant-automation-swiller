import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import SelectDropdown from 'react-native-select-dropdown'
// import Seats from '../components/Seats';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Foundation';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import FormButton from '../components/FormButton';

const TableBooking = () => {
    const [posts, setPosts] = useState([
        {
            sno: 0,
            selected: "false",
            isBooked: "false",
        },
        {
            sno: 1,
            selected: "false",
            isBooked: "false",
        },
        {
            sno: 2,
            selected: "false",
            isBooked: "false",
        }
    ]);
    const [slots, setSlots] = useState([
        {
            sno: 0,
            selected: "false",
            isBooked: "false",
        },
        {
            sno: 1,
            selected: "false",
            isBooked: "false",
        },
        {
            sno: 2,
            selected: "false",
            isBooked: "false",
        }
    ]);


    const handleSlot = (docid) => {
        console.log("Handle SLot : ", slots[docid], docid)
        slots.forEach(slot => {
            if (slot.sno == docid) {
                if (slot.isBooked == "false") {
                    if (slot.selected == "false") {
                        slot.selected = "true";
                    }
                    else {
                        slot.selected = "false";
                    }
                } else {
                    slot.selected = "false";
                }
            } else {
                slot.selected = "false";
            }
        });
        setSlots([...slots]);
    }

    const handleTable = (docid) => {
        posts.forEach(post => {
            if (post.sno == docid) {
                if (post.isBooked == "false") {
                    if (post.selected == "false") {
                        post.selected = "true";
                    }
                    else {
                        post.selected = "false";
                    }
                } else {
                    post.selected = "false";
                }
            } else {
                post.selected = "false";
            }
        })
        setPosts([...posts]);
    }


    const updateValue = async (docid, variable) => {
        await firestore()
            .collection('tables')
            .doc(docid)
            .update({
                isBooked1: variable,
            })
            .then(() => {
                console.log(variable);
            });
    }

    const [tableBooking, settableBooking] = useState([]);
    const fetchData = async () => {
        try {
            const list = [];
            await firestore()
                .collection('tableBooking')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Posts : ', querySnapshot.size);
                    querySnapshot.forEach(doc => {
                        const { tableNumber, slotNumber } = doc.data();
                        list.push({
                            sno: doc.id,
                            tableNumber: tableNumber,
                            slotNumber: slotNumber,
                        })
                    })
                })
            settableBooking(list);
            // console.log(tableBooking);

        } catch (e) {
            console.log(e);
        }
    }

    const handleChanges = () => {
        console.log("handle Change: ");
        tableBooking.forEach(book => {
            slots.forEach(slot => {
                if (book.slotNumber == slot.sno) {
                    posts.forEach(table => {
                        if (book.tableNumber == table.sno) {
                            table.isBooked = "true";
                            setPosts(posts);
                            console.log("posts: ", posts);
                        }
                    })
                }
            })
        })
    }

    useEffect(() => {
        fetchData();
        handleChanges();
    }, []);

    // console.log(posts)
    // console.log(slots)
    let i = 1;
    let j = 1;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <View style={styles.tableContainer}>
                    {slots.map((s) => {
                        return (
                            <View key={s.sno} style={styles.table}>
                                <View>
                                    <TouchableOpacity onPress={() => handleSlot(s.sno)}>
                                        <Icon name="social-delicious" size={60} color={s.selected == "true" ? "#ff4d6d" : "#dee2ff"} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#fff" }}> Slot:{j++} </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.tableContainer}>
                    {posts.map((s) => {
                        return (
                            <View key={s.sno} style={styles.table}>
                                <View>
                                    <TouchableOpacity onPress={() => handleTable(s.sno)}>
                                        <Icon name="social-delicious" size={60} color={s.isBooked == "true" ? "#eee" : (s.selected == "true" ? "#ff4d6d" : "#dee2ff")} />
                                    </TouchableOpacity>
                                    <Text style={{ color: "#fff" }}> Table:{i++} </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <FormButton
                    buttonTitle="Check Availability"

                />
            </LinearGradient>
        </ScrollView>
    );
}

export default TableBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tableBox: {
        // backgroundColor: { },
    },

    linearGradient: {
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 30,
        paddingTop: 25,
        marginBottom: 0,
    },
    cardContainer: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
    },
    cardsContainer: {
        width: '100%',
    },
    tableContainer: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    table: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,

    },
    tiletext: {
        flexDirection: 'column',
        flex: 1,
    },
    textCont: {
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        paddingVertical: 35,
        paddingHorizontal: 25,
    },
    text: {
        fontSize: 38,
        marginBottom: 15,
        color: "#051d5f",
    },
    btn: {
        borderRadius: 25,
        backgroundColor: '#c9184a',
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: 'white',
        elevation: 50,

    },
})