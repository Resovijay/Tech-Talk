import React ,{useState}from "react";
import { Grid} from '@mui/material';

// components 
import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";
import Posts from "./post/Posts.jsx";
import SearchBar from "../search/Searchbar.jsx";


const Home = ()=>{
  const[query,setQuery] = useState('');
  return(
    <>
      <Banner/>
      <SearchBar setQuery ={setQuery} style={{marginleft:'100px'}}/>
      <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories query = {query} />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts query = {query}/>
                </Grid>
              
            </Grid>
    </>
  )
}

export default Home;