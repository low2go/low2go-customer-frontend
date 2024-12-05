import { View, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors } from '../constants/colors';

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const [dimensions, setDimensions] = useState({height: 20, width: 100})
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e:LayoutChangeEvent) => {
    setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
        transform:[{translateX: tabPositionX.value}]
    }
  })

  const springConfig = {
    damping: 20,
    stiffness: 100,
    mass: 1,
    duration: 1500
  };


  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
        <Animated.View style={[ animatedStyle, {
            position: 'absolute',
            backgroundColor: Colors.primary,
            borderRadius: 30,
            marginHorizontal: 9,
            // height: dimensions.height - 25,
            // width: buttonWidth - 20
            height: 50,
            width: 50,
        }]}/>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
            tabPositionX.value = withSpring(buttonWidth  * index, {
                damping: 20,
                stiffness: 200,
                mass: 1,
              });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
                key={route.name}
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                routeName={route.name}
                color={isFocused ? "#fff" : Colors.text }
                label={label}

            />
        );
      })}
    </View>

  );
}

const styles = StyleSheet.create({
    tabbar:  {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 35,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },


})

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <MyTabBar {...props} />}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }