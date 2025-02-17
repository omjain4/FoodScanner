import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';  // Import the Camera component from react-native-camera

const ScanScreen: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(true);

  // This function will be triggered when a barcode is detected
  const onBarcodeScan = (scanResult: any) => {
    // Here, scanResult.data will give you the value of the scanned barcode
    Alert.alert('Barcode Scanned', `Scanned barcode: ${scanResult.data}`);
    setIsScanning(false);  // Optionally stop scanning after a barcode is found
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}  // Use back camera for scanning
        onBarCodeRead={isScanning ? onBarcodeScan : undefined}  // Only scan if we are still scanning
        captureAudio={false}  // Disable audio capture, only need video for scanning
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan a Barcode</Text>
        </View>
      </RNCamera>

      {/* Button to stop scanning or go back */}
      {!isScanning && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsScanning(true)}  // Restart the scan
        >
          <Text style={styles.buttonText}>Scan Another</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: '25%',
    right: '25%',
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanScreen;
