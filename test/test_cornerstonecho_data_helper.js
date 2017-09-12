'use strict';

var chai = require('chai');
var randomstring = require('randomstring');

var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

var CornerstonechoDataHelper = require('../cornerstonecho_data_helper');


chai.config.includeStack = true;

describe('CornerstonechoDataHelper', function() {

    var subject = new CornerstonechoDataHelper();

    var userName;
    var alias;
    var status;
    var loid;

    //Generate Session Token Test
    describe('#getSessionToken', function() {
        //Test a valid session token
        context('with a valid username', function() {

            it('returns a valid session token', function () {

                userName = 'ca';
                alias = randomstring.generate({
                    length: 7,
                    charset: 'alphabetic'
                });

                var value = subject.generateSessionToken(userName, alias).then(function(obj) {
                    return obj;
                });

                return expect(value).to.eventually.eq(userName, alias);
            });

        });

        //Test an invalid session token
        /*context('with an invalid username', function() {

            it('returns invalid session token', function() {

                userName = 'versizzle';
                alias = randomstring.generate({
                    length: 7,
                    charset: 'alphabetic'
                });

                return expect(subject.generateSessionToken(userName, alias)).to.be.rejectedWith(Error);

            });
        });*/
    });
});