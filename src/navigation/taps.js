import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../components/screens/HomeScreen";
import Marketplace from "../components/marketplace/Marketplace";
import LoginScreen from "../components/screens/LoginScreen";
// import Dashboard from "../components/profiles/Dashboard"; 
// import Inbox from "../components/profiles/Inbox"; 
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// export const HomeTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#0f172a", 
//         },
//         tabBarActiveTintColor: "#007bff",
//         tabBarInactiveTintColor: "#6c757d",
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === "Home") {
//             iconName = focused ? "home" : "home-outline";
//           } 
//           // else if (route.name === "Dashboard") {
//           //   iconName = focused ? "grid" : "grid-outline";
//           // } else if (route.name === "Inbox") {
//           //   iconName = focused ? "mail" : "mail-outline";
//           // }
//           return (
//             <Ionicons
//               name={iconName}
//               size={focused ? 32 : 18}
//               color={color}
//             />
//           );
//         },
//       })}
//     >
//       <Tab.Screen
//         // name="Home"
//         options={{
//           title: "Home",
//         }}
//         component={HomeScreen}
//       />
//       <Tab.Screen
//         // name="Dashboard"
//         options={{
//           title: "Dashboard",
//         }}
//         // component={DashboardScreen}
//       />
//       <Tab.Screen
//         name="Inbox"
//         options={{
//           title: "Inbox",
//         }}
//         // component={InboxScreen}
//       />
//     </Tab.Navigator>
//   );
// };

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f172a", 
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTaps") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-out";
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? 32 : 18}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTaps"
        options={{
          title: "Home",
        }}
        component={Marketplace}
      />
      <Tab.Screen name="Login" component={LoginScreen} />
      
    </Tab.Navigator>
  );
};
