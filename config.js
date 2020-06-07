const apiKey = require('./config.secret').apiKey;

module.exports = {
  apiKey,
  resourceInstanceId:
    'crn:v1:bluemix:public:cloud-object-storage:global:a/e5da8457710d10300cc55fb4bf0ab0b6:ec3363e8-0c96-47d7-8066-a16778146aee::',
  endPoint: 's3.eu-gb.cloud-object-storage.appdomain.cloud',
  ibmAuthEndpoint: 'https://iam.cloud.ibm.com/oidc/token',
  bucketName: 'pet-or-pest-storage'
};
