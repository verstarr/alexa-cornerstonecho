'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var urljoin = require('url-join');
var moment = require('moment');


var apiKey = '1rtizkw7vhxy3';
var apiSecret = '8QrNgft96cn2X8bCukvR22X65/urf/YnldX8MJR3tsGt7HuVqE2E2tq/UbYOI4OIMJZRkiGEfsex1seZaA3TDw==';

var GENERATESESSIONENDPOINT = 'https://globaltechsupport.csod.com/services/api/sts/session';
var TRANSCRIPTSTATUSENDPOINT = 'https://globaltechsupport.csod.com/Services/api/LOTranscript/TranscriptSearch?Status=';
var LODETAILENDPOINT = 'https://globaltechsupport.csod.com/services/api/LO/GetDetails?ObjectID=' //Need to replace Status option

function hashSha512RequestString(stringToSign) {
    //console.log(stringToSign)
    var crypto = require('crypto')
        , text = stringToSign
        , key = apiSecret
        , hash

    hash = crypto.createHmac('sha512', key).update(text).digest('base64')

    return hash;
}

function CornerstonechoDataHelper() { }

//Generate Session Token
CornerstonechoDataHelper.prototype.generateSessionToken = function(userName, alias) {

    return this.getSessionToken(userName, alias).then(

        function(response) {

            console.log('success - generate session token for user ' + userName + ' with alias ' + alias);

            return response.body;
        }
    );
};

CornerstonechoDataHelper.prototype.getSessionToken = function(userName, alias) {

    var requestURL = urljoin(GENERATESESSIONENDPOINT, '?userName=' + userName + '&alias=' + alias);
    var now = moment().milliseconds(0).toISOString().replace('Z', '');
    var stringToSign = 'POST' + '\n' + 'x-csod-api-key:' + apiKey + '\n' + 'x-csod-date:' + now + '\n' + '/services/api/sts/session';

    var signature = hashSha512RequestString(stringToSign);

    var options = {

        method: 'POST',

        uri: requestURL,

        headers: {
            'Content-Type': 'text/xml',
            'x-csod-signature': signature,
            'x-csod-date': now,
            'x-csod-api-key': apiKey
        },

        resolveWithFullResponse: true

        //json: true

    };

    console.log(requestURL)
    console.log(now)
    console.log(signature)

    console.log('\n')
    console.log(options)

    return rp(options);
};

//Request Transcript with status xxxx
CornerstonechoDataHelper.prototype.requestTranscript = function(status) {

    return this.requestTranscript(status).then(

        function(response) {

            console.log('success - received ' + status + ' transcript items for user: ' + userid);

            return response.body;

        }

    );

};


//Request LO Details for LOID xxxx
CornerstonechoDataHelper.prototype.getLODetails = function(loid) {

    var options = {

        method: 'GET',

        uri: LODETAILENDPOINT + loid,

        resolveWithFullResponse: true,

        json: true

    };

    return rp(options);

};

module.exports = CornerstonechoDataHelper;