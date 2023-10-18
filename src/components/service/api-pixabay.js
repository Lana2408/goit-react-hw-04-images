import axios from 'axios';

const API_KEY = '38946466-fa6699ad8b99455192464034d';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (serchedQuery, page, perPage) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${serchedQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return response.data;
};