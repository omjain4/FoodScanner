import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import usePushNotification from './src/usePushNotification';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Signup from './src/Signup';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';  // Import HomeScreen component

const App: React.FC = () => {
  // State to manage if we are on signup or login screen
  const [isSignup, setIsSignup] = useState<boolean>(false);

  // Push notification hooks
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  // State to handle loading, and user authentication
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handles user state changes (logged in / out)
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // Auth state change listener on mount
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Clean up listener on unmount
  }, []);

  // Hides BootSplash after 400ms
  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    }, 400);
  }, []);

  // Handle notifications
  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, [
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
    requestUserPermission,
  ]);

  // Sign out logic
  const signOut = async () => {
    try {
      await auth().signOut();  // Firebase sign out
      setUser(null);  // Clear user state
    } catch (error) {
      console.error(error);
    }
  };

  // If still initializing, don't render anything yet
  if (initializing) return <></>;

  // If user is logged in, navigate to HomeScreen
  if (user) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Home screen after login */}
        <HomeScreen email={user.email!} />
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // If not logged in, show login or signup screen
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
      {isSignup ? (
        <Signup onSwitchToLogin={() => setIsSignup(false)} />
      ) : (
        <Login onSwitchToSignup={() => setIsSignup(true)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
