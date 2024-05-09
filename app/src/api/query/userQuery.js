import Axios from "../axios"

const USER_URL="/user"
export const SigninUser=async({email,password})=>
{
    try {
        const {data}=await Axios.post(`${USER_URL}/signin`,{email,password,});
        return data;

    } catch (error) {
        throw Error(error.response.data.message)
        
    }
}
export const SignupUser = async ({ firstName, lastName, email, password }) => {
    try {
        const { data } = await Axios.post(`${USER_URL}/signup`, {
            firstName, lastName, email, password,
        });
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

export const sendVerificationMail = async ({ email }) => {
    try {
        const { data } = await Axios.post(`${USER_URL}/send-verification-mail`, { email });
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

export const verfiyEmailAddressSignup = async ({ token }) => {
    try {
      const { data } = await Axios.post(`${USER_URL}/verfiy-user-mail`, {
        token,
      });
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };
  export const forgetPassword = async ({ email }) => {
    try {
        const { data } = await Axios.post(`${USER_URL}/forgot-password`, { email });
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

export const verifyForgetPasswordReset = async ({ token,password }) => {
    try {
      const { data } = await Axios.post(`${USER_URL}/verify-forgot-mail`, {
        token,
        password,
      });
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };