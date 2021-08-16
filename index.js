// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// APP INFO
const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn", // create bill mac key
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf", // create callback mac key
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const getzallopaylink = async({_username='',_items=[{}],_amount='0',_embed_data={}, _description='Payment Zalo App' } ) => {
    const embed_data = _embed_data

    const items = _items

    const transID = Math.floor(Math.random() * 1000000) //  auto gen
    
    const description = _description

    const order = {
        app_id: config.app_id, // not change
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // auto gen
        app_user: _username,
        app_time: Date.now(), // miliseconds auto gen the current time
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: _amount,
        description: `${description} #${transID}`,
        bank_code: "",
    }

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`
    
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

    let axiosData = await axios.post(config.endpoint, null, { params: order })

    let respone = await axiosData.data
    
    return respone.order_url
}

app.listen(port,()=>console.log('running'))

app.get('/getlink', async (req, res) => {

    let link = await getzallopaylink()

    res.status(200).json({ link })
})

app.post('/callback', (req, res) => {
    let result = {};
    try {

        let {dataStr, reqMac} = req.body

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

        if (reqMac !== mac) {
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
            //Update data to database
            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    res.json(result);
});

app.get('/complete',(req,res)=>{
    console.log('this is params')
    console.log(req.params)
    res.send('<h1>Transaction complete</h1>')
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/page.html')
})