// stack.js
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import { HomeTabs } from "./taps";
// screens
// import HomeScreen from "../components/screens/HomeScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
// marketplace
import Marketplace from "../components/marketplace/Marketplace";
import PostFreeAd from "../components/marketplace/PostFreeAd";
import PostPaidAd from "../components/marketplace/PostPaidAd";
import FreeAdProductDetail from "../components/marketplace/FreeAdProductDetail";
import PaidAdProductDetail from "../components/marketplace/PaidAdProductDetail";
import ShopFrontLink from "../components/marketplace/ShopFrontLink";
import CreateMarketplaceSeller from "../components/marketplace/CreateMarketplaceSeller";
import SellerPhoto from "../components/marketplace/SellerPhoto";
import EditFreeAd from "../components/marketplace/EditFreeAd";
import EditPaidAd from "../components/marketplace/EditPaidAd";
import CurrentAds from "../components/marketplace/CurrentAds";
// import SellerPhoto from "../components/marketplace/SellerPhoto";
// import SellerPhoto from "../components/marketplace/SellerPhoto";
// CreditPoint
import GetBuyCreditPoint from "../components/CreditPoint/GetBuyCreditPoint";
import GetUserCpsBonuses from "../components/CreditPoint/GetUserCpsBonuses";
import GetAdCpsCharges from "../components/CreditPoint/GetAdCpsCharges";
import GetUsdBuyCreditPoint from "../components/CreditPoint/GetUsdBuyCreditPoint";
import GetSellCreditPoint from "../components/CreditPoint/GetSellCreditPoint";
import GetBuyerCreditPoint from "../components/CreditPoint/GetBuyerCreditPoint";
// import GetBuyCreditPoint from "../components/CreditPoint/GetBuyCreditPoint";
// import GetBuyCreditPoint from "../components/CreditPoint/GetBuyCreditPoint";

import PaysofterButton from "../components/CreditPoint/payment/PaysofterButton";
// import PaysofterButton from "../components/CreditPoint/PaysofterButton";
// profiles
import Dashboard from "../components/profiles/Dashboard"; 
// import Inbox from "../components/profiles/Inbox"; 
// import Inbox from "../components/profiles/Inbox"; 
// import Inbox from "../components/profiles/Inbox"; 

const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={Marketplace} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* <Stack.Screen name="Inbox" component={Inbox} /> */}
      {/* marketplace */}
      <Stack.Screen name="Bought NGN CPS List" component={GetBuyCreditPoint} /> 
      <Stack.Screen name="CPS Bonuses" component={GetUserCpsBonuses} /> 
      <Stack.Screen name="CPS Ad Charges" component={GetAdCpsCharges} /> 
      <Stack.Screen name="Bought USD CPS List" component={GetUsdBuyCreditPoint} /> 
      <Stack.Screen name="Sold CPS List" component={GetSellCreditPoint} /> 
      <Stack.Screen name="Recieved CPS List" component={GetBuyerCreditPoint} /> 
      <Stack.Screen name="Post Free Ad" component={PostFreeAd} /> 
      <Stack.Screen name="Post Paid Ad" component={PostPaidAd} /> 
      <Stack.Screen name="Ad Detail" component={FreeAdProductDetail} /> 
      <Stack.Screen name="Promoted Ad Detail" component={PaidAdProductDetail} /> 
      <Stack.Screen name="Shop Front Link" component={ShopFrontLink} /> 
      <Stack.Screen name="Create Seller Account" component={CreateMarketplaceSeller} /> 
      <Stack.Screen name="Seller Photo" component={SellerPhoto} /> 
      <Stack.Screen name="Current Ads" component={CurrentAds} /> 
      <Stack.Screen name="Edit Free Ad" component={EditFreeAd} /> 
      <Stack.Screen name="Edit Paid Ad" component={EditPaidAd} /> 
      {/* <Stack.Screen name="EditPaidAd" component={EditPaidAd} />  */}
      {/* <Stack.Screen name="EditPaidAd" component={EditPaidAd} />  */}
      {/* <Stack.Screen name="EditPaidAd" component={EditPaidAd} />  */}

      <Stack.Screen name="PaysofterButton" component={PaysofterButton} /> 

    </Stack.Navigator>
  );
};

// export const UserDashboardStack = () => {
//   const navigation = useNavigation();
//   return (
//     <Stack.Navigator screenOptions={() => navOptions(navigation)}>
//       <Stack.Screen name="HomeTabs" component={HomeTabs} />    

//     </Stack.Navigator>
//   );
// };

export const HomeTabsStack = () => {
  return (
    <HomeTabs.Navigator>
      <HomeTabs.Screen name="Home" component={Marketplace} />
    </HomeTabs.Navigator>
  );
};
