import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // Set icons based on the route name explicitly
        let iconName: string;
        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home-sharp' : 'home-outline';
            break;
          case 'Shop':
            iconName = isFocused ? 'storefront-sharp' : 'storefront-outline';
            break;
          case 'Orders':
            iconName = isFocused ? 'list-sharp' : 'list-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person-sharp' : 'person-outline';
            break;
          default:
            iconName = 'home-outline'; // Default icon
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, isFocused && styles.tabItemFocused]}
          >
            <Icon name={iconName} size={24} color={isFocused ? Colors.primary : '#888'} />
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 85,
    backgroundColor: Colors.background,
    borderTopWidth: .5,
    borderTopColor: 'grey',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  labelFocused: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
