var url = "http://127.0.0.1:8545";
var contractAddress = "0xa3f51E72da0DEe4C448C48F68125Db63B842458a";

var abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      }
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    constant: true,
    inputs: [],
    name: "hello",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "yourName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
var privateKey =
  "0x229e74393419ab8c4e074764e8fd5fd59687a94bd692fca4d9ede530f96ecb6f";

var submitSet = document.querySelector("form");
var setNameTerm = document.querySelector(".setName");
var setEtherValueTerm = document.querySelector(".setEtherValue");

var helloBtn = document.querySelector(".hello");
var helloResult = document.querySelector(".helloRes");

var provider;
var walletWithProvider;
var contractInstance;
var contractWithSigner;

submitSet.addEventListener("submit", submitSetFn);
helloBtn.addEventListener("click", helloFn);

function submitSetFn(e) {
  e.preventDefault();
  var str = setNameTerm.value;
  var ethValue = setEtherValueTerm.value;
  contractWithSigner.set(str,{value:ethValue}).then(async tx => {
    await tx.wait();
    console.log("The set function is finished calling...");
  });
}

function helloFn(e) {
  e.preventDefault();
  while (helloResult.firstChild) {
    helloResult.removeChild(helloResult.firstChild);
  }
  contractWithSigner.hello().then(val => {
    var res = document.createElement("p");
    res.textContent = val;
    helloResult.appendChild(res);
  });
}

window.onload = () => {
  provider = new ethers.providers.JsonRpcProvider(url);
  walletWithProvider = new ethers.Wallet(privateKey, provider);
  contractInstance = new ethers.Contract(contractAddress, abi, provider);
  contractWithSigner = contractInstance.connect(walletWithProvider);
};