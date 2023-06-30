import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground } from "react-native"
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from "expo-barcode-scanner"

var bgImage = require("../assets/background2.png")
var imgIcon = require("../assets/appIcon.png")
var appName = require("../assets/appName.png")

export default class Transaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            domState: 'normal',
            hasCameraPermissons: null,
            scanned: false,
            scannedData: "",
            bookId: "",
            StudentId: "",
        }
    }

    getCameraPermissions = async (domState) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissons: status == 'granted',
            domState: domState,
            scanned: false,
        })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({
            scannedData: data,
            domState: 'normal',
            scanned: true,
        })
    }

    render() {
        const { domState, hasCameraPermissons, scanned, scannedData, bookId, StudentId } = this.state

        if (domState !== 'normal') {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return (
            <View style={styles.Container}>
                <ImageBackground source={bgImage} style = {styles.bgImage}>
                <View style={styles.lowerContainer}>
                    <View style={styles.textinputContainer}>
                        <TextInput style={styles.textinput}
                            placeholder="id livro"
                            placeholderTextColor={"#fff"}
                            value={bookId}
                        />
                        <TouchableOpacity onPress={() => this.getCameraPermissions("bookId")} style={styles.scanbutton}>
                            <Text style={styles.scanbuttonText}>scan</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textinputContainer}>
                        <TextInput style={styles.textinput}
                            placeholder="id estudante"
                            placeholderTextColor={"#fff"}
                            value={StudentId}
                        />
                        <TouchableOpacity onPress={() => this.getCameraPermissions("StudentId")} style={styles.scanbutton}>
                            <Text style={styles.scanbuttonText}>scan</Text>
                        </TouchableOpacity>
                    </View>

                </View>
               </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    upperContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    appIcon: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginTop: 80
    },
    appName: {
        width: 180,
        resizeMode: "contain"
    },
    lowerContainer: {
        flex: 0.5,
        alignItems: "center"
    },
    textinputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#9DFD24",
        borderColor: "#FFFFFF"
    },
    textinput: {
        width: "57%",
        height: 50,
        padding: 10,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 18,
        backgroundColor: "#5653D4",
        color: "#FFFFFF"
    },
    scanbutton: {
        width: 100,
        height: 50,
        backgroundColor: "#9DFD24",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    scanbuttonText: {
        fontSize: 20,
        color: "#0A0101",
    }
});