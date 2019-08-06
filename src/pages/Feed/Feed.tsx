import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import PostCard from '../../components/PostCard';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link as RouterLink} from 'react-router-dom';
import {getAllPosts} from '../../services/posts.data.service';

const Feed: React.FC = () => {
  // updateRequired value is updates counter - just to force re-render (can be done with empty object as well)
  const [updateRequired, setUpdateRequired] = useState(0);
  const [posts, setPosts] = useState();
  
  useEffect(() => {
    const getPosts = async () => {
      const result = await getAllPosts();
      setPosts(result);
    };
    getPosts();
  }, [updateRequired]);
  
  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <RouterLink to={`/new-post/`}>
          <Box m={3}>
            <Button variant="contained" color="primary">
              Create new Post
            </Button>
          </Box>
        </RouterLink>

      </Grid>
      <Grid item xs={10}>
        {
          posts && posts.map((p: any) => <PostCard key={p.id} post={p}
                                                   afterDelete={() => setUpdateRequired(updateRequired + 1)}/>)
        }
      </Grid>
    </Grid>
  )
};

export default Feed;
