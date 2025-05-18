export const userModel = (userObj: any = {}) => {
    return {
      id: userObj?.id,
      token: userObj?.token,
    };
  };