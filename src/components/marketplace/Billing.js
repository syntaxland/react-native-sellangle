// Billing.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Col, Row, Container, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getSellerPaidAdCharges } from "../../actions/marketplaceSellerActions";
import { getUserProfile } from "../../actions/userProfileActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";
import AdChargeCalculator from "./AdChargeCalculator";
import PayAdCharges from "./PayAdCharges";
import BillingPeriod from "./BillingPeriod";
import { formatAmount } from "../FormatAmount";
import { formatHour } from "../formatHour";

function Billing() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const getSellerPaidAdChargesState = useSelector(
    (state) => state.getSellerPaidAdChargesState
  );
  const {
    loading,
    error,
    paidAdCharges,
    totalAdCharges,
  } = getSellerPaidAdChargesState;
  console.log("paidAdCharges:", paidAdCharges);
  console.log("totalAdCharges:", totalAdCharges);

  const currentDate = new Date();
  const monthYear = currentDate?.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [payAdChargesModal, setBuyPayAdChargesModal] = useState(false);
  const handlePayAdChargesOpen = () => {
    setBuyPayAdChargesModal(true);
  };
  const handlePayAdChargesClose = () => {
    setBuyPayAdChargesModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paidAdCharges?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getSellerPaidAdCharges());
  }, [dispatch]);

  return (
    <Container>
      <Row className="py-2 d-flex justify-content-center">
        <Col>
          <h1 className="text-center py-2">Billing</h1>
          <h5 className="text-center py-2">Current Bills ({monthYear})</h5>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <div className="text-center py-3">Ad charges appear here.</div>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>User</th>
                        <th>Ad</th>
                        <th>Ad Charges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems?.map((adCharge, index) => (
                        <>
                          <tr key={adCharge.id}>
                            <td>{index + 1}</td>
                            <td>{adCharge.username}</td>
                            <td>{adCharge.ad_name}</td>
                            <td>
                              {adCharge.ad_charges} CPS (
                              {adCharge.ad_charge_hours} hours)
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <>
                <div className="d-flex justify-content-center py-2">
                  <Button
                    variant="outline-transparent"
                    className="w-100"
                    disabled
                  >
                    <strong>
                      Total Ad Charges:{" "}
                      {formatAmount(totalAdCharges?.total_ad_charges)} CPS (
                      {formatHour(totalAdCharges?.total_ad_charge_hours)} hours)
                    </strong>
                  </Button>
                </div>

                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={paidAdCharges?.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            </>
          )}
        </Col>
      </Row>

      {profile?.ad_charge_is_owed ? (
        <div className="d-flex justify-content-end py-2">
          <span className="py-2">
            <Button variant="outline-danger" onClick={handlePayAdChargesOpen}>
              Pay Ad Charges
            </Button>
          </span>
        </div>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center py-2">
        <BillingPeriod />
      </div>

      <Modal show={payAdChargesModal} onHide={handlePayAdChargesClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 py-2">
            Pay Ad Charges
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2 d-flex justify-content-center">
          {payAdChargesModal && (
            <PayAdCharges totalAdCharges={totalAdCharges?.total_ad_charges} />
          )}
        </Modal.Body>
      </Modal>
      <AdChargeCalculator />
    </Container>
  );
}

export default Billing;
