import { Text, View, Platform, Pressable } from 'react-native'
import React, { Component, useEffect } from 'react'
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { icon } from '@/constants/icon';
import Animated, {useSharedValue, withSpring } from "react-native-reanimated"
import { useAnimatedStyle,  interpolate} from 'react-native-reanimated';


const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label,
    
    }: {
        onPress: Function, 
        onLongPress: Function, 
        isFocused: boolean, 
        routeName: string, 
        color: string, 
        label: string
    }) => {

    const { colors } = useTheme();
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
        {duration: 350}
        );

    }, [scale, isFocused]);

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1,0])

        return {
            opacity
        }
    })

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0,1], [1, 1.2]);

        const top = interpolate(scale.value, [0,1], [0,9]);

        return {
            transform: [{
                scale: scaleValue
            }],
            top: top
        }
    })




    return (
        <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabbarItem}
      >
        <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
           color: isFocused ? colors.primary : colors.text 
        })}
        </Animated.View>
        <Animated.Text style={[{ color: isFocused ? colors.primary : colors.text, fontSize: 12}, animatedTextStyle]}>{label}</Animated.Text>

      </Pressable>
    );
};

export default TabBarButton

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5

    }
})