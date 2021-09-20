import React from "react";
import { useHistory } from "react-router";

import servicWorker from "../servicWorker/servicWorker";
import useFetching from "../userHooks/useFetching";
import { usePagination } from "../userHooks/usePagination";

import { Header } from "./Header";
import { Pagination } from "./Pagination";

export interface value {
  id: string;
  name: string;
  year_established: null | number;
  country: string;
  description: "";
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export const Main: React.FC = (): React.ReactElement => {
  const currentPage = React.useRef<number>(1);

  const [data, setData] = React.useState<value[]>([]);
  const [tatalPages, setTotalPages] = React.useState<number>();
  const [limit, setLimit] = React.useState<number>(20);
  const [page, setPage] = React.useState<number>(currentPage.current);

  const [reverse,setReverse]=React.useState<boolean>(true)

  const history = useHistory();

  const { getDate, error, loading } = useFetching(async () => {
    const response = await servicWorker.getDate(page, limit);
    setTotalPages(+response.headers.total);
    setData(response.data);
  });

  const pages = usePagination(tatalPages ? tatalPages : 0, limit);

  React.useEffect(() => {
    getDate();
  }, [page]);

  const nextPage = (page: number): void => {
    if (page <= pages) {
      setPage(page);
      setReverse(true);

    }
  };
  const prevPage = (page: number): void => {
    if (page > 0) {
      currentPage.current = page;
      setPage(currentPage.current);
      setReverse(true);

    }
  };


  
  const sortArrResult =(key:string) => {
    const newArr = data
      .reduce((aggr: any[], value: any) => {
        aggr.push(value[key].toLowerCase());

        return aggr;
      }, [])
      .sort();

      console.log(newArr);
      

    const fakeArr = [...data];

    const result = newArr.reduce((aggr: any[], value: any) => {
      const index = fakeArr.findIndex((el: any) => el[key].toLowerCase() === value);

      if (index > -1) {
        aggr.push(fakeArr[index]);
        fakeArr.slice(index, 1);
      }
      return aggr;
    }, []);
    
    return result;
    
  }

  const sortArr:React.MouseEventHandler<HTMLTableDataCellElement>=(e)=>{
     switch (e.currentTarget.innerText) {
    case "name":
      if (reverse) {
        setData(sortArrResult(e.currentTarget.innerText));
        setReverse(false);
      } else {
        setData(sortArrResult(e.currentTarget.innerText).reverse());
        setReverse(true);
      }

      break;
  }

  }
  return (
    <div>
      <Header />
      {
        loading ? <div className='loader'></div>:
      
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td>N</td>
            <td onClick={sortArr}>name</td>
            <td>trade_volume_24h_btc</td>
            <td>trade_volume_24h_btc_normalized</td>
            <td>trust_score</td>
            <td>trust_score_rank</td>
            <td>has_trading_incentive</td>
            <td>year_established</td>
            <td>country</td>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            return (
              <tr key={el.id} onClick={() => history.push(`/main/${el.id}`)}>
                <td>
                  <img src={el.image} alt="" />
                </td>
                <td>{el.name}</td>
                <td>{el.trade_volume_24h_btc}</td>
                <td>{el.trade_volume_24h_btc_normalized}</td>
                <td>{el.trust_score}</td>
                <td>{el.trust_score_rank}</td>
                <td>
                  {el.has_trading_incentive ? (
                    <input type="checkbox" checked disabled />
                  ) : (
                    <input type="checkbox" disabled />
                  )}
                </td>
                <td>{el.year_established}</td>

                <td>{el.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>}
      {error && <p> {error} </p>}
      <Pagination
        pages={pages}
        currentPage={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};
