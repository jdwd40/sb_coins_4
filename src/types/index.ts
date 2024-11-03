export interface User {
  id: string;
  email: string;
  user_metadata: {
    username: string;
  };
}

export interface UserFunds {
  user_id: string;
  funds: string;
}

export interface Coin {
  coin_id: number;
  name: string;
  symbol: string;
  current_price: string;
  supply: string;
  market_cap: string;
  date_added: string;
  description: string;
  percentage5mins?: string;
  percentage10mins?: string;
  percentage30mins?: string;
}

export interface MarketEvent {
  type: string;
  start_time: string;
  end_time: string;
}

export interface MarketData {
  marketTotal: string;
  currentEvent?: MarketEvent;
  percentage5mins?: string;
}

export interface PortfolioItem {
  portfolio_id: number;
  user_id: string;
  coin_id: number;
  amount: string;
  name: string;
  current_price: string;
}