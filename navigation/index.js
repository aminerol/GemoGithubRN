import { useSelector } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './screens/home'
import Settings from './screens/settings'
import { ThemeProvider } from 'styled-components';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackScreenOptions = theme => ({
  headerStyle: { backgroundColor: theme.primary },
  headerTintColor: theme.primaryText
})

const tabScreenOptions = theme => ({
  activeTintColor: '#2196F3',
  inactiveTintColor: 'gray',
  tabStyle: { backgroundColor: theme.primary },
})

const bottomTabsOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    if (route.name === 'Trending') {
      iconName = 'md-trending-up'
    } else if (route.name === 'Settings') {
      iconName = 'md-settings';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
})
const TrendingScreen = () => {

  const theme = useSelector(state => (state.themeReducer.theme))

  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator screenOptions={stackScreenOptions(theme)}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </ThemeProvider>
    
  )
}

const SettingsScreen = () => {

  const theme = useSelector(state => (state.themeReducer.theme))

  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator screenOptions={stackScreenOptions(theme)}>
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </ThemeProvider>
  )
}

export default TabNavigator = () => {
    const theme = useSelector(state => (state.themeReducer.theme))
    return (
        <Tab.Navigator 
              theme={theme} 
              screenOptions={bottomTabsOptions} 
              tabBarOptions={tabScreenOptions(theme)}>
            <Tab.Screen name="Trending" component={TrendingScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
    )
}