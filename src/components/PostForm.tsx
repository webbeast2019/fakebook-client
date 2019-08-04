import React from 'react';
import {TextField} from '@material-ui/core';
import {useInput} from '../hooks/use-input';

const PostForm: React.FC = () => {
  const input = useInput();
  return (
      <form autoComplete="off">
        <TextField
            {...input}
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            margin="normal"
        />
      </form>


  )
};

export default PostForm;
