// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "utils/redis";
// Client
import { classClient } from "../../../db/postgres";

const getAllClassesPersistence = async (
  includeStudents: string,
  userId: string
) => {
  const includeObject = {} as any;
  if (includeStudents) {
    includeObject.students = Boolean(includeStudents);
  }

  const foundClasses = await getOrSetCache("classes", async () => {
    const classes = await classClient.findMany({
      include: includeObject,
    });
    return classes;
  });

  if (foundClasses.length < 1) {
    return {
      msg: "Could not find any classes!",
      classes: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundClasses.length,
    msg: `Successfully found ${foundClasses.length} classes!`,
    classes: foundClasses,
    statusCode: StatusCodes.OK,
  };
};

export default getAllClassesPersistence;
