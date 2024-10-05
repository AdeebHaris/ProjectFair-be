const projects = require('../Models/projectSchema')

// add a new project
exports.addProject = async(req,res)=>{
    console.log("Inside add project controller"); 
    const userId = req.payload;
    console.log("userId:-",userId);
    const projectImage = req.file.filename
    console.log(projectImage);
    
    // request we are getting is form data
    // so it is not possible to directly access the data
    // we need to use multer module todeal with 
    const {title,language,github,website,overview} = req.body;
    try{
        const existingProject = await projects.findOne({github:github});
        if(existingProject){
            res.status(409).json("Project already exists")
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save();
            res.status(200).json("Project uploaded successfully")
        }
    }catch(err){
        res.status(401).json("Project uploading failed",err)
    }
}
    // 1) get any three project for home page
    exports.getHomeProject = async(req,res)=>{
        try{
            const homeProject = await projects.find().limit(3)
            res.status(200).json(homeProject)
        }
        catch(err){
            res.status(401).json("Request failed due to",err)
        }
    }

    // 2) get all projects
    exports.getAllProject = async(req,res)=>{
        const searchKey = req.query.search; // search is key name used in commonApi
        console.log(searchKey);
        const searchQuery = {
            $or:[
                {
                    language:{
                        $regex:searchKey,$options:'i' // by giving i the case sensitivity gets removed
                    }
                },
               {
                title:{
                    $regex:searchKey,$options:'i'
                }
               }
               
            ]
            
        }
        try{
            const allProject = await projects.find(searchQuery)
            res.status(200).json(allProject)
            
        }
        catch(err){
            res.status(401).json("Request failed due to",err)
        }
    }
    // 3) get all projects uploaded by that specific user
    exports.getUserProject = async(req,res)=>{
        userId = req.payload;        
        try{
            const allUserProject = await projects.find({userId:userId});
            res.status(200).json(allUserProject)
            
        }
        catch(err){
            res.status(401).json("Request failed due to",err)
        }
    }

    exports.editUserProject = async(req,res)=>{
        const {id} = req.params;
        const userId = req.payload;
        const {title,language,website,github,overview,projectImage} = req.body;
        const uploadedProjectImage = req.file?req.file.filename:projectImage
        try{
            const updateProject = await projects.findByIdAndUpdate(
                {_id:id},{
                    title:title,
                    language:language,
                    github:github,
                    website:website,
                    overview:overview,
                    projectImage:uploadedProjectImage,
                    userId:userId
                },{
                    new:true
                }
            );
            await updateProject.save();
            res.status(200).json(updateProject)
        }
        catch(err){
            res.status(401).json(err)
        }
    }

    // 5) delete a project
    exports.deleteUserProject = async(req,res) =>{
        const {id}= req.params;
        try{
            const removedProject = await projects.findByIdAndDelete({_id:id})
            res.status(200).json(removedProject)
        }
        catch(err){
            res.status(401).json(err)
        }
    }

