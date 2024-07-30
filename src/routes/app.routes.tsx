import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Groups } from '@screens/groups';
import { NewGroup } from '@screens/new-group';
import { Players } from '@screens/players';

const {Navigator, Screen} = createNativeStackNavigator();

type ScreenProps = {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

const screens: ScreenProps[] = [
  {
    name: 'groups',
    component: Groups,
  },
  {
    name: 'players',
    component: Players,
  },
  {
    name: 'new-group',
    component: NewGroup,
  }
]

export function AppRoutes(){
  return(
    <Navigator screenOptions={{
      headerShown: false
    }}>
      {screens.map(({name, component}) => {
        return (
          <Screen key={name} name={name} component={component}   />
        )
      })}
    </Navigator>
  )
}