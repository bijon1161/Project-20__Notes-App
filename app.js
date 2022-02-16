const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command : 'add',
    describe: "Adding a Note",
    builder: {
        title : {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);        
    }
})

yargs.command({
    command : 'remove',
    describe: "Removing a Note",
    builder: {
        title : {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);        
    }
})

yargs.command({
    command : 'list',
    describe : 'Showing list',
    builder: {
        title : {
            describe: 'Note Title',
            demandOption: true,
            type : 'string'
        }
    },
    handler(){
        notes.showingList()
    }
})

yargs.command({
    command : 'read',
    describe : 'Reading list',
    handler(argv){
        notes.readingList(argv.title)
    }
})

yargs.parse();