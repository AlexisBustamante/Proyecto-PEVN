import express from 'express';
import studentController  from '../controllers/studentController';

const router = express.Router();

router.get('/courses/:id',studentController.getCourses);
router.post('/my-courses',studentController.getMyCourses);
router.post('/course/:id_c',studentController.joinCourse);
router.get('/assignments/:id_c/:id',studentController.getAssignments);
router.post('/delivery',studentController.addDelivery);

module.exports=router;