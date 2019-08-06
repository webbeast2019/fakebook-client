import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {deletePost} from '../services/posts.data.service';
import {IPost} from '../models/IPost';

interface IProps {
  post: IPost;
  afterDelete: Function
}

const PostCard: React.FC<IProps> = ({post, afterDelete}) => {
  const deleteMe = () => {
    deletePost(post.id)
      .then(() => afterDelete()); // notify parent data has changed
  };
  
  return (
    <Box p={3}>
      <RouterLink to={`/edit-post/${post.id}`}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
      </RouterLink>
  
      <Button variant="contained" color="secondary" onClick={deleteMe}>
        Delete
      </Button>
      
      <Card>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.text}
            </Typography>
            {/*<CardMedia image={post.imgSrc}/>*/}
          </CardContent>
        </Card>
    </Box>
  )
};

export default PostCard;
