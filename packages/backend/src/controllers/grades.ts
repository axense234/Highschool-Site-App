// Express and Others
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { gradeClient } from "../db/postgres";

const getAllGrades = async (req: Request, res: Response) => {
  const foundGrades = await gradeClient.findMany({});

  if (foundGrades.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any grades, please try again later!",
      grades: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found ${foundGrades.length} grades!`,
    nbHits: foundGrades.length,
    grades: foundGrades,
  });
};

const getGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;

  if (!gradeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid grade id!", grade: {} });
  }

  const foundGrade = await gradeClient.findUnique({
    where: { grade_uid: gradeId },
  });

  if (!foundGrade) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any grades with the following id:${gradeId}!`,
      grade: {},
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: `Successfully found a grade!`, grade: foundGrade });
};

const updateGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;
  const { value } = req.body;

  if (!gradeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a grade id!", grade: {} });
  }

  const foundGrade = await gradeClient.findUnique({
    where: { grade_uid: gradeId },
  });

  if (!foundGrade) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any grades with the following id:${gradeId}!`,
      grade: {},
    });
  }

  const updatedGrade = await gradeClient.update({
    where: { grade_uid: gradeId },
    data: { value },
  });

  if (!updatedGrade) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Something went wrong while trying to update a grade!` });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated grade with id: ${gradeId}`,
    grade: updatedGrade,
  });
};

const deleteGradeById = async (req: Request, res: Response) => {
  const { gradeId } = req.params;

  if (!gradeId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a grade id!", grade: {} });
  }

  const foundGrade = await gradeClient.findUnique({
    where: { grade_uid: gradeId },
  });

  if (!foundGrade) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any grades with the following id:${gradeId}!`,
      grade: {},
    });
  }

  const deletedGrade = await gradeClient.delete({
    where: { grade_uid: gradeId },
  });

  if (!deletedGrade) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any grades with id:${gradeId} or something went wrong!`,
      grade: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted grade with id:${gradeId}!`,
    grade: deletedGrade,
  });
};

const createGrade = async (req: Request, res: Response) => {
  const gradeBody = req.body;

  delete gradeBody.grade_uid;
  delete gradeBody.date;

  if (gradeBody.value && (gradeBody.value > 10 || gradeBody.value < 1)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide a grade between 1 and 10.", grade: {} });
  }

  const createdGrade = await gradeClient.create({
    data: { ...gradeBody },
  });

  if (!createdGrade) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong when creating a grade!`,
      grade: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a grade with id:${createdGrade.grade_uid}`,
    grade: createdGrade,
  });
};

export {
  getAllGrades,
  getGradeById,
  updateGradeById,
  deleteGradeById,
  createGrade,
};
