import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import PostCard from '../../components/PostCard';
import Button from '@material-ui/core/Button';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState();
  
  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch('http://localhost:4000/api/posts');
      setPosts(await result.json());
    };
    getPosts();
  }, []);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        
        <Button variant="contained" color="primary">
          Create new Post
        </Button>
      </Grid>
      <Grid item xs={8}>
        {
          posts && posts.map((p: any) => <PostCard key={p.id} post={p}/>)
        }
      </Grid>
    </Grid>
  )
};

export default Feed;
