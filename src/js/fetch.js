import APIKEY from './apikey';

const fetchImg = async () => {
  let URI = 'https://api.unsplash.com/photos?page=1&client_id=';
  const images = await fetch(`${URI}${APIKEY}`)
    .then(res => res.json())
    .then(res => res.map(item => item.urls.small));
  return images.length === 10 ? images : console.log('Something went wrong');
};

export default fetchImg;