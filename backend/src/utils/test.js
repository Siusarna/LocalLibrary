const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
chai.should();

function UtilsController(server) {
  async function sendRequest({
    url, body, headers, method = 'post',
  }) {
    const req = chai.request(server)[method](url);

    if (headers) {
      req.set('accessToken', headers.accessToken);
      req.set('refreshToken', headers.refreshToken);
    }

    // eslint-disable-next-line no-return-await
    return await req.send(body);
  }

  async function sendGetRequest({
    url, headers,
  }) {
    const req = chai.request(server).get(url);
    if (headers) {
      req.set('accessToken', headers.accessToken);
      req.set('refreshToken', headers.refreshToken);
    }
    // eslint-disable-next-line no-return-await
    return await req;
  }

  // eslint-disable-next-line consistent-return
  function checkResponse(response, properties, { status = 200, returnProps, resType }) {
    response.should.have.status(status);
    // eslint-disable-next-line no-unused-expressions
    response.should.be[resType || 'json'];

    if (Array.isArray(properties)) {
      properties.forEach((property) => {
        response.body.should.have.property(property.name);
        response.body[property.name].should.be.a(property.type);
        if (property.value) {
          response.body[property.name].should.equal(property.value);
        }
      });
    }
    if (returnProps) {
      if (Array.isArray(returnProps)) {
        return returnProps.map((property) => response.body[property]);
      }
      return response.body[returnProps];
    }
  }

  async function checkPostingResource(reqOpt, resBody, resOpt, isNegative) {
    if (isNegative) {
      try {
        await sendRequest(reqOpt);
      } catch (err) {
        return checkResponse(err.response, resBody, resOpt || {});
      }
    }
    return checkResponse(await sendRequest(reqOpt), resBody, resOpt || {});
  }

  async function checkGettingResource(reqOpt, resBody, resOpt, isNegative) {
    if (isNegative) {
      try {
        await sendGetRequest(reqOpt);
      } catch (err) {
        return checkResponse(err.response, resBody, resOpt || {});
      }
    }
    return checkResponse(await sendGetRequest(reqOpt), resBody, resOpt || {});
  }

  return {
    checkPostingResource,
    checkGettingResource,
  };
}

module.exports = UtilsController;
