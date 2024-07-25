import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg);
    width: 100%;
    height: 50vh;
    // background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">TECH TALK</Typography>
                <Text variant="h5">Welcome to Tech Talk, the ultimate platform for tech enthusiasts of all levels! Whether you're a seasoned professional eager to share your expertise or a curious beginner ready to dive into the world of technology, Tech Talk is the place for you.
                Our mission is to bridge the gap between experienced tech professionals and aspiring learners by fostering a community where knowledge is freely shared and learning is encouraged. Here, you can find insights and guidance on a wide range of tech fields, from competitive programming to cutting-edge developments in various technological domains.
<br/> 
<br/>
<b>What We Offer:</b>
<br/>
<b>1.Expert Knowledge Sharing:</b> Gain valuable insights from experienced individuals who are passionate about sharing their knowledge and skills.
<br/>
<b>2.Beginner-Friendly Resources:</b> Access curated content and resources designed to help beginners navigate their way into the tech world.
<br/>
<b>3.Diverse Tech Fields:</b> Explore topics across various tech fields, including but not limited to competitive programming, web development, data science, and more.
<br/>
<b>4.Community Engagement:</b> Connect with like-minded individuals, participate in discussions, and collaborate on projects to enhance your learning experience.
<br/>


Join us at Tech Talk and become a part of a thriving community dedicated to continuous learning and growth in the ever-evolving world of technology.
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Resovijay" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;