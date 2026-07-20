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

const getApplications = async (userId: string) => {
  const applications = await prisma.application.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
};

const getApplicationById = async (userId: string, applicationId: string) => {
  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId: userId,
    },
  });
  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};

export const ApplicationService = {
  createApplication,
  getApplications,
  getApplicationById,
};
