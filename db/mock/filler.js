const fs = require('fs');
var readline = require('readline');


var reader = readline.createInterface({
    input: fs.createReadStream('EventLog.sql')
});

const actions = [ 'open' , 'close', 'flash' , 'command']

reader.on('line', function(line) {
    console.log('Current line: '+ line);
    const rand = Math.floor(Math.random() * 100);
    var ind = 0;
    if(rand < 25){
        ind = 0
    }else if(rand > 75){
        ind = 1
    }else if(rand % 3 < 2){
        ind = 2
    }else{
        ind = 3;
    }
    const newLine = line.replace('lorem', actions[rand]) + '\n';
    fs.appendFile('output.sql', newLine, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing output file: ${err}`);
          return;
        }
    }); 
})