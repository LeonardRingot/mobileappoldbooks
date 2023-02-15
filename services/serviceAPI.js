import axios from "axios";
const url= 'http://localhost:5000';

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

export function requeteList()
{
    
    var configList ={
        method: 'get',
    url: `http://localhost:5000/api/list`,
    headers: {
      'Content-Type': 'application/json'
      
    },
    };
    return axios(configList);
}