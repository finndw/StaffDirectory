import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROIData from './ROIData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen({ navigation }) {
    return (
        <View>
            <View>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#c64c38"
                    onPress={() => {navigation.navigate('Directory')}}>
                    <Text>Directory</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#c64c38"
                    onPress={() => {StoreData()}}>
                    <Text>Directory</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

function DirectoryScreen({ navigation }) {
    return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <ScrollView>
                {ROIData.map(staff => (
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
                        <Text style={styles.buttonText}>{staff.staffName}</Text>
                    </TouchableHighlight>
                ))}

                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#c64c38"
                    onPress={() => {
                        navigation.navigate('NewUser')
                    }}
                >
                    <Text style={styles.buttonText}>Add User</Text>
                </TouchableHighlight>

            </ScrollView>
            <View style={{ padding: 20, zIndex: 100, bottom: 20, left: 20, position: 'absolute' }}>
                <TouchableHighlight
                style={styles.altButton}
                underlayColor="#595959"
                activeOpacity={1}
                onPress={() => {CheckJSON()}}
                >
                    <Text style={styles.buttonText}>Hoam</Text>
                </TouchableHighlight>
            </View>
        </View>

    );
}

function DetailsScreen({ route, navigation }) {
    const { staffId, staffName, phoneNo, department, street, state, zip, country } = route.params;
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text>{staffId}</Text>
            <Text>{staffName}</Text>
            <Text>{phoneNo}</Text>
            <Text>{department}</Text>
            <Text>{street}</Text>
            <Text>{state}</Text>
            <Text>{zip}</Text>
            <Text>{country}</Text>
        </View>
    )
}

function NewUserScreen({ route, navigation }) {
    console.log("New User")
    var newStaff = {staffId:null, staffName:null, phoneNo:null, department:null, street:null, state:null, zip:null, country:null}
    return (
        <View>
            <ScrollView>
                <Text style={styles.fieldDescription}>Staff ID #:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{number}"
                    onChangeText={text => newStaff.staffId = text}
                />

                <Text style={styles.fieldDescription}>Full Name:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                    onChangeText={text => newStaff.staffName = text}
                />

                <Text style={styles.fieldDescription}>Phone Number:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{number}"
                    onChangeText={text => newStaff.phoneNo = text}
                />

                <Text style={styles.fieldDescription}>Department:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                    onChangeText={text => newStaff.department = text}
                />

                <Text style={styles.fieldDescription}>Street:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                    onChangeText={text => newStaff.street = text}
                />

                <Text style={styles.fieldDescription}>State:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                    onChangeText={text => newStaff.state = text}
                />

                <Text style={styles.fieldDescription}>ZIP Code:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                    onChangeText={text => newStaff.zip = text}
                />

                <Text style={styles.fieldDescription}>Country:</Text>
                <TextInput
                    style={styles.contactInput}
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
                    if (true) {
                        console.log(newStaff)
                        StaffCreator()
                    }
                    }}
                >
                    <Text style={styles.buttonText}>Save user</Text>
                </TouchableHighlight>
            </View>            
        </View>
    )
}

function HeaderImage() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image
                style={{ width: 80, height: 40, marginRight: 200 }}
                source={require('./assets/ROILogo.jpg')}
            />
            <Text>ROI Staff Directory</Text>
        </View>
    )
}

function StaffCreator(staffId, staffName, phoneNo, department, street, state, zip, country) {
    //var newStaff = {staffId:staffId, staffName:staffName, phoneNo:phoneNo, department:department, street:street, state:state, zip:zip, country:country};
    return
}

async function CheckJSON() {
    //FileSystem.readAsStringAsync()
    const value = await AsyncStorage.getItem('my-key');
    console.log(value)
    return
}

async function StoreData() {
    try {
      const jsonValue = JSON.stringify(ROIData);
      console.log(jsonValue)
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
    }
}

const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    buttonText: {
      fontSize: 25,
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
        fontSize: 25,
        padding: 16
    },
    fieldDescription: {
        backgroundColor: '#c64c38',
        fontSize: 25,
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
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="NewUser" component={NewUserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;