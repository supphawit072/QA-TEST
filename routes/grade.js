const express =require('express');
const app =express();
const{getGrade,createGrade,updateGrade,deleteGrade, getGrades,}=require('../controllers/gradeController');

const routes =express.Router();

routes.get("/grades",getGrades);

routes.get("/grade/:id",getGrade);

routes.post("/grade",createGrade);

routes.put("/grade/:id",updateGrade);

routes.delete("/grade/:id",deleteGrade);

module.exports=routes;