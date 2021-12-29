import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { API } from './shared/context/modes';
import { QueryClient, QueryClientProvider} from "react-query";
 import "./index.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
// const prefetchProducts = async () =>{
//   await queryClient.prefetchQuery("foundProducts", ()=>fetch(`${API}/foundProducts`, { method: "GET", headers: {"bearer": `${localStorage.getItem("auth")}`}}).then(res=>res.json()))
// }
// console.log(prefetchProducts);
ReactDOM.render(
  <React.StrictMode>
   <QueryClientProvider client = {queryClient}>
       <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

