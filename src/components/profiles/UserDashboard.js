// UserDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../../actions/userActions";
import { getUserProfile } from "../../actions/userProfileActions";
import { getUserMessages } from "../../actions/messagingActions";
import {
  GetActiveBuyerFreeAdMessages,
  GetActiveBuyerPaidAdMessages,
  listBuyerFreeAdMessages, 
  listBuyerPaidAdMessages,
} from "../../actions/marketplaceSellerActions";
import { listSupportTicket } from "../../actions/supportActions";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Payments from "./Payments";
import OrderShipment from "./OrderShipment";
import OrderItem from "./OrderItem";
import Reviews from "./Reviews";
import Dashboard from "./Dashboard";
import MessageInbox from "./MessageInbox";
import CreditPoint from "./CreditPoint";
import PromoProduct from "./Offers";
import SavedAds from "./SavedAds";
import ViewedAds from "./ViewedAds";
import RecommendedAds from "../recommender/RecommendedAds";
import Inbox from "./Inbox";
import Referrals from "./Referrals";
import SupportTicket from "../support/SupportTicket";
import Feedback from "./Feedback";
import Settings from "./Settings";

function UserDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  console.log("profile:", profile);

  const getUserMessagesState = useSelector(
    (state) => state.getUserMessagesState
  );
  const { messages } = getUserMessagesState;
  console.log("messages:", messages);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const msgCounted = messages?.reduce(
    (total, userMessages) => total + userMessages.msg_count,
    0
  );

  const listBuyerFreeAdMessagesState = useSelector(
    (state) => state.listBuyerFreeAdMessagesState
  );
  const { freeAdMessages } = listBuyerFreeAdMessagesState;

  const listBuyerPaidAdMessagesState = useSelector(
    (state) => state.listBuyerPaidAdMessagesState
  );
  const { paidAdMessages } = listBuyerPaidAdMessagesState;
   const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { tickets } = listSupportTicketState;

  const supportMsgCounted = tickets?.reduce(
    (total, userMessages) => total + userMessages.user_msg_count,
    0
  );

  const msgFreeAdCounted = freeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_free_ad_msg_count,
    0
  );

  const msgPaidAdCounted = paidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.seller_paid_ad_msg_count,
    0
  );

  const GetActiveBuyerFreeAdMessageState = useSelector(
    (state) => state.GetActiveBuyerFreeAdMessageState
  );
  const { activeBuyerFreeAdMessages } = GetActiveBuyerFreeAdMessageState;

  const GetActiveBuyerPaidAdMessageState = useSelector(
    (state) => state.GetActiveBuyerPaidAdMessageState
  );
  const { activeBuyerPaidAdMessages } = GetActiveBuyerPaidAdMessageState;

  const msgActiveFreeAdCounted = activeBuyerFreeAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_free_ad_msg_count,
    0
  );

  const msgActivePaidAdCounted = activeBuyerPaidAdMessages?.reduce(
    (total, userMessages) => total + userMessages.buyer_paid_ad_msg_count,
    0
  );
  console.log("msgCounted:", msgCounted);
  console.log("msgFreeAdCounted:", msgFreeAdCounted);
  console.log("msgPaidAdCounted:", msgPaidAdCounted);
  console.log("msgActiveFreeAdCounted:", msgActiveFreeAdCounted);
  console.log("msgActivePaidAdCounted:", msgActivePaidAdCounted);

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminDashboard = () => {
    history.push("/dashboard/admin");
  };

  const handleAddbusiness = () => {
    history.push("/create-marketplace-seller");
  };

  const handleMarketplaceDashboard = () => {
    history.push("/dashboard/marketplace/sellers");
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUserMessages());
    dispatch(GetActiveBuyerFreeAdMessages());
    dispatch(GetActiveBuyerPaidAdMessages());
    dispatch(listBuyerFreeAdMessages());
    dispatch(listBuyerPaidAdMessages());
          dispatch(listSupportTicket());
  }, [dispatch, userInfo]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;

      case "orders":
        return <Orders />;

      case "payments":
        return <Payments />;

      case "favorites":
        return <SavedAds />;

      case "order-shipment":
        return <OrderShipment />;

      case "order-items":
        return <OrderItem />;

      case "reviews":
        return <Reviews />;

      case "message-inbox":
        return <MessageInbox />;

      case "credit-point":
        return <CreditPoint />;

      case "recommended-ads":
        return <RecommendedAds />;

      case "offers":
        return <PromoProduct />;

      case "viewed-products":
        return <ViewedAds />;

      case "referrals":
        return <Referrals />;

      case "inbox":
        return <Inbox />;

      case "support-ticket":
        return <SupportTicket />;

      case "feedback":
        return <Feedback />;

      case "settings":
        return <Settings />;

      // case "billing":
      //   return <Billing />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      <Row className="main-section">
        <Col xs={sidebarOpen ? 4 : 1} className="sidebar">
          <Button
            variant="link"
            className="sidebar-toggle-button"
            onClick={handleSidebarToggle}
          >
            {/* <FontAwesomeIcon icon={sidebarOpen ? faBars : faBars} /> */}
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </Button>

          {sidebarOpen && (
            <div className="sidebar-content">
              <div>
                <Button
                  variant={
                    activeTab === "user-dashboard"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  // activeClassName="active-link"
                  onClick={() => handleTabChange("user-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "profile" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("profile")}
                >
                  <i className="fas fa-user"></i> User Profile
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "orders" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fas fa-cart-plus"></i> Purchased Items
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "payments" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("payments")}
                >
                  <i className="fas fa-credit-card"></i> Payments
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-shipment" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "reviews" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("reviews")}
                >
                  <i className="fas fa-star"></i> Reviews
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "referrals" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "inbox"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("inbox")}
                >
                  <i className="fa fa-message"></i> Inbox{" "}
                  {(msgCounted +
                    msgPaidAdCounted +
                    msgFreeAdCounted +
                    msgActiveFreeAdCounted +
                    msgActivePaidAdCounted) >
                    0 && (
                    <span className="msg-counter">
                      {msgCounted +
                        msgPaidAdCounted +
                        msgFreeAdCounted +
                        msgActiveFreeAdCounted +
                        msgActivePaidAdCounted}
                    </span>
                  )}
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "favorites" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("favorites")}
                >
                  <i className="fa fa-heart"></i> Saved Ads
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "viewed-products"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("viewed-products")}
                >
                  <i className="fa fa-eye"></i> Viewed Ads
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "recommended-ads"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("recommended-ads")}
                >
                  <i className="fa fa-thumbs-up"></i> Recommended Ads
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "billing" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("billing")}
                >
                  <i className="fa fa-gift"></i> Billing
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "feedback" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedback")}
                >
                  <i className="fa fa-comments"></i> Feedback
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "support-ticket"
                      ? "primary"
                      : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("support-ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket 
                  {" "}
                  {supportMsgCounted > 0 && (
                    <span className="msg-counter">{supportMsgCounted}</span>
                  )}
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "live-chat" ? "primary" : "outline-primary"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "settings" ? "primary" : "outline-primary"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("settings")}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div>

              <div>
                {profile?.is_superuser || profile?.is_staff ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "primary"
                          : "outline-primary"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                      <i className="fas fa-user-check"></i> Go to Admin
                      Dashboard
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="">
                {!profile?.is_marketplace_seller ? (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="sidebar-link py-2"
                      variant="outline-primary"
                      onClick={handleAddbusiness}
                    >
                      <i className="fa fa-user-alt"></i> Create Seller Account
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        className="sidebar-link py-2"
                        variant="outline-primary"
                        onClick={handleMarketplaceDashboard}
                      >
                        <i className="fa fa-user-alt"></i> Go to Seller
                        Dashboard
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 8 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
