import { RequestHandler } from 'express';
import { createAcademicSemester } from './academicSemester.service';

export const createAcademicSemesterController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const academic_detail = req.body;

    const result = await createAcademicSemester(academic_detail);

    res.status(200).json({
      success: true,
      message: 'Academic Semester Create SuccessFully ',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
