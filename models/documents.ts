export const documentModel = (userObj: any = {}) => {
  return {
    id: userObj?.id ? userObj?.id : "N/A",
    documentType: userObj?.documentType ? userObj?.documentType : "N/A",
    fileName: userObj?.fileName ? userObj?.fileName : "N/A",
    file: userObj?.file ? userObj?.file : "N/A",
    createdAt: userObj?.createdAt ? userObj?.createdAt : "N/A",
    UserId: userObj?.UserId ? userObj?.UserId : "N/A",
  };
};
