import express from 'express';
import profController  from '../controllers/profController';

const router = express.Router();
//COURSES
router.post('/course',profController.createCourse);
router.get('/course/:id_c',profController.readCourse);
router.put('/course/:id_c',profController.updateCourse);//para actualizar
router.delete('/course/:id_c',profController.deleteCourse);//para eliminar
router.post('/my-courses/',profController.getCourses);//los cursos dle profesor que inicio sesion

//ASIGNACIONES
router.post('/assignment/:id_c',profController.createAssignment);
router.get('/course-assignments/:id_c',profController.getAssignment);

///ENTREGAS
router.get('/deliveries/:id_a',profController.getDeliveries);
module.exports = router;