// ReportPaidAd.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { reportPaidAd } from "../../actions/marketplaceSellerActions";
import Loader from "../Loader";
import Message from "../Message";
import Select from "react-select";

const AD_REPORT_CHOICES = [
  [
    "Misleading Content",
    "False or deceptive information in the ad, claims that are not substantiated.",
  ],
  [
    "Inappropriate Content",
    "Offensive language, images, or themes; content violating community standards or guidelines.",
  ],
  [
    "Irrelevant or Unwanted Ads",
    "Ads that are not relevant to the user; too frequent display of the same ad.",
  ],
  [
    "Malware or Phishing",
    "Ads containing malicious software or links to phishing websites.",
  ],
  [
    "Privacy Concerns",
    "Collection of personal information without consent; violation of privacy policies.",
  ],
  [
    "Low-Quality or Unprofessional Design",
    "Poorly designed or unprofessional-looking ads.",
  ],
  [
    "Counterfeit or Fraudulent Products",
    "Ads promoting counterfeit goods or fraudulent services.",
  ],
  [
    "Political or Social Issues",
    "Ads perceived as promoting hate speech, discrimination, or controversial political content.",
  ],
  [
    "Technical Issues",
    "Broken links or malfunctioning interactive elements in the ad.",
  ],
  [
    "Unsolicited or Spammy Ads",
    "Ads that appear as spam or unsolicited marketing messages.",
  ],
  [
    "Disallowed Content",
    "Ads promoting content that violates platform policies or legal regulations.",
  ],
  ["Unverified Claims", "Ads making claims that cannot be verified or proven."],
  ["Unrealistic Promises", "Ads promising unrealistic results or benefits."],
];

function ReportPaidAd({ history, adId }) {
  const dispatch = useDispatch();

  const [adReport, setAdReport] = useState("Inappropriate Content");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reportPaidAdState = useSelector((state) => state.reportPaidAdState);
  const { loading, success, error } = reportPaidAdState;

  const adReportData = {
    ad_report: adReport,
    ad_id: adId,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(reportPaidAd(adReportData));
  };
  console.log("adReportData:", adReportData);

  const handleReportAdChange = (selectedOption) => {
    setAdReport(selectedOption.value);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="d-flex justify-content-center py-2">
        <Col>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Ad reported successfully.</Message>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              {/* <Form.Label>Report Ad</Form.Label> */}
              <Select
                options={AD_REPORT_CHOICES.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{ value: adReport, label: adReport }}
                onChange={handleReportAdChange}
                placeholder="Select Report"
                className="rounded py-2 mb-2"
                required
              />
            </Form.Group>

            <div className="py-2">
              <Button
                className="w-100 rounded"
                type="submit"
                variant="primary"
                disabled={loading || success}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ReportPaidAd;
