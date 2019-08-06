import React, {FormEventHandler, useRef} from 'react';
import {TextField} from '@material-ui/core';
import {useInput} from '../hooks/use-input';
import {IPost} from '../models/IPost';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

interface IProps {
  post? : IPost;
  onSubmit: (formData: FormData) => void
}

const PostForm: React.FC<IProps> = ({post, onSubmit}) => {
  const input = useInput((post) ? post.text : '');
  const formEl = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    // Note: Only successful form controls are included in a FormData object,
    // i.e. those with a name, not disabled and checked or selected.
    // for more info see: https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
    const formData = new FormData(formEl.current as unknown as HTMLFormElement);
    onSubmit(formData);
  };
  
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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>


  )
};

export default PostForm;
