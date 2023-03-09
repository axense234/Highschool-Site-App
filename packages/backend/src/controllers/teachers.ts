// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma Client
import { profesorClient } from "../db/postgres";

// GET ALL TEACHERS
const getAllTeachers = async (req: Request, res: Response) => {
  const foundTeachers = await profesorClient.findMany({});

  if (foundTeachers.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any teachers at the moment!",
      teachers: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundTeachers.length,
    msg: `Successfully fetched ${foundTeachers.length} teachers!`,
    teachers: foundTeachers,
  });
};

// CREATE TEACHERS
const createTeacher = async (req: Request, res: Response) => {
  const teacherBody = req.body;

  if (!teacherBody.username || !teacherBody.descriere) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Introduceti nume si prenumele,descrierea.", teacher: {} });
  }

  const createdTeacher = await profesorClient.create({
    data: { ...teacherBody },
  });

  if (!createdTeacher) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create teacher,please make sure you entered the right properties!",
      teacher: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a teacher with uid:${createdTeacher.profesor_uid}!`,
    teacher: createdTeacher,
  });
};

// DELETE ALL TEACHERS
const deleteAllTeachers = async (req: Request, res: Response) => {
  const deletedTeachers = await profesorClient.deleteMany({});

  if (deletedTeachers.count < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any teachers to delete or something else went wrong!",
      teachers: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted ${deletedTeachers.count} teachers!`,
    teachers: deletedTeachers,
  });
};

// DELETE TEACHER BY ID
const deleteTeacherById = async (req: Request, res: Response) => {
  const { teacherId } = req.params;

  if (!teacherId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a teacherId!", teacher: {} });
  }

  const deletedTeacher = await profesorClient.delete({
    where: { profesor_uid: teacherId },
  });

  if (!deletedTeacher) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not delete teacher with id:${teacherId}!`,
      teacher: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted teacher with username:${deletedTeacher.username}!`,
    teacher: deletedTeacher,
  });
};

// UPDATE TEACHER BY ID
const updateTeacherById = async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const teacherBody = req.body;

  if (!teacherBody.username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Scrieti numele si prenumele profesorului!` });
  }

  if (!teacherId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a teacherId!", teacher: {} });
  }

  const updatedTeacher = await profesorClient.update({
    where: { profesor_uid: teacherId },
    data: { ...teacherBody },
  });

  if (!updatedTeacher) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find teacher with id:${teacherId} in order to update them!`,
      teacher: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated teacher: ${updatedTeacher.username}!`,
    teacher: updatedTeacher,
  });
};

// EXPORTS
export {
  getAllTeachers,
  createTeacher,
  deleteAllTeachers,
  deleteTeacherById,
  updateTeacherById,
};
