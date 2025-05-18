export const incomeSourcesModel = (userObj: any = {}) => {
    return {
        id: userObj?.id ? userObj?.id : "N/A",
        incomeType: userObj?.incomeType ? userObj?.incomeType : "N/A",
        source: userObj?.source ? userObj?.source : "N/A",
        amountPerAnnum: userObj?.amountPerAnnum ? userObj?.amountPerAnnum : "N/A",
        UserId: userObj?.UserId ? userObj?.UserId : "N/A",
    };
  };
  