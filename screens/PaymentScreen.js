import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    Alert,
    Button,
} from "react-native";

import FormButton from "../components/FormButton";
import Cards from "../components/Cards";
import AddCards from "./AddCards";
import Card from "../components/Card";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import LinearGradient from "react-native-linear-gradient";
// import { mdiDelete } from '@mdi/js';
import { Icon } from "react-native-elements";
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';
import { AuthContext } from "../navigation/AuthProvider";
import { Switch } from 'react-native-switch';
import { log } from "react-native-reanimated";
import SelectDropdown from 'react-native-select-dropdown';

const PaymentScreen = ({ navigation, route }) => {
    const { user, logout } = useContext(AuthContext);
    const [order, setOrder] = useState([
        {
            id: "",
            items: [],
            total: 0,
            count: 0,
        },
    ]);
    const [each, setEach] = useState([]);

    // const time = [];

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const [tableList, setTableList] = useState([]);
    const charges = 25;
    const [delCharges, setDelCharges] = useState(charges);
    const [selTable, setSelTable] = useState(0);

    const fetchData = async () => {
        try {
            const time = [];
            await firestore()
                .collection("orders")
                .orderBy("postTime", "desc")
                .get()
                .then((querySnapshot) => {
                    console.log("Total Posts : ", querySnapshot.size);
                    querySnapshot.forEach((doc) => {
                        const { items, postTime, total, count, userId } = doc.data();
                        console.log(postTime);
                        // console.log(count);
                        // list.push({
                        //     id: doc.id,
                        //     userName: post,
                        //     phone: phone,
                        //     image: postImg,
                        //     postTime: postTime,
                        // })
                        if (userId == user.uid) {
                            time.push({
                                id: doc.id,
                                items: items,
                                total: total,
                                count: count,
                            });
                        }
                    });
                });
            console.log("Time: ", time[0]);
            setOrder(time[0]);
            // console.log(order.items[0].name);
            setEach(time[0].items);
            console.log("Order", order);
            console.log("Each", each);

            const list = [];
            let size = 0;
            await firestore()
                .collection('tables')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Posts : ', querySnapshot.size);
                    size = querySnapshot.size;
                })

            for (let i = 1; i <= size; i++) {
                list.push("Table " + i.toString());
            }
            setTableList(list);
            console.log("TableList: ", tableList);

            // setPosts(list);
            // console.log(posts);
            if (loading) {
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [posts]);

    useEffect(() => {
        fetchData();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            "Delete post",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed!"),
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => onDelete(postId),
                },
            ],
            { cancelable: false }
        );
    };

    const onDelete = (postId) => {
        console.log(postId);

        firestore()
            .collection("posts")
            .doc(postId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();
                    if (postImg !== null) {
                        const storageRef = storage().refFromURL(postImg);
                        const imageRef = storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted SuccessfulllY!`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log("Error while deleting the image");
                            });
                    }
                }
            });
    };

    const deleteFirestoreData = (postId) => {
        firestore()
            .collection("posts")
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert("Item deleted", "The Item is no longer in staff");
                // deleted = true;
            })
            .catch((e) => console.log("Error", e));
    };

    const addTodo = (title, desc, image) => {
        console.log("I am add todo", title, desc);
        let sno = 0;
        if (todos.length === 0) sno = 1;
        else sno = todos[todos.length - 1].sno + 1;
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc,
            image: image,
        };
        console.log("I am add todo", title, desc, image);
        setTodos([...todos, myTodo]);
        console.log(myTodo);
    };

    const handleSwitc = () => {
        if (switc) {
            setSwitc(false);
            setDelCharges(charges);
        }
        else {
            setSwitc(true);
            setDelCharges(0);
        }
    }

    const handlePay = () => {
        if (switc == false) {
            firestore()
                .collection('orders')
                .doc(order.id)
                .update({
                    deliveryCharges: delCharges,
                    finalTotal: order.total + delCharges,
                    paid: 1,
                })
                .then(() => {
                    console.log('Order Added!');
                    Alert.alert(
                        "Payment Successful",
                        "Click okay to continue",
                        [
                            { text: "Okay", onPress: () => navigation.navigate('Menu') }
                        ]
                    );;

                })
                .catch((error) => {
                    console.log('Something went wrong with added order to firestore.', error);
                });
        }
        else {
            if (selTable) {
                firestore()
                    .collection('orders')
                    .doc(order.id)
                    .update({
                        deliveryCharges: delCharges,
                        finalTotal: order.total + delCharges,
                        paid: 1,
                        table: selTable,
                    })
                    .then(() => {
                        console.log('Order Added!');
                        Alert.alert(
                            "Payment Successful",
                            "Click okay to continue",
                            [
                                { text: "Okay", onPress: () => navigation.navigate('Menu') }
                            ]
                        );;

                    })
                    .catch((error) => {
                        console.log('Something went wrong with added order to firestore.', error);
                    });
            }
            else {
                Alert.alert(
                    'Invalid',
                    'Please Select Your Table',
                );
            }
        }
    }

    // console.log("props::", props);
    // console.log("tester::", props["route"]);
    // console.log("Array::", props.route.params);
    const [switc, setSwitc] = useState(false);

    let totalCost = order.total;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={["#10002b", "#240046"]} style={styles.linearGradient}>
                <View showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
                    <LinearGradient colors={['#e0aaff', '#dee2ff']} style={styles.cardContainer}>
                        {each.map((item) => {
                            let i = 0;
                            return (
                                <View key={Math.random() + i++} >
                                    <Text >{item.name.toString()} x {item.count} : {item.count * item.price}</Text>
                                </View>
                            );
                        })}
                        <Text >Total Cost : {totalCost}</Text>

                    </LinearGradient>
                </View>
                {/* <View> */}
                <View style={styles.scopeContainer}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.txtColor}>Are you inSide restaurant? </Text>
                        <Switch
                            value={switc}
                            onPress={() => { handleSwitc() }}
                            disabled={false}
                            activeText={'In'}
                            inActiveText={'Out'}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'#fff'} />
                    </View>
                    <View style={styles.selectDropdown}>
                        {switc ?
                            <SelectDropdown
                                data={tableList}
                                defaultButtonText="Select a Table!"
                                buttonStyle={styles.btnSel}
                                dropdownStyle={styles.btnSel}
                                onSelect={(selectedItem, index) => {
                                    // index = Math.random() + i++;
                                    console.log(selectedItem, index.toString())
                                    setSelTable(index + 1);
                                }}
                            // buttonTextAfterSelection={(selectedItem, index) => {
                            //     // text represented after item is selected
                            //     // if data array is an array of objects then return selectedItem.property to render after item is selected
                            //     return selectedItem;
                            // }}
                            // rowTextForSelection={(item, index) => {
                            //     // text represented for each item in dropdown
                            //     // if data array is an array of objects then return item.property to represent item in dropdown
                            //     return item;
                            // }}
                            /> : null}
                        {switc ? null : <Text style={styles.txtColor}>Delivery charges: {delCharges}</Text>}
                    </View>
                    {/* <Button onPress={() => handlePay()} title="Bill Pay" /> */}
                    <FormButton
                        buttonTitle="Pay Bill"
                        onPress={() => handlePay()}
                    />
                </View>
            </LinearGradient>
            {/* </View> */}
        </ScrollView >
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        // paddingTop: 10,
        flex: 1,
        // backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    btnSel: {
        borderRadius: 15,
    },
    selectDropdown: {
        borderRadius: 15,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'space-between',
    },
    txtColor: {
        color: '#fff',
        marginVertical: 15,
        marginHorizontal: 15,
    },
    scopeContainer: {
        alignItems: 'center',
        width: '100%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 30,
        marginVertical: 15,
    },
    linearGradient: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 25,
        marginBottom: 0,
    },
    cardContainer: {
        marginTop: 50,
        marginBottom: 15,
        width: "100%",
        padding: 25,
        borderRadius: 20,
    },
    cardsContainer: {
        width: "100%",

    },
    tileContainer: {
        alignItems: "center",
    },
    tiletext: {
        flexDirection: "column",
        flex: 1,
    },
    textCont: {
        // justifyContent: 'space-evenly',
        alignItems: "center",
        // backgroundColor: '#e0aaff',
        borderRadius: 20,
        // borderTopLeftRadius: 20,
        flexDirection: "row",
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
        backgroundColor: "#c9184a",
        // alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "white",
        elevation: 50,
    },
});
