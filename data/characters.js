//import axios, md5
import axios from "axios";
import help from '../helpers.js'
// import {config} from 'dotenv'; // Import config function from dotenv
// config();
// const privatekey= process.env.PRIVATE_KEY
import md5 from 'blueimp-md5' //you will need to install this module;
const publickey = '8afbf0b7c782b8acf89468f94ea2c953';
const privatekey = process.env.MARVEL_PRIVATE_KEY;

// console.log('Environment check:');
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('Private key loaded:', privatekey ? 'Yes' : 'No');
// console.log('Private key length:', privatekey ? privatekey.length : 0);


const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const count = 15;
//const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  if (!privatekey) {
    throw 'Error: Marvel private key not configured. Please set MARVEL_PRIVATE_KEY environment variable.';
  }
  name = help.checkString(name,'Char Name');
  const url = baseUrl + '?nameStartsWith='+ name + '&limit='+count +'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  
  try{
    let { data } = await axios.get(url)
    if(data.data.results.length === 0){
      throw `No character found for ${name}`
    }
    return data.data.results
  }
  catch(e){
    if (e.code === 'ENOTFOUND') 
      throw 'Error: Invalid URL';
    else if (e.response){
      throw `Error: ${e.response.status}: ${e.response.statusText}`;
    }
    else {
      throw `Error: ${e}`;
      //throw "Error, Could not fetch data 
    }
  }

};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  if (!privatekey) {
    throw 'Error: Marvel private key not configured. Please set MARVEL_PRIVATE_KEY environment variable.';
  }
  id = help.checkId(id,'Id')
  const intId = parseInt(id)
  
  const url = baseUrl +'/'+ intId +'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  try{
    const { data } = await axios.get(url)
    if(data.data.results.length === 0){
      throw 'Could not fetch data'
    }
    return data.data.results[0]
  }
  catch(e){
    if (e.code === 'ENOTFOUND') 
      throw 'Error: Invalid URL';
    else if (e.response){
      throw `Error: ${e.response.status}: ${e.response.statusText}`;
    }
    else {
      throw `Error: ${e}`;
      //throw "Error, Could not fetch data 
    }
  }
};
