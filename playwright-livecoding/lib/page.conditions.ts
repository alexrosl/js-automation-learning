import {waits} from './helpers'
import * as chalk from 'chalk'

import {initStepDeclarator} from 'assertior'

const {ALLURE} = process.env
declare const allure;
function allureStep(stepAssertionName: string, error, expected, current) {
    const step = allure.startStep(stepAssertionName);
    if (expected) {
        allure.attachment('Expected value', JSON.stringify(expected, null, 2), 'application/json');
    }
    if (current) {
        allure.attachment('Current value', JSON.stringify(current, null, 2), 'application/json');
    }
    if (error) {
        allure.attachment('Error', JSON.stringify(error, null, 2), 'application/json');
    }
    step.step.stepResult.status = error ? 'broken' : 'passed';
    step.endStep();
}

async function allureInterfaceStep(stepName, cb) {
    const step = allure.startStep(stepName);
    try {
        const result = await cb();
        if (result) {
            allure.attachment('Step result', JSON.stringify(result, null, 2), 'application/json');
        }
        step.step.stepResult.status = 'passed'
        step.endStep()
        return result
    } catch (error) {
        allure.attachment('Error', JSON.stringify(error, null, 2), 'application/json');
        step.step.stepResult.status = 'broken'
        step.endStep()
        throw error;
    }

}

if (ALLURE) {
    initStepDeclarator(allureStep)
}

function decoratePage(pageOrFragment) {
    const name = pageOrFragment.id || pageOrFragment.__proto__.constructor.name;
    Object.getOwnPropertyNames(pageOrFragment.__proto__)
        .filter(prop => {
                return prop !== 'constructor' && (typeof pageOrFragment.__proto__[prop]).includes('function');
            }
        )
        .forEach(prop => {
            const originalProp = pageOrFragment.__proto__[prop]
            pageOrFragment.__proto__[prop] = async function(...args) {

                let message = `${name} execute ${prop}`

                if (name.includes('Fragment')) {
                    message =`\t${message}`
                }

                async function currentCall(...currentCallArgs) {
                    await waits(this.page).waitVisibility(this.rootSelector)
                    return originalProp.call(this, ...currentCallArgs)
                }

                if (ALLURE) {
                    return allureInterfaceStep(message, currentCall.bind(this, ...args))
                }
                console.log(chalk.green(message))
                return currentCall.call(this, ...args)
            }
        })
}

export {
    decoratePage,
    allureInterfaceStep
}