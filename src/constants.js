const defaultFrom = 'btc';
const defaultTo = 'ark';

const longName = {  
	bnbmainnet: { 
		ticker: 'bnb',
		sub: 'mainnet'
	},
	usdterc20 : {
		ticker: 'usdt',
		sub: 'erc20'
	}
};
  
const errorType = {
	INACTIVE: 'pair_is_inactive',
	SMALL_DEPOSIT: 'deposit_too_small'
}
  

const statuses = {
	waiting: 'waiting', 
	confirming:  'confirming', 
	exchanging: 'exchanging', 
	sending: 'sending', 
	finished: 'finished',
	failed: 'failed',
	refunded: 'refunded', 
	expired: 'expired'
  };
  
const finishedStatuses = [ 'finished', 'failed', 'refunded', 'expired' ];

const mokStatuses = ['new', 'waiting', 'confirming', 'exchanging', 'sending', 'finished', 'failed'];

module.exports = {
	defaultFrom,
	defaultTo,
	longName,
	errorType,
	statuses,
	finishedStatuses,
	mokStatuses
}