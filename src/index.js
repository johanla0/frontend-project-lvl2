import { Command } from 'commander';

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .helpOption('-h, --help', 'output usage information');
  program.parse(process.argv);

  // program.option('-d, --debug', 'output extra debugging')
  // if (program.debug) console.log(program.opts());

  if (program.small) console.log('- small pizza size');
  if (program.pizzaType) console.log(`- ${program.pizzaType}`);
};
export default run;
