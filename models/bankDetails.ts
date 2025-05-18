export const bankDetailsModel = (userObj: any = {}) => {
  return {
      id: userObj?.id ? userObj?.id : "N/A",
      bankName: userObj?.bankName ? userObj?.bankName : "N/A",
      accountNumber: userObj?.accountNumber ? userObj?.accountNumber : "N/A",
      customerId: userObj?.customerId ? userObj?.customerId : "N/A",
      ifscCode: userObj?.ifscCode ? userObj?.ifscCode : "N/A",
      UserId: userObj?.UserId ? userObj?.UserId : "N/A",
  };
};
