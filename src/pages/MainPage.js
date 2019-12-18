const ApiWorker = require('../apiWorker');
const style = require('./mainPageStyles');
const renderMapImage = require('../components/renderMap');
const { longName } = require('../constants');
const { defaultFrom, defaultTo, defaultAmount } = require('../config.json');

const {
  pluginContainer,
  formContainer,
  mainPageHeader,
  mainHeader,
  subTitle,
  mainBlock,
  labelsBlock,
  formBlock,
  inputWrapper,
  exchangeButton,
  input,
  exchangeInputTitle,
  exchangeInputSearch,
  arrow,
  sequenceBlock,
  circle,
  line,
  exchangeSequence,
  toggleButton,
  coinIcon,
  selectFromWrapper,
  selectContainer,
  searchInput,
  currencyListContainer,
  currencyList,
  currencyItem,
  coinName,
  coinTicker,
  inputLoader,
  sreachIcon,
  subName,
} = style;


const { faArrowsAltV, faSpinner, faLongArrowAltDown, faLongArrowAltUp, faSearch, faExternalLinkAlt } = walletApi.icons.icons;


module.exports = {
  template: `
    <div class="rounded-lg px-0 py-2 flex flex-col" style="${pluginContainer}" @click="outSideClick">
      <div style="${mainPageHeader}">
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="ChangeNOW-logo-transparent">
        <g id="Group">
        <path id="NOW" fill-rule="evenodd" clip-rule="evenodd" d="M25.6804 91.258H22.4865V66.1474H25.6266L39.802 85.8635H39.9635V66.1474H43.1574V91.258H40.0173L25.8419 71.6115H25.6804V91.258ZM60.3341 65.7297C67.673 65.7297 72.2666 70.7414 72.2666 78.7114C72.2666 86.6814 67.673 91.6757 60.3341 91.6757C52.9952 91.6757 48.4017 86.6814 48.4017 78.7114C48.4017 70.7414 52.9952 65.7297 60.3341 65.7297ZM60.3341 68.6184C55.0408 68.6184 51.7213 72.5164 51.7213 78.7114C51.7213 84.889 55.0408 88.787 60.3341 88.787C65.6275 88.787 68.947 84.889 68.947 78.7114C68.947 72.5164 65.6275 68.6184 60.3341 68.6184ZM90.9864 71.3331L85.0112 91.258H81.9609L74.9091 66.1474H78.2824L83.4681 86.6466H83.6117L89.4433 66.1474H92.709L98.5406 86.6466H98.6842L103.87 66.1474H107.243L100.191 91.258H97.1411L91.1659 71.3331H90.9864Z" fill="#3BEE81"/>
        <path id="change" fill-rule="evenodd" clip-rule="evenodd" d="M32.7601 46.3002H30.5858C30.306 44.8275 29.0854 43.6622 27.0255 43.6622C24.635 43.6622 23.0074 45.6599 23.0074 48.7078C23.0074 51.8453 24.6604 53.7534 27.0509 53.7534C28.9582 53.7534 30.2297 52.8569 30.6112 51.1922H32.7855C32.4168 53.8814 30.1662 55.7383 27.0382 55.7383C23.2744 55.7383 20.7568 53.049 20.7568 48.7078C20.7568 44.469 23.2617 41.6773 27.0127 41.6773C30.4078 41.6773 32.4804 43.8799 32.7601 46.3002ZM35.4702 55.6102V36.3243H37.6827V44.0464H37.7335C38.5855 42.484 39.9842 41.6773 42.0822 41.6773C45.0831 41.6773 46.9141 43.7262 46.9141 46.7997V55.6102H44.7016V47.1967C44.7016 44.994 43.5954 43.6622 41.421 43.6622C39.1068 43.6622 37.6827 45.2501 37.6827 47.6705V55.6102H35.4702ZM54.7612 53.8046C56.9991 53.8046 58.6394 52.3447 58.6394 50.3598V49.2456L55.0536 49.4761C52.9937 49.6042 51.9256 50.3598 51.9256 51.6916C51.9256 52.9722 53.0319 53.8046 54.7612 53.8046ZM54.2907 55.7383C51.506 55.7383 49.6623 54.1247 49.6623 51.6788C49.6623 49.3097 51.4679 47.9138 54.7993 47.7089L58.6394 47.4784V46.3259C58.6394 44.6098 57.5204 43.6622 55.4987 43.6622C53.9093 43.6622 52.7267 44.4818 52.4597 45.788H50.3362C50.3998 43.4573 52.6504 41.6773 55.5241 41.6773C58.7665 41.6773 60.8519 43.4189 60.8519 46.1338V55.6102H58.7538V53.2155H58.703C57.9273 54.7522 56.2107 55.7383 54.2907 55.7383ZM64.2232 55.6102V41.8053H66.3085V44.0464H66.3593C67.224 42.484 68.5845 41.6773 70.708 41.6773C73.7216 41.6773 75.4636 43.6238 75.4636 46.7613V55.6102H73.2511V47.1454C73.2511 44.8916 72.2084 43.6622 70.0468 43.6622C67.7962 43.6622 66.4356 45.2245 66.4356 47.5937V55.6102H64.2232ZM84.3788 53.6253C86.782 53.6253 88.4096 51.6147 88.4096 48.6566C88.4096 45.6856 86.782 43.6622 84.3788 43.6622C81.9883 43.6622 80.4243 45.6343 80.4243 48.6566C80.4243 51.666 81.9883 53.6253 84.3788 53.6253ZM84.4169 60.5406C81.3144 60.5406 79.0637 59.0294 78.7459 56.7372H81.0474C81.378 57.8897 82.7385 58.6068 84.5441 58.6068C86.9092 58.6068 88.4096 57.3647 88.4096 55.4053V53.2411H88.3587C87.4941 54.7394 85.8792 55.6102 83.9592 55.6102C80.4879 55.6102 78.1609 52.8313 78.1609 48.6566C78.1609 44.4434 80.4879 41.6773 84.01 41.6773C85.9428 41.6773 87.5576 42.5353 88.4732 44.0464H88.5113V41.8053H90.6221V55.2261C90.6221 58.53 88.2697 60.5406 84.4169 60.5406ZM99.5246 43.6366C97.3756 43.6366 95.8244 45.2117 95.6718 47.5424H103.212C103.161 45.1989 101.686 43.6366 99.5246 43.6366ZM103.161 51.666H105.348C104.967 54.0351 102.589 55.7383 99.6644 55.7383C95.8116 55.7383 93.383 53.0362 93.383 48.759C93.383 44.4818 95.8244 41.6773 99.5627 41.6773C103.225 41.6773 105.514 44.2769 105.514 48.4517V49.3225H95.6718V49.4505C95.6718 52.0758 97.2739 53.779 99.7153 53.779C101.432 53.779 102.767 52.9594 103.161 51.666Z" fill="white"/>
        </g>
        </g>
      </svg>
        <div class="sm:block hidden" style="width: 1px; height: 40px; background: #3D3D70; margin: 0 15px 0 10px;"></div>
        <div class="sm:block hidden" style="color: #3D3D70; font-size: 16px;">Cryptocurrency Exchange</div>
      </div>
      <div style="${formContainer}" class="px-3">
          ${renderMapImage()}
        <div v-if="initializing">
          <Loader />
        </div>
        <div v-else class="lg:w-4/5 w-full lg:p-2 p-1 flex flex-col lg:flex-row" style="${mainBlock}">
          <div style="${labelsBlock}">
          <h1 style="${mainHeader}">Limitless exchange</h1>
          <p style="${subTitle}">Fast coin swaps free of custody</p>
          <img >
          </div>
          <div style="${formBlock}">
            <div style="${inputWrapper}">
              <div style="${exchangeInputTitle}">You send</div>
              <input type="text" v-model.number="amount" @keyup="startRecount" style="${input}" @input="isNumber($event)"/>
              <div class="cursor-pointer" style="${exchangeInputSearch}" ref="fromSearchBtn" @click="openSelectFrom">
                <img v-if="from" :src="from.image" style="${coinIcon}"> 
                <span v-if="from && isLongFromName">
                  {{longName[from.ticker].ticker}}<sup style="${subName}">{{longName[from.ticker].sub}}</sup>
                </span>
                <span v-else class='currency-coin-ticker coin-ticker-to'>
                  {{fromTicker}}
                </span>
                <div class="currencies-container currencies-to-container"></div>
                <div style="${arrow}"></div>
              </div>
              <div style="${selectContainer} display: none;" ref="currencySelectFrom">
                <div style="${sreachIcon}"><font-awesome-icon :icon="faSearch" size="lg"/></div>
                
                <input type="text" style="${searchInput}" ref="searchFrom" v-model="fromFilter">
                <div style="${currencyListContainer}">
                  <ul v-if="isListFromOpen" style="${currencyList}">
                    <li v-for="fromCurrency in filtredFrom" style="${currencyItem}" v-bind:key="fromCurrency.ticker"
                      class="hover:shadow-md" @click="() => selectCoinFrom(fromCurrency.ticker)"
                      >
                      <img :src="fromCurrency.image" style="${coinIcon}"> 
                      <span style="${coinTicker}">{{fromCurrency.ticker}}</span>
                      <span style="${coinName}">{{fromCurrency.name}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style="${sequenceBlock}">
              <div style="${circle}"></div>
              <div style="${line}"></div>
              <span style="${exchangeSequence}">{{sequence}}</span>
              <v-popover
                offset="1"
              >
                <button class="pl-3" style="padding-bottom: 4px; color: #3bee81; font-size: 12px;">Expected rate</button>

                <template slot="popover" >
                  <div style="background-color: white; max-width: 250px; padding: 20px; border-radius: 3px; box-shadow: 0 4px 20px rgba(0,0,0,.45);">
                    <h4 style="color: #5c5780; font-size: 16px; margin-bottom: 10px;">This is an expected rate</h4>
                    <p style="color: #2b2b37; font-size: 14px; margin: 20px 0;">
                      ChangeNOW will pick the best rate for you during the moment of the exchange.
                    </p>
                    <a href="https://changenow.io/faq/what-is-the-expected-exchange-rate" 
                      style="color: #3bee81; font-size: 12px;" target="_blank" rel="noopener">
                        <div class="flex items-center">
                          Learn More
                          <div style="font-size: 6px; margin-left: 3px; padding-bottom: 2px;">
                            <font-awesome-icon :icon="faExternalLinkAlt" size="lg"/>
                          </div>
                        </div>
                      </a>
                  </div>
                </template>
              </v-popover>
              <div style="${toggleButton}" @click="toggleCurrancies">
                <font-awesome-icon :icon="upArrow" size="lg"/>
                <font-awesome-icon :icon="downArrow" size="lg"/>
              </div>
            </div>
            <div style="${inputWrapper}">
              <div style="${exchangeInputTitle}">You get</div>
              <input type="text" disabled style="${input}" :value="isCounting ? '' : amountTo"/>
              <span v-if="isCounting" style="${inputLoader}">
                <font-awesome-icon :icon="spinner" size="lg" rotation="180" spin/>
              </span>
              <div class="cursor-pointer" style="${exchangeInputSearch}" ref="toSearchBtn" @click="openSelectTo">
                <img v-if="to" :src="to.image" style="${coinIcon}">
                <span v-if="to && isLongToName">
                {{longName[to.ticker].ticker}}<sup style="${subName}">{{longName[to.ticker].sub}}</sup>
                </span>
                <span v-else>
                  {{toTicker}}
                </span>
                <div class="currencies-container currencies-to-container"></div>
                <div style="${arrow}"></div>
              </div>
              <div style="${selectContainer} display: none;" ref="currencySelectTo">
              <div style="${sreachIcon}"><font-awesome-icon :icon="faSearch" size="lg"/></div>
              <input type="text" style="${searchInput}" ref="searchTo" v-model="toFilter">
              <div style="${currencyListContainer}">
                <ul v-if="isListToOpen" style="${currencyList}">
                  <li v-for="toCurrency in filtredTo" style="${currencyItem}" v-bind:key="toCurrency.ticker"
                    class="hover:shadow-md" @click="() => selectCoinTo(toCurrency.ticker)">
                    <img :src="toCurrency.image" style="${coinIcon}"> 
                    <span style="${coinTicker}">{{toCurrency.ticker}}</span>
                    <span style="${coinName}">{{toCurrency.name}}</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <router-link :to="{ name: 'stepper'}">
              <button class="hover:opacity-75" style="${exchangeButton}">Exchange</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `,
  components: {
    'font-awesome-icon': walletApi.icons.component,
    Loader: walletApi.components.Loader
  },
  data () {
    return {
      spinner: faSpinner,
      arrow: faArrowsAltV,
      upArrow: faLongArrowAltUp,
      downArrow: faLongArrowAltDown,
      faSearch: faSearch,
      faExternalLinkAlt,

      amount: Number(defaultAmount),
      amountTo: 0,
      currencies: [],
      from: null,
      to: null,
      api: {},
      isCounting: false,
      recountTimer: null,
      recountTimeout: null,
      initializing: true,
      fromFilter: '',
      toFilter: '',
      longName: {},
      sequence: '',
      isListFromOpen: false,
      isListToOpen: false
    }
  },

  computed: {
    isLongToName () {
      return this.to && this.longName[this.to.ticker];
    },
    isLongFromName () {
      return this.from && this.longName[this.from.ticker];
    },
    fromTicker () {
      return this.from ? this.from.ticker.toUpperCase() : defaultFrom;
    },
    toTicker ()  {
      return this.to ? this.to.ticker.toUpperCase(): defaultTo;
    },
    filtredFrom () {
      const filter = this.fromFilter.toLowerCase().trim();
      return this.currencies.filter(currency => {
        const name = currency.name.toLowerCase();
        const ticker = currency.ticker.toLowerCase();
        const isNotTo = this.to && currency.ticker !== this.to.ticker;
        return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotTo;
      });
    },
    filtredTo () {
      const filter = this.toFilter.toLowerCase().trim();
      return this.currencies.filter(currency => {
        const name = currency.name.toLowerCase();
        const ticker = currency.ticker.toLowerCase();
        const isNotFrom = this.from && currency.ticker !== this.from.ticker;
        return (ticker.includes(filter) || name.includes(filter)) && !currency.isFiat && isNotFrom;
      });
    },
  },

  methods: {
    outSideClick (event) {
      const domElements = event.path;
      const cfl = this.$refs.currencySelectFrom;
      const ctl = this.$refs.currencySelectTo;
      if (!cfl || !ctl) {
        return;
      }
      if (!domElements.includes(cfl) && !domElements.includes(this.$refs.fromSearchBtn)) {
        cfl.style.display = 'none';
        this.fromFilter = '';
        this.isListFromOpen = false;
      }
      if (!event.path.includes(ctl) && !domElements.includes(this.$refs.toSearchBtn)) {
        ctl.style.display = 'none';
        this.toFilter = '';
        this.isListToOpen = false;
      }      
    },
    countSequence () {
      const price = this.amountTo && this.amountTo !== '-' && this.amount ? Number(this.amountTo / this.amount).toFixed(7) : 0;
      return `1 ${this.from ? this.from.ticker.toUpperCase() : defaultFrom.toUpperCase() } ≈ ${price || ''} ${this.to ? this.to.ticker.toUpperCase() : 'ETH'}`
    },
    async getFromCurrencies () {
      try {
        this.currencies = await this.api.getAllCurrencies();
        if (this.from) {
          return;
        }
        const from = this.currencies.find(currency => currency.ticker === defaultFrom);
        this.from = from;
        walletApi.storage.set('fromCurrency', from);
      } catch (error) {
        walletApi.alert.error('Error');
      }
    },
    getToCurrencies () {
      if (!this.to) {
        const to = this.currencies.find(currency => currency.ticker === defaultTo);
        this.to = to ? to : this.currencies.filter(currency => currency.ticker !== this.from.ticker)[0];
        walletApi.storage.set('toCurrency', to);
      }
    },
    async recountTo () {
      if (this.from && this.to) {
        this.isCounting = true;
        const fromTo = `${this.from.ticker}_${this.to.ticker}`;
        const amount = this.amount;
        try {
          const { estimatedAmount, transactionSpeedForecast } = await this.api.exchangeAmount(fromTo, amount);
          this.amountTo = estimatedAmount;
        } catch (error) {
          this.amountTo = '-';
        } finally {
          this.sequence = this.countSequence();
          this.isCounting = false;
        }
      }
    },
    startRecount () {
      walletApi.storage.set('amount', this.amount);
        this.recountTo();
    },
    toggleCurrancies () {
      const prevFrom = this.from;
      this.from = this.to;
      this.to = prevFrom;
      walletApi.storage.set('fromCurrency', this.from);
      walletApi.storage.set('toCurrency', this.to);
      this.recountTo();
    },
    openSelectFrom () {
      if (this.currencies.length) {
        this.$refs.currencySelectFrom.style.display = 'block';
        this.$refs.searchFrom.focus();
        this.isListFromOpen = true;
      }
    },
    openSelectTo () {
      if (this.currencies.length) {
        this.$refs.currencySelectTo.style.display = 'block';
        this.$refs.searchTo.focus();
        this.isListToOpen = true;
      }
    },  
    selectCoinFrom (ticker) {
      const newFrom = this.currencies.find(currency => currency.ticker === ticker);
      if (newFrom) {
        this.from = newFrom;
        walletApi.storage.set('fromCurrency', newFrom);
      }
      this.recountTo();
      this.$refs.currencySelectFrom.style.display = 'none';
      this.isListFromOpen = false;
      this.fromFilter = '';
    },
    selectCoinTo (ticker) {
      const newTo = this.currencies.find(currency => currency.ticker === ticker);
      if (newTo) {
        this.to = newTo;
        walletApi.storage.set('toCurrency', newTo);
      }
      this.recountTo();
      this.$refs.currencySelectTo.style.display = 'none';
      this.isListToOpen = false;
      this.toFilter = '';
    },
    isNumber (event) {
      const value = event.target.value.trim();
      const amount = Number(event.target.value);
      if (Number.isNaN(amount)) {
        event.preventDefault();
        event.target.value = value.slice(0, -1);   
        this.amount = value.slice(0, -1);
        return false;
      } else {
        return true;
      }
    },
    async initialize () {
      this.initializing = true;
      const storageFrom = walletApi.storage.get('fromCurrency')
      const storageTo = walletApi.storage.get('toCurrency');
      const lastId = walletApi.storage.get('transactionId');
      walletApi.storage.set('amount', this.amount); 
      if (lastId) {
        walletApi.route.goTo('stepper');
        return;
      }
      
      if (storageFrom) {
        this.from = storageFrom;
      }
      if (storageTo) {
        this.to = storageTo;
      }
        
      try {
        await this.getFromCurrencies();
        this.getToCurrencies();
        await this.recountTo();
        this.initializing = false;
      } finally {
        this.initializing = false;
      }
    }
  }, 
  created() {
    this.api = new ApiWorker(walletApi.http);
  },
  async mounted() {
    this.longName = longName;
    await this.initialize();
  },
}

