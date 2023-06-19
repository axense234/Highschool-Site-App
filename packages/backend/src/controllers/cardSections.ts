// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { studentCardSectionClient } from "../db/postgres";

const getAllCardSections = async (req: Request, res: Response) => {
  const foundCardSections = await studentCardSectionClient.findMany({});

  if (foundCardSections.length < 1) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: "Could not find any card sections, please try again later.",
      sections: [],
    });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundCardSections.length,
    msg: "Successfully found card sections!",
    sections: foundCardSections,
  });
};

const getCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  if (!sectionId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid sectionId!`,
      section: {},
    });
  }

  const foundCardSection = await studentCardSectionClient.findUnique({
    where: { card_section_uid: sectionId },
  });

  if (!foundCardSection) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any card sections with the matching id:${sectionId}.`,
      section: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found card section with id:${sectionId}!`,
    section: foundCardSection,
  });
};

const updateCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  const cardSectionBody = req.body;

  if (!sectionId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid sectionId!`,
      section: {},
    });
  }

  const foundCardSection = await studentCardSectionClient.findUnique({
    where: { card_section_uid: sectionId },
  });

  if (!foundCardSection) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any card sections with the id:${sectionId}.`,
      section: {},
    });
  }

  const updatedCardSection = await studentCardSectionClient.update({
    where: { card_section_uid: sectionId },
    data: { ...cardSectionBody },
  });

  if (!updatedCardSection) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find card section with id:${sectionId} in order to update it or something went wrong!`,
      section: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated card section with id:${sectionId}!`,
    section: updatedCardSection,
  });
};

const deleteCardSectionById = async (req: Request, res: Response) => {
  const { sectionId } = req.params;

  if (!sectionId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Please enter a valid sectionId!`,
      section: {},
    });
  }

  const foundCardSection = await studentCardSectionClient.findUnique({
    where: { card_section_uid: sectionId },
  });

  if (!foundCardSection) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        msg: `Could not find any card sections with the id:${sectionId}.`,
        section: {},
      });
  }

  const deletedCardSection = await studentCardSectionClient.delete({
    where: { card_section_uid: sectionId },
  });

  if (!deletedCardSection) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find card section with id:${sectionId} in order to delete it or something went wrong.`,
      section: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted card section with id: ${sectionId}.`,
    section: deletedCardSection,
  });
};

const createCardSection = async (req: Request, res: Response) => {
  const cardSectionBody = req.body;

  const createdCardSection = await studentCardSectionClient.create({
    data: { ...cardSectionBody },
  });

  if (!createdCardSection) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a valid request body!", section: {} });
  }

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created a card section with id:${createdCardSection.card_section_uid}.`,
    section: createdCardSection,
  });
};

export {
  getAllCardSections,
  getCardSectionById,
  updateCardSectionById,
  deleteCardSectionById,
  createCardSection,
};
