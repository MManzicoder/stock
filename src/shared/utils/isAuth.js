export const isAuth = ()   =>{
        if(typeof window == undefined){
            return false
        }else if(localStorage.getItem("auth") ){
            return JSON.parse(localStorage.getItem("user"));
        }else{
            return false
        }
    }

export const isAdmin = () =>{
        const { user } = isAuth();
      return user.role === 1 ? true : false
    }

