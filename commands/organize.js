let fs=require('fs');
let path=require('path');
let types={
    media: [".mp4",".mkv"],
    archives: [".zip",".7z",".rar",".tar",".gz",".xz",".ar",".iso"],
    documents: [".docx",".doc",".pdf",".xlsx",".xls",".odt",".ods",".odp",".odg",".odf",".txt",".ps",".tex"],
    app: [".exe",".dmg",".pkg",".deb"],
    photos: [".jpg",".jar"],
    others: []
};
function organizefn(dirpath)
{
    // console.log("Organize command implemented for",dirpath);
    // compute the destination path
    let destpath;
    if(dirpath==undefined)
    {
        dirpath=process.cwd();
    }
    if(fs.existsSync(dirpath))
    {
        destpath=path.join(dirpath,"orgainsed_files");
        // if destination path does not exists then create it
        if(fs.existsSync(destpath)==false) fs.mkdirSync(destpath);  // mkdirSync synchronously creates a new directory
    }
    else 
    {
        console.log('kindly enter the correct path');
        return;
    }
    oraganizehelper(dirpath,destpath);
}

function oraganizehelper(src,dest)
{
    // read the contents of source directory 
    // if it is a file then get its category
    // send the file to destination in specified category

    let filenames=fs.readdirSync(src);
    // console.log(filenames);
    for(let i=0;i<filenames.length;i++)
    {
        let fileaddr=path.join(src,filenames[i]);
        let isfile=fs.lstatSync(fileaddr).isFile();
        if(isfile)
        {
            let cat=getcat(filenames[i]);
            // if(cat=="others") continue;
            sendfiles(fileaddr,dest,cat);
        }
    }
}

function sendfiles(src,dest,cat)
{
    // if category doesn't exists then create it
    let catpath=path.join(dest,cat);
    if(fs.existsSync(catpath)==false) fs.mkdirSync(catpath);
    let filesrc=path.basename(src);
    let destname=path.join(catpath,filesrc);
    fs.copyFileSync(src,destname);
    // for cut use fs.unlinkSync(src);
    console.log(filesrc,"copied to", cat);
}

function getcat(name)
{
    let ext=path.extname(name); // extname gives the extension name with '.'(dot)
    // console.log(ext);
    for(let type in types)
    {
        for(let i=0;i<types[type].length;i++)
        {
            if(ext==types[type][i]) return type;
        }
    }
    return "others";
}
module.exports={
    organizekey:organizefn
}