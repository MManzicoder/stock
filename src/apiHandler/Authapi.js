import { API } from "../shared/context/modes"
export const request = (url, method, data, headers={}) =>{
      return fetch(`${API}/${url}`, {
              method: method,
              headers: headers,
              body: JSON.stringify(data)
      })
      .then(res=> res.json()).catch(err => console.log(err.message))
}

export const getRequest = (url, headers)=>{
        return fetch(`${API}/${url}`, {
                method: "GET",
                headers: headers
        })
        .then(res=>res.json()).catch(err=>console.log(err.message))
}
export const DeteremineTheOwner = async (url, data)=>{
        return fetch(`${API}/${url}`, {
                method: "GET",
                body: data,
                headers: {}
        })
        .then(res=>res.json())
        .catch(err=>console.log(err.message))
}