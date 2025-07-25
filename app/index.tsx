import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HomeScreen } from '@/components/HomeScreen';
import { LoginScreen } from '@/components/LoginScreen';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const authStatus = await SecureStore.getItemAsync('auth_status');
            console.log('Auth check:', authStatus);
            setIsAuthenticated(authStatus === 'authenticated');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleLogin = () => {
        console.log('Login success');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        console.log('Logout');
        setIsAuthenticated(false);
    };

    return (
        <View style={styles.container}>
            {isAuthenticated ? (
                <HomeScreen onLogout={handleLogout} />
            ) : (
                <LoginScreen onLoginSuccess={handleLogin} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
}); 