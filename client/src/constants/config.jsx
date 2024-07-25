
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading....",
    message: "Data is loading,Please Wait",
  },
  success: {
    title: "Success",
    message: "Data Loaded Successfully",
  },
  responseFaliure: {
    title: "Error",
    message: "An error occured while fetching response from the server.Please Try Again ",
  },
  requestFailure: {
    title: "Error",
    message: "An error occured while parsing request data",
  },
  networkError: {
    title: "Error",
    message: "Unable to connect with the server.Please check internet Connectivity",
  },
}

// API SERVICE REQUEST

// SAMPLE REQUEST

// NEED SERVICE CALL: {url:'/signup',method:'POST/PUT/DELETE/GET',params:true/false,query:true/false}

export const SERVICE_URLS = {
  userSignUp :{url:'/signup',method:'POST'},
  userLogin:{url:'/login',method:'POST'},
  uploadFile: { url: 'file/upload', method: 'POST' },
  localUploadFile:{url:'file/uploadlocal',method:'POST'},
  createPost: { url: 'create', method: 'POST' },
  getAllPosts: { url: '/posts', method: 'GET', params: true },
  getPostById: { url: 'post', method: 'GET', query: true },
  updatePost: { url: 'update', method: 'PUT', query: true },
  deletePost: { url: 'delete', method: 'DELETE', query: true },
  newComment: { url: '/comment/new', method: 'POST' },
  getAllComments: { url: 'comments', method: 'GET', query: true },
  deleteComment: { url: 'comment/delete', method: 'DELETE', query: true },
  getRefreshToken: { url: '/token', method: 'POST' },
  getUserInfo:{url:'user', method:'GET', query: true},
  updateUserInfo: { url: 'user/update', method: 'POST', query: true},
} 


