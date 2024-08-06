import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

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

router.put('/:id',
    param('id').isMongoId().withMessage('ID no existe'),
    body('projectName')
    .notEmpty().withMessage('Nombre de Proyecto obligatorio'),
    body('clientName')
    .notEmpty().withMessage('Nombre del Cliente obligatorio'),
    body('description')
    .notEmpty().withMessage('Descripcion del Proyecto obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no existe'),
    handleInputErrors,
    ProjectController.deleteProject
)

export default router;