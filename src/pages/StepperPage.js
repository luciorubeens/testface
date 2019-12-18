const ApiWorker = require('../apiWorker');
const style = require('./mainPageStyles');
const stepperStyle = require('./stepperStyles');
const { defaultFrom, defaultTo } = require('../config.json');

const { errorType, longName, statuses, finishedStatuses, mokStatuses } = require('../constants');
const { valiateAddress, valiateExternalId } = require('../utils/validators');
const trustPilotIcon = require('../components/renderTrustpilot');


const exchangeInterval = 5000;

const {
  exchangeInputTitle,
  sequenceBlock,
  toggleButton,
  coinIcon,
  selectFromWrapper,
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

const {
	mainContainer,
	arrow,
	Stepper,
	stepContainer,
	stepHeader,
	stepNumber,
	stepName,
	stepBody,
	formBlock,
	input,
	inputWrapper,
	exchangeInputSearch,
	circle,
	line,
	exchangeSequence,
	selectContainer,
	addressInput,
	addressInputBody,
	inputSuccesValid,
	addressInputLabel,
	addressInputWrapper,
	stepButton,
	buttonGreen,
	buttonWhite,
	disabledButton,
	confirmInfoLabel,
	confirmInfoSub,
	confirmInfoData,
	confirmInfoAmount,
	confirmArrow,
	confirmCheckboxWrapper,
	checkboxBody,
	checkbox,
	checkboxChecked,
	buttonsBlock,
	refundButton,
	inputError,
	exchangeInputError,
	stepThreeBlock,
	infoHeader,
  infoContent,
  bigLoader,
  smallStep,
  smallStepHeader,
  smallStepNumber,
  smallStepName,
  stepHeaderText,
  smallStepInfoIcon,
  smallStepInfoItem,
  stepInfoHead,
  transactionSuccessIcon
  
} = stepperStyle;


const trustPilot = `            
<div v-if="transaction.status === statuses.finished" class="px-2 py-1 flex items-center justify-center">
  <p style="width: 150px; color: #333; text-align: center;">Write about your experience on</p>
  <a href="https://www.trustpilot.com/review/changenow.io" target="_blank">
    <div style="width: 100px;">${trustPilotIcon()}</div>
  </a>  
</div>`;

// const { 
//   faArrowsAltV, 
//   faSpinner, 
//   faLongArrowAltDown, 
//   faLongArrowAltUp, 
//   faSearch, faArrowRight, faCheck, faCheckCircle, faTimesCircle, faCircleNotch, faCircle, faExternalLinkAlt } = walletApi.fontAwesomeIcons;

const { 
  faArrowsAltV, 
  faSpinner, 
  faLongArrowAltDown, 
  faLongArrowAltUp, 
  faSearch, faArrowRight, faCheck, faCheckCircle, faTimesCircle, faCircleNotch, faCircle, faExternalLinkAlt, faCopy } = walletApi.icons.icons;

module.exports = {
  template: `
    <div class="rounded-lg p-3 " style="${mainContainer}" @click="outSideClick">
      <div v-if="initializing">
        <Loader />
      </div>
      <div v-else style="${Stepper}">
        <div v-if="currentStep === 1" style="${stepContainer}">
          <div style="${stepHeader}">
            <div style="${stepNumber}">1</div>
            <span style="${stepName}">Send To</span>
          </div>
          <div style="${stepBody}">
            <div style="${formBlock}">
              <div style="${inputWrapper}">
                <div v-if="amountError" style="${exchangeInputError}">{{renderFromLabel}}</div>
                <div v-else style="${exchangeInputTitle}">You send</div>
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
                        class="hover:shadow-md" @click="() => selectCoinFrom(fromCurrency.ticker)">
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
                        style="color: #3bee81; font-size: 12px;" target="_blank">
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
            </div>

            <div v-if="to && to.ticker === 'ark' && arkWallets.length" class="relative" style="${addressInputBody}">
              <span>Recipient Wallet</span>
              <span v-if="fullFrom && !fullFrom.isAnonymous" 
              class="absolute text-xs hover:text-green cursor-pointer" style="${refundButton}" @click="toggleRefund">
                {{needRefund ? 'Remove refund address' : '+ Add refund address'}}
              </span>
              <InputSelect :items="arkWallets" label="" name="ArkWallets" v-model="selectValue"  v-on:input="setArkAddress"/>
              <p v-if="recipientWallet && !isValidRecipient && !recipientFocus" 
                class="text-xs" 
                style="${inputError}">
                This address is not valid
              </p>
            </div>
            <div v-else class="relative" style="${addressInputBody}">
              <span style="${addressInputLabel}">Recipient Wallet</span>
              <span v-if="fullFrom && !fullFrom.isAnonymous" 
              class="absolute text-xs hover:text-green cursor-pointer" style="${refundButton}" @click="toggleRefund">
                {{needRefund ? 'Remove refund address' : '+ Add refund address'}}
              </span>
              <div style="${addressInputWrapper}">
                <input  
                  type="text" 
                  v-model="recipientWallet"
                  @blur="() => recipientFocus = false"
                  @focus="() => recipientFocus = true"
                  class="border border-solid focus:border-green border-gray-400" 
                  style="${addressInput}" 
                  :placeholder="recipientPlace"/>
                  <div v-if="recipientWallet && isValidRecipient" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
              </div>
              <p v-if="recipientWallet && !isValidRecipient && !recipientFocus" 
                class="text-xs" 
                style="${inputError}">
                This address is not valid
              </p>
            </div>
            <div v-if="fullTo && fullTo.hasExternalId" class="relative"  style="${addressInputBody}">
              <div style="${addressInputWrapper}">
                <input 
                  type="text" 
                  v-model="externalId" 
                  @blur="() => externalIdFocus = false"
                  @focus="() => externalIdFocus = true"
                  class="border border-solid focus:border-green border-gray-400"
                  style="${addressInput}" 
                  :placeholder="exstraIdPalce"/>
                  <div v-if="externalId && isValidExternalId" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
              </div>
              <p v-if="externalId && !isValidExternalId && !externalIdFocus" 
                class="text-xs" style="${inputError}">{{exstraIdValidError}}</p>
            </div>
            <div v-if="needRefund || fullFrom && fullFrom.isAnonymous" class="relative" style="${addressInputBody}">
              <span style="${addressInputLabel}">Refund Wallet</span>
              <div style="${addressInputWrapper}">
                <input 
                  type="text" 
                  v-model="refundWallet"
                  @blur="() => refundFocus = false"
                  @focus="() => refundFocus = true"
                  style="${addressInput}"
                  class="border border-solid focus:border-green border-gray-400" 
                  :placeholder="refundPlace"/>
                  <div v-if="refundWallet && isValidRefund" style="${inputSuccesValid}"><font-awesome-icon  :icon="faCheck" size="lg"/></div>
              </div>
              <p v-if="refundWallet && !isValidRefund && !refundFocus"
                class="text-xs" style="${inputError}">This address is not valid</p>
            </div>
          </div>
          <div style="${buttonsBlock}">
            <button v-if="!validParams" style="${stepButton} ${disabledButton}" 
            class="hover:opacity-75 disabled:bg-gray" :disabled="!validParams" 
            >Next</button>
            <button v-else style="${stepButton} ${buttonGreen}" 
            class="hover:opacity-75 disabled:bg-gray" :disabled="!validParams" 
            @click.prevent="switchToTwoStep">Next</button>
            <router-link :to="{ name: 'change-now'}">
              <button class="hover:opacity-75" style="${stepButton} ${buttonWhite}">Back</button>
            </router-link>  
          </div>
        </div>
        <div v-if="currentStep === 2" style="${stepContainer}">
          <div style="${stepHeader}">
            <div style="${stepNumber}">2</div>
            <span style="${stepName}">Confirmation</span>
          </div>
          <div style="${stepBody}">
            <div class="flex flex-col md:flex-row md:items-center">
              <div style="${confirmInfoData}" class="pr-6">
                <span style="${confirmInfoLabel}">You Send</span>
                <span style="${confirmInfoAmount}">{{amount}} {{from.ticker}}</span>
                <span style="${confirmInfoSub}">{{sequence}}</span>
              </div>
              <div style="${confirmArrow}" class="md:block hidden">
                <font-awesome-icon :icon="faArrowRight" size="lg"/>
              </div>
              <div style="${confirmInfoData}" class="md:pl-6">
                <span style="${confirmInfoLabel}">You Get</span>
                <span style="${confirmInfoAmount}">≈ {{amountTo}} {{to.ticker}}</span>
                <span style="${confirmInfoSub}">{{recipientWallet}}</span>
              </div>
            </div>
            <div style="margin: 10px 0;" class="flex">
              <div style="margin-right: 30px;">
                <p style="${confirmInfoLabel} margin-bottom: 3px;">Estimated Arrival</p>
                <p style="${confirmInfoSub}">≈ {{transactionTime}} minutes</p>
              </div>
              <div v-if="fullTo.hasExternalId && externalId">
                <p style="${confirmInfoLabel} margin-bottom: 3px;">{{fullTo.externalIdName ? fullTo.externalIdName : 'Extra Id'}}</p>
                <p style="${confirmInfoSub}">{{externalId}}</p>
              </div>
            </div>
          </div>
          <div style="${confirmCheckboxWrapper}">
            <label style="${checkboxBody}" class="cursor-pointer">
              <input type="checkbox" v-model="confirm" style="${checkbox}">
              <span v-if="confirm" style="${checkboxChecked}"><font-awesome-icon  :icon="faCheck" size="lg"/></span>
            </label>
            <div style="confirmText">
              <span>I've read and agree to the ChangeNOW 
                <a class="no-underline"  style="color: #3bee81;" href="https://changenow.io/terms-of-use" target="blank">Terms of Use</a> and 
                <a class="no-underline" style="color: #3bee81;"  href="https://changenow.io/privacy-policy" target="blank">Privacy Policy</a>
              </span>
            </div>
          </div>
          <div style="${buttonsBlock}">
            <button v-if="!confirm || creating" style="${stepButton} ${disabledButton}" :disabled="!confirm">Confirm</button>
            <button v-else style="${stepButton} ${buttonGreen}" @click.prevent="createExchange">Confirm</button>
            <button style="${stepButton} ${buttonWhite}" @click.prevent="switchToOneStep" :disabled="creating">Back</button>
          </div>
          <div  v-if="creating" style="${bigLoader}">
            <font-awesome-icon :icon="faCircleNotch" size="lg" rotation="180" spin style="color: #3bee81;"/>
          </div>
        </div>
        <div v-if="currentStep === 3 && transaction" style="${stepContainer}">
          <div style="${stepHeader} font-size: 16px;" class="relative">
            <div style="${stepNumber}">3</div>
            <span style="${stepName} color: #a4a3aa">Sending</span>
            <span class="m-4" style="color: #a4a3aa; font-size: 16px;">Transaction Id: {{transaction.id}}</span>
            <button style="margin-left: auto; color: #3bee81;" @click="startNewTransaction">Start new transaction</button>
          </div>
          <div style="padding: 5px 0;">
            <div style="border: 2px solid #3bee81; padding: 5px 65px 5px 10px; max-width: 650px;" class="mb-1">
              <div style="${stepThreeBlock}">
                <p style="${infoHeader}">You send</p>
                <p style="${infoContent} text-transform:uppercase;">{{transaction.expectedSendAmount}} {{transaction.fromCurrency}}</p>
              </div>
              <div style="${stepThreeBlock}">
                <p style="${infoHeader}">To address</p>
                <p style="${infoContent}">{{transaction.payinAddress}} <ButtonClipboard :value="transaction.payinAddress" class="text-theme-page-text-light mx-2"/></p>
              </div>
              <div style="${stepThreeBlock}" v-if="transaction.payinExtraId">
                <p style="${infoHeader}">{{transaction.payinExtraIdName}}</p>
                <p style="${infoContent}">{{transaction.payinExtraId}} <ButtonClipboard :value="transaction.payinExtraId" class="text-theme-page-text-light mx-2"/></p>
              </div>
            </div>
            <div style="padding: 5px 65px 5px 10px;">
              <div style="${stepThreeBlock}">
                <p style="${infoHeader}">You get</p>
                <p style="${infoHeader} font-size: 18px; text-transform:uppercase;"> ≈ {{transaction.expectedReceiveAmount}} {{transaction.toCurrency}}</p>
              </div>
              <div style="${stepThreeBlock}">
                <p style="${infoHeader}">To address</p>
                <p style="${infoHeader} font-size: 18px; word-break: break-all;">{{transaction.payoutAddress}}</p>
              </div>
              <div v-if="transaction.payoutExtraId" style="${stepThreeBlock}">
                <p style="${infoHeader}">{{transaction.payoutExtraIdName}}</p>
                <p style="${infoHeader} font-size: 18px; word-break: break-all;">{{transaction.payoutExtraId}}</p>
              </div>
            </div>
            <div v-if="!isExchangeFinished" style="exchangeStatuses" class="flex items-center justify-center flex-col md:flex-row">
              <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1  flex items-center justify-center">
                <font-awesome-icon v-if="confirmingStatus" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                <font-awesome-icon v-else :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                <span class="ml-2">{{confirmingStatus ? 'Deposit received' : 'Awaiting deposit'}}</span>
              </div>
              <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1  flex items-center justify-center">
                <font-awesome-icon v-if="exchangingStatus" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                <font-awesome-icon v-else-if="confirmingStatus" :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                <font-awesome-icon v-else :icon="faCircleNotch" size="lg" style="color: #E9E7EF;"/>
                <span class="ml-2">{{exchangingStatus ? 'Exchanged' : 'Exchanging'}}</span>
              </div>
              <div style="height: 35px; border: 2px solid rgba(61,61,112,.04);" class="md:w-1/3 w-full mb-1 md:mx-1 flex items-center justify-center">
                <font-awesome-icon v-if="isExchangeFinishedSuccess" :icon="faCheckCircle" size="lg" style="color: #3bee81;"/>
                <font-awesome-icon v-else-if="sendingStatus"  :icon="spinner" size="lg" rotation="180" spin style="color: #3bee81;"/>
                <font-awesome-icon v-else :icon="faCircleNotch" size="lg" style="color: #E9E7EF;"/>
                <span class="ml-2">{{isExchangeFinishedSuccess ? 'Sent to your wallet' : 'Sending to your wallet'}}</span>
              </div>
            </div>
            <div v-if="transaction.status === statuses.failed" class="px-4 py-3 rounded my-1" style="background-color: #fff5f5;	">
              <span class="block sm:inline" style="color: #e53e3e;">Error during exchange. Please contact support.</span>
            </div>
            <div class="px-2 py-1 rounded my-1" style="background-color: rgba(61,61,112,.04);">
              <p class="mb-1" style="color: #333;">If you have any questions about your exchange, please contact our support team via email.</p>
              <a style="color: #3bee81;" href="mailto: support@changenow.io">support@changenow.io</a>
            </div>
            <button @click="checkTransactionStatus">Refresh</button>
          </div>
        </div>
        <div v-if="currentStep === 4 && transaction" class="lg:w-11/12">
          <div class="relative px-2 py-2 rounded my-1 flex flex-col justify-center items-center" style="background-color: rgba(61,61,112,.04);">
            <div style="${transactionSuccessIcon}">
              <img src="https://changenow.io/images/exchange/check.svg"/>
            </div>
            <p style="font-size: 26px; font-weight: 700; margin-botom: 10px;">Transaction is completed!</p>
            <p v-if="hasProfit" style="font-size: 17px; font-weight: 700;">
              You earned <span style="color: #3bee81;">{{hasProfit}}</span>  more than was expected!</p>
              <button class="absolute" style="margin-left: auto; color: #3bee81; right: 15px; top: 10px;" @click="startNewTransaction">Start new transaction</button>
          </div>
          <div style="${smallStep}">
            <div style="${smallStepHeader}">
              <div style="${smallStepNumber}">1</div>
              <p style="${smallStepName}">Your {{transaction.fromCurrency.toUpperCase()}} Wallet</p>
              <span style="${stepHeaderText}">{{ parseDate(transaction.depositReceivedAt) }}</span>
            </div>
            <div class="flex">
              <div style="${smallStepInfoIcon}">
                <img style="width: 52px" src="https://changenow.io/images/exchange/wallet-icon.svg"/>
              </div>
              <div style="padding-left: 33px;">
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} width: 240px;">Input Transaction Hash</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                    <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payinHashLink" target="_blank">
                      {{transaction.payinHash}}
                    </a>
                    <ButtonClipboard :value="transaction.payinHash" class="text-theme-page-text-light mx-2"/>
                  </p>
                </div>
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} width: 240px;">ChangeNOW Address</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                    <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payinAddressLink" target="_blank">
                      {{transaction.payinAddress}}
                    </a>
                    <ButtonClipboard :value="transaction.payinAddress" class="text-theme-page-text-light mx-2"/>
                  </p>
                </div>
              <div style="${smallStepInfoItem}">
                <p style="${stepInfoHead} font-weight: 700; width: 240px;">Amount Sent</p>
                <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all; font-weight: 700;  word-break: break-all;">
                  {{transaction.amountSend}} {{transaction.fromCurrency.toUpperCase()}}
                </p>
              </div>
              </div>
            </div>
          </div>
          <div style="${smallStep}">
            <div style="${smallStepHeader}">
              <div style="${smallStepNumber}">2</div>
              <p style="${smallStepName}">Your {{transaction.toCurrency.toUpperCase()}} Wallet</p>
              <span style="${stepHeaderText}">{{ parseDate(transaction.updatedAt) }}</span>
            </div>
            <div class="flex">
              <div style="${smallStepInfoIcon}">
                <img style="width: 52px" src="https://changenow.io/images/exchange/exchange-icon.svg"/>
              </div>
              <div style="padding-left: 33px;">
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} width: 240px;">Output Transaction Hash</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                    <a style="color: #3bee81; word-break: break-all; user-select: all;" :href="payoutHashLink" target="_blank">
                      {{transaction.payoutHash}}
                    </a>
                    <ButtonClipboard :value="transaction.payoutHash" class="text-theme-page-text-light mx-2"/>
                  </p>
                </div>
                <div style="${smallStepInfoItem}">
                  <p style="${stepInfoHead} width: 240px;">Your {{transaction.toCurrency.toUpperCase()}} Address</p>
                  <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all;">
                    <a style="color: #3bee81; word-break: break-all; user-select: all;" target="_blank"
                      :href="payoutAddressLink">
                      {{transaction.payoutAddress}}
                    </a>
                    <ButtonClipboard :value="transaction.payoutAddress" class="text-theme-page-text-light mx-2"/>
                  </p>
                </div>
              <div style="${smallStepInfoItem}">
                <p style="${stepInfoHead} font-weight: 700; width: 240px;">Amount Received</p>
                <p style="font-size: 15px; letter-spacing: .3px;  word-break: break-all; font-weight: 700;  word-break: break-all;">
                {{transaction.amountReceive}} {{transaction.toCurrency.toUpperCase()}}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  `,
  components: {
    'font-awesome-icon': walletApi.icons.component,
    Loader: walletApi.components.Loader,
    InputSelect: walletApi.components.Input.InputSelect,
    ButtonClipboard: walletApi.components.Button.ButtonClipboard
  },
  data () {
    return {
      faCheck: faCheck,
      spinner: faSpinner,
      arrow: faArrowsAltV,
      upArrow: faLongArrowAltUp,
      downArrow: faLongArrowAltDown,
      faSearch,
      faArrowRight,
      faCheckCircle,
      faTimesCircle,
      faCircleNotch,
      faCircle,
      faExternalLinkAlt,
      faCopy,

      amount: 0.1,
      amountTo: 0,
      currentStep: 1,
      currencies: [],
      from: null,
      to: null,
      fullTo: null,
      fullFrom: null,
      api: {},
      isCounting: false,
      recountTimer: null,
      counter: 1,
      recountTimeout: null,
      arkWallets: [],
      recipientWallet: '',
      refundWallet: '',
      externalId: '',
      initializing: true,
      confirm: false,
      fromFilter: '',
      toFilter: '',
      needRefund: false,
      recipientFocus: false,
      refundFocus: false,
      externalIdFocus: false,
      isListFromOpen: false,
      isListToOpen: false,

      hasError: false,
      amountError: false,
      minAmount: 0,
      transactionTime: '',
      longName: {},
      isEnabled: false,
      selectValue: '',
      // Step 3
      transaction: null,
      creating: false,
      statusTimer: null,
      finishedStatuses,
      statuses,
      counter: 0,
      sequence: ''
    }
  },

  computed: {
    isLongToName () {
      return this.to && this.longName[this.to.ticker];
    },
    isLongFromName () {
      return this.from && this.longName[this.from.ticker];
    },
    isValidRecipient () {
      return this.to ? valiateAddress(this.to.ticker, this.recipientWallet) : false;
    },
    isValidRefund () {
      return this.from ? valiateAddress(this.from.ticker, this.refundWallet) : false;
    },
    isValidExternalId () {
      return this.to ? valiateExternalId(this.to.ticker, this.externalId) : false;
    },
    renderFromLabel () {
      return this.from && this.amountError ? `Minimum amount ${this.minAmount} ${this.from.ticker.toUpperCase()}` : ''
    },
    exstraIdPalce () {
      return this.fullTo && this.fullTo.externalIdName ? `${this.fullTo.externalIdName} (Optional)` : '';
    },
    exstraIdValidError () {
      return this.fullTo && this.fullTo.externalIdName ? `This ${this.fullTo.externalIdName.toLowerCase()} is not valid` : '';
    },
    recipientPlace () {
      return this.to ? `Enter the recipient's ${this.to.ticker.toUpperCase()} address` : '';
    },
    refundPlace () {
      return this.fullFrom ? 
        `Enter ${this.fullFrom.ticker.toUpperCase()} refund address (${this.fullFrom.isAnonymous ? 'required' : 'optional'})` : '';
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
    validParams () {
      if (this.from && this.to && this.amount) {
        const isValidRecipient = this.recipientWallet && valiateAddress(this.to.ticker, this.recipientWallet);
        const isValidRefund = this.fullFrom && this.fullFrom.isAnonymous || this.refundWallet ? 
          valiateAddress(this.from.ticker, this.refundWallet) : true;
        const isValidExternalId = this.fullTo && !this.fullTo.hasExternalId || this.externalId ? valiateExternalId(this.to.ticker, this.externalId) : true;
        return Boolean(isValidRecipient && isValidRefund && isValidExternalId && !this.hasError && !this.amountError);
      }
      return false
    },
    confirmingStatus () {
      if (this.transaction) {
        const { status } = this.transaction;
        return  status === statuses.exchanging || status === statuses.sending;
      } 
      return false;
    },
    exchangingStatus () {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.sending;
      } 
      return false;
    },
    sendingStatus () {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.sending;
      } 
      return false;
    },
    isExchangeFinished () {
      if (this.transaction) {
        const { status } = this.transaction;
        return this.finishedStatuses.includes(status);
      } 
      return false;
    },
    isExchangeFinishedSuccess () {
      if (this.transaction) {
        const { status } = this.transaction;
        return status === statuses.finished;
      } 
      return false;
    },
    payinHashLink () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        return this.fullFrom ? this.fullFrom.transactionExplorerMask.replace('$$', this.transaction.payinHash) :  '';
      } return '';
    },
    payinAddressLink () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        return this.fullFrom ? this.fullFrom.addressExplorerMask.replace('$$', this.transaction.payinAddress) :  '';
      } return '';
    },
    payoutAddressLink () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        return this.fullTo ? this.fullTo.addressExplorerMask.replace('$$', this.transaction.payoutAddress) :  '';
      } return '';
    },
    payoutHashLink () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        return this.fullTo ? this.fullTo.transactionExplorerMask.replace('$$', this.transaction.payoutHash) :  '';
      } return '';
    },
    exchangeRate () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        const { amountReceive, amountSend, fromCurrency, toCurrency } = this.transaction;
        const rate = Number(amountReceive) / Number(amountSend);
        return `1 ${fromCurrency.toUpperCase()} ≈ ${rate.toFixed(7)} ${toCurrency.toUpperCase()}`
      } return '';
    },
    hasProfit () {
      if (this.transaction && this.transaction.status === statuses.finished) {
        const { amountReceive, expectedReceiveAmount, toCurrency } = this.transaction;
        const profit = Number(amountReceive) - Number(expectedReceiveAmount);
        return profit > 0 ? `${profit.toFixed(8)} ${toCurrency.toUpperCase()}` : ''
      } return '';
    }
  },
  methods: {
    parseDate (date) {
      const time = new Date(date);
      return time.toLocaleString();
    },
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
      const price = this.amountTo && this.amount ? Number(this.amountTo / this.amount).toFixed(7) : 0;
      return `1 ${this.from ? this.from.ticker.toUpperCase() : defaultFrom.toUpperCase() } ≈ ${price || ''} ${this.to ? this.to.ticker.toUpperCase() : 'ETH'}`
    },
    toggleRefund () {
      this.needRefund = !this.needRefund;
      this.refundWallet = '';
    },
    async getFromCurrencies () {
      this.currencies = await this.api.getAllCurrencies();
      if (this.from) {
        return;
      }
      const from = this.currencies.find(currency => currency.ticker === defaultFrom);
      this.from = from;
    },
    getToCurrencies () {
      if (!this.to) {
        const to = this.currencies.find(currency => currency.ticker === defaultTo);
        this.to = to ? to : this.currencies.filter(currency => currency.ticker !== this.from.ticker)[0];
      }
    },
    async recountTo () {
      if (this.from && this.to) {
        this.isCounting = true;
        const fromTo = `${this.from.ticker}_${this.to.ticker}`;
        const amount = this.amount;
        if (this.arkWallets.length && this.to.ticker === defaultTo) {
          this.setArkAddress();
        }
        try {
          this.fullFrom = await this.api.getCurrencyInfo(this.from.ticker);
          this.fullTo = await this.api.getCurrencyInfo(this.to.ticker);
          const { minAmount } = await this.api.minilalExchangeAmount(fromTo);
          this.minAmount = minAmount;
          if (minAmount > amount) {
            this.amountError = true;
            return;
          }
          this.amountError = false;
          const { estimatedAmount, transactionSpeedForecast } = await this.api.exchangeAmount(fromTo, amount);
          this.transactionTime = transactionSpeedForecast;
          this.amountTo = estimatedAmount;
          this.hasError = false;
        } catch (error) {
          this.amountTo = 0;
          this.hasError = true;
          if (error.body) {
            const errorData = JSON.parse(error.body);
            if (errorData.error === errorType.SMALL_DEPOSIT) {
              this.amountError = true;
              return;
            }
            if (errorData.error === errorType.INACTIVE) {
              const errorMessage = `The ${this.from.ticker.toUpperCase()}/${this.to.ticker.toUpperCase()} 
                pair is temporarily unavailable for exchanges.`;
              walletApi.alert.error(errorMessage);
              return;
            }
          }
          if (error.message) {
            walletApi.alert.error(`Faled to fetch available currencies. Reason: ${error.message}.`);
            return;
          }
          walletApi.alert.error('Unknown error.');
        } finally {
          this.sequence = this.countSequence();
          this.isCounting = false;
        }
      }
    },
    startRecount () {
      this.recountTo();
    },
    toggleCurrancies () {
      const prevFrom = this.from;
      this.from = this.to;
      this.to = prevFrom;
      this.externalId = '';
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
    async createExchange () {
      if (this.validParams) {
        const params = {
          from: this.from.ticker,
          to: this.to.ticker,
          address: this.recipientWallet,
          amount: this.amount,
        }

        if (this.externalId) { params.extraId = this.externalId; }
        if (this.refundWallet) { params.refundAddress = this.refundWallet; }
        this.creating = true;
        try {
          // this.statusTimer = walletApi.timers.setInterval(() => {
            // this.checkTransactionStatus();
          // }, exchangeInterval);
          const transaction = await this.api.createTransaction(params);
          walletApi.storage.set('transactionId', transaction.id);
          this.transaction = transaction;
          await this.checkTransactionStatus();
          this.currentStep = 3;
        } catch (error) {
          walletApi.alert.error(`Faled to create transaction.`);
        } finally {
          this.creating = false;
        }
      }
    },
    async checkTransactionStatus () {
      if (!this.transaction) {
        return;
      }
      const { id } = this.transaction;
      try {
        const transactionData = await this.api.getTransactionStatus(id);
        if (!this.fullTo || !this.fullFrom) {
          const [ from, to ] = await Promise.all([this.api.getCurrencyInfo(transactionData.fromCurrency),
                 this.api.getCurrencyInfo(transactionData.toCurrency)]);
          this.fullFrom = from;
          this.fullTo = to;
        }
  
        this.transaction = transactionData;
        if (finishedStatuses.includes(transactionData.status)) {
          if (transactionData.status === statuses.finished) {
            this.currentStep = 4;
          }
          walletApi.storage.set('transactionId', null);
        }
      } catch (error) {
          walletApi.alert.error(`Faled to fetch transaction data.`);
      }
    },
    async initialize () {
      this.initializing = true;
      const storageFrom = walletApi.storage.get('fromCurrency')
      const storageAmount = walletApi.storage.get('amount');
      const storageTo = walletApi.storage.get('toCurrency');
      const lastId = walletApi.storage.get('transactionId'); 
      const profile = walletApi.profiles.getCurrent();
      this.arkWallets = profile.wallets.map(wallet => {
        return wallet.name ? wallet.name : wallet.address;
      });
      if (storageFrom) {
        this.from = storageFrom;
      }
      if (storageTo) {
        this.to = storageTo;
      }
      if (storageAmount) {
        this.amount = storageAmount;
      }
      if (this.arkWallets.length && this.to && this.to.ticker === defaultTo) {
        this.setArkAddress();
      }
      try {
        if (lastId) {
          this.transaction = {
            id: lastId
          };
          await this.checkTransactionStatus();
          this.currentStep = 3;
          this.initializing = false;
          return;
        }
        await this.getFromCurrencies();
        this.getToCurrencies();
        await this.recountTo();
        this.initializing = false;
      } catch (error) {
        if (error.message) {
          walletApi.alert.error(`Faled to fetch available currencies. Reason: ${error.message}.`);
          return;
        }
        if (error.body) {
          const { message } = JSON.parse(error.body);
          walletApi.alert.error(message);
          return
        }
        walletApi.alert.error('Unknown error.');
      } finally {
        this.initializing = false;
      }
    },
    switchToTwoStep () {
      this.currentStep = 2;
    },
    switchToOneStep () {
      this.currentStep = 1;
    },
    async startNewTransaction () {
      walletApi.storage.set('transactionId', null);
      walletApi.route.goTo('change-now');
    },
    setArkAddress (value) {
      if (!value) {
        value = this.arkWallets[0];
      }
      const profile = walletApi.profiles.getCurrent();
      const selectedWallet = profile.wallets.find(wallet => {
        return wallet.name === value || wallet.address === value;
      });
      this.selectValue = value;
      if (!selectedWallet) {
        this.recipientWallet = profile.wallets[0].address;
        return;
      }
      this.recipientWallet = selectedWallet.address;
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

