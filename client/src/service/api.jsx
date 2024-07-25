import axios from 'axios';
import {API_NOTIFICATION_MESSAGES, SERVICE_URLS} from'../constants/config'
import { getAccessToken,getType} from '../utils/common-utils';
const API_URL = 'http://localhost:7000';


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, 
  headers: {
     "Accept": "application/json",
      "Content-Type": " multipart/form-data"
  }
});


axiosInstance.interceptors.request.use(
      function(config){
        if (config.TYPE.params) {
          config.params = config.TYPE.params
      } else if (config.TYPE.query) {
          config.url = config.url + '/' + config.TYPE.query;
      }
       console.log(config.params);
       console.log(config.url);
      return config;
      },
      function(error){
        return Promise.reject(error);
      }
)

axiosInstance.interceptors.response.use(
    function(response){
      // stop loader here
      return processResponse(response);
    },
    function(error){
      // stop loader here  
      return Promise.reject(processError(error));
    }
)

// if success = return {isSuccess:true,data:Object}
// if failure = return {isSucesss:false,status:string ,msg:string,code:int}

const processResponse = (response)=>{
  if(response?.status === 200) {
    return { isSuccess: true,data: response.data }
  }
  else{
    return {
        isFailure: true,
        status: response?.status,
        mag: response?.msg,
        code: response?.code
    }
  }
}

const processError  = (error)=>{
   
    if(error.response){
       // REQUEST ARE MADE SUCCESSFULLY BUT SERVER RESPONDED WITH A STATUS OTHER THAN
       // THAT FALLS OUT OF RANGE 2.X.X

       if (error.response?.status === 403) {
              sessionStorage.clear();
         }

       console.log(error.response);
       console.log("ERROR IN RESPONSE",error.toJSON());
       return {
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.responseFaliure,
        data:error?.response?.data,
        code:error.response.status
       }
    }
    else if(error.request){
       // REQUEST ARE MADE SUCCESSFULLY BUT DIDNT RECEIVE RESPONSE FROM SERVE 
       console.log("ERROR IN REQUEST",error.toJSON());
       return {
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.requestFailure,
        code:""
       }
    }
    else{
       //something happen in writing the request that trigger an error 
       console.log("ERROR IN NETWORK",error.toJSON());
       return {
        isError:true,
        msg:API_NOTIFICATION_MESSAGES.networkError,
        code:""
       }
    }
}


const API={};

for(const[key,value] of Object.entries(SERVICE_URLS)){
   API[key] =(body,showUploadProgress,showDownloadProgress) =>
           axiosInstance({
             method:value.method,
             url :value.url,
             data:value.method === 'DELETE' ? {} : body,
             responseType:value.responseType,
             headers:{
                  authorization:getAccessToken()
             },
             TYPE: getType(value, body),
             onuploadProgress:function(progressEvent){
               if(showUploadProgress){
                 let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                 showUploadProgress(percentageCompleted);
               }
             } ,
             onDownloadProgress:function(progressEvent){
              if(showDownloadProgress){
                let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                showDownloadProgress(percentageCompleted);
              }
            } 

           });
   }

export {API};