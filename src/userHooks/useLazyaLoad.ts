import React from 'react'


export function useLazyaLoad  (
    
        page:number,                    // page es pahin vor ejum enq et ejna
        pages:number,                   // qani hat ej ka eta
        setPage:any,                   // state (page) poxox funkciana
        loading:boolean,               // loadingna
        showBlock:HTMLDivElement | any // es en elementna um petqa hetevvi

        )  {
   
                const obsorever=React.useRef<null | any>() // esi ena ov vor nayuma showBlockin

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
