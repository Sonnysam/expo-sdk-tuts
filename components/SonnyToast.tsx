import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';


interface SonnyToastProps {
    message: string;
    visible: boolean;
    onHide?: () => void;
}

interface SonnyToastRef {
    show: (message: string) => void;
}

let globalToastRef: SonnyToastRef | null = null;

const SonnyToast = forwardRef<SonnyToastRef, SonnyToastProps>((props, ref) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(100)).current;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [currentMessage, setCurrentMessage] = useState(props.message);
    const [isVisible, setIsVisible] = useState(props.visible);

    const show = (message: string) => {
        setCurrentMessage(message);
        setIsVisible(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }


        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        timeoutRef.current = setTimeout(() => {
            hide();
        }, 1500);
    };

    const hide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsVisible(false);
            if (props.onHide) {
                props.onHide();
            }
        });
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    useEffect(() => {
        if (props.visible && !isVisible) {
            show(props.message);
        }
    }, [props.visible, props.message]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                }
            ]}
        >
            <Text style={styles.message}>
                {currentMessage}
            </Text>
        </Animated.View>
    );
});

SonnyToast.displayName = 'SonnyToast';

export const useSonnyToast = () => {
    const toastRef = useRef<SonnyToastRef>(null);

    const showToast = (message: string) => {
        if (toastRef.current) {
            toastRef.current.show(message);
        }
    };

    const ToastComponent = () => (
        <SonnyToast
            ref={toastRef}
            message=""
            visible={false}
        />
    );

    return { showToast, ToastComponent };
};

export const showSonnyToast = (message: string) => {
    if (globalToastRef) {
        globalToastRef.show(message);
    }
};

export const SonnyToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toastRef = useRef<SonnyToastRef>(null);
    const [toastData, setToastData] = useState({ message: '', visible: false });

    useEffect(() => {
        globalToastRef = {
            show: (message: string) => {
                setToastData({ message, visible: true });
                if (toastRef.current) {
                    toastRef.current.show(message);
                }
            }
        };

        return () => {
            globalToastRef = null;
        };
    }, []);

    return (
        <>
            {children}
            <SonnyToast
                ref={toastRef}
                message={toastData.message}
                visible={toastData.visible}
                onHide={() => setToastData(prev => ({ ...prev, visible: false }))}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
        backgroundColor: '#181818',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 16,
        justifyContent: 'center',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 9999,
    },
    message: {
        color: 'white',
        fontSize: 14,
        textAlign: 'left',
        lineHeight: 20,
    },
});

export default SonnyToast;
export { SonnyToastProps, SonnyToastRef };
