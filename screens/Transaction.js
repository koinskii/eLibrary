import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from "expo-barcode-scanner"
export default class Transaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            domState: 'normal',
            hasCameraPermissons: null,
            scanned: false,
            scannedData: "",
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

    handleBarCodeScanned = async ({type, data})=>{
        this.setState({
            scannedData: data,
            domState: 'normal',
            scanned: true,
        })
    }

    render() {
        const { domState, hasCameraPermissons, scanned, scannedData } = this.state

        if (domState == 'scanner') {
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        return (
            <View style={styles.Container}>
                <Text style={styles.text}>
                    {hasCameraPermissons? scannedData : "Permita o uso da camera"}
                </Text>
                <TouchableOpacity onPress={() => this.getCameraPermissions("scanner")} style={ styles.button}>
                    <Text style={styles.buttonText}>Leitor QR</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5653D4"
    },
    text: {
      color: "#ffff",
      fontSize: 15
    },
    button: {
      width: "43%",
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F48D20",
      borderRadius: 15
    },
    buttonText: {
      fontSize: 15,
      color: "#FFFFFF"
    }
   
  });