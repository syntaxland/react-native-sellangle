// PaysofterButton.js
import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import CardPayment from "./CardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterPromise from "./PaysofterPromise"; 
import QrPayment from "./QrPayment";
import "./Paysofter.css";
import {formatAmount} from "../FormatAmount";

function PaysofterButton({
  showPaymentModal,
  setShowPaymentModal,
  reference,
  userEmail,
  promoTotalPrice,
  publicApiKey,
  paymentDetails,
  handlePaymentDetailsChange,
  // handlePaymentSubmit,
  paymentData,
  paysofterPaymentData,
}) {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };


  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-center rounded py-2"
          variant="outline-primary"
          onClick={() => setShowPaymentModal(true)}
        >
          <span>Pay Now</span>
        </Button>
      </div>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <div className="text-center w-100 py-2">
            <Modal.Title>Mock Payment (Test)</Modal.Title>
            <div>{userEmail}</div>
            <div>
              NGN{" "}
              {formatAmount(promoTotalPrice)
              
              // .toLocaleString(undefined, {
              //   minimumFractionDigits: 2,
              //   maximumFractionDigits: 2,
              // })
              }
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Left column with payment options */}
            <Col md={3}>
              <div className="text-center">
                <p>Options</p>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("card")}
                    className={selectedPaymentOption === "card" ? "active" : ""}
                  >
                    <i className="fas fa-credit-card"></i> Debit Card
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("account-fund")}
                    className={
                      selectedPaymentOption === "account-fund" ? "active" : ""
                    }
                  >
                    <i className="fas fa-money-bill-alt"></i> Paysofter Account
                    Fund
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("promise")}
                    className={
                      selectedPaymentOption === "promise" ? "active" : ""
                    }
                  >
                    <i className="fas fa-money-bill-wave"></i> Paysofter Promise
                  </Button>
                </div>

                <div className="text-center py-2">
                  <Button
                    variant="outline-primary"
                    onClick={handleMoreOptions}
                    className="rounded"
                  >
                    <i className="fas fa-bars"></i> More Options
                  </Button>
                </div>

                {/* <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("transfer")}
                    className={
                      selectedPaymentOption === "transfer" ? "active" : ""
                    }
                  >
                    <i className="fa fa-exchange"></i> Transfer
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("bank")}
                    className={selectedPaymentOption === "bank" ? "active" : ""}
                  >
                    <i className="fas fa-bank"></i> Bank
                  </Button>
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("ussd")}
                    className={selectedPaymentOption === "ussd" ? "active" : ""}
                  >
                    <i className="fa fa-mobile"></i> USSD
                  </Button>{" "}
                </div>

                <div className="py-1">
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePaymentOptionChange("qr")}
                    className={selectedPaymentOption === "qr" ? "active" : ""}
                  >
                    <i className="fa fa-qrcode"></i> Visa QR
                  </Button>{" "}
                </div> */}

                {showMoreOptions && (
                  <>
                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("transfer")}
                        className={
                          selectedPaymentOption === "transfer" ? "active" : ""
                        }
                      >
                        <i className="fa fa-exchange"></i> Transfer
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("bank")}
                        className={
                          selectedPaymentOption === "bank" ? "active" : ""
                        }
                      >
                        <i className="fas fa-bank"></i> Bank
                      </Button>
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("ussd")}
                        className={
                          selectedPaymentOption === "ussd" ? "active" : ""
                        }
                      >
                        <i className="fa fa-mobile"></i> USSD
                      </Button>{" "}
                    </div>

                    <div className="py-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => handlePaymentOptionChange("qr")}
                        className={
                          selectedPaymentOption === "qr" ? "active" : ""
                        }
                      >
                        <i className="fa fa-qrcode"></i> Visa QR
                      </Button>{" "}
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col md={9}>
              {selectedPaymentOption === "card" && (
                <CardPayment
                  paymentDetails={paymentDetails}
                  handlePaymentDetailsChange={handlePaymentDetailsChange}
                  promoTotalPrice={promoTotalPrice}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                  paysofterPaymentData={paysofterPaymentData}
                />
              )}

              {selectedPaymentOption === "account-fund" && (
                <PaysofterAccountFund
                  promoTotalPrice={promoTotalPrice}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                />
              )}

              {selectedPaymentOption === "promise" && (
                <PaysofterPromise
                  promoTotalPrice={promoTotalPrice}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                  
                  paymentData={paymentData}
                  reference={reference}
                />
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PaysofterButton;
