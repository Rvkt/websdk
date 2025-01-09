import axios from 'axios';

class PaymentService {
  constructor() {
    this.baseURL = "https://bc.easyswift.in/pro";  // Set the base URL for API requests
  }

  // Method to initiate payment, now accepting token as a parameter
  async initiatePayment(token, amount, remark, identifier, orderId) {
    const requestBody = {
      "amount": amount,
      "remark": remark,
      "identifier": identifier,
      "orderId": orderId,
    };

    const headers = {
      Authorization: token,  // Use the passed token here
      "Content-Type": "application/json",
    };


    try {
      const response = await axios.post(
        `${this.baseURL}/service/api/initateUpiTransaction`,
        requestBody,
        { headers }
      );

      const responseData = response.data;

      console.log(responseData.data)

      if (response.status === 200 && responseData.status === 1) {
        return {
          success: true,
          message: `Success: ${responseData.message}`,
          data: responseData.data,
        };
      } else {
        return {
          success: false,
          message: `Failed: ${responseData.message || "Unknown error occurred."}`,
          data: responseData.data,
        };
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Error: ${error.response.data.message || error.message}`
        : `Error: ${error.message}`;
      return { success: false, message: errorMessage, data: null };
    }
  }

  async checkTxnStatus(token, orderId) {
    console.warn("Check TXN Status")
    const requestBody = {
      "orderId": orderId,
    };

    const headers = {
      Authorization: token,  // Use the passed token here
      "Content-Type": "application/json",
    };


    try {
      const response = await axios.post(
        `${this.baseURL}/service/api/checkTransactionStatus`,
        requestBody,
        { headers }
      );

      const responseData = response.data;

      console.log(responseData.data)
      console.table(responseData.data)

      if (response.status === 200 && responseData.status === 1) {
        return {
          success: true,
          message: `Success: ${responseData.message}`,
          data: responseData.data,
        };
      } else {
        return {
          success: false,
          message: `Failed: ${responseData.message || "Unknown error occurred."}`,
          data: responseData.data,
        };
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Error: ${error.response.data.message || error.message}`
        : `Error: ${error.message}`;
      return { success: false, message: errorMessage, data: null };
    }
  }
}

export default PaymentService;
