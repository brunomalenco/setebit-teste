import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Campeonato from './src/components/campeonato';
import Detalhes from './src/components/detalhes';
import Palpites from './src/components/palpite';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campeonato" component={Campeonato} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Palpites" component={Palpites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
