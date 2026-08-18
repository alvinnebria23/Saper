
const errorHandler = (error) => {
  if(error.code === "ERR_NETWORK"){
    return { fail: true, message: "Please check your internet connection.", isOutdated: false};
  }else if(error.code === "ERR_BAD_REQUEST"){
    return { 
      fail: true, 
      message: "Your subscription plan has already expired. To continue using this service, please upgrade your plan.",
      isOutdated: false 
    };
  }else{
    return { fail: true, message: "Please try again later.", isOutdated: false }; 
  }
} 

export { errorHandler };