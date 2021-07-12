import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(false)
  const [libraryPermission, setLibraryPermission] = useState(false)
  const [savedImage, setSavedImage] = useState({})

  useEffect(() => {
    async function getPermissions() {
      let mediaLibraryPermission = await await MediaLibrary.requestPermissionsAsync()
      let cameraPermission = await Camera.requestCameraPermissionsAsync()
      setCameraPermission(cameraPermission.granted)
      setLibraryPermission(mediaLibraryPermission.granted)
    }
    async function retrieveLostImage() {
      let lostImage = await ImagePicker.getPendingResultAsync()
      console.log(lostImage)
    }
    getPermissions()
    retrieveLostImage()
  }, [])

  takePhoto = async() => {
		try {
			if (cameraPermission) {
				let image = await ImagePicker.launchCameraAsync({
					allowsEditing: true,
					aspect: [4, 3],
					base64: false
				})
				if (image.error) {
					console.log(image.error)
				} else {
          setSavedImage(image)
        }
			} else {
        console.log('you dont have camera permission')
      }
		} catch (e) {
			console.log(e)
		}
  }

  choosePhoto = async() => {
		try {
			if (libraryPermission) {
				let image = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: true,
					aspect: [4, 3],
					base64: false
				})
				if (image.error) {
					console.log(image.error)
				} else {
          setSavedImage (image)
        }
			} else {
        console.log('you dont have library permission')
      }
		} catch (e) {
			console.log(e)
		}
  }

  console.log(savedImage)
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
        onPress={takePhoto}
      >
        <Text>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
        onPress={choosePhoto}
      >
        <Text>Choose Photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  }
});
