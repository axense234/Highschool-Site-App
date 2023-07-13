// Express
import { Request, Response } from "express";
// Persistences
import getAllTeachersPersistence from "../persistences/teachers/getAllTeachersPersistence";
import getTeacherByIdPersistence from "../persistences/teachers/getTeacherByIdPersistence";
import deleteTeacherByIdPersistence from "../persistences/teachers/deleteTeacherByIdPersistence";
import updateTeacherByIdPersistence from "../persistences/teachers/updateTeacherByIdPersistence";

const getAllTeachers = async (req: Request, res: Response) => {
  const { sortByFilter, filter, filterQuery } = req.query;
  const foundTeachersPayload = await getAllTeachersPersistence(
    sortByFilter as string,
    filter as string,
    filterQuery as string
  );
  return res.status(foundTeachersPayload.statusCode).json(foundTeachersPayload);
};

const getTeacherById = async (req: Request, res: Response) => {
  const teacherId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  const { includeClassrooms, includeBookmarks } = req.query;

  const foundTeacherPayload = await getTeacherByIdPersistence(
    "teacher_uid",
    teacherId,
    includeClassrooms as string,
    includeBookmarks as string
  );
  return res.status(foundTeacherPayload.statusCode).json(foundTeacherPayload);
};

const deleteTeacherById = async (req: Request, res: Response) => {
  const { teacherId } = req.params;

  const deletedTeacherPayload = await deleteTeacherByIdPersistence(teacherId);
  return res
    .status(deletedTeacherPayload.statusCode)
    .json(deletedTeacherPayload);
};

const updateTeacherById = async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const teacherBody = req.body;

  delete teacherBody.classes;

  const updatedTeacherBody = await updateTeacherByIdPersistence(
    teacherId,
    teacherBody
  );
  return res.status(updatedTeacherBody.statusCode).json(updatedTeacherBody);
};

// EXPORTS
export { getAllTeachers, getTeacherById, deleteTeacherById, updateTeacherById };
