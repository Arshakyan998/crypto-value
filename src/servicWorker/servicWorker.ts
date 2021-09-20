import axios from "axios"

import React from "react"
import { value } from "../components/Main"

export default class servicWorker{

        static getDate=async (page:number,limit:number)=>{
const response= await axios.get(`https://api.coingecko.com/api/v3/exchanges?page=${page}&per_page=${limit}`)
const data=await response
        return data
        }

        static getUniqDate=async(id:string|number)=>{
                const response= await fetch(`https://api.coingecko.com/api/v3/exchanges/${id}`)
                const data=await response.json()
                return data
        }
        static searchQuery=async()=>{
                const response= await axios.get(`https://api.coingecko.com/api/v3/exchanges`)
                const data=await response.data
                 return data  
        }

         
              

} 

