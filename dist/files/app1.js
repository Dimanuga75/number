console.log("111111");

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let rezult = {
  meta: {
    last_updated_at: "2023-12-26T23:59:59Z",
  },
  data: {
    RUB: {
      code: "RUB",
      value: 2.6520408844,
    },
    USD: {
      code: "USD",
      value: 0.0289520117,
    },
    USDT: {
      code: "USDT",
      value: 0.0289481241,
    },
  },
};
//async function getExchangeRate() {
//  const response = await fetch(
//    "https://api.currencyapi.com/v3/latest?apikey=cur_live_8KuZUIx1lK7qKsCuIDHrcaiMPwqeYTn8e5G4iHtf&currencies=USD%2CRUB%2CUSDT&base_currency=THB"
//  );
//  const rezult = await response.json();

let currencyRateRub = document.querySelector("#RUB");
let currencyRateUSD = document.querySelector("#USD");
let currencyRateUSDT = document.querySelector("#USDT");
let thbRub = rezult.data.RUB.value * 1.05;
let thbUsd = rezult.data.USD.value * 1.05;
let thbUsdt = rezult.data.USDT.value * 1.05;

currencyRateRub.textContent = thbRub.toFixed(4);
currencyRateUSD.textContent = thbUsd.toFixed(4);
currencyRateUSDT.textContent = thbUsdt.toFixed(4);

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const baseCurrency = document.querySelector("#base_currency");
const quotedCurrency = document.querySelector("#quoted_currency");
let resultSumma;
let currencyBase;
let currencyQuoted;

function resultRate() {
  currencyBase = baseCurrency.value;
  currencyQuoted = quotedCurrency.value;
  let checkRate;
  if (currencyBase === currencyQuoted && currencyBase === "THB") {
    checkRate = 1;
  } else if (currencyBase === "THB") {
    checkRate = rezult.data[currencyQuoted].value * 1.05;
  }

  if (currencyBase !== "THB") {
    if (currencyBase === currencyQuoted) {
      checkRate = 1;
    } else if (currencyQuoted === "THB") {
      checkRate = (1 / rezult.data[currencyBase].value) * 0.95;
    } else if (currencyQuoted !== "THB") {
      checkRate =
        (rezult.data[currencyQuoted].value / rezult.data[currencyBase].value) *
        0.95;
    }
  }
  resultSumma = Math.round(input.value * checkRate);
  result.value = resultSumma;
  //  const queryId = tg.initDataUnsafe?.query_id;
  //  console.log(queryId);
  if (resultSumma > 0) {
    tg.MainButton.setParams({
      text: `Купить ${resultSumma}` + " " + `${currencyQuoted}`,
      color: "#808080",
      textColor: "#fff",
    });
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
}
//resultRate();

input.oninput = resultRate;
quotedCurrency.oninput = resultRate;
baseCurrency.oninput = resultRate;

let close = document.querySelector(".close");
close.addEventListener("click", (e) => {
  tg.close();
});

tg.MainButton.onClick(async function () {
  const userName = tg.initDataUnsafe.user.username;
  let input = document.querySelector("#input").value;
  let currencyQuoted = document.querySelector("#quoted_currency").value;
  let currencyBase = document.querySelector("#base_currency").value;
  let resultSumma = document.querySelector("#result").value;
  let checkArr = document.querySelectorAll(".check");
  let checkPay;
  for (let i = 0; i < checkArr.length; i++) {
    if (checkArr[i].checked === true) {
      checkPay = checkArr[i].value;
    }
  }
  //  await fetch(
  //    `https://api.telegram.org/bot6528840339:AAFntM_6yRwhnHI00CziP43f7QoLONiN_KY/sendMessage?chat_id=601081115&text=Привет, как твои новые дела? ${userName} ${input} ${currencyQuoted} ${currencyBase} ${resultSumma}`
  //  );
  await fetch(
    `https://api.telegram.org/bot6528840339:AAFntM_6yRwhnHI00CziP43f7QoLONiN_KY/sendMessage?chat_id=601081115&text=Обмен: ${input} ${currencyBase}\n на ${resultSumma} ${currencyQuoted}\n от пользователя @${userName}. Способ оплаты: ${checkPay}`
  );
  tg.showAlert(
    `Заявка на обмен ${input} ${currencyBase}\n на ${resultSumma} ${currencyQuoted} отправлена. В ближайшее время мы с вами свяжемся`
  );
  tg.close();
});
//}
//getExchangeRate();
