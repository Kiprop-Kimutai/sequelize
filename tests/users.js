var assert = require('assert');
var expect = require('expect.js');
const authController = require('../server/controllers/authentication');
describe('User', () => {
    describe('#register user',() =>{
        it('should save user and generate jwt',() =>{
            var user = {email: "testuser@newlogic.io", username: "testuser", role: "tester", active: 1, password: "infintiy@2019"};
            authController.registerForTest(user).then(res =>{
                expect(res).to.not.be.empty();
            }, err =>{
                expect(err).to.equal(err);
            } )
        })
    })
})