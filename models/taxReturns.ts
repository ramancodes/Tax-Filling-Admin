export const taxReturnModel = (userObj: any = {}) => {
  return {
    id: userObj?.id ? userObj?.id : "N/A",
    assessmentYear: userObj?.assessmentYear ? userObj?.assessmentYear : "N/A",
    filingType: userObj?.filingType ? userObj?.filingType : "N/A",
    itrType: userObj?.itrType ? userObj?.itrType : "N/A",
    file: userObj?.file ? userObj?.file : "N/A",
    taxAmount: userObj?.taxAmount ? userObj?.taxAmount : "N/A",
    incomeDetails: userObj?.incomeDetails ? userObj?.incomeDetails : "N/A",
    createdAt: userObj?.createdAt ? userObj?.createdAt : "N/A",
    UserId: userObj?.UserId ? userObj?.UserId : "N/A",
  };
};
