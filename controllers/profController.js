import pool from "../database/keys";
import cloudinary from "../lib/cloudinary";

const professor = {};

//COURSES
professor.createCourse = async (req, res) => {
  const { id, c_name, c_description } = req.body;

  try {
    await pool.query(
      "INSERT INTO course (p_id,c_name,c_description) VALUES ($1,$2,$3) ",
      [id, c_name, c_description]
    );

  
    const course =await (await pool.query("SELECT * FROM course order by id_c DESC LIMIT 1")).rows[0];

    res.status(200).json({
      message: "Curso Añadido con Éxito",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un Error",
      error,
    });
  }
};

professor.readCourse = async (req, res) => {
  const id = req.params.id_c; //para leer el parámetro que viene en la Ruta
  //   res.send(id);

  try {
    const course = await (
      await pool.query("SELECT * FROM course WHERE id_c=$1", [id])
    ).rows[0];
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

professor.updateCourse = async (req, res) => {
  const id = req.params.id_c; //para leer el parámetro que viene en la Ruta
  const { c_name, c_description } = req.body; //para leer lo que se envia ene l cuerpo

  try {
    await pool.query(
      "UPDATE course SET c_name=$1,c_description=$2 WHERE id_c=$3",
      [c_name, c_description, id]
    );
    res
      .status(200)
      .json({
        message: "Curso Actualizado",
        course: { c_name, c_description },
      });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un Error", error });
  }
};

professor.deleteCourse = async (req, res) => {
  const id = req.params.id_c; //obtiene el id que viene en la ruta enviada por formulairo
  
  console.error(id);

  try {
    await pool.query("DELETE FROM course WHERE id_c=$1", [id]);
    res.status(200).json({ message: "Registro Eliminado" });
  } catch (error) {
    res.status(500).json({
      message: "ocurrio un error",
      error,
    });
  }
};

professor.getCourses = async (req, res) => {
  const { id } = req.body;
  //console.log(id);
  try {
    const courses = await (
      await pool.query("SELECT * FROM course WHERE p_id=$1 ORDER BY id_c DESC", [id])
    ).rows;
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

//ASIGNACION
///
professor.createAssignment = async (req, res) => {

  const id_c = req.params.id_c;
  const { a_name, a_description } = req.body;
  const a_file = await cloudinary(req.files.a_file.tempFilePath);
  console.log(a_file);
  //res.send(file);

  try {
    await pool.query(
      "INSERT INTO assignment (c_id, a_name, a_description, a_file) VALUES ($1,$2,$3,$4)",
      [id_c, a_name, a_description, a_file]
    );
    const assignment = await (await pool.query(`SELECT * FROM assignment ORDER BY id_a DESC LIMIT 1`)).rows[0];
    console.log(assignment);
    res
      .status(200)
      .json({
        message: "Registro Assignment Creado",
        assignment
      });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

professor.getAssignment = async (req, res) => {
  const id = req.params.id_c;

  try {
    const assignment = await (
      await pool.query("SELECT * FROM assignment WHERE c_id=$1", [id])
    ).rows;

    res.status(200).json({
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      message: "ocurrio un error",
      error,
    });
  }
};

///ENTREGAS de los estudiantes
professor.getDeliveries = async (req, res) => {
  const id_a = req.params.id_a;

  try {
    const deliveries = await (
      await pool.query(
        `SELECT * FROM delivery 
            JOIN (SELECT id_s, s_name FROM student) AS S
                ON s_id=id_s WHERE a_id=$1`,
        [id_a]
      )
    ).rows;
    res.status(200).json({
      deliveries,
    });
  } catch (error) {
    res.status(500).json({
      message: "ocurrio un error",
      error,
    });
  }
};
module.exports = professor;
