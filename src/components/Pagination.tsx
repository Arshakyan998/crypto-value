import React from 'react'

interface Props {
        pages:number
        currentPage:number
        nextPage:(page:number)=>void
        prevPage:(page:number)=>void
}

export const Pagination:React.FC<Props> = ({pages,currentPage,nextPage,prevPage}):React.ReactElement => {

        const changeCurrentPage=():void=>{
                nextPage(currentPage+1)
        }

        const changePage=():void=>{
                prevPage(currentPage-1)

        } 
        return (
                <div style={{margin:'15px auto',textAlign:'center'}}>
                       <button onClick={changePage}>&larr; </button> 
                       {
                               currentPage +'/'+pages
                       }

                       <button onClick={changeCurrentPage}>&rarr; </button>

                </div>
        )
}
