import axios from "axios";

export function requeteConnexion(code) {
  var data = JSON.stringify({
    "code": code
  });
  var configConnexion = {
    method: 'post',
    url: `http://localhost:5000/api/v1/login`,
    headers: {
      'Content-Type': 'application/json'
      
    },
    data: data
  };
  return axios(configConnexion);
}
export function requeteBook(nameBook, nameAuthor)
{
    var data = json.stringify({
        "nameBook" :nameBook,
        "nameAuthor":nameAuthor
    });
    var configBook ={
        method: 'get',
    url: `http://localhost:5000/api/v1/book`,
    headers: {
      'Content-Type': 'application/json'
      
    },
    data: data
    };
    return axios(configBook);
}

export function requeteSpot(nameSpot)
{
    var data = json.stringify({
        "nameSpot" :nameSpot,
    });
    var configSpot ={
        method: 'get',
    url: `http://localhost:5000/api/v1/spot`,
    headers: {
      'Content-Type': 'application/json'
      
    },
    data: data
    };
    return axios(configSpot);
}