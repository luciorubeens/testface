const config = require('./config.json');
const API_BASE_URL = 'https://changenow.io/api/v1';

const API_KEY = config.api_key;

class ApiWorker {
  constructor (client) {
    this.client = client;
  }

  async getAllCurrencies () {
    const res = await this.client.get(`${API_BASE_URL}/currencies?active=true`);
    const data = JSON.parse(res.body);
    return data;
  }

  async exchangeAmount (fromTo, amount = 1) {
    // https://changenow.io/api/v1/exchange-amount/1.314452/btc_eth?api_key=changenow"
    const res = await this.client.get(`${API_BASE_URL}/exchange-amount/${amount}/${fromTo}?api_key=${API_KEY}`);
    const data = JSON.parse(res.body);
    return data;
  }

  async availableCurrencies (currency) {
    // https://changenow.io/api/v1/currencies-to/btc"
    const res = await this.client.get(`${API_BASE_URL}/currencies-to/${currency}`);
    const data = JSON.parse(res.body);
    return data;
  }

  async minilalExchangeAmount (fromTo) {
    // https://changenow.io/api/v1/min-amount/:from_to
    const res = await this.client.get(`${API_BASE_URL}/min-amount/${fromTo}`);
    const data = JSON.parse(res.body);
    return data;
  }

  async createExchange (params = {}) {
    // https://changenow.io/api/v1/transactions/:api_key
    const res = await this.client.post(`${API_BASE_URL}/min-amount/${API_KEY}`, params);
    const data = JSON.parse(res.body);
    return data;
  }

  async getCurrencyInfo (ticker) {
    const res = await this.client.get(`${API_BASE_URL}/currencies/${ticker}`);
    const data = JSON.parse(res.body);
    return data;
  }

    // params = {
      // from (Required): Ticker of a currency you want to send
      // to (Required): Ticker of a currency you want to receive
      // address (Required): Address to receive a currency
      // amount (Required): Amount you want to exchange
      // extraId (Optional): Extra Id for currencies that require it
      // refundAddress (Optional): Refund address
  // }
  async createTransaction (params) {
    const options = {
      json: true,
      headers: {
        'Content-type': 'application/json'
      },
      body: params
    };
    const { body } = await this.client.post(`${API_BASE_URL}/transactions/${API_KEY}`, options);
    return body;
  }
    // GET /api/v1/transactions/:id/:api_key
  // new
  // waiting
  // confirming
  // exchanging
  // sending
  // finished
  // failed
  // refunded
  // expired
  async getTransactionStatus (id) {
    const res = await this.client.get(`${API_BASE_URL}/transactions/${id}/${API_KEY}`);
    const data = JSON.parse(res.body);
    return data;
  }
}

module.exports = ApiWorker;