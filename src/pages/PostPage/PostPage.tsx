import React, {useEffect, useState} from 'react';
import PostForm from '../../components/PostForm';
import {Box} from '@material-ui/core';
import {RouteComponentProps} from 'react-router';
import {createPost, getPost, updatePost} from '../../services/posts.data.service';
import { Redirect } from 'react-router-dom'

interface IProps {
  getCat: Function
}

export type RParams = { id: string };

const PostPage: React.FC<IProps & RouteComponentProps<RParams>> = ({match}) => {
  const [redirectToFeed, setRedirectToFeed] = useState(false);
  const [errMsg, setErrMsg] = useState([] as string[]);
  const [post, setPost] = useState();
  const isEdit = match.path.includes('edit-post');
  const postId = (isEdit) ? match.params.id : '';
  const canRenderForm = !isEdit || (isEdit && post);  // if edit page - wait for post data
  
  useEffect(() => {
    if (isEdit) {
      // if editing exist post - get post data
      const getPostData = async () => {
        const result = await getPost(postId);
        setPost(result);
      };
      getPostData();
    }
    
  }, []);
  
  const onSubmit = (formData: FormData) => {
    // after finish with submit action - redirect to home page
    const afterAction = () => setRedirectToFeed(true);
    const request = (isEdit) ? updatePost(postId, formData) : createPost(formData);

    request
      .then(afterAction)
      .catch(
        req => req.json().then(
          (err: {error: Array<string>}) => {
            console.log(err);
            setErrMsg(err.error);
          })
      );
  };
  
  if (redirectToFeed) {
    return <Redirect to="/" />;
  }
  
  return (
    <Box p={5}>
      {
        errMsg && errMsg.map((message: string, i:number) =>
          <p key={i} style={{color: 'red'}}>{message}</p>
        )
      }
      {
        canRenderForm &&
        <PostForm post={post} onSubmit={onSubmit}/>
      }
    </Box>
  )
};

export default PostPage;
