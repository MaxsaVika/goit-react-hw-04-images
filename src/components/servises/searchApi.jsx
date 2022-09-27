import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '29165629-e4560c22cdc5666e7412722cd';

export const searchApiImg = async (search, page=1) => {
  const respons = await axios.get(
    `?key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&q=${search}&safesearch=true&per_page=12`
  );
  return await respons.data;
};