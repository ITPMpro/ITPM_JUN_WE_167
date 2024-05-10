import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import AddMovie from './screen/AddMovie';
import AllMovies from './screen/ViewAllMovies';
import EditMovie from './screen/EditMovie';
import MovieDash from './screen/MovieDash';
import BookPage from './screen/BookPage';
import ViewAllUMovies from './screen/ViewAllUMovies';
import Movies from './screen/Movies';
import MHome from './screen/MHome';
import MyTicketsPage from './screen/MyTicketsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="AddMovie" component={AddMovie} />
        <Stack.Screen name="AllMovies" component={AllMovies} />
        <Stack.Screen name="EditMovie" component={EditMovie} />
        <Stack.Screen name="MovieDash" component={MovieDash} />
        <Stack.Screen name="BookPage" component={BookPage} />
        <Stack.Screen name="ViewAllUMovies" component={ViewAllUMovies} />
        <Stack.Screen name="Movies" component={Movies} /> 
        <Stack.Screen name="MyTicketsPage" component={MyTicketsPage} /> 
        <Stack.Screen name="MHome" component={MHome} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}