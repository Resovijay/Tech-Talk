import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Link,
  Box,
  TextField,
  Button,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { API } from "../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";

const Userdetails = {
  picture: "",
  gitHub: "",
  codingprofile: "",
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(Userdetails);
  const [github, setGithub] = useState("");
  const [codingProfile, setCodingProfile] = useState("");
  const [Name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // upload on cloudinary call //
        const response = await API.uploadFile(data);
        //console.log(response);
        if (response.data.success) {
          //console.log(response.data);
          setUser((prev) => ({ ...prev, picture: response.data.imageUrl }));
          //console.log(post.picture);
        }
      }
    };
    getImage();
    console.log(user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    // Simulating an API call to fetch user data
    const fetchUserData = async () => {
      //console.log(id);
      let response = await API.getUserInfo(id); // Replace with your API endpoint
      setName(response.data.name);
      setUserName(response.data.username);
      setUser({
        picture: response.data.picture,
        gitHub: response.data.githubLink,
        codingprofile: response.data.codingProfileLink,
      });
      //setGithub(response.data.github);
      //setCodingProfile(data.codingProfile);
      //console.log(response);
    };
    fetchUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async () => {
    const temp = {
      _id: id,
      picture: user.picture,
      gitHub: user.gitHub,
      codingprofile: user.codingprofile,
    };

    console.log(temp);
   
    try{
    const response = await API.updateUserInfo(temp);
    if(response.isSuccess){
    console.log(response.data.user);
    const data = response.data.user;
    setUser({
      picture: data.picture,
      gitHub:  data.githubLink,
      codingprofile: data.codingProfileLink,
    });

    // setTimeout(()=>{},130000);
    setTimeout(()=>{
    navigate(`/user/${userName}`);
    },4000);
  } 

  }catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login');
    } else {
      console.error('An error occurred:', error);
    }
  }
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    //console.log(user);
  };

  //   if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user.picture === '' && account.username === userName ? (
            <>
              <label htmlFor="fileInput">
                <AccountCircleIcon fontSize="large" color="action" />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          ) : (
            <Avatar
              alt="logo"
              src= {user.picture || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          )}

          <Typography variant="h5" gutterBottom>
            {Name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {userName}
          </Typography>
          <Link
            href={user.gitHub}
            target="_blank"
            rel="noopener"
            sx={{ mb: 1 }}
          >
            GitHub Profile
          </Link>
          <Link href={user.codingprofile} target="_blank" rel="noopener">
            Coding Profile
          </Link>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Posts Written: user.postsCount
          </Typography>
        </Box>

        {user.github === '' &&
        user.codingprofile === '' &&
        account.username === userName ? (
          <>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="GitHub Profile"
                value={user.gitHub}
                name="gitHub"
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Coding Profile"
                value={user.codingprofile}
                name="codingprofile"
                onChange={handleInputChange}
                margin="normal"
              />
              <Button
                onClick={() => handleSubmit()}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <Box>HOLA</Box>
        )}
      </Paper>
    </Container>
  );
};

export default UserProfile;
