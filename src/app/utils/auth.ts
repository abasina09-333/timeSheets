export const getToken = () => {
    return sessionStorage.getItem('token');
  };
  
  export const logout = () => {
    sessionStorage.removeItem('token');
  };
  