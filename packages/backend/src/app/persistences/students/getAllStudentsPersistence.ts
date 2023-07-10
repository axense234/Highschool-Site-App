// Prisma
import { Student } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { studentClient } from "../../../db/postgres";

const getAllStudentsPersistence = async (classLabel: string) => {
  const queryObject = {} as Student;

  if (classLabel === "true") {
    queryObject.class_label = classLabel as string;
  }

  const foundStudents = await studentClient.findMany({ where: queryObject });

  if (foundStudents.length < 1) {
    return {
      msg: "Could not find any students!",
      students: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundStudents.length,
    msg: `Successfully found ${foundStudents.length} students!`,
    students: foundStudents,
    statusCode: StatusCodes.OK,
  };
};

export default getAllStudentsPersistence;
