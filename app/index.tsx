import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HomeScreen } from '@/components/HomeScreen';
import { LoginScreen } from '@/components/LoginScreen';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const authStatus = await SecureStore.getItemAsync('auth_status');
            console.log('🔍 Checking auth status:', authStatus);
            setIsAuthenticated(authStatus === 'authenticated');
        } catch (error) {
            console.log('Error checking auth status:', error);
        }
    };

    const handleLoginSuccess = () => {
        console.log('✅ Login successful - updating state');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        console.log('🚪 Logout - clearing state');
        setIsAuthenticated(false);
    };

    return (
        <View style={styles.container}>
            {isAuthenticated ? (
                <HomeScreen onLogout={handleLogout} />
            ) : (
                <LoginScreen onLoginSuccess={handleLoginSuccess} />
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