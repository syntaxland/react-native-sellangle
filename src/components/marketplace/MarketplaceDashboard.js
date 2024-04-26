// MarketplaceDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  listBuyerFreeAdMessages,
  listBuyerPaidAdMessages,
} from "../../actions/marketplaceSellerActions";
import Dashboard from "./Dashboard";
// import { login } from "../../actions/userActions";
import SellerProfile from "./SellerProfile";
import PostFreeAd from "./PostFreeAd";
import PostPaidAd from "./PostPaidAd";
import CurrentAds from "./CurrentAds";
// import Favorites from "./SavedItems";
import ShopFrontLink from "./ShopFrontLink";
import Billing from "./Billing";
// import Reviews from "./Reviews";
// import MessageInbox from "./MessageInbox";
// import PostAds from "./PostFreeAd";
// import PromoProduct from "./Offers";
// import RecommendedProducts from "./RecommendedProducts";
// import ViewedItems from "./ViewedItems";
// import LiveChat from "./LiveChat";
// import Referrals from "./Referrals";
// import SupportTicket from "./SupportTicket";
// import Feedback from "./Feedback";
// import Settings from "./Settings";
// import SellerInbox from "./SellerInbox";

function MarketplaceDashboard() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  // const listBuyerFreeAdMessagesState = useSelector(
  //   (state) => state.listBuyerFreeAdMessagesState
  // );
  // const { freeAdMessages } = listBuyerFreeAdMessagesState;
  // console.log("freeAdMessages:", freeAdMessages);

  // const listBuyerPaidAdMessagesState = useSelector(
  //   (state) => state.listBuyerPaidAdMessagesState
  // );
  // const { paidAdMessages } = listBuyerPaidAdMessagesState;
  // // console.log("paidAdMessages:", paidAdMessages);

  // const msgFreeAdCounted = freeAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.seller_free_ad_msg_count,
  //   0
  // );

  // const msgPaidAdCounted = paidAdMessages?.reduce(
  //   (total, userMessages) => total + userMessages.seller_paid_ad_msg_count,
  //   0
  // );

  // console.log("msgFreeAdCounted:", msgFreeAdCounted);
  // console.log("msgPaidAdCounted:", msgPaidAdCounted);

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCurrentAds = () => {
    history.push("/current-ads");
  };

  // const handleSellerInbox = () => {
  //   history.push("/seller-inbox");
  // };
  // const handleAdminDashboard = () => {
  //   history.push("/admin-dashboard");
  // };

  useEffect(() => {
    dispatch(listBuyerFreeAdMessages());
    dispatch(listBuyerPaidAdMessages());
  }, [dispatch]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "seller-profile":
        return <SellerProfile />;

      // case "orders":
      //   return <Orders />;

      case "ads":
        return <CurrentAds />;

      // case "favorites":
      //   return <Favorites />;

      case "Shop-front-link":
        return <ShopFrontLink />;

      case "billing":
        return <Billing />;

      // case "message-inbox":
      //   return <MessageInbox />;

      case "post-free-ad":
        return <PostFreeAd />;

      case "post-paid-ad":
        return <PostPaidAd />;

      // case "recommended-products":
      //   return <RecommendedProducts />;

      // case "offers":
      //   return <PromoProduct />;

      // case "viewed-products":
      //   return <ViewedItems />;

      // case "referrals":
      //   return <Referrals />;

      // case "live-chat":
      //   return <LiveChat />;

      // case "support-ticket":
      //   return <SupportTicket />;

      // case "feedback":
      //   return <Feedback />;

      // case "settings":
      //   return <Settings />;

      // case "seller-inbox":
      //   return <SellerInbox />;

      default:
        return <Dashboard />;
    }
  };

  // const handleAddbusiness = () => {
  //   history.push("/create-marketplace-seller");
  // };

  // const handlePostFreeAd = () => {
  //   history.push("/ad/free");
  // };

  // const handlePostPaidAd = () => {
  //   history.push("/ad/paid");
  // };

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
                    activeTab === "user-dashboard" ? "info" : "outline-info"
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
                    activeTab === "seller-profile" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("seller-profile")}
                >
                  <i className="fas fa-user"></i> Seller Account
                </Button>
              </div>
              {/* <div>
                <Button
                  variant={activeTab === "orders" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fas fa-cart-plus"></i> Purchased Items
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={activeTab === "payments" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("payments")}
                >
                  <i className="fas fa-credit-card"></i> Transactions
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "order-shipment" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "reviews" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("reviews")}
                >
                  <i className="fas fa-star"></i> Reviews
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={activeTab === "referrals" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "post-free-ad" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("post-free-ad")}
                >
                  <i className="fas fa-ad"></i> Post Free Ads
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "post-paid-ad" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("post-paid-ad")}
                >
                  <i className="fas fa-ad"></i> Post Paid Ads
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={
                    activeTab === "post-free-ads" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={handlePostFreeAd}
                >
                  <i className="fas fa-user-tag"></i> Post Free Ads
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "post-paid-ads" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={handlePostPaidAd}
                >
                  <i className="fas fa-user-tag"></i> Post Paid Ads 
                </Button>
              </div> */}

              <div>
                <Button
                  variant={activeTab === "ads" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={handleCurrentAds}
                  // onClick={() => handleTabChange("ads")}
                >
                  <i className="fas fa-ad"></i> Current Ads
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "favorites" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("favorites")}
                >
                  <i className="fa fa-heart"></i> Saved Ads
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "viewed-products" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("viewed-products")}
                >
                  <i className="fa fa-eye"></i> Viewed Ads
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "seller-inbox" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={handleSellerInbox}
                  // onClick={() => handleTabChange("seller-inbox")}
                >
                  <i className="fa fa-message"></i> Seller Inbox{" "}
                  {msgPaidAdCounted + msgFreeAdCounted > 0 && (
                    <span className="msg-counter">
                      {msgPaidAdCounted + msgFreeAdCounted}
                    </span>
                  )}
                </Button>
              </div> */}

              <div>
                <Button
                  variant={
                    activeTab === "Shop-front-link" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("Shop-front-link")}
                >
                  <i className="fa fa-link"></i> Shop Front Link
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "billing" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("billing")}
                >
                  <i className="fas fa-money-bill"></i> Billing
                </Button>
              </div>

              {/* <div>
                <Button
                  
                    
                  size="sm"
                  className="sidebar-link py-2"
                  variant="outline-danger"
                  onClick={handleAddbusiness}
                >
                  <i className="fa fa-user-alt"></i> Create MarketPlace Seller Account
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "recommended-products"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("recommended-products")}
                >
                  <i className="fa fa-thumbs-up"></i> Recommended
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "offers" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("offers")}
                >
                  <i className="fa fa-gift"></i> Offers
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "feedback" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedback")}
                >
                  <i className="fa fa-comments"></i> Feedback
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "support-ticket" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("support-ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket
                </Button>
              </div> */}

              {/* <div>
                <Button
                  variant={activeTab === "live-chat" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "settings" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("settings")}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div> */}

              {/* <div>
                {userInfo.is_superuser ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "info"
                          : "outline-info"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                     <i className="fas fa-user-check"></i> Admin 
                    </Button>
                  </div>
                ) : (
                  <span>Not Admin</span>
                )}
              </div> */}

              {/* <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleAdminDashboard()}
                >
                  <i className="fas fa-user-tag"></i> Admin Dashboard
                </Button>
              </div> */}
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

export default MarketplaceDashboard;
