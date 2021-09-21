import React from "react";
import { useHistory, useParams } from "react-router";

import servicWorker from "../servicWorker/servicWorker";
import useFetching from "../userHooks/useFetching";

import "./main.scss";

interface Params {
  id: string | number | any;
}
interface vol {
  btc: number;
  eth: number;
  usd: number;
}
interface market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

interface ticets {
  base: string;
  bid_ask_spread_percentage: number;
  coin_id: string;
  converted_last: vol;
  converted_volume: vol;
  is_anomaly: boolean;
  is_stale: boolean;
  last: number;
  last_fetch_at: string;
  last_traded_at: string;
  market: market;
  target: string;
  target_coin_id: string;
  timestamp: string;
  token_info_url: null | any;
  trade_url: string;
  trust_score: string;
  volume: number;
}

interface data {
  alert_notice: string;
  centralized: boolean;
  country: string;
  description: string;
  facebook_url: string;
  has_trading_incentive: boolean;
  image: string;
  name: string;
  other_url_1: string;
  other_url_2: string;
  public_notice: string;
  reddit_url: string;
  slack_url: string;
  status_updates: any[];
  telegram_url: string;
  tickers: ticets[];
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  trust_score: null;
  trust_score_rank: number;
  twitter_handle: string;
  url: string;
  year_established: number;
}

export const GetById:React.FC = ():React.ReactElement => {
  const params: Params = useParams();

  const history=useHistory()
  const [date, setDate] = React.useState<data>();
  const [showGlobalParams, setShowGlobalParams] =
    React.useState<boolean>(false);

  const { getDate, loading, error } = useFetching(async () => {
    const response = await servicWorker.getUniqDate(params.id);
    setDate(response);
  });
  console.log(date);

  React.useEffect(() => {
    getDate();
  }, []);

  const chnageParamsShow = (): void => {
    setShowGlobalParams((prev) => !prev);
  };

  return (
    <>
    {loading? <div className='loader'></div>:
    <div className="main">
      <button onClick={()=>history.push('/')}>
        Back
      </button>
      <div>
        <img src={date?.image} alt="" />
      </div>
      <div>
        <h1>{date?.name}</h1>
      </div>
      <div>
        <h1>country :{date?.country}</h1>
      </div>
      <div>
        year_established <b>{date?.year_established}</b>
      </div>
      <div>
        officila:
        <a href={date ? date.url : ""}> {date?.url}</a>
      </div>
      <div>
        facebook :<a href={date ? date.facebook_url : ""}> {date?.facebook_url?date.facebook_url:<span style={{
          pointerEvents:'none',
          outline:'none',
          
        }}>none</span>}</a>
      </div>
      <div>
        telegram :<a href={date ? date.telegram_url : ""}> {date?.telegram_url ? date.telegram_url:<span style={{
          pointerEvents:'none',
          outline:'none',
          
        }}>none</span> }</a>
      </div>
      <div>
        reddit :<a href={date ? date.reddit_url : ""}> {date?.reddit_url ?date.reddit_url:<span style={{
          pointerEvents:'none',
          outline:'none',
          color:'red'
          
        }}>none</span>  }</a>
      </div>
      <div>
        trade_volume_24h_btc : <b>{date?.trade_volume_24h_btc}</b>
      </div>
      <div>
        trade_volume_24h_btc_normalized :{" "}
        <b>{date?.trade_volume_24h_btc_normalized}</b>
      </div>
      <div>
        <h3>{date?.description}</h3>
      </div>

      <button onClick={chnageParamsShow}>{showGlobalParams ? "-" : "+"}</button>
      <div className={showGlobalParams ? "main_show" : "main_show hidden"}>
        {date?.tickers.map((el) => {
          return (
            <div key={el.trade_url + el.volume}>
              <div>
                <h1>{el.base}</h1>
              </div>
              <div>
                bid_ask_spread_percentage:
                {el.bid_ask_spread_percentage
                  ? el.bid_ask_spread_percentage
                  : "none"}
              </div>
              <div>target: {el.market.name}</div>
              <div>
                has_trading_incentive:
                {el.market.has_trading_incentive ? "yes" : "no"}
              </div>
              <div>target: {el.target}</div>
              <div>
                trade_url:{" "}
                <a href={el.trade_url}>
                  {el.trade_url ? el.trade_url : "none"}
                </a>
              </div>
              <div>volume:{el.volume}</div>
              <div>last:{el.last}</div>

              <div>timestamp:{el.timestamp}</div>
            </div>
          );
        })}
      </div>
    </div>}
    </>
  );
};

export default GetById;
