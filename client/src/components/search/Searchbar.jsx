
import React, { useState } from "react";
import { InputBase, IconButton, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const SearchContainer = styled(Box)`
  margin: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px; /* Adjust width as needed */
  border: 1px solid #ccc; /* Optional styling */
  border-radius: 4px; /* Optional styling */
  padding: 4px 8px;


  @media (max-width: 600px) {
    max-width: 100%;
    margin: 10px;
  }
`;

const StyledInputBase = styled(InputBase)`
  flex-grow: 1;
  padding-left: 8px;
`;

const SearchBar = ({setQuery,style}) => {
 
  const onInputChange = (e)=>{
     setQuery(e.target.value);
     //console.log(query);
     //console.log(e.target.value);
  }

  return (
    <SearchContainer style={style}>
      <StyledInputBase placeholder="Search…" onChange={(e)=>onInputChange(e)} />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </SearchContainer>
  );
}


  export default SearchBar;
