# Expo Networking Tutorial

A simple React Native app demonstrating Expo's networking capabilities including online/offline detection, network status monitoring, and API calls.

## Features Demonstrated

### 🔌 Network Status Detection

- Real-time network connectivity monitoring
- WiFi/Cellular connection type detection
- Internet reachability checks
- Visual network status indicators

### 📡 API Integration

- Fetch API calls with proper error handling
- Loading states and user feedback
- Network-aware request handling
- Toast notifications for success/error states

### 🎮 Interactive Controls

- Manual network status checks
- Simulate offline/online scenarios
- Disabled buttons when offline
- Real-time UI updates based on network state

## Key Expo Networking Concepts

1. **Network State Monitoring**

   ```typescript
   const networkState = await Network.getNetworkStateAsync();
   ```

2. **Internet Reachability**

   ```typescript
   const isReachable = networkState.isInternetReachable;
   ```

3. **Network-Aware API Calls**
   ```typescript
   if (!networkState.isConnected) {
     showSonnyToast("No network connection");
     return;
   }
   ```

## How to Use

1. **Check Network Status**: Tap "Check Network" to see current connectivity
2. **Simulate Scenarios**: Use "Simulate Offline/Online" to test different states
3. **Make API Calls**: Try fetching posts with different network conditions
4. **Watch Toast Notifications**: See real-time feedback for all actions

## Perfect for YouTube Tutorial

This example is designed for a 5-minute tutorial covering:

- ✅ Basic Expo networking setup
- ✅ Network status detection
- ✅ Online/offline handling
- ✅ API calls with error handling
- ✅ User feedback with toast notifications
- ✅ Clean, readable code structure

## Running the App

```bash
npm start
```

Then scan the QR code with Expo Go app or run on simulator.
