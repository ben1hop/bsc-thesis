const fs = require('fs');
var readline = require('readline');


var reader = readline.createInterface({
    input: fs.createReadStream('EventLog.sql')
});

const actions = [ 'open' , 'close', 'flash' , 'command']

function weightedRandom(weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
  
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random < 0) {
        return i;
      }
    }
  }

const tools = [{value: 'Otcom', chance: 18, count:0},
{value: 'Zaam-Dox', chance: 7,count:0},
{value: 'Konklux', chance: 33,count:0},
{value: 'Bitwolf', chance: 1,count:0},
{value: 'Cookley', chance: 21,count:0},
{value: 'Tres-Zap', chance: 9,count:0},
{value: 'Fixflex', chance: 3,count:0},
{value: 'Job', chance: 2,count:0},
{value: 'Lotstring', chance: 6,count:0}]

const weightedTools = tools.map((tool, index) => ({
    ...tool,
    startRange: tools.slice(0, index).reduce((acc, t) => acc + t.chance, 0),
  }));

reader.on('line', function(line) {
    //console.log('Current line: '+ line);
    const rand = Math.floor(Math.random() * 100);
    var ind_action = 0;
    if(rand < 25){
        ind_action = 0
    }else if(rand > 75){
        ind_action = 1
    }else if(rand % 3 < 2){
        ind_action = 2
    }else{
        ind_action = 3;
    }

    let rand1 = Math.floor(Math.random() * 100);
    let selectedTool;
    for (const tool of weightedTools) {
        if (rand1 < tool.startRange + tool.chance) {
            selectedTool = tool.value;
            const index = tools.findIndex(x => x.value === selectedTool);
            tools[index].count = tools[index].count++;
            break;
        }
    } 
    console.log("Tool:"+selectedTool+" and action:"+actions[ind_action]);

    const newLine = line.replace('lorem1', actions[ind_action]).replace('lorem', selectedTool) + '\n';
    fs.appendFile('output.sql', newLine, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing output file: ${err}`);
          return;
        }
    }); 
})