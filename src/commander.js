import { Command } from 'commander';
import gendiff from './index.js';

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .helpOption('-h, --help', 'render usage information')
    .option('-f, --format [type]', 'render format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      try {
        console.info(gendiff(filepath1, filepath2, program.format));
      } catch (err) {
        console.error(err.message);
        process.exit(err.number);
      }
    });
  // program.option('-d, --debug', 'render extra debugging');
  // if (program.debug) console.log(program.opts());
  program.parse(process.argv);
};

export default run;
