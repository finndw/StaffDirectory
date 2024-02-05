import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROIData from './ROIData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

var ROIStaff
var variableFontSize = 20

function HomeScreen({ navigation }) {
    RetrieveStaff()
    return (
        <View>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#c64c38"
                onPress={() => {navigation.navigate('Directory')}}>
                <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Red Opal Innovations Staff Directory</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#c64c38"
                onPress={() => {AsyncStorage.clear()}}>
                <Text>Clear AsyncStorage</Text>
            </TouchableHighlight>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableHighlight
                    style={{ backgroundColor: '#941a1d', marginBottom: 20, paddingVertical: 12, paddingHorizontal: 14 }}
                    underlayColor="#c64c38"
                    onPress={() => {
                        if (variableFontSize > 5) {
                            variableFontSize -= 5
                        }
                        }}>

                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Decrease text size</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{ backgroundColor: '#941a1d', marginBottom: 20, paddingVertical: 12, paddingHorizontal: 14 }}
                    underlayColor="#c64c38"
                    onPress={() => {variableFontSize += 5}}>

                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Increase text size</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

function DirectoryScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <ScrollView>
                {ROIStaff.map(staff => (
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor="#c64c38"
                        key={staff.staffId}
                        onPress={() => {
                            navigation.navigate('Details', {
                                staffId: staff.staffId,
                                staffName: staff.staffName,
                                phoneNo: staff.phoneNo,
                                department: staff.department,
                                street: staff.street,
                                state: staff.state,
                                zip: staff.zip,
                                country: staff.country
                            });
                        }}>
                        <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>{staff.staffName}</Text>
                    </TouchableHighlight>
                ))}

                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#c64c38"
                    onPress={() => {
                        navigation.navigate('NewUser')
                    }}
                >
                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Add User</Text>
                </TouchableHighlight>

            </ScrollView>
        </View>

    );
}

function DetailsScreen({ route, navigation }) {
    const { staffId, staffName, phoneNo, department, street, state, zip, country } = route.params;

    return (
        <View>
            <ScrollView>
                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Staff ID #:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{staffId}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Phone Number:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{phoneNo}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Department:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{department}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Street:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{street}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>State:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{state}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>ZIP Code:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{zip}</Text>

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Country:</Text>
                <Text style={[styles.field, {fontSize: variableFontSize}]}>{country}</Text>
            </ScrollView>
            <View style={{ padding: 20, zIndex: 100, bottom: 1, right: 20, position: 'absolute' }}>
                <TouchableHighlight
                style={styles.altButton}
                underlayColor="#595959"
                activeOpacity={1}
                onPress={() => {navigation.navigate('Edit', { staffId, staffName, phoneNo, department, street, state, zip, country })}}
                >
                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Edit user</Text>
                </TouchableHighlight>
                <TouchableHighlight
                style={styles.altButton}
                underlayColor="#595959"
                activeOpacity={1}
                onPress={() => {
                    var i = 0
                    while (i < ROIStaff.length) {
                        if (ROIStaff[i].staffId == staffId && ROIStaff[i].staffName == staffName) {
                            ROIStaff.splice(i, 1)
                            StoreStaff()
                            alert("User deleted")
                            navigation.navigate('Home')
                            return
                        }
                        else {i++}
                    }
                    
                    }}
                >
                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Delete user</Text>
                </TouchableHighlight>
            </View>                     
        </View>
    )
}

function EditUserScreen({ route, navigation }) {
    const { staffId, staffName, phoneNo, department, street, state, zip, country } = route.params;
    var editStaff = {staffId:staffId, staffName:staffName, phoneNo:phoneNo, department:department, street:street, state:state, zip:zip, country:country}
    return (
        <View>
        <ScrollView>
            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Staff ID #:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(staffId)}
                onChangeText={text => editStaff.staffId = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Full Name:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(staffName)}
                onChangeText={text => editStaff.staffName = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Phone Number:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(phoneNo)}
                onChangeText={text => editStaff.phoneNo = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Department:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(department)}
                onChangeText={text => editStaff.department = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Street:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(street)}
                onChangeText={text => editStaff.street = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>State:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(state)}
                onChangeText={text => editStaff.state = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>ZIP Code:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(zip)}
                onChangeText={text => editStaff.zip = text}
            />

            <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Country:</Text>
            <TextInput
                style={[styles.contactInput, {fontSize: variableFontSize}]}
                defaultValue={String(country)}
                onChangeText={text => editStaff.country = text}
            />
        </ScrollView>
        <View style={{ padding: 20, zIndex: 100, bottom: 20, right: 20, position: 'absolute' }}>
            <TouchableHighlight
            style={styles.altButton}
            underlayColor="#595959"
            activeOpacity={1}
            onPress={() => {
                for (item in editStaff) {
                    if (editStaff[item] == null) {
                        alert('Please enter values for every field.')
                        return
                    }
                }
                ROIStaff[editStaff.staffId - 1] = editStaff
                StoreStaff()
                alert("User edit saved")
                navigation.navigate('Home')
                }}
            >
                <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Save user</Text>
            </TouchableHighlight>
        </View>              
    </View>
    )
}

function NewUserScreen({ route, navigation }) {
    var newStaff = {staffId:null, staffName:null, phoneNo:null, department:null, street:null, state:null, zip:null, country:null}
    return (
        <View>
            <ScrollView>
                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Staff ID #:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{number}"
                    onChangeText={text => newStaff.staffId = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Full Name:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.staffName = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Phone Number:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{number}"
                    onChangeText={text => newStaff.phoneNo = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Department:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.department = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Street:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.street = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>State:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.state = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>ZIP Code:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.zip = text}
                />

                <Text style={[styles.fieldDescription, {fontSize: variableFontSize}]}>Country:</Text>
                <TextInput
                    style={[styles.contactInput, {fontSize: variableFontSize}]}
                    placeholder="{text}"
                    onChangeText={text => newStaff.country = text}
                />
            </ScrollView>
            <View style={{ padding: 20, zIndex: 100, bottom: 20, right: 20, position: 'absolute' }}>
                <TouchableHighlight
                style={styles.altButton}
                underlayColor="#595959"
                activeOpacity={1}
                onPress={() => {
                    for (item in newStaff) {
                        if (newStaff[item] === null) {
                            alert('Please enter values for every field')
                            return
                        }
                    }
                    //add newStaff to staff array and send to AsyncStorage
                    ROIStaff.push(newStaff)
                    StoreStaff()
                    alert('New user successfully created')
                    navigation.navigate('Home')
                    }}
                >
                    <Text style={[styles.buttonText, {fontSize: variableFontSize}]}>Save user</Text>
                </TouchableHighlight>
            </View>            
        </View>
    )
}

function HeaderImage() {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={styles.baseText}>Red Opal Innovations Staff Directory</Text>
            <Image
                style={{ width: 90, height: 45, left: 40 }}
                source={require('./assets/ROILogo.jpg')}
            />
        </View>
    )
}

async function RetrieveStaff() {
    const value = await AsyncStorage.getItem('staff');
    if (value == null) {
        ROIStaff = ROIData
    }
    else {
        ROIStaff = JSON.parse(value)
    }
    return
}

async function StoreStaff() {
    try {
      const jsonValue = JSON.stringify(ROIStaff);
      await AsyncStorage.setItem('staff', jsonValue);
    } catch (e) {
      // saving error
    }
}


const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
      fontWeight: 'bold'
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white'
    },
    button: {
      backgroundColor: '#941a1d',
      marginBottom: 20,
      paddingVertical: 16,
      paddingHorizontal: 80
    },
    contactInput: {
        backgroundColor: '#cb6d4f',
        padding: 16
    },
    fieldDescription: {
        backgroundColor: '#c64c38',
        padding: 10
    },
    field: {
        backgroundColor: '#cb6d4f',
        padding: 10
    },
    altButton: {
        backgroundColor: '#262626',
        marginBottom: 20,
        paddingVertical: 16,
        paddingHorizontal: 40
      }
  });

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={
                    { headerTitle: (props) => <HeaderImage {...props} /> }} />
                <Stack.Screen name="Directory" component={DirectoryScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} options={
                    ({ route }) => ({ title: route.params.staffName }) 
                }/>
                <Stack.Screen name="Edit" component={EditUserScreen} />
                <Stack.Screen name="NewUser" component={NewUserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;