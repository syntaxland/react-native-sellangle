// Dashboard.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCreditPointBalance } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import SellCreditPoint from "../CreditPoint/SellCreditPoint";
import SelectCurrency from "../CreditPoint/SelectCurrency";

function Dashboard() {
  const dispatch = useDispatch();
  const [buyCreditPointModal, setBuyCreditPointModal] = useState(false);
  const [sellCreditPointModal, setSellCreditPointModal] = useState(false);

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const { loading, error, creditPointBalance } = creditPointBal;

  useEffect(() => {
    dispatch(getCreditPointBalance());
  }, [dispatch]);

  const handleBuyCreditPointOpen = () => {
    setBuyCreditPointModal(true);
  };

  const handleBuyCreditPointClose = () => {
    setBuyCreditPointModal(false);
  };

  const handleSellCreditPointOpen = () => {
    setSellCreditPointModal(true);
  };

  const handleSellCreditPointClose = () => {
    setSellCreditPointModal(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <View>
          <Text>Credit Point Wallet</Text>
          <Text>Balance: {creditPointBalance.balance} CPS</Text>
          <TouchableOpacity onPress={handleBuyCreditPointOpen}>
            <Text>Buy CPS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSellCreditPointOpen}>
            <Text>Sell/Share CPS</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={buyCreditPointModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Buy Credit Point</Text>
          <TouchableOpacity onPress={handleBuyCreditPointClose}>
            <Text>Close</Text>
          </TouchableOpacity>
          <SelectCurrency />
        </View>
      </Modal>

      <Modal visible={sellCreditPointModal} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Sell/Share Credit Point</Text>
          <TouchableOpacity onPress={handleSellCreditPointClose}>
            <Text>Close</Text>
          </TouchableOpacity>
          <SellCreditPoint />
        </View>
      </Modal>
    </View>
  );
}

export default Dashboard;

