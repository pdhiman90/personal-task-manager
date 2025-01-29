import Task from "../models/task.model";


class TaskService {
    create = async (payload: any) => {
        try {
          // Create the task using the payload
          const task = await Task.create({
            title: payload.title,
            description: payload.description,
            dueDate: new Date(payload.dueDate), // Ensure dueDate is converted to a valid Date object
            priority: payload.priority,
            category: payload.category,
            completed: payload.completed,
            user: payload.user, // Ensure the user is included in the payload
          });
      
          console.log("Task successfully created:", task);
          return task; // Return the created task object
        } catch (error: any) {
          console.error("Error in task creation:", error.message);
          throw new Error("Failed to create task"); // Throw an error to be handled by the calling function
        }
      };


    update = async (taskId: string,status:boolean)=>{
        try{
            const task = await Task.findById(taskId);
            if(!task){
                throw new Error("Task not found");
            }
            task.completed = status;
            await task.save();
            return task;
        }catch(error:any){
            console.error("Error in task update:", error.message);
            throw new Error("Failed to update task"); // Throw an error to be handled by the calling function
        }

    }
      
  delete = async (taskId: string) => {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error: any) {
      console.error("Error in task deletion:", error.message);
      throw new Error("Failed to delete task"); // Throw an error to be handled by the calling function
    }
  };
  
  getAll = async (userId: string) => {
    try {
      const tasks = await Task.find({user: userId});
      return tasks;
    } catch (error: any) {
      console.error("Error in task retrieval:", error.message);
      throw new Error("Failed to fetch tasks"); // Throw an error to be handled by the calling function
    }
  };
  
}

export default TaskService;