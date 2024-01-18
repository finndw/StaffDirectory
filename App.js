import * as React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROIData from './ROIData.json';
// import { TextInput } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
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
    return (
        <View>
            <ScrollView>
                <Text style={styles.fieldDescription}>Staff ID #:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{number}"
                />

                <Text style={styles.fieldDescription}>Full Name:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />

                <Text style={styles.fieldDescription}>Phone Number:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{number}"
                />

                <Text style={styles.fieldDescription}>Department:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />

                <Text style={styles.fieldDescription}>Street:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />

                <Text style={styles.fieldDescription}>State:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />

                <Text style={styles.fieldDescription}>ZIP Code:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />

                <Text style={styles.fieldDescription}>Country:</Text>
                <TextInput
                    style={styles.contactInput}
                    placeholder="{text}"
                />
            </ScrollView>
        <Button
            onPress={}
            title="Save user"
        />
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
    }
  });

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={
                    { headerTitle: (props) => <HeaderImage {...props} /> }} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="NewUser" component={NewUserScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;