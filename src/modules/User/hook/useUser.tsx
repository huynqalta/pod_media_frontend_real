import React from 'react'
import {userReducerName} from "@reducer/userReducer"
import { RootState } from '@reducer/RootReducer';
import { useSelector } from 'react-redux';
interface Props {
    
}
const selector = (state: RootState) => {
    return state[userReducerName];
  };
  

const useUser = () => {
    const state = useSelector(selector);
   
    return {
      listAllUser: state["listAllUser"] || [],
      listUser: state["listUser"] || [],
      total: state["total"] || 0,
      currentPage: state["currentPage"] || 1,
      status: state["status"] || "init",
    };
}

export default useUser
