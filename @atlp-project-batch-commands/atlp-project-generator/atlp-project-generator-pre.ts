var fs = require('fs');
const atlp_project_generator_pre_colors = require('colors');
const atlp_project_generator_pre_targetPath = '../../angular.json';
var newPrjectPath =
  `"newProjectRoot": "${process.argv[2]}",` || '"newProjectRoot": "projects",';
console.log('New project path => ', newPrjectPath);
fs.readFile(
  atlp_project_generator_pre_targetPath,
  'utf8',
  function (err, data) {
    if (err) {
      return console.log(atlp_project_generator_pre_colors.magenta(err));
    }

    let result = data.replace('"newProjectRoot": "projects",', newPrjectPath);
    fs.writeFile(
      atlp_project_generator_pre_targetPath,
      result,
      'utf8',
      function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log(
            atlp_project_generator_pre_colors.magenta(
              `Pre angular.json file generated correctly at ${atlp_project_generator_pre_targetPath} \n`
            )
          );
        }
      }
    );
  }
);
