export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
     
      return { 
        'x-access-token': user.accessToken,
        authoritiesToken: user.authoritiesToken,
        userUuidToken: user.userUuidToken     
       };      
    } else {
      return {};
    }
}