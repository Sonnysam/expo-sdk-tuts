import { Contact } from '@/interfaces'
import * as ExpoContacts from 'expo-contacts'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)

    const findFriends = async () => {
        setLoading(true)
        try {
            // Request permission and get contacts in one flow
            const { status } = await ExpoContacts.requestPermissionsAsync()

            if (status !== 'granted') {
                Alert.alert('Permission Required', 'We need access to your contacts to find friends.')
                setLoading(false)
                return
            }

            const { data } = await ExpoContacts.getContactsAsync({
                fields: [ExpoContacts.Fields.Name, ExpoContacts.Fields.PhoneNumbers],
            })

            if (data.length > 0) {
                const formattedContacts = data
                    .filter((contact: any) => contact.name && contact.phoneNumbers?.length)
                    .map((contact: any) => ({
                        id: contact.id,
                        name: contact.name || 'Unknown',
                        phoneNumbers: contact.phoneNumbers,
                    }))
                    .slice(0, 8)

                setContacts(formattedContacts)
            } else {
                setContacts([])
            }
        } catch (error) {
            console.log('Load error:', error)
            Alert.alert('Error', 'Failed to find friends.')
        } finally {
            setLoading(false)
        }
    }

    const renderFriend = ({ item }: { item: Contact }) => (
        <View style={styles.friendItem}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendStatus}>Not on app yet</Text>
            </View>
            <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Friends</Text>
            <Text style={styles.subtitle}>Connect with people you know</Text>

            <TouchableOpacity style={styles.findButton} onPress={findFriends}>
                <Text style={styles.findButtonText}>Find Friends</Text>
            </TouchableOpacity>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Finding your friends...</Text>
                </View>
            ) : (
                <FlatList
                    data={contacts}
                    renderItem={renderFriend}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {contacts.length === 0 && !loading && (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No friends found</Text>
                    <Text style={styles.emptySubtext}>Tap &quot;Find Friends&quot; to start</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 55,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    findButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    findButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    list: {
        flex: 1,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    friendStatus: {
        fontSize: 14,
        color: '#666',
    },
    inviteButton: {
        backgroundColor: '#34C759',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    inviteText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },
})