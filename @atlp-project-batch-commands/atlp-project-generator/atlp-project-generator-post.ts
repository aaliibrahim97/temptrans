var fs = require('fs');
const atlp_project_generator_post_colors = require('colors');
const atlp_project_generator_post_targetPath = '../../angular.json';
var newPrjectPath = '"newProjectRoot": "projects",';
console.log('New project path => ', newPrjectPath);
fs.readFile(
  atlp_project_generator_post_targetPath,
  'utf8',
  function (err, data) {
    if (err) {
      return console.log(atlp_project_generator_post_colors.magenta(err));
    }

    let result = data.replace(
      `"newProjectRoot": "${process.argv[2]}",`,
      newPrjectPath
    );
    fs.writeFile(
      atlp_project_generator_post_targetPath,
      result,
      'utf8',
      function (err) {
        if (err) {
          return console.log(err);
        } else {
          console.log(
            atlp_project_generator_post_colors.magenta(
              `post angular.json file generated correctly at ${atlp_project_generator_post_targetPath} \n`
            )
          );
        }
      }
    );
  }
);
