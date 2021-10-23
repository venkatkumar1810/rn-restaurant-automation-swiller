import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import SelectDropdown from 'react-native-select-dropdown'
// import Seats from '../components/Seats';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Foundation';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import FormButton from '../components/FormButton';

const TableBooking = () => {
    const [posts, setPosts] = useState([]);
    const [slots, setSlots] = useState('');
    const [table, settable] = useState('');
    const fetchData = async () => {
        try {
            const list = [];
            await firestore()
                .collection('tables')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Posts : ', querySnapshot.size);
                    querySnapshot.forEach(doc => {
                        const { isBooked1, isBooked2, isBooked3 } = doc.data();
                        list.push({
                            id: doc.id,
                            slot1: isBooked1,
                            slot2: isBooked2,
                            slot3: isBooked3,
                            selected1: "false",
                            selected2: "false",
                            selected3: "false",
                        })
                    })
                })
            setPosts(list);
            console.log(posts);
            // if(loading){
            //     setLoading(false);
            // }

        } catch (e) {
            console.log(e);
        }
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



    const [color1, setcolor1] = useState("#dee2ff");
    const [color2, setcolor2] = useState("#dee2ff");
    const [color3, setcolor3] = useState("#dee2ff");

    const handleSlot1 = () => {
        setSlots("slot1");
        setcolor1("#ff4d6d");
        setcolor2("#dee2ff");
        setcolor3("#dee2ff");
    }

    const handleSlot2 = () => {
        setSlots("slot2");
        setcolor2("#ff4d6d");
        setcolor1("#dee2ff");
        setcolor3("#dee2ff");
    }

    const handleSlot3 = () => {
        setSlots("slot3");
        setcolor3("#ff4d6d");
        setcolor1("#dee2ff");
        setcolor2("#dee2ff");
    }

    const extractNew = () => {
        console.log("EXTRACT!");
        // let temp = slots;
        // let tableN = table;
        // console.log("slot : ", temp, "table Num : ", tableN);
    }

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

    const handleColor = async (docid, slotg) => {
        console.log("Slot Given: ", slotg.slots);


        // const index = posts.findIndex(el => el.id === postId);
        let j = 1;
        if (slotg.slots == "slot1") {
            posts.forEach(post => {


                if (post.id == docid) {
                    if (post.slot1 == "false") {
                        if (post.selected1 == "false") {
                            post.selected1 = "true";
                            settable(j);
                            // setPosts(posts);
                            // setTrueColor("#dee2ff")
                        }
                    } else {
                        post.selected1 = "false";
                        // setPosts(posts);
                        // setTrueColor("#ff4d6d")
                    }
                } else {
                    post.selected1 = "false";
                    // setPosts(posts);
                    // setTrueColor("#dee2ff")
                }
                post.selected2 = "false";
                post.selected3 = "false";
                j++;
            })
            setPosts([...posts]);
        }
        else if (slotg.slots == "slot2") {
            posts.forEach(post => {
                if (post.id == docid) {
                    if (post.slot2 == "false") {
                        if (post.selected2 == "false") {
                            post.selected2 = "true";
                            settable(j);
                            // setPosts(posts);
                            // setTrueColor("#dee2ff")
                        }
                    } else {
                        post.selected2 = "false";
                        // setPosts(posts);
                        // setTrueColor("#ff4d6d")
                    }
                } else {
                    post.selected2 = "false";
                    // setPosts(posts);
                    // setTrueColor("#dee2ff")
                }
                post.selected1 = "false";
                post.selected3 = "false";
                j++;
            })
            setPosts([...posts]);
        }
        else if (slotg.slots == "slot3") {
            posts.forEach(post => {
                post.selected1 = "false";
                post.selected2 = "false";
                if (post.id == docid) {
                    if (post.slot3 == "false") {
                        if (post.selected3 == "false") {
                            post.selected3 = "true";
                            settable(j);
                            // settable(j);
                            // setPosts(posts);
                            // setTrueColor("#dee2ff")
                        }
                    } else {
                        post.selected3 = "false";
                        // setPosts(posts);
                        // setTrueColor("#ff4d6d")
                    }
                } else {
                    post.selected3 = "false";
                    // setPosts(posts);
                    // setTrueColor("#dee2ff")
                }
                j++;
            })
            setPosts([...posts]);

        }



        if (variable == "false") {
            variable = "true";
            notVariable = "false";
        } else {
            variable = "false";
            notVariable = "true";
        }

        console.log("POSTS : ", posts);
        // await firestore()
        //     .collection('tables')
        //     .get()
        //     .then((querySnapshot) => {
        //         console.log('Total Posts : ', querySnapshot.size);
        //         querySnapshot.forEach(doc => {
        //             const { isBooked1, isBooked2, isBooked3 } = doc.data();
        //             if (doc.id == docid) {
        //                 updateValue(docid, variable);
        //             } else {
        //                 updateValue(doc.id, notVariable);
        //             }

        //         })
        //     })
    }

    useEffect(() => {
        fetchData();

    }, []);



    // console.log(posts)
    let i = 1;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <View style={styles.slotContainer}>
                    <View style={styles.slot}>
                        <TouchableOpacity onPress={() => { handleSlot1() }}>
                            <Icon name="social-delicious" size={60} color={color1} backgroundColor={"#fff"} />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}> Slot: 1</Text>
                    </View>
                    <View style={styles.slot}>
                        <TouchableOpacity onPress={() => { handleSlot2() }}>
                            <Icon name="social-delicious" size={60} color={color2} backgroundColor={"#fff"} />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}> Slot: 2</Text>
                    </View>
                    <View style={styles.slot}>
                        <TouchableOpacity onPress={() => { handleSlot3() }}>
                            <Icon name="social-delicious" size={60} color={color3} backgroundColor={"#fff"} />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}> Slot: 3</Text>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    {posts.map((s) => {

                        return (
                            <View key={s.id} style={styles.table}>
                                {/* <Seats isSelected={s.selected1} onPress={() => handleColor(s.id)} /> */}
                                <View>
                                    <TouchableOpacity onPress={() => handleColor(s.id, { slots })}>
                                        {slots == "slot1" ? <Icon name="social-delicious" size={60} color={s.slot1 == "true" ? "#ccc" : (s.selected1 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot1 == "true" ? "#fff" : "#000"} />
                                            : slots == "slot2" ? <Icon name="social-delicious" size={60} color={s.slot2 == "true" ? "#ccc" : (s.selected2 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot2 == "true" ? "#fff" : "#000"} />
                                                : slots == "slot3" ? <Icon name="social-delicious" size={60} color={s.slot3 == "true" ? "#ccc" : (s.selected3 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot3 == "true" ? "#fff" : "#000"} />
                                                    : <View></View>}
                                        {slots == '' ? <View></View> : <Text style={{ color: "#fff" }}> Table:{i++} </Text>}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <TouchableOpacity onPress={() => extractNew()}>
                    <Text style={{ color: "#fff" }}> Slot: 3</Text>
                </TouchableOpacity>
                <FormButton
                    buttonTitle="Confirm & Pay!"
                    onPress={() => extractNew()}
                />
                {/* <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                /> */}

            </LinearGradient>
        </ScrollView>
    );
}

export default TableBooking;

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        // paddingTop: 10,
        flex: 1,
        // backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    tableBox: {
        // backgroundColor: { },
    },
    slot: {
        marginHorizontal: 15,
    },

    linearGradient: {
        // justifyContent: 'center',
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
        // flex: 1,
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        marginTop: 50,
    },
    slotContainer: {
        flexDirection: 'row',
        // flex: 1,
        flexWrap: 'wrap',
    },
    table: {
        marginHorizontal: 15,

    },
    tiletext: {
        flexDirection: 'column',
        flex: 1,
    },
    textCont: {
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: '#e0aaff',
        borderRadius: 20,
        // borderTopLeftRadius: 20,
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
        // alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: 'white',
        elevation: 50,

    },
})