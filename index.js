import fs from 'fs'
import https from 'https'


function data() {
    return {
        headers: {Authorization: "Bearer 172276282"},
        hostname: '<<fill in....>>',
        port: 443,
        path: '/open-banking/account/v1/accounts',
        method: 'GET',
        cert: fs.readFileSync('transport.cert'),
        key: fs.readFileSync('transport.key'),
        ca: fs.readFileSync('root.cert')
    };
}

const request = async () => {
    const sortIt = async () => {
        const req = await https.request(data(), (res) => {
            let text = ''
            res.on('data', function (data) {
                text = text.concat(data.toString())
            })
            res.on('end', function (data) {
                let output = JSON.stringify(JSON.parse(text), null, 2);
                console.log(output)
            })
        });
        req.end();
    }

}

request().then((data) => console.log('end'))
