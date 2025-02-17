import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation for screen navigation
import ScanScreen from './ScanScreen';
const HomeScreen: React.FC<{ email: string }> = ({ email }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hello, {email}</Text>
      
      {/* Button to navigate to the ScanScreen */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('ScanScreen')}  // Navigate to ScanScreen
      >
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
