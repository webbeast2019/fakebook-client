import React, {useRef, useState} from 'react';
import {TextField} from '@material-ui/core';
import {useInput} from '../hooks/use-input';
import {IPost} from '../models/IPost';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {imagesBaseURL} from '../services/posts.data.service';

interface IProps {
  post?: IPost;
  onSubmit: (formData: FormData) => void
}

const PostForm: React.FC<IProps> = ({post, onSubmit}) => {
  const [file, setFile] = useState();
  const [fileDataURI, setFileDataURI] = useState();
  const input = useInput((post) ? post.text : '');
  const formEl = useRef<HTMLFormElement>(null);
  
  // image selection handler
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = event.target.files && event.target.files[0];
    
    if (selectedFile) {
      // save selected file to state
      setFile(selectedFile);
      // convert to data URI. see: https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
      reader.onload = (e: any) => setFileDataURI(e && e.target && e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Note: Only successful form controls are included in a FormData object,
    // i.e. those with a name, not disabled and checked or selected.
    // for more info see: https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const formData = new FormData(formEl.current as unknown as HTMLFormElement);
    console.log(formData.forEach((k, v) => console.log(k, v)));
    if (post && post.image && !file) {
      // if editing exiting post with and image, and no new image selected - keep old image
      formData.append('image', post.image);
    }
    onSubmit(formData);
  };
  
  // show preview if post already has image OR user selected an image
  const showImgPrev = fileDataURI || (post && post.image);
  let imgPrevSrc = fileDataURI; // image source user selected file
  if (!fileDataURI && post && post.image) {
    imgPrevSrc = `${imagesBaseURL}/${post.image}`;  // image source from server
  }
  
  return (
    <form autoComplete="off" onSubmit={handleSubmit} ref={formEl}>
      <TextField
        {...input}
        name="text"
        label="Text"
        multiline
        rowsMax="20"
        margin="normal"
        fullWidth
      />
      
      <Box my={2}>
        <input
          style={{display: 'none'}}
          accept="image/*"
          id="contained-button-file"
          name="image"
          type="file"
          onChange={handleFileSelection}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        
        <Box ml={2} component="span">
          {file && file.name}
        </Box>
      </Box>
      
      {
        showImgPrev &&
        <Box border="1px solid gray" display="inline-block">
          <img src={imgPrevSrc} alt="Preview"/>
        </Box>
      }
      
      <Box my={2}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  
  
  )
};

export default PostForm;
