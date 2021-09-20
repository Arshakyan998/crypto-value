import React from 'react'



export const usePagination = (totalCoutn:number,limit:number) => {

const result=React.useMemo(()=>{
return Math.ceil(totalCoutn/limit)
},[totalCoutn])  
return result
}

