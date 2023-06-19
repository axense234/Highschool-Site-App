// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { Class } from "@prisma/client";
import { classClient } from "../db/postgres";

// GET ALL CLASSES
const getAllClasses = async (req: Request, res: Response) => {
  const foundClasses = await classClient.findMany({});

  if (foundClasses.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any classes!", classes: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundClasses.length,
    msg: `Successfully found ${foundClasses.length} classes!`,
    classes: foundClasses,
  });
};

// GET CLASS BY ID
const getClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any classes with the id:${classId}.`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found class with id:${classId}.`,
    class: foundClass,
  });
};

// CREATE CLASS
const createClass = async (req: Request, res: Response) => {
  const classBody = req.body as Class;

  const createdClass = await classClient.create({
    data: { ...classBody },
  });

  if (!createdClass) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create a class with the data received!",
      class: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created class with uid:${createdClass.class_uid}!`,
    class: createdClass,
  });
};

// DELETE CLASS BY ID
const deleteClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any classes with id:${classId}.`,
      class: {},
    });
  }

  const deletedClass = await classClient.delete({
    where: { class_uid: classId },
  });

  if (!deletedClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not delete class with id:${classId}!`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted class with id:${classId}!`,
    class: deletedClass,
  });
};

// UPDATE CLASS BY ID
const updateClassById = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const classBody = req.body as Class;

  if (!classId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a classId!", class: {} });
  }

  const foundClass = await classClient.findUnique({
    where: { class_uid: classId },
  });

  if (!foundClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Couldn't find any classes with id:${classId}.`,
      class: {},
    });
  }

  const updatedClass = await classClient.update({
    where: { class_uid: classId },
    data: { ...classBody },
  });

  if (!updatedClass) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find class with id:${classId} in order to update it!`,
      class: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated class with id:${classId}!`,
    class: updatedClass,
  });
};

// EXPORTS
export {
  getAllClasses,
  createClass,
  getClassById,
  deleteClassById,
  updateClassById,
};
