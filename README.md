
# Description

Static Jekyll site that makes token sales easy

### Usage

This site is a form in 4 steps, each of which forms the final result in the form of an example of completing a transaction for purchasing a token. 

### Steps
1) Account name - enter your chain account name
2) Select a token for payment from the preset ones (read about installing payment tokens below)
3) Enter the value required for purchase
4) Final step

### Purchase tokens setup

To setup tokens, the “_data” folder contains the “payment-methods” yml file in the project root. It must indicate tokens in the following format

```
- name: EOS
  wallet_address: eosaddress
  icon_url: "assets/graphics/images/eos-icon.png"
  rate: 0.5
- name: BTC
  wallet_address: 1flhfbT1PpqaDhFkEFWEf8WUSupnV0y2wP
  icon_url: "assets/graphics/images/btc-icon.png"
  rate: 0.042
- name: ETH
  wallet_address: 1flhfbT1PpqaDhFkEFWEf8WUSupnV0y2wP
  icon_url: "https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-alt-512.png"
  rate: 0.134
```

### Other settings
You can also customize some headers in the fields, texts are set in variables in the file content/pages/home.md

Example: 
```
---
layout: home
title: ICO Tokensale
permalink: /index.html
steps:
  - title: "Enter your account"
    id: 1
  - title: "Purchase Tokens"
    subtitle: "Payment methods"
    description: "Select how you would like to buy token"
    id: 2
  - title: ""
    description1: "Remaining Tokens available"
    subtitle: "Choose Amount"
    description2: "Type in the amount of token you would like to buy. The value of EOS, BTC and USD will dynamically be updated."
    id: 3
  - title: "Finalise Purchase"
    id: 4
---
```