import React from 'react'


export function useLazyaLoad  (
    
        page:number,                    
        pages:number,                   
        setPage:any,                  
        loading:boolean,               
        showBlock:HTMLDivElement | any 

        )  {
   
                const obsorever=React.useRef<null | any>() 

        React.useMemo(() => {


                if(obsorever.current!==null) obsorever.current?.disconnect()
                if(loading) return
                let callback = (entries:any)=> {
                if(entries[0].isIntersecting && page<pages ){
                      setPage((prev:number)=>prev+1)               
                  }
                  
               }
               obsorever.current = new IntersectionObserver(callback);
              if(showBlock){
                obsorever.current.observe(showBlock)
              }

               
               },[loading])
}
