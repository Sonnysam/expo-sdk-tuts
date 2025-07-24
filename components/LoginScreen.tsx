import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
    const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkBiometricAvailability();
    }, []);

    const checkBiometricAvailability = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            setIsBiometricAvailable(hasHardware && isEnrolled);
        } catch (error) {
            console.log('Error checking biometric availability:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBiometricLogin = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with biometrics',
                fallbackLabel: 'Use passcode',
            });

            if (result.success) {
                await SecureStore.setItemAsync('auth_status', 'authenticated');
                console.log('💾 Stored auth status in SecureStore');
                onLoginSuccess();
            } else {
                Alert.alert('Authentication Failed', 'Biometric authentication was cancelled or failed.');
            }
        } catch (error) {
            console.log('Authentication error:', error);
            Alert.alert('Error', 'An error occurred during authentication.');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>

                <TouchableOpacity
                    style={[styles.button, !isBiometricAvailable && styles.disabledButton]}
                    onPress={handleBiometricLogin}
                    disabled={!isBiometricAvailable}
                >
                    <Text style={styles.buttonText}>
                        {isBiometricAvailable ? 'Login with Biometrics' : 'Biometrics Not Available'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 50,
    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 25,
        minWidth: 200,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
}); 