import React, { ReactElement } from 'react'

interface Props {
        callBack:()=>void
}

interface resultObj{
        error:string,
        loading:boolean,
        getDate:()=> Promise<void>


}

export default function useFetching(callBack:()=>void):resultObj {
      const [error,setError]=React.useState<string> ('')
      const [loading,setLoading]=React.useState<boolean> (false)
      
      const getDate=async()=>{

      try {
        setLoading(true)
        await callBack()
              
      } catch (error:any) {

        setError(error.message)
      } finally{
        setLoading(false)

      }
         }
         return { 
                error,loading,getDate
         }
}
