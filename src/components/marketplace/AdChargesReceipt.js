// AdChargesReceipt.js
import React, { useState, useEffect } from "react";
import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import Message from "../Message";

const API_URL = process.env.REACT_APP_API_URL;

function AdChargesReceipt({ adChargesReceiptMonth, billingPeriodLoading }) {
  // const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
    setSuccess(false);
    setError(null);
  };
  console.log("adChargesReceiptMonth:", adChargesReceiptMonth);

  const handleShowReceiptModal = () => setShowReceiptModal(true);

  const downloadAdChargesReceipt = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/get-ad-charges-receipt/`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.access}`,
          },
          params: {
            ad_charges_receipt_month: adChargesReceiptMonth,
          },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        //   console.log("Blob size:", response.data.size);
        const link = document.createElement("a");
        console.log("link:", link);
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `${adChargesReceiptMonth}_ad_charges_receipt.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSuccess(true);
      } else {
        setError("Error downloading ad charges receipt.");
      }
    } catch (error) {
      setError(`Error downloading ad charges receipt: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-center">
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={handleShowReceiptModal}
            disabled={
              loading ||
              billingPeriodLoading ||
              success ||
              adChargesReceiptMonth === ""
            }
          >
            <i className="fas fa-download"></i>{" "}
            {loading ? "Downloading..." : "Download"}
          </Button>

          <Modal show={showReceiptModal} onHide={handleCloseReceiptModal}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100 py-2">
                Ad Charges Receipt
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-2 d-flex justify-content-center align-items-center text-center">
              <div>
                {loading ? (
                  <>
                    <Loader />
                    <p>Downloading...</p>
                  </>
                ) : success ? (
                  <Message variant="success">
                    Ad charges receipt for {adChargesReceiptMonth} downloaded
                    successfully.
                  </Message>
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  <>
                    <p>
                      <p>
                        Download your ad billing receipt for:{" "}
                        {adChargesReceiptMonth}? 
                      </p>
                      <Button onClick={downloadAdChargesReceipt}>
                        {" "}
                        <i className="fas fa-file-download"></i> Download
                      </Button>
                    </p>
                  </>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseReceiptModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default AdChargesReceipt;

// import React, { useState, useEffect } from "react";
// import { Button, Modal, Col, Row, Container } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { getAdChargesReceipt } from "../../actions/marketplaceSellerActions";
// import Loader from "../Loader";
// import Message from "../Message";
// import { jsPDF } from "jspdf";
// // import { saveAs } from "file-saver";
// // import b64toBlob from 'b64-to-blob';
// // import {
// //   // PDFViewer,
// //   Document,
// //   Page,
// //   Text,
// //   View,
// //   StyleSheet,
// // } from "@react-pdf/renderer";

// // const styles = StyleSheet.create({
// //   page: {
// //     flexDirection: "row",
// //     backgroundColor: "#E4E4E4",
// //   },
// //   section: {
// //     margin: 10,
// //     padding: 10,
// //     flexGrow: 1,
// //   },
// // });

// // const AdChargesReceiptPDF = ({ adChargesReceiptMonth, paidAdReceipt }) => (
// //   <Document>
// //     <Page size="A4" style={styles.page}>
// //       <View style={styles.section}>
// //         <Text>{`Ad Charges Receipt for ${adChargesReceiptMonth}`}</Text>
// //         <Text>{paidAdReceipt}</Text>
// //       </View>
// //     </Page>
// //   </Document>
// // );

// const API_URL = process.env.REACT_APP_API_URL;

// function AdChargesReceipt({ adChargesReceiptMonth }) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const getAdChargesReceiptState = useSelector(
//     (state) => state.getAdChargesReceiptState
//   );
//   const { loading, success, error, paidAdReceipt } = getAdChargesReceiptState;
//   console.log("paidAdReceipt:", paidAdReceipt);

//     // const url = `${API_URL}/api/get-ad-charges-receipt/?ad_charges_receipt_month=${ad_charges_receipt_month}`;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/login");
//     }
//   }, [userInfo, history]);

//   const [showReceiptModal, setShowReceiptModal] = useState(false);

//   const handleCloseReceiptModal = () => setShowReceiptModal(false);
//   const handleShowReceiptModal = () => setShowReceiptModal(true);

//   const downloadAdChargesReceipt = async () => {
//     try {
//       const adData = {
//         ad_charges_receipt_month: adChargesReceiptMonth,
//       };

//       // Dispatch the action to get the ad charges receipt
//       await dispatch(getAdChargesReceipt(adData));

//       if (paidAdReceipt) {
//         console.log("paidAdReceipt2:", paidAdReceipt);
//         // Decode base64
//         const decodedPaidAdReceipt = atob(paidAdReceipt);
//         console.log("decodedPaidAdReceipt:", decodedPaidAdReceipt);

//         // Generate PDF using jsPDF
//         // const doc = new jsPDF();

//         const doc = new jsPDF({
//           orientation: "portrait", // or "landscape"
//           unit: "mm", // or "pt", "in", etc.
//           format: "a4", // or an array of numbers [width, height]
//         });

//         doc.text(`Ad Charges Receipt for ${adChargesReceiptMonth}`, 10, 10);
//         doc.text(decodedPaidAdReceipt, 10, 20);

//         console.log("decodedPaidAdReceipt 2:", decodedPaidAdReceipt);

//         // Save the PDF
//         doc.save(`${adChargesReceiptMonth}_ad_charges_receipt.pdf`);
//       } else {
//         console.error("Error downloading ad charges receipt.");
//       }
//     } catch (error) {
//       console.error("Error dispatching getAdChargesReceipt:", error);
//     }
//   };

//   // const downloadAdChargesReceipt = async () => {
//   //   try {
//   //     const adData = {
//   //       ad_charges_receipt_month: adChargesReceiptMonth,
//   //     };

//   //     // Dispatch the action to get the ad charges receipt
//   //     await dispatch(getAdChargesReceipt(adData));

//   //     // Access the paidAdReceipt from the Redux state
//   //     // const { paidAdReceipt } = getAdChargesReceiptState;

//   //     if (paidAdReceipt) {
//   //       // Generate PDF using paidAdReceipt data
//   //       const pdfBlob = await AdChargesReceiptPDF({
//   //         adChargesReceiptMonth,
//   //         paidAdReceipt, // Pass the paidAdReceipt data to the PDF component
//   //       }).toBlob();

//   //       // Create a download link and trigger the download
//   //       const link = document.createElement("a");
//   //       link.href = URL.createObjectURL(pdfBlob);
//   //       link.setAttribute(
//   //         "download",
//   //         `${adChargesReceiptMonth}_ad_charges_receipt.pdf`
//   //       );
//   //       document.body.appendChild(link);
//   //       link.click();
//   //       document.body.removeChild(link);
//   //     } else {
//   //       console.error("Error downloading ad charges receipt.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error dispatching getAdChargesReceipt:", error);
//   //   }
//   // };

//   // const downloadAdChargesReceipt = async () => {
//   //   try {
//   //     const adData = {
//   //       ad_charges_receipt_month: adChargesReceiptMonth,
//   //     };

//   //     await dispatch(getAdChargesReceipt(adData));

//   //     if (paidAdReceipt) {
//   //       const pdfBlob = new Blob([paidAdReceipt], { type: "application/pdf" });
//   //       saveAs(pdfBlob, `${adChargesReceiptMonth}_ad_charges_receipt.pdf`);
//   //     } else {
//   //       console.error("Error downloading ad charges receipt.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error dispatching getAdChargesReceipt:", error);
//   //   }
//   // };

//   // const downloadAdChargesReceipt = async () => {
//   //   try {
//   //     const adData = {
//   //       ad_charges_receipt_month: adChargesReceiptMonth,
//   //     };

//   //     await dispatch(getAdChargesReceipt(adData));

//   //     if (paidAdReceipt) {
//   //       const pdfBlob = await AdChargesReceiptPDF({ adChargesReceiptMonth }).toBlob();
//   //       saveAs(pdfBlob, `${adChargesReceiptMonth}_ad_charges_receipt.pdf`);
//   //     } else {
//   //       console.error("Error downloading ad charges receipt.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error dispatching getAdChargesReceipt:", error);
//   //   }
//   // };

//   // const downloadAdChargesReceipt = async () => {
//   //   try {
//   //     // Dispatch the getAdChargesReceipt action when the user clicks "Download"
//   //     const adData = {
//   //       ad_charges_receipt_month: adChargesReceiptMonth,
//   //     };
//   //     console.log("adData", adData);

//   //     await dispatch(getAdChargesReceipt(adData));

//   //     if (paidAdReceipt) {
//   //       // Convert the base64 PDF data to a Blob using b64toBlob function
//   //       const pdfBlob = b64toBlob(paidAdReceipt, 'application/pdf');
//   //       console.log("pdfBlob:", pdfBlob);

//   //       // Create a download link and trigger the download
//   //       const link = document.createElement("a");
//   //       link.href = window.URL.createObjectURL(pdfBlob);
//   //       link.setAttribute(
//   //         "download",
//   //         `${adChargesReceiptMonth}_ad_charges_receipt.pdf`
//   //       );
//   //       document.body.appendChild(link);
//   //       link.click();
//   //       document.body.removeChild(link);
//   //     } else {
//   //       console.error("Error downloading ad charges receipt.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error dispatching getAdChargesReceipt:", error);
//   //   }
//   // };

//   // const downloadAdChargesReceipt = async () => {
//   //   try {
//   //     // Dispatch the getAdChargesReceipt action when the user clicks "Download"
//   //     const adData = {
//   //       ad_charges_receipt_month: adChargesReceiptMonth,
//   //     };
//   //     console.log("adData", adData);

//   //     await dispatch(getAdChargesReceipt(adData));

//   //     if (paidAdReceipt) {

//   //       // Convert the base64 PDF data to a Blob using atob function
//   //       const byteCharacters = atob(paidAdReceipt);
//   //       const byteNumbers = new Array(byteCharacters.length);
//   //       for (let i = 0; i < byteCharacters.length; i++) {
//   //         byteNumbers[i] = byteCharacters.charCodeAt(i);
//   //       }
//   //       const byteArray = new Uint8Array(byteNumbers);
//   //       console.log("Uint8Array:", byteArray);

//   //       const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
//   //       console.log("pdfBlob:", pdfBlob);

//   //       // Create a download link and trigger the download
//   //       const link = document.createElement("a");
//   //       link.href = window.URL.createObjectURL(pdfBlob);
//   //       link.setAttribute(
//   //         "download",
//   //         `${adChargesReceiptMonth}_ad_charges_receipt.pdf`
//   //       );
//   //       document.body.appendChild(link);
//   //       link.click();
//   //       document.body.removeChild(link);
//   //     } else {
//   //       console.error("Error downloading ad charges receipt.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error dispatching getAdChargesReceipt:", error);
//   //   }
//   // };

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         // window.location.reload();
//       }, 15000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, history]);

//   return (
//     <Container className="d-flex justify-content-center align-items-center text-center">
//       <Row>
//         <Col>
//           <Button
//             variant="primary"
//             onClick={handleShowReceiptModal}
//             disabled={loading || success || adChargesReceiptMonth === ""}
//           >
//             <i className="fas fa-download"></i> Download
//           </Button>

//           <Modal show={showReceiptModal} onHide={handleCloseReceiptModal}>
//             <Modal.Header closeButton>
//               <Modal.Title className="text-center w-100 py-2">
//                 Ad Charges Receipt
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="py-2 d-flex justify-content-center align-items-center text-center">
//               <div>
//                 {loading ? (
//                   <>
//                     <Loader />
//                     <p>Downloading...</p>
//                   </>
//                 ) : success ? (
//                   <Message variant="success">
//                     Ad charges receipt for {adChargesReceiptMonth} downloaded
//                     successfully.
//                   </Message>
//                 ) : error ? (
//                   <Message variant="danger">{error}</Message>
//                 ) : (
//                   <>
//                     <p>
//                       <p>
//                         Download your ad charges receipt for:{" "}
//                         {adChargesReceiptMonth}?
//                       </p>
//                       <Button
//                         onClick={downloadAdChargesReceipt}
//                         // disabled={loading}
//                       >
//                         {" "}
//                         <i className="fas fa-file-download"></i> Download
//                       </Button>
//                     </p>
//                   </>
//                 )}
//               </div>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseReceiptModal}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default AdChargesReceipt;
