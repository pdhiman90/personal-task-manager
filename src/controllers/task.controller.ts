import {Request,Response} from "express";
import { HTTPStatusCodes } from "@bizcuit/httpstatuscodes";
import TaskService from "../services/task.services"

const task = new TaskService();


// const createTask = async (req:any, res:any): Promise<any> => {
//     try{
//         const {title,description,dueDate,priority,category} = req.body;
//         const user = req.id;
//         console.log(title,description,dueDate,priority,category,user,"req.body");
//         const payload={
//             title,
//             description,
//             dueDate,
//             priority,
//             category,
//             user
//         }

//         const newTask = await task.create(payload);
//         console.log(newTask,"new task");
//         return res.status(HTTPStatusCodes.OK).json({
//             status:true,
//             data:{newTask},
//             message:"Task created successfully"});


//     }catch(error:any){
//         throw new Error("Failed to create task");
//     }
    
// }

const createTask = async (req: any, res: any): Promise<any> => {
    try {
      const { title, description, dueDate, priority, category, completed } = req.body;
      const user = req.id; // Ensure `req.id` is correctly set by authentication middleware
  
      // Validate request body
      if (!title || !description || !dueDate || !priority || !category) {
        return res.status(400).json({
          status: false,
          message: "All fields (title, description, dueDate, priority, category) are required.",
        });
      }
  
      // Prepare the payload
      const payload = {
        title,
        description,
        dueDate: new Date(dueDate), // Ensure `dueDate` is converted to a valid Date object
        priority,
        category,
        completed,
        user
      };
  
      // Create the task in the database
      const newTask = await task.create(payload);
      console.log(newTask, "new task");
  
      // Send the response
      return res.status(201).json({
        status: true,
        data: newTask,
        message: "Task created successfully",
      });
    } catch (error: any) {
      console.error("Error creating task:", error.message);
  
      // Handle and return an appropriate error response
      return res.status(500).json({
        status: false,
        message: "Failed to create task. Please try again later.",
      });
    }

  };
  const Taskstatus = async (req: any, res: any): Promise<any> => {
    try{
      const taskId = req.params.id;
      const completed = req.body.completed;
      const updatedTask = await task.update(taskId,completed);
      return res.status(HTTPStatusCodes.OK).json({
          status:true,
          data:{updatedTask},
          message:"Task updated successfully"});
    }catch(error:any){
      throw new Error("Failed to update task");
    }
  }

  const deleteTask = async (req: any, res: any): Promise<any> => {
    try{
      const taskId = req.params.id;
      const deletedTask = await task.delete(taskId);
      return res.status(HTTPStatusCodes.OK).json({
          status:true,
          data:{deletedTask},
          message:"Task deleted successfully"});
    }catch(error:any){
      throw new Error("Failed to delete task");
    }
  }
  const getAllTasks = async (req: any, res: any): Promise<any> => {
    try{
      const user = req.id;
      const tasks = await task.getAll(user);
      return res.status(HTTPStatusCodes.OK).json({
          status:true,
          data:{tasks},
          message:"Tasks fetched successfully"});
    }catch(error:any){
      throw new Error("Failed to fetch tasks");
    }
  }
  

export default {createTask,Taskstatus,deleteTask,getAllTasks};