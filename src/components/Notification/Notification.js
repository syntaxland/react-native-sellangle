// import { toast } from "react-toastify";

// export const showNotification = (message, type) => {
//   switch (type) {
//     case "success":
//       toast.success(message, {
//         className: "toastify-success",
//         autoClose: 3000,
//       });
//       break;
//     case "warning":
//       toast.warning(message, {
//         className: "toastify-warning",
//         autoClose: 3000,
//       });
//       break;
//     case "error":
//       toast.error(message, {
//         className: "toastify-error",
//         autoClose: 3000,
//       });
//       break;
//     default:
//       toast.info(message, {
//         className: "toastify-info",
//         autoClose: 3000,
//       });
//       break;
//   }
// };

// import { toast } from "react-toastify";

// export const showNotification = (message, type) => {
//   switch (type) {
//     case "success":
//       toast.success(message);
//       break;
//     case "warning":
//       toast.warning(message);
//       break;
//     case "error":
//       toast.error(message);
//       break;
//     default:
//       toast.info(message);
//       break;
//   }
// };

import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useNotification } from "./NotificationContext"; // Import the useNotification hook

const Notification = () => {
  const { notification } = useNotification(); // Access the notification state

  // Define a mapping of types to Bootstrap variants
  const typeToVariant = {
    success: "success",
    warning: "warning",
    error: "danger",
    info: "info",
  };

  // Get the corresponding Bootstrap variant based on the type
  const variant = typeToVariant[notification?.type] || "info";

  return (
    <>
      {notification && (
        <Alert variant={variant}>
          {notification.message}
          <Button
            className="ms-2 text-right"
            onClick={notification.onClose}
            variant={`outline-${variant}`}
            size="sm"
          >
            Close
          </Button>
        </Alert>
      )}
    </>
  );
};

// export default Notification;

// import React from "react";
// import { Alert, Button } from "react-bootstrap";

// const Notification = ({ type, message, onClose }) => {
//   // Define a mapping of types to Bootstrap variants
//   const typeToVariant = {
//     success: "success",
//     warning: "warning",
//     error: "danger",
//     info: "info",
//   };

//   // Get the corresponding Bootstrap variant based on the type
//   const variant = typeToVariant[type] || "info";

//   return (
//     <Alert variant={variant} className="d-flex justify-content-between align-items-center">
//       <div>{message}</div>
//       <Button variant={`outline-${variant}`} size="sm" onClick={onClose}>
//        Close &times; 
//       </Button>
//     </Alert>
//   );
// };

// export default Notification;


// // Notification.js
// import React, { useState, useEffect } from "react";
// import { Alert, Button } from "react-bootstrap";

// const Notification = ({ message, type, onClose }) => {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(false);
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const getVariant = (type) => {
//     switch (type) {
//       case "success":
//         return "success";
//       case "warning":
//         return "warning";
//       case "error":
//         return "danger";
//       default:
//         return "info";
//     }
//   };

//   return (
//     <Alert variant={getVariant(type)} show={show}>
//       {message}
//       <Button
//         className="ms-2"
//         onClick={() => {
//           setShow(false);
//           onClose();
//         }}
//         variant={`outline-${getVariant(type)}`}
//         size="sm"
//       >
//         Close
//       </Button>
//     </Alert>
//   );
// };

// export default Notification;
