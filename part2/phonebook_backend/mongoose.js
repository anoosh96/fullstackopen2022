const mongoose = require('mongoose')


const [password, name, number] = [process.argv[2], process.argv[3], process.argv[4]]

if (!password){
  console.log('please provide password')
  process.exit(1)
}

console.log(password)


const url = `mongodb+srv://ahmed96:${password}@cluster0.lbun7q4.mongodb.net/phoneApp?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: String
})

const Phone = mongoose.model('Phone', phoneSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if(name && number){
      const phone = new Phone({
        name: name,
        date: new Date(),
        number: number,
      })

      phone.save().then(()=>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close();
      })
  
    }
    else{
      Phone.find({}).then((res)=>{
        console.log('Phonebook');
        res.forEach((r)=>{
          console.log(`${r.name} ${r.number}`);
        })
        mongoose.connection.close();
      })
    }
    
    
  })
  .catch((err) => console.log(err))