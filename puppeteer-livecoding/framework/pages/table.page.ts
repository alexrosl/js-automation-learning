import {BasePage, _$, step, BaseElement} from '../../lib';
import {Input, Button, Text, Table} from '../../lib';

const transformData = {
    'Виробник': 'manufacturer',
    "Робочий об'єм, М": 'volume',
    'Довжина, М': 'length',
    'Ширина, М': 'width',
    'Маса, КГ': 'weight',
    'Потужність трактора, кВт': 'power',
    'Ціна, грн': 'price'
}

class TablePage extends BasePage{
    private headerTitle : Text
    private newMachineManufacturer : Input
    private newMachineVolume: Input
    private newMachineLength: Input
    private newMachineWidth : Input
    private newMachineWeight: Input
    private newMachinePower: Input
    private newMachinePrice: Input
    private submitNewMachine: Button
    private machineTable: Table

    constructor() {
        super('#table_page', 'Stern machine table page');
        this.headerTitle = this.initChild(Text, '.header h3', 'Header title')
        this.machineTable = this.initChild(Table, 'table.machines_list', 'Stern machine table')
        this.machineTable.transformer = transformData;

        this.newMachineManufacturer = this.initChild(Input, '.add_machine tr td:nth-child(1) input', 'Manufacturer field')
        this.newMachineVolume = this.initChild(Input, '.add_machine tr td:nth-child(2) input', 'Volume field')
        this.newMachineLength = this.initChild(Input, '.add_machine tr td:nth-child(3) input', 'Length field')
        this.newMachineWidth = this.initChild(Input, '.add_machine tr td:nth-child(4) input', 'Width field')
        this.newMachineWeight = this.initChild(Input, '.add_machine tr td:nth-child(5) input', 'Weight field')
        this.newMachinePower = this.initChild(Input, '.add_machine tr td:nth-child(6) input', 'Power field')
        this.newMachinePrice = this.initChild(Input, '.add_machine tr td:nth-child(7) input', 'Price field')
        this.submitNewMachine = this.initChild(Button, '.add_machine button', 'Submit button')
    }

    @step((name) => `${name} execute get header title`)
    async getHeaderTitle() {
        return this.headerTitle.get();
    }

    @step((name) => `${name} execute add new machine`)
    async addNewMachine({manufacturer, volume, length, width, weight, power, price}) {
        await this.newMachineManufacturer.sendKeys(manufacturer)
        await this.newMachineVolume.sendKeys(volume)
        await this.newMachineLength.sendKeys(length)
        await this.newMachineWidth.sendKeys(width)
        await this.newMachineWeight.sendKeys(weight)
        await this.newMachinePower.sendKeys(power)
        await this.newMachinePrice.sendKeys(price)
        await this.submitNewMachine.click()
    }

    @step((name) => `${name} get machines list`)
    async getMachinesList() {
        return await this.machineTable.get();
    }
}

export {
    TablePage
}