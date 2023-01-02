const fs = require('fs')


const info = (...params) => {
  writeToFile(...params)
};

const error = (...params) => {
  writeToFile(...params)
};

const writeToFile = (...data)=>{
  const writeStream = fs.createWriteStream(__dirname.concat('/../logs/log.txt'), {flags: 'a'})
  writeStream.write(data.join(' '))
  writeStream.write('\n')
  writeStream.close()
}

module.exports = {
  info,
  error,
};
