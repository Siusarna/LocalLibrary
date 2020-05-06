const queries = require('./queries');
const { uploadFile, deleteAllFileFromFolder } = require('../utils/s3-bucket');

const addNews = async ({
  header, shortDescription, description, photo,
}) => {
  const [newNews] = await queries.addNews({
    header,
    shortDescription,
    description,
  });
  if (photo) {
    const photoUri = await uploadFile(photo, 'News', newNews.id);
    await queries.updateNewsById(newNews.id, { photo: photoUri });
  }
  return queries.getNewsById(newNews.id);
};

const deleteNews = async ({ id }) => {
  const [news] = await queries.getNewsById(id);
  if (!news) {
    throw new Error('This news doesnt exist');
  }
  await deleteAllFileFromFolder('News', id);
  await queries.deleteNewsById(id);
};

const getAllNews = () => queries.getAllNews();

const getOneNews = async ({ id }) => {
  const [news] = await queries.getNewsById(id);
  if (!news) {
    throw new Error('News with this id doesnt exist');
  }
  return news;
};

const updateNews = async ({
  id, ...newData
}) => {
  const [news] = await queries.getNewsById(id);
  if (!news) {
    throw new Error('News with this id doesnt exist');
  }
  if (newData.photo) {
    newData.photo = await uploadFile(newData.photo, 'News', news.id);
  }
  await queries.updateNewsById(news.id, { ...newData });
  return queries.getNewsById(news.id);
};

module.exports = {
  addNews,
  deleteNews,
  getAllNews,
  getOneNews,
  updateNews,
};
