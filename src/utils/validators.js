const currenciesRules = require('./currencies-regex.json');

const valiateAddress = (currency, address) => {
	if (currenciesRules[currency.toLowerCase()]) {
		const matches = address.match(currenciesRules[currency.toLowerCase()].regEx);
		if (matches) {
			return true;
		}
		return false;
	}
	return true;
  }
  
const valiateExternalId = (currency, id) => {
	const ticker = currency.toLowerCase();
	if (currenciesRules[ticker] && currenciesRules[ticker].regExTag) {
		const matches = id.match(currenciesRules[ticker].regExTag);
		if (matches) {
			return true;
		}
		return false;
	}
	return true;
	}
	
	module.exports = {
		valiateAddress,
		valiateExternalId
	}