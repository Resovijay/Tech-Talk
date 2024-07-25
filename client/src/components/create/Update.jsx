import React,{ useState, useEffect, useContext }from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import {AddCircle as Add} from '@mui/icons-material'
import { useNavigate, useLocation,useParams } from 'react-router-dom';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


import { API } from '../../service/api';
import { DataContext } from '../../context/Dataprovider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '80vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;


const QuillEditor = styled(ReactQuill)`
    margin-top: 50px;
    font-size: 18px;
    font-family: 'Playwrite Deutschland Grundschrift', sans-serif;
`;


const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

   const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

   const { id } = useParams();
   

   useEffect(() => {
    const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
}, []);




    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                // upload on server or local storage //
                await API.localUploadFile(data);

                // upload on cloudinary call //
                const response = await API.uploadFile(data);

                //console.log(response);
                if(response.data.success){
                //console.log(response.data);    
                setPost(prevPost => ({ ...prevPost, picture: response.data.imageUrl }));
                //console.log(post.picture);

                }
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        console.log(post);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [file])

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const handleEditorChange = (value) => {
        setPost({ ...post, description: value });
    };

    return (
       
      <Container>
             <Image src={url} alt="post" />

             <StyledFormControl>
                 <label htmlFor="fileInput">
                   <Add fontSize="large" color="action" />
               </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                 <Button  onClick={() => updateBlogPost()}  variant="contained" color="primary" >Update</Button>
           </StyledFormControl>

             {/* <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            /> */}

            <QuillEditor
                value={post.description}
                onChange={handleEditorChange}
                placeholder="Tell your story..."
            />



       </Container>
    )
}

export default Update;