import { prisma } from "../../config/db";

const createApplication = async (userId: string, payload: any) => {
  const application = await prisma.application.create({
    data: {
      companyName: payload.companyName,
      jobTitle: payload.jobTitle,
      jobUrl: payload.jobUrl,
      source: payload.source,
      status: payload.status,
      applicationDate: new Date(payload.applicationDate),
      notes: payload.notes,
      userId,
    },
  });

  return application;
};

export const ApplicationService = {
  createApplication,
};
