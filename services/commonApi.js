import axios from "axios";   //es moduling

//ajax and fetch can be used for api call--build in js---but some draawbacks
//axios--third party
//if appl/json ---header automatic...here file uploading so multipart form data,but if there is any change we need to provide it,also token passed via header
const commonApi = async (method, url, reqBody,reqHeader) => {
  let configObj = {
    method: method,
    url: url,
    data: reqBody,
    headers:reqHeader
  };
  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//exporitng only one thing--so default export

export default commonApi;
