// BillingPeriod.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getAdCpsCharges } from "../../actions/creditPointActions";
import Message from "../Message";
import LoaderButton from "../LoaderButton";
import AdChargesReceipt from "./AdChargesReceipt";
import Select from "react-select";

function BillingPeriod() {
  const dispatch = useDispatch();
  const history = useHistory;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const getAdCpsChargesState = useSelector(
    (state) => state.getAdCpsChargesState
  );
  const { loading, adCpsCharges, error } = getAdCpsChargesState;
  console.log("adCpsCharges:", adCpsCharges);

  const [billingPeriodOptions, setBillingPeriodOptions] = useState([]);
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState(null);

  useEffect(() => {
    const options =
      adCpsCharges?.reduce((uniqueOptions, charge) => {
        const formattedDate = new Date(charge.created_at).toLocaleString(
          "en-US",
          {
            // month: "numeric",
            month: "long",
            year: "numeric",
          }
        );

        if (!uniqueOptions.find((option) => option.label === formattedDate)) {
          uniqueOptions.push({
            value: charge.created_at,
            label: formattedDate,
          });
        }

        return uniqueOptions;
      }, []) || [];

    setBillingPeriodOptions(options);

    if (options.length > 0) {
      setSelectedBillingPeriod(options[options.length - 1]);
    }
  }, [adCpsCharges]);

  useEffect(() => {
    dispatch(getAdCpsCharges());
  }, [dispatch]);

  return (
    <Container>
      <Row className="py-2 d-flex justify-content-center">
        <Col md={8}>
          <h2 className="text-center py-2">Billing Period </h2>
          {loading && <LoaderButton />}

          {error && <Message variant="danger">{error}</Message>}

          <Row className="py-2 d-flex justify-content-between">
            <Col md={8} className="py-1">
              <Select
                options={billingPeriodOptions}
                value={selectedBillingPeriod}
                onChange={(selectedOption) =>
                  setSelectedBillingPeriod(selectedOption)
                }
              />
            </Col>
            <Col md={4} className="py-1">
              <AdChargesReceipt
                adChargesReceiptMonth={selectedBillingPeriod?.label}
                billingPeriodLoading={loading}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BillingPeriod;
