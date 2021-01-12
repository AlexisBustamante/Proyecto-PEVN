import pool from "../database/keys";
import Cloudinary from "../lib/cloudinary";

const students = {};

students.getCourses = async (req, res) => {
  const id_s = req.params.id;

  try {
    //aca se hace uso de un SELECT anidado, ya que solo deseamos obtener algunos campos de la
    //se llama a una VISTA creada en la BD
    const courses = await (
      await pool.query(
        `SELECT * FROM professorvscourse LEFT JOIN	(SELECT * FROM studentvscourse WHERE s_id=$1) AS S
        ON id_c=c_id WHERE c_id is NULL`,
        [id_s]
      )
    ).rows;

    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

students.getMyCourses = async (req, res) => {
  const id = req.body.id; //id del estudiante que inicio sesion
  try {
    const courses = await (
      await pool.query(
        //el primer select consulta a una VISTA creada en la BD
        `SELECT * FROM professorvscourse 
           JOIN (SELECT * FROM studentvscourse WHERE s_id=$1) AS S
               ON id_c=c_id`,
        [id]
      )
    ).rows;

    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

students.joinCourse = async (req, res) => {
  const id = req.body.id;
  const id_c = req.params.id_c;

  try {
    await pool.query("INSERT INTO studentvscourse VALUES ($1,$2)", [id, id_c]);

    res.status(200).json({
      message: "Te uniste al Curso",
      course: { id_c },
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

students.getAssignments = async (req, res) => {
  const { id, id_c } = req.params;

  try {
    const course = await (
      await pool.query("SELECT * FROM professorvscourse WHERE id_c=$1", [id_c])
    ).rows[0];

    const assignments = await (
      await pool.query(
        "SELECT * FROM assignment LEFT JOIN (SELECT * FROM delivery WHERE s_id=$1) AS D ON id_a=a_id WHERE c_id=$2",
        [id, id_c]
      )
    ).rows;

    res.status(200).json({
      course,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrio un error",
      error,
    });
  }
};

students.addDelivery = async (req, res) => {

  const { id, id_a } = req.body;

  const d_filename = req.files.d_file.name;

  const d_file = await Cloudinary(req.files.d_file.tempFilePath);

  try {
    await pool.query(
      "INSERT INTO delivery (a_id,s_id,d_file,d_filename) VALUES ($1, $2, $3, $4)",
      [id_a, id, d_file, d_filename]
    );

    res.status(200).json({
      message: "Entrega Subida",
      d_file,
      d_filename,
    });
  } catch (error) {
    res.status(500).json({
      message: "ocurrio un error",
      error,
    });
  }
};
module.exports = students;
