const fs = require("fs");
const prompt = require("prompt");

// GET Path of file Dir and extension of files to be deleted
prompt.get(["pathOfDir", "fileExtension"], (err, result)=> {
		checkAndDelete(result.pathOfDir, result.fileExtension);
});

function checkAndDelete(path, fileType){
	// read files and dir in provided path
	fs.readdir(path, (err, items) => {
		try{
			items.forEach((item) => {
			    // modify the path to contain the file/dir name
                var itemPath = path + `/${item}`;
                var stats = fs.statSync(itemPath);
                if(stats.isFile()){
                    //check and delete files of specified extension
                    if (item.includes("." + fileType)){
                        fs.unlink(itemPath, (err) => {
                            if(err){
                                console.log(err)
                            }else{
                                console.log(item)
                            }
                        });
                    }
                }else{
                    // if it's dir repeat
                    checkAndDelete(itemPath, fileType);
                }
		});	
		}catch(e){
			console.log("Enter A Correct Path !!");
			process.exit();
		}
		
	});
}