// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { teacherClient } from "../db/postgres";

// GET ALL TEACHERS
const getAllTeachers = async (req: Request, res: Response) => {
  const foundTeachers = await teacherClient.findMany({});

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

// GET TEACHER BY ID
const getTeacherById = async (req: Request, res: Response) => {
  const { teacherId } = req.params;

  if (!teacherId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid teacher id.", teacher: {} });
  }

  const foundTeacher = await teacherClient.findUnique({
    where: { teacher_uid: teacherId },
  });

  if (!foundTeacher) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any teachers with id: ${teacherId}.`,
      teacher: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found teacher with id:${teacherId} and username:${foundTeacher.username}`,
    teacher: foundTeacher,
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

  const foundTeacher = await teacherClient.findUnique({
    where: { teacher_uid: teacherId },
  });

  if (!foundTeacher) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any teachers with id: ${teacherId}.`,
      teacher: {},
    });
  }

  const deletedTeacher = await teacherClient.delete({
    where: { teacher_uid: teacherId },
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
      .json({ msg: `Scrieți numele si prenumele profesorului!` });
  }

  if (!teacherId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a teacherId!", teacher: {} });
  }

  const foundTeacher = await teacherClient.findUnique({
    where: { teacher_uid: teacherId },
  });

  if (!foundTeacher) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any teachers with id: ${teacherId}.`,
      teacher: {},
    });
  }

  const updatedTeacher = await teacherClient.update({
    where: { teacher_uid: teacherId },
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
export { getAllTeachers, getTeacherById, deleteTeacherById, updateTeacherById };
