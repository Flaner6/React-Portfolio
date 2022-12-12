// include fs-extra package
const fs = require('fs-extra');

const copy = (source, destination) => {
  console.log(`Start copy from ${source} to ${destination} started!`)
  fs.copy(source, destination, function (err) {
    if (err){
        console.log(`An error occured while copying from ${source} to ${destination}.`);
        return console.error(err);
    }
    console.log(`Copy from ${source} to ${destination} completed!`)
});
}

copy('portfolio', 'dist');

copy('./E1-tic-tac-toe', './dist/tic-tac-toe');

// copy('html-css-practice', 'dist');

copy('./twitter-card/build', './dist/twitter-card');
copy('./ums/build', './dist/ums');
copy('./wheel-of-fortune/build', './dist/wheel-of-fortune');
