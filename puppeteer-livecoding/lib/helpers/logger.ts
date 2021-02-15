import * as chalk from 'chalk';

const logger = {
    tabGreen: (msg) => console.log(chalk.green(`\t${msg}`)),
    spaceGreen: (msg) => console.log(chalk.green(` ${msg}`)),
    spaceYellow: (msg) => console.log(chalk.yellow(` ${msg}`)),
    spaceRed: (msg) => console.log(chalk.red(` ${msg}`))
}

export {
    logger
}