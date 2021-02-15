import {provider} from '../framework'

const {it} = provider.test();
const {expect, browser} = provider.pages();

describe('Machines page', function (){
    beforeEach(async () => {
        await browser.goto("http://localhost:4000");
    })

    afterEach(async () => {
        await browser.close();
    })

    it("add new machine", async function() {
        const mainPage = provider.main();
        const tablePage = provider.table();
        await mainPage.loginToSystem('admin', 'admin');
        const newMachine = {
            manufacturer: 'test',
            volume: 'test',
            length: 'test',
            width: 'test',
            weight: 'test',
            power: 'test',
            price: 'test'
        }
        await tablePage.addNewMachine(newMachine);
        const data = await tablePage.getMachinesList();
        const requiredAddedMachine = data.find(({manufacturer, volume}) => {
            return newMachine.manufacturer === manufacturer && newMachine.volume === volume
        });
        expect(newMachine).to.deep.equal(requiredAddedMachine);
    });
})