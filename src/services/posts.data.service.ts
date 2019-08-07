import {IPost} from '../models/IPost';
const baseURL = 'http://localhost:4000/api';

export function getAllPosts(): Promise<IPost> {
  return fetch(`${baseURL}/posts`)
    .then(res => res.json())
}

export function getPost(id: number): Promise<IPost> {
  return fetch(`${baseURL}/posts/${id}`)
    .then(res => res.json())
}
// const formData = new FormData();
// formData.append('file', fileInput.files[0]);
export function createPost(formData: FormData): Promise<IPost> {
  return fetch(`${baseURL}/posts/`,{
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
}

export function updatePost(id: number, formData: FormData): Promise<IPost> {
  formData.append('id', id.toString()); // add id to body
  
  return fetch(`${baseURL}/posts/${id}`,{
    method: 'PUT',
    body: formData
  })
    .then(res => res.json())
}

export function deletePost(id: number): Promise<any> {
  return fetch(`${baseURL}/posts/${id}`,{
    method: 'DELETE',
  })
}
