const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note Added Successfully!'));
    }
    else{
        console.log(chalk.red.inverse("Note Title already existed!"));
    }
}

const removeNote = (title) => {

    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No note found'));
    }

}

const showingList = ()=>{
    const notes = loadNotes()
    console.log(chalk.white.inverse.bold("Your Notes!"))
    notes.forEach((note)=>{
        console.log(chalk.blueBright.bold.underline("Title:")+" "+note.title+"\n"+chalk.magentaBright("Description:")+" "+note.body)
    })
    // notes.foreach((note)=>{
    //     console.log(chalk.blackBright.bold.inverse.underline(" Title : "+note.title)+chalk.magenta.inverse(" Description : "+note.body))
    // })
}

const readingList = (title)=>{
    const notes = loadNotes()
    var v = 0
    notes.forEach((note)=>{
        if(title===note.title){
            v = 1
            console.log(chalk.italic.bold.white.inverse("Title: "+note.title )+"\n"+chalk.magenta("Description : ")+note.body)
        }
        
    })
    if(v===0){
        console.log(chalk.red.inverse('No note found'));
    }

}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

const saveNotes = (notes) =>  {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    showingList : showingList,
    readingList : readingList
}