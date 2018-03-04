import axios from 'axios';

/**
 * Upload an image using cloudinary
 * @param {Object} file
 * @return {Object} response object
 */
export default async function uploadImage(file) {
  const url = 'https://api.cloudinary.com/v1_1/olawalequest/image/upload';
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'jyesz30z');
  const response = await axios.post(url, data);
  if (response) {
    return { data: { link: response.data.url } };
  }
  return {};
}
