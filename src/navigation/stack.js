// stack.js
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import { HomeTabs } from "./tabs";
// screens
// import HomeScreen from "../components/screens/HomeScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
// marketplace
import Marketplace from "../components/marketplace/Marketplace";
import DashboardSeller from "../components/marketplace/DashboardSeller";
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
import SearchResults from "../components/marketplace/SearchResults";
import SellerShopFront from "../components/marketplace/SellerShopFront";
import BuyerFreeAdMessage from "../components/marketplace/BuyerFreeAdMessage";
import BuyerPaidAdMessage from "../components/marketplace/BuyerPaidAdMessage";
import SellerFreeAdMessage from "../components/marketplace/SellerFreeAdMessage";
import SellerPaidAdMessage from "../components/marketplace/SellerPaidAdMessage";
import Billing from "../components/marketplace/Billing";
import SellerProfile from "../components/marketplace/SellerProfile";
// import Billing from "../components/marketplace/Billing";
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
import ViewedAds from "../components/profiles/ViewedAds";
import SavedAds from "../components/profiles/SavedAds";
import RecommendedAds from "../components/recommender/RecommendedAds";
import Inbox from "../components/profiles/Inbox";
import Referrals from "../components/profiles/Referrals";
import FollowedSellers from "../components/profiles/FollowedSellers";
import Settings from "../components/profiles/Settings";
import UserProfile from "../components/profiles/UserProfile";
// support
import SupportTicket from "../components/support/SupportTicket";
import CreateSupportTicket from "../components/support/CreateSupportTicket";
import UserReplySupportTicket from "../components/support/UserReplySupportTicket";
import AdminReplySupportTicket from "../components/support/AdminReplySupportTicket";

import FeedbackScreen from "../components/screens/FeedbackScreen";
import AdminFeedback from "../components/admin/AdminFeedback";
import Feedback from "../components/profiles/Feedback";

import AdminSupportTicket from "../components/admin/AdminSupportTicket";
import Testing from "../components/admin/Testing";
// import AdminSupportTicket from "../components/admin/AdminSupportTicket";
// import AdminSupportTicket from "../components/admin/AdminSupportTicket";



const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      {/* <Stack.Screen name="Home2" component={Marketplace} /> */}
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Referrals" component={Referrals} />
      <Stack.Screen name="Dashboard (Seller)" component={DashboardSeller} />
      <Stack.Screen name="Followed Sellers" component={FollowedSellers} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={UserProfile} />
      {/* marketplace */}
      <Stack.Screen name="Bought NGN CPS List" component={GetBuyCreditPoint} />
      <Stack.Screen name="CPS Bonuses" component={GetUserCpsBonuses} />
      <Stack.Screen name="CPS Ad Charges" component={GetAdCpsCharges} />
      <Stack.Screen
        name="Bought USD CPS List"
        component={GetUsdBuyCreditPoint}
      />
      <Stack.Screen name="Sold CPS List" component={GetSellCreditPoint} />
      <Stack.Screen name="Recieved CPS List" component={GetBuyerCreditPoint} />
      <Stack.Screen name="Post Free Ad" component={PostFreeAd} />
      <Stack.Screen name="Post Paid Ad" component={PostPaidAd} />
      <Stack.Screen name="Ad Detail" component={FreeAdProductDetail} />
      <Stack.Screen name="Promoted Ad Detail" component={PaidAdProductDetail} />
      <Stack.Screen name="Shop Front Link" component={ShopFrontLink} />
      <Stack.Screen
        name="Create Seller Account"
        component={CreateMarketplaceSeller}
      />
      <Stack.Screen name="Seller Photo" component={SellerPhoto} />
      <Stack.Screen name="Current Ads" component={CurrentAds} />
      <Stack.Screen name="Edit Free Ad" component={EditFreeAd} />
      <Stack.Screen name="Edit Paid Ad" component={EditPaidAd} />
      <Stack.Screen name="Viewed Ads" component={ViewedAds} />
      <Stack.Screen name="Saved Ads" component={SavedAds} />
      <Stack.Screen name="Recommended Ads" component={RecommendedAds} />
      <Stack.Screen name="Search Results" component={SearchResults} />
      <Stack.Screen name="Seller Shop Front" component={SellerShopFront} />

      <Stack.Screen
        name="Buyer Free Ad Message"
        component={BuyerFreeAdMessage}
      />
      <Stack.Screen
        name="Buyer Paid Ad Message"
        component={BuyerPaidAdMessage}
      />
      <Stack.Screen
        name="Seller Free Ad Message"
        component={SellerFreeAdMessage}
      />
      <Stack.Screen
        name="Seller Paid Ad Message"
        component={SellerPaidAdMessage}
      />
      <Stack.Screen name="Billing" component={Billing} />
      <Stack.Screen name="Seller Account" component={SellerProfile} />
      {/* <Stack.Screen name="Billing" component={Billing} /> */}

      <Stack.Screen name="Support" component={SupportTicket} />
      <Stack.Screen name="Create Ticket" component={CreateSupportTicket} /> 
      <Stack.Screen name="User Reply Ticket" component={UserReplySupportTicket} /> 
      <Stack.Screen name="Admin Reply Ticket" component={AdminReplySupportTicket} /> 
      <Stack.Screen name="Admin Support" component={AdminSupportTicket} />
      <Stack.Screen name="Send Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Admin Feedback" component={AdminFeedback} />
      <Stack.Screen name="Feedback" component={Feedback} />

      <Stack.Screen name="PaysofterButton" component={PaysofterButton} />
      {/* <Stack.Screen name="PaysofterButton" component={PaysofterButton} /> */}
      {/* <Stack.Screen name="PaysofterButton" component={PaysofterButton} /> */}

      <Stack.Screen name="Testing" component={Testing} />
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

// export const HomeTabsStack = () => {
//   return (
//     <HomeTabs.Navigator>
//       <HomeTabs.Screen name="Home" component={Marketplace} />
//     </HomeTabs.Navigator>
//   );
// };
