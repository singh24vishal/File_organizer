#!/usr/bin/env node
let inparr=process.argv.slice(2);
let fs=require('fs');          // require include modules
let path=require('path');

// console.log(inparr);
// C:\Users\kanch\Downloads   C:\Users\kanch\Downloads\orgainsed_files
// node main.js tree "directory path"
// node main.js organise "directory path"
// node main.js help

let helpobj=require("./commands/help")
let organizeobj=require("./commands/organize")
let treeobj=require("./commands/tree")
let command=inparr[0];
let dirpath=inparr[1];
switch(command)
{
    case "tree":
        treeobj.treekey(dirpath);  // calling the function via object
        break;
    case "organize":
        organizeobj.organizekey(dirpath);
        break;
    case "help":
        helpobj.helpkey();
        break;
    default:
        console.log("enter correct command");
        break;
}





