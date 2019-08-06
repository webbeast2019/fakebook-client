import React, {useEffect, useState} from 'react';
import PostForm from '../../components/PostForm';
import {Box} from '@material-ui/core';
import {RouteComponentProps} from 'react-router';
import {createPost, getPost} from '../../services/posts.data.service';
import { Redirect } from 'react-router-dom'

interface IProps {
  getCat: Function
}

export type RParams = { id: string };

const PostPage: React.FC<IProps & RouteComponentProps<RParams>> = ({match}) => {
  const [redirectToFeed, setRedirectToFeed] = useState(false);
  const [post, setPost] = useState();
  const isEdit = match.path.includes('edit-post');
  const canRenderForm = !isEdit || (isEdit && post);  // if edit page - wait for post data
  
  useEffect(() => {
    if (isEdit) {
      // if editing exist post - get post data
      const id = parseInt(match.params.id);
      const getPostData = async () => {
        const result = await getPost(id);
        setPost(result);
      };
      getPostData();
    }
    
  }, []);
  
  const onSubmit = (formData: FormData) => {
    if (isEdit) {
    
    } else {
      // creating new post
      createPost(formData).then(() => {
        setRedirectToFeed(true);
      });
    }
  };
  
  if (redirectToFeed) {
    return <Redirect to="/" />;
  }
  
  return (
    <Box p={5}>
      {
        canRenderForm &&
        <PostForm post={post} onSubmit={onSubmit}/>
      }
    </Box>
  )
};

export default PostPage;
