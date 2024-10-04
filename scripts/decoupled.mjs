#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import figlet from 'figlet';
import { create } from './rcs.mjs';

let stdin = process.stdin;
console.log(chalk.yellow(figlet.textSync('Decoupled CLI', { horizontalLayout: 'fitted' })));
program.exitOverride().action(() => {
  inquirer
    .prompt(
      [
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            'Create new RCS set (Router, Controller and Service)',
            'Create new Router',
            'Create new Controller',
            'Create new Service',
            'Create new Model and Migration'
          ]
        },
        {
          type: 'input',
          name: 'name',
          message: "What's the name of the entity to create?"
        }
      ],
      { input: stdin }
    )
    .then(async (result) => {
      switch (result.choice) {
        case 'Create new Router':
          await create('route', result.name);
          break;
        case 'Create new Controller':
          await create('controller', result.name);
          break;
        case 'Create new Service':
          await create('service', result.name);
          break;
        case 'Create new RCS set (Router, Controller and Service)':
          await create('route', result.name);
          await create('controller', result.name);
          await create('service', result.name);
          break;
        case 'Create new Model and Migration':
          console.log(chalk.green('Please use yarn mig:gen to create your models and migrations'));
          console.log(chalk.green('See postgres/db.txt for examples of how its been done'));
          console.log();
          console.log(chalk.red('Be aware that we use UUIDs as ids in our native migration files'));
          console.log(chalk.red('See files in the db/migrations folder for how this has been done'));
          break;
      }
      const spinner = ora(`Doing ${result.choice}\n`).start();
      spinner.succeed(chalk.green('Done!'));
    });
});

program.parse(process.argv);
