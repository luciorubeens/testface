const colorGreen = '#3bee81';

const pluginContainer = `
  background: #2B2B37 radial-gradient(ellipse 210px 210px at 100% 40%, rgba(110, 14, 125, 0.2), #2B2B37);
  position: relative;
`;
const formContainer = `
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background:  radial-gradient(ellipse 390px 390px at 0% 40%, rgba(109, 107, 217, 0.3), #2B2B37, transparent);
  z-index: 1;
`;

const mainContainer = `
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const mainPageHeader = `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 25px;
`;

const mainHeader = `
  color: white;
  font-size: 48px;
`;

const subTitle = `
  margin-bottom: 50px;
  font-size: 28px;
  color: #5c5780;
`;

const mainBlock = `
  padding: 20xp;
  z-index: 100;
`

const block = `
  display: flex;
  justify-content: center;
`;

const labelsBlock = `
  flex: 7;
`;

const formBlock = `
  flex: 5;
`;

const inputWrapper = `
  position: relative;
  background-color: #3D3D70;
  color: white;
  border-radius: 4px;
`;

const exchangeButton = `
  width: 100%;
  border-radius: 5px;
  height: 46px;
  line-height: 46px;
  padding: 0 46px;
  background: ${colorGreen};
  border: none;
  color: #fff;
  font-size: 20px;
  margin-top: 30px;
`;

const input = `
  color: #fff;
  background: none;
  border: 0;
  height: 70px;
  margin: 0;
  font-size: 24px;
  padding: 17px 150px 0 20px;
  width: 100%;
`;

const exchangeInputTitle = `
  color: #5e5a72;
  position: absolute;
  top: 5px;
  left: 20px;
  font-size: 14px;
`;

const exchangeInputSearch = `
  position: absolute;
  right: 0;
  top: 0;
  padding-left: 8px;
  border-left: 1px solid #5e5a72;
  width: 140px;
  height: 70px;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const subName = `
  font-size: 10px;
  top: -0.9em;
`;

const arrow = `
  position: absolute;
  right: 10px;
  top: 32px;
  border: 6px solid transparent; 
  border-top: 6px solid white;
`;

const sequenceBlock = `
  height: 50px;
  width: 100%;
  padding-left: 50px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 30px
`;

const circle = `
  position: absolute;
  width: 10px;
  height: 10px;
  top: 20px;
  left: 18px;
  background-color: #36324a;
  border-radius: 50%;
`;

const line = `
  position: absolute;
  left: 22px;
  height: 50px;
  top: 0;
  width: 2px;
  background-color: #36324a;
`;

const exchangeSequence = `
  font-size: 12px;
  color: white;
`;

const toggleButton = `
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 15px;
  color: ${colorGreen};
  cursor: pointer;
  display: flex;
`;

const coinIcon = `
  width: 20px;
  margin-right: 5px;
  filter: invert(95%) sepia(57%) saturate(4466%) hue-rotate(69deg) brightness(86%) contrast(85%);
`;

const selectFromWrapper = `
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const selectContainer = `
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 4px;
  background-color: white;
  width: 330px;
  z-index: 15;
`;

const searchInput = `
  width: 100%;
  border: none;
  border-bottom: 1px solid #b6c0cb;
  font-size: 16px;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
`;

const currencyListContainer = `
  overflow: scroll;
  max-height: 250px;
  padding: 5px 0;
`

const currencyList = `
  list-style: none;
  padding: 0 5px;
  margin: 0;
  color: black;
`;

const currencyItem = `
  display: flex;
  padding: 2px 14px;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  align-items: center;
`;

const coinTicker = `
  flex: 2;
  text-transform: uppercase;
  padding-left: 5px;
`;

const coinName = `
  flex: 3;
  color: #ccc;
  text-align: left;
  word-break: break-all;
`;

const inputLoader = `
  position: absolute;
  bottom: 14px;
  left: 20px;
  color: ${colorGreen};
`;

const sreachIcon = `
  position: absolute;
  color: #d7dfe8;
  left: 10px;
  top: 10px;
`;

module.exports = {
  mainContainer,
  mainHeader,
  subTitle,
  mainBlock,
  block,
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
  currencyItem,
  currencyList,
  coinTicker,
  coinName,
  inputLoader,
  sreachIcon,
  subName,
  mainPageHeader,
  pluginContainer,
  formContainer
}