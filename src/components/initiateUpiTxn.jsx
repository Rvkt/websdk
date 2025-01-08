// InitiateUpiTxnResponse.js
export const InitiateUpiTxnResponse = ({
    amount,
    companyName,
    identifire,
    orderId,
    qrString,
    logo,
    raiseRequest,
    remark,
    sellerName,
  }) => {
    return {
      amount,
      companyName,
      identifire,
      orderId,
      qrString,
      logo,
      raiseRequest,
      remark,
      sellerName,
    };
  };
  