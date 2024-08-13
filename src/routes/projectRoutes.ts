import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";

const router = Router()

/** Routes for projects */
router.post('/', 
    body('projectName')
    .notEmpty().withMessage('Nombre de Proyecto obligatorio'),
    body('clientName')
    .notEmpty().withMessage('Nombre del Cliente obligatorio'),
    body('description')
    .notEmpty().withMessage('Descripcion del Proyecto obligatoria'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no existe'),
    handleInputErrors,
    ProjectController.getProjectById
)

/** Routes for tasks */
router.param('projectId', projectExist )

router.put('/:projectId',
    param('projectId').isMongoId().withMessage('ID no existe'),
    body('projectName')
    .notEmpty().withMessage('Nombre de Proyecto obligatorio'),
    body('clientName')
    .notEmpty().withMessage('Nombre del Cliente obligatorio'),
    body('description')
    .notEmpty().withMessage('Descripcion del Proyecto obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:projectId',
    param('projectId').isMongoId().withMessage('ID no existe'),
    handleInputErrors,
    ProjectController.deleteProject
)

router.post('/:projectId/tasks',
    body('name')
    .notEmpty().withMessage('Nombre de la Tarea obligatorio'),
    body('description')
    .notEmpty().withMessage('Descripcion de la Tarea obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks', 
    TaskController.getProjectTasks
)

router.param('taskId', taskExist )
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no existe'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no existe'),
    body('name')
    .notEmpty().withMessage('Nombre de la Tarea obligatorio'),
    body('description')
    .notEmpty().withMessage('Descripcion de la Tarea obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no existe'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID no existe'),
    body('status')
        .notEmpty().withMessage('Estado obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router;