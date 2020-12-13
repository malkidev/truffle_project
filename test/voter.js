let Voter = artifacts.require('./Voter.sol');

contract('Voter', function(accounts) {

    let voter;
    let firstAccount;

    beforeEach(async function() {
        firstAccount = accounts[0];
        voter = await Voter.new();
        await setOptions(firstAccount, ['coffee', 'tea'])
    });

    it('has no votes by default', async function() {
        let votes = await voter.getVotes.call();

        expect(toNumbers(votes)).to.deep.equal([0, 0]);
    });

    it('can vote with a string option', async function() {
        await voter.contract.vote['string']('coffee', {from: firstAccount});
        let votes = await voter.getVotes.call();

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    it('can vote with a number option', async function() {
        await voter.contract.vote['uint256'](0, {from: firstAccount});
        let votes = await voter.getVotes.call();

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    const ERROR_MSG = 'VM Exception while processing transaction: revert';

    it('cannot vote twice from the same contract', async function() {
        try {
            await voter.contract.vote['uint256'](0, {from: firstAccount});
            await voter.contract.vote['uint256'](0, {from: firstAccount});
            expect.fail();
        } catch (error) {
            expect(error.message).to.equal(ERROR_MSG);
        }
    });

    async function setOptions(account, options) {
        for (pos in options) {
            await voter.addOption(options[pos], {from: account});
        }
        await voter.startVoting({from: account, gas: 600000});
    }

    function toNumbers(bigNumbers) {
        return bigNumbers.map(function(bigNumber) {
            return bigNumber.toNumber()
        })
    }
});