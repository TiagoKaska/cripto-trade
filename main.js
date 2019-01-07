const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const os = require('os');

// output file in the same folder

var date = new Date();

let name = `output-${date.toISOString()}.csv`

const filename = path.join(__dirname, 'output.csv');



const output = []; // holds all rows of data

async function setHeader(){
    console.log('config file')
    const header = []
    header.push('bid')
    header.push('ask')
    output.push(header.join())
    fs.writeFileSync(filename, output.join(os.EOL));
}

setHeader()

setInterval(
    () => loadData(),
    3000
  );

  
  async function loadData(){
    console.log('Hello every 3 seconds');
    const response = await fetch('https://api.bitfinex.com/v1/pubticker/btcusd');
    const json = await response.json();
    updateData(json)

    console.log(json);
  }

  async function updateData(data) {
    console.log('update data...')
    const row = []; // a new array for each row of data
    row.push(data.bid);
    row.push(data.ask);
    output.push(row.join())
    fs.writeFileSync(filename, output.join(os.EOL));
  }

