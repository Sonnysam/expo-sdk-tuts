# Expo Local Authentication Tutorial

A simple tutorial app demonstrating how to implement biometric authentication using Expo's Local Authentication and Secure Store APIs.

## Features

- **Biometric Authentication**: Login using Touch ID, Face ID, or device passcode
- **Secure Storage**: Store authentication status securely using Expo Secure Store
- **Authentication Flow**: Clean login and home screen navigation
- **Hardware Detection**: Check if biometric hardware is available
- **Clean Architecture**: Component-based structure with clean, organized code
- **Simple UI**: Clean black and white design

## What You'll Learn

1. How to check for biometric hardware availability
2. How to implement biometric authentication
3. How to securely store authentication status
4. How to create clean, component-based React Native code
5. How to handle authentication states and user feedback
6. How to implement a complete authentication flow

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on your device or simulator to test biometric authentication

## Dependencies

- `expo-local-authentication`: For biometric authentication
- `expo-secure-store`: For secure storage of sensitive data

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root layout configuration
│   └── index.tsx            # Main app with authentication flow
├── components/
│   ├── LoginScreen.tsx      # Login screen with biometric auth
│   └── HomeScreen.tsx       # Home screen after authentication
└── hooks/
    └── useColorScheme.ts    # Theme hook
```
