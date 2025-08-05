import { Post } from '@/interfaces';
import * as Network from 'expo-network';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showSonnyToast } from './SonnyToast';

export default function Example() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    const fetchPosts = async () => {
        if (!isOnline) {
            showSonnyToast('No internet connection');
            return;
        }

        setLoading(true);
        setIsOnline(false);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            setPosts([data]);
            showSonnyToast('Post loaded successfully!');
        } catch (error) {
            console.log(error);
            showSonnyToast('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkNetworkStatus();
        checkIPAddress();
    }, []);

    const checkNetworkStatus = async () => {
        try {
            const networkState = await Network.getNetworkStateAsync();
            setIsOnline(networkState.isConnected ?? false);
        } catch (error) {
            console.log('Network check failed', error);
        }
    }

    const checkIPAddress = async () => {
        try {
            const ipAddress = await Network.getIpAddressAsync();
            console.log('IP Address', ipAddress);
        } catch (error: any) {
            console.log('IP Address check failed', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expo Networking Tutorial</Text>

            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>
                    Network Status: {isOnline ? '🟢 Online' : '🔴 Offline'}
                </Text>
            </View>

            <TouchableOpacity
                // style={[styles.button, !isOnline && styles.buttonDisabled]}
                style={[styles.button]}
                onPress={fetchPosts}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Loading...' : 'Fetch Posts'}
                </Text>
            </TouchableOpacity>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading posts...</Text>
                </View>
            )}

            <View style={styles.postsContainer}>
                {posts.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postBody}>{post.body}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "ios" ? 60 : 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000',
    },
    statusContainer: {
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    postsContainer: {
        flex: 1,
    },
    postCard: {
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    postBody: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});