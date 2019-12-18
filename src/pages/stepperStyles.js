const mainContainer = `
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6F4F8;
`;

const arrow = `
  position: absolute;
  right: 10px;
  top: 32px;
  border: 6px solid transparent; 
  border-top: 6px solid #d7dfe8;
`;

const Stepper = `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const stepContainer = `
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  height: auto;
  padding: 18px 30px;
`;

const stepHeader = `
  width: 100%;
  height: 40px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
`;

const stepNumber = `
  width: 30px;
  min-width: 30px;
  flex-basis: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #3bee81;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: 600;
`;

const stepName = `
  font-weight: 600;
  font-size: 16px;
`;

const stepBody = `
  padding: 20px 0;
`;

const formBlock = `
  max-width: 420px;
  margin-bottom: 25px;
`

const inputWrapper = `
  position: relative;
  background-color: white;
  color: #333;
  border-radius: 4px;
  border: 1px solid #d7dfe8;
`;

const input = `
  color: #333;
  background: none;
  border: 0;
  height: 70px;
  margin: 0;
  font-size: 24px;
  padding: 17px 150px 0 20px;
  width: 100%;
`;

const exchangeInputSearch = `
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 10px;
  border-left: 1px solid #d7dfe8;
  width: 140px;
  height: 70px;
  font-size: 20px;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const circle = `
  position: absolute;
  width: 10px;
  height: 10px;
  top: 20px;
  left: 18px;
  background-color: #d7dfe8;
  border-radius: 50%;
`;

const line = `
  position: absolute;
  left: 22px;
  height: 50px;
  top: 0;
  width: 2px;
  background-color: #d7dfe8;
`;

const exchangeSequence = `
  font-size: 12px;
  color: #333;
`;

const selectContainer = `
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 4px;
  background-color: white;
  width: 330px;
  z-index: 15;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
`;

const addressInputBody = `
  margin-bottom: 10px;
  width: 100%;
  max-width: 540px;
`;

const addressInputLabel = `
  display: inline-block;
  margin-bottom: 10px;
`;

const addressInputWrapper = `
  width: 100%;
  max-width: 540px;
  margin-bottom: 20px;
  positon: relative;
`

const inputSuccesValid = `
  position: absolute;
  right: 10px;
  background-color: white;
  bottom: 10px;
  color: #3bee81;
`;

const addressInput = `
  width: 100%;
  padding: 12px 40px 12px 20px;
  height: 40px;
  border-radius: 5px;
`;

const stepButton = `
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 20px;
  display: inline-block;
  text-align: center;
  border-radius: 4px;
  margin-right: 15px;
`

const buttonGreen = `
  background: #3bee81;
  color: white;
`;

const buttonWhite = `
  background: transparent;
  border: 2px solid #3bee81;
  color: #3bee81;
`;


const disabledButton = `
  background: #cacaca;
  color: white;
`;

const confirmInfoData = `
  display: flex;
  flex-direction: column;
`;

const confirmInfoLabel = `
  font-size: 12px;
  color: #2b2b37;
  letter-spacing: .06px;
  white-space: nowrap;
  opacity: .3;
`;

const confirmArrow = `
  font-size: 36px;
  color: #d1cfdd;
`;

const confirmInfoAmount = `
  font-weight: 700;
  font-size: 36px;
  color: #2b2b37;
  text-transform: uppercase;
  letter-spacing: .5px;
`;

const confirmInfoSub = `
  font-size: 15px;
  text-align: left;
  color: #2b2b37;
  letter-spacing: .08px;
  word-break: break-all;
`;

const confirmCheckboxWrapper  = `
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const checkboxBody = `
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  flex-basis: 20px;
  height: 20px;
  border: 2px solid #3bee81;
  border-radius: 2px;
  margin-right: 12px;
`;

const checkbox = `
  display: none; 
`;

const checkboxChecked = `
  font-size: 9px;
  color: #3bee81;
`;

const buttonsBlock = `
  display: flex;
  width: 100%;
  align-items: center;
`;

const refundButton = `
  top: 5px;
  right: 10px;
`;

const inputError = `
  position: absolute;
  left: 20px;
  top: 105%;  
  color: #dc1d2e;
  font-size: 14px;
`

const exchangeInputError = `
  color: rgb(220, 29, 46);
  position: absolute;
  top: 5px;
  left: 20px;
  font-size: 12px;
`;

const stepThreeBlock = `
  margin-bottom: 0;
`;

const infoHeader = `
  font-size: 15px;
  line-height: 22px;
  letter-spacing: .3px;
  color: #2b2b37;
`;

const infoContent = `
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  letter-spacing: .5px;
  word-break: break-all;
`;

const bigLoader = `
  font-size: 50px;
  margin: 20px 0;
`;

const smallStep = `
  background-color: #fff;
  padding: 10px 20px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0,0,0,.1);
`

const smallStepHeader = `
  display: flex;
  margin-bottom: 15px;
  -webkit-box-align: center;
  align-items: center;
`;

const smallStepNumber = `
  width: 40px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 50%;
  background-color: #3bee81;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  margin-right: 17px;
`;

const smallStepName = `
  font-size: 24px;
  font-weight: 700;
  color: #2b2b37;
  letter-spacing: .4px;
  text-align: left;
  margin-right: 30px;
`;

const stepHeaderText = `
  font-weight: 400;
  font-size: 15px;
  color: #a4a3aa;
  letter-spacing: .3px;
  line-height: 30px;
`;


const smallStepInfoIcon = `
  width: 96px;
  height: 96px;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(61,61,112,.04);
`

const smallStepInfoItem = `
  width: 100%;
  padding-right: 20px;
  margin-bottom: 10px;
  display: -webkit-box;
  display: flex;
`;

const stepInfoHead = `
  line-height: 1.3;
  font-size: 15px;
  letter-spacing: .3px;
  flex-shrink: 0;
`;

const transactionSuccessIcon = `
  background-color: #3bee81;
  width: 48px;
  height: 48px;
  margin: auto auto 8px;
  border-radius: 50%;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

module.exports = {
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
};