import React from "react";
import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';

//components
import Post from './Post';

const Posts = ({query}) => {
    const [posts, setPosts] = useState([]);
   
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [category]);
   
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    return (

        <>
            {
                filteredPosts && filteredPosts.length > 0 ? filteredPosts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;