import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';

interface IProps {
  post: any;
}

const PostCard: React.FC<IProps> = ({post}) => {
  return (
    <Box p={3}>
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
