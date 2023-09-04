let fs=require('fs');
let path=require('path');

function treefn(dirpath)
{
    if(dirpath==undefined)
    {
        treehelper(process.cwd(),"");  // process.cwd gets the current working directory
        return;
    }
    else 
    {
        if(fs.existsSync(dirpath)) // existsSync synchronously checks if a file already exists in the given path or not
        {
            treehelper(dirpath,"");
        }
        else 
        {
            console.log('kindly enter the correct path');
            return;
        }
    }
}

function treehelper(dirpath,indent)
{
    // if dirpath is file path print file name
    // else if it is a directory then read the contents of the directory  and recursively call the function

    let isfile=fs.lstatSync(dirpath).isFile();   // lstatSync checks whether the path is of a file or a directory
    if(isfile==true)
    {
        let filename=path.basename(dirpath);   // basename extracts filename from a path
        console.log(indent+"------"+filename);
    }
    else 
    {
        let dirname=path.basename(dirpath);
        console.log(indent+"|____"+dirname);
        let child=fs.readdirSync(dirpath);   // readdirSync synchronously reads the contents of a directory
        for(let i=0;i<child.length;i++)
        {
            let childpath=path.join(dirpath,child[i]);  // join function joins two paths
            treehelper(childpath,indent+"\t");
        }
    }
}
// to export object
module.exports={
    treekey:treefn
}