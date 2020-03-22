const AWS = require('aws-sdk');
const config = require('config');
const { v4: uuid } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
});

const deleteAllFileFromFolder = async (folderName, subFolder) => {
  const params = {
    Bucket: config.s3.bucketName,
    Prefix: `${folderName}/${subFolder}`,
  };

  s3.listObjects(params)
    .promise()
    .then(async (data) => {
      const listedObjects = data.Contents;

      const deleteParams = {
        Bucket: config.s3.bucketName,
        Delete: { Objects: [] },
      };

      listedObjects.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
      });

      if (deleteParams.Delete.Objects.length > 0) {
        await s3.deleteObjects(deleteParams)
          .promise();
      }
    });
};

const uploadFile = async (photo, folderName, subFolder) => {
  try {
    const base64Data = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = photo.split(';')[0].split('/')[1];
    await deleteAllFileFromFolder(folderName, subFolder);
    const uploadParams = {
      Bucket: config.s3.bucketName, // pass your bucket name
      Key: `${folderName}/${subFolder}/${uuid()}.${type}`, // file will be saved as testBucket/contacts.csv
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}`, // required. Notice the back ticks
    };
    const { Location } = await s3.upload(uploadParams)
      .promise();
    return Location;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadFile,
  deleteAllFileFromFolder,
};
