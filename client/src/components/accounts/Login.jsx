import React from "react";
import { Box, Button, TextField,  IconButton, InputAdornment,styled} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/Dataprovider";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled("img")({
  width: 150,
  height: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 35px 35px;
  & > div {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
  }
`;

const Text = styled(TextField)`
  text-align :center
  padding-top: 20px;
`;

const LoginBtn = styled(Button)`
  margin: 15px 15px 20px 130px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  text-transform: none;
  background: #1a2130;
  color: #fffff7;
  border-radius: 2px;
`;

const SignupBtn = styled(Button)`
  margin: 5px 10px 20px 100px;
  color: #1a2130;
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0/20%);
  text-transform: none;
`;

const SignupBtn1 = styled(Button)`
  margin: 5px 10px 20px 90px;
  color: #1a2130;
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0/20%);
  text-transform: none;
`;



const signUpInitialVaules = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated, ...props }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [account, toggleAccount] = useState("login");
  const [signup, setSignUp] = useState(signUpInitialVaules);
  const [error, showError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const toggleSignup = () => {
    if (account === "signup") {
      setSignUp(" ");
      toggleAccount("login");
    } else {
      setLogin(" ");
      toggleAccount("signup");
    }
  };

  const notify = (str) => {
    toast.error(`${str}`, {
      duration: 2000,
      position: "top-right",
      // Styling
      style: {
        border: "1px solid #E72929",
        padding: "16px",
        color: "#E72929",
      },
      className: "",

      // Custom Icon
      // icon: '👏',
      // icon: '👏',
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#E72929",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const notifySucess = (str) => {
    toast.success(`${str}`, {
      duration: 4000,
      position: "top-center",
      // Styling
      style: {
        padding: "16px",
        color: "#06D001",
      },
      className: "",

      // Custom Icon
      // icon: '👏',
      // icon: '👏',
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#9BEC00",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const onInputChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  function containsNumber(str) {
    return str.match(/\d+/) !== null;
  }
   
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const signUpUser = async () => {
    let flag = false;
    const temp = {
      name: signup.name,
      username: signup.username,
      password: signup.password,
    };

    if (temp.username === "") {
      flag = true;
      notify("Please enter your username !!!");
    }
    if (temp.password === "") {
      flag = true;
      notify("Please enter your password !!!");
    }
    if (temp.name === "" || containsNumber(temp.name)) {
      flag = true;
      notify("Please enter your valid name !!!");
    }
    if (!flag) {
      try {
        let response = await API.userSignUp(temp);
        if (response.isError) {
          throw response;
        }
        //console.log(response);
        if (response.isSuccess) {
          showError("");
          setSignUp(signUpInitialVaules);
          notifySucess(response?.data?.msg);  
          toggleAccount("login");
        }
      } catch (error) {
        if (error.code === 400 && error.data?.msg) {
          notify(error.data.msg);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const loginUser = async () => {
    let flag = false;

    const temp = {
      username: login.username,
      password: login.password,
    };

    if (temp.password === "") {
      flag = true;
      notify("Please enter your password !!!");
    }
    if (temp.username === "") {
      flag = true;
      notify("Please enter your username !!!");
    }

    if (!flag) {
      try {
        let response = await API.userLogin(login);

        if (response.isError) {
          throw response;
        }

        if (response.isSuccess) {
          showError("");
          // when we are login ...we are getting response from server //
          // when server send response for successfull login they send //
          // accessToken ,refresh token,name and username of login person //
          // we store access token and refresh token in browser storage //
          // but name and user name are personal information so we cannot show //
          // hence we stored this thing global data show that we can use this //
          // for our commment and many thing //
          sessionStorage.setItem(
            "accessToken",
            `Bearer ${response.data.accessToken}`
          );
          sessionStorage.setItem(
            "refreshToken",
            `Bearer ${response.data.refreshToken}`
          );
          /// saving the value in context //
          setAccount({
            name: response.data.name,
            username: response.data.username,
          });
          // if they login in then we need to redirect to home //
          // we done using useNavigate hook which is a custom hooks //

          // react toast
          if (response.isSuccess) {
            notifySucess("Login Successfully !!!");
          }

          // navigate('/');
          setTimeout(() => {
            navigate("/");
          }, 500); // Adjust the delay as needed

          setLogin(loginInitialValues);
          // agar loin hai toh humlog ko authenticate bhi karna hoga taki woh about and other routes ko access kar sake //
          isUserAuthenticated(true);
        }
      } catch (error) {
        if (error.code === 400 && error.data?.msg) {
          notify(error.data.msg);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const imageURL =
    "https://www.chauvetprofessional.com/wp-content/uploads/2020/04/tech_talk.jpg";
  return (
    <Component>
      <Box>
        <div>
          <Toaster />
        </div>
        <Image src={imageURL} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <Text
              Text
              label="Enter your username"
              variant="filled"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
            ></Text>
            <Text
              label="Enter your password"
              variant="filled"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              type={showPassword ? "text" : "password"}

        // this functionality is to add the show password or not using icon
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}





            ></Text>
            <LoginBtn variant="contained" onClick={() => loginUser()}>
              Login
            </LoginBtn>
            <SignupBtn onClick={() => toggleSignup()} variant="text">
              Create an account
            </SignupBtn>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              label="Enter your name"
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="name"
            ></TextField>
            <TextField
              label="Enter your username"
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="username"
            ></TextField>
            <TextField
              label="Enter your password"
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="password"
              type={showPassword ? "text" : "password"}
              value={signup.password}
              // this functionality is to add the show password or not using icon
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}



            ></TextField>

            <LoginBtn variant="contained" onClick={() => signUpUser()}>
              Signup
            </LoginBtn>
            {/* <Text style={{ textAlign: "center" }}>OR</Text> */}
            <SignupBtn1 onClick={() => toggleSignup()} variant="text">
              Already have account
            </SignupBtn1>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
