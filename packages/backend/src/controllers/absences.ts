// Express and Others
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { absenceClient } from "../db/postgres";

const getAllAbsences = async (req: Request, res: Response) => {
  const foundAbsences = await absenceClient.findMany({});

  if (foundAbsences.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any absences, please try again later!",
      absences: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundAbsences.length,
    msg: `Successfully found ${foundAbsences.length} absences!`,
    absences: foundAbsences,
  });
};

const getAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;

  if (!absenceId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid absence id!", absence: {} });
  }

  const foundAbsence = await absenceClient.findUnique({
    where: { absence_uid: absenceId },
  });

  if (!foundAbsence) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any absences with the following id:${absenceId}!`,
      absence: {},
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: `Successfully found an absence!`, absence: foundAbsence });
};

const updateAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;
  const absenceBody = req.body;

  if (!absenceId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a absence id!", absence: {} });
  }

  const foundAbsence = await absenceClient.findUnique({
    where: { absence_uid: absenceId },
  });

  if (!foundAbsence) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find the absence you wanted to update!(id:${absenceId})`,
      absence: {},
    });
  }

  if (!absenceBody.reasoned) {
    absenceBody.reasoned = !foundAbsence.reasoned;
  }

  const updatedAbsence = await absenceClient.update({
    where: { absence_uid: absenceId },
    data: { ...absenceBody },
  });

  if (!updatedAbsence) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Something went wrong while trying to update an absence!` });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated absence with id: ${absenceId}`,
    absence: updatedAbsence,
  });
};

const deleteAbsenceById = async (req: Request, res: Response) => {
  const { absenceId } = req.params;

  if (!absenceId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a absence id!", absence: {} });
  }

  const foundAbsence = await absenceClient.findUnique({
    where: { absence_uid: absenceId },
  });

  if (!foundAbsence) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any absences with the id:${absenceId}.`,
      absence: {},
    });
  }

  const deletedAbsence = await absenceClient.delete({
    where: { absence_uid: absenceId },
  });

  if (!deletedAbsence) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any absences with id:${absenceId} or something went wrong!`,
      absence: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted absence with id:${absenceId}!`,
    absence: deletedAbsence,
  });
};

const createAbsence = async (req: Request, res: Response) => {
  const { card_section_uid } = req.body;

  const createdAbsence = await absenceClient.create({
    data: { card_section_uid },
  });

  if (!createdAbsence) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Something went wrong when creating an absence!`,
      absence: {},
    });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created an absence with id:${createdAbsence.absence_uid}`,
    absence: createdAbsence,
  });
};

export {
  getAbsenceById,
  getAllAbsences,
  updateAbsenceById,
  deleteAbsenceById,
  createAbsence,
};
