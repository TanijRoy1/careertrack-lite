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

const getApplications = async (
  userId: string,
  query: {
    search?: string;
    status?: string;
    source?: string;
    sort?: string;
  },
) => {
  const { search, status, source, sort } = query;

  const applications = await prisma.application.findMany({
    where: {
      userId,

      ...(search && {
        OR: [
          {
            companyName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            jobTitle: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(status && {
        status: status as any,
      }),

      ...(source && {
        source: source as any,
      }),
    },
    orderBy: {
      createdAt: sort === "oldest" ? "asc" : "desc",
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

const updateApplication = async (
  userId: string,
  applicationId: string,
  payload: any,
) => {
  const existingApplication = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!existingApplication) {
    throw new Error("Application not found");
  }

  const updatedApplication = await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      companyName: payload.companyName,
      jobTitle: payload.jobTitle,
      jobUrl: payload.jobUrl,
      source: payload.source,
      status: payload.status,
      applicationDate: payload.applicationDate
        ? new Date(payload.applicationDate)
        : undefined,
      notes: payload.notes,
    },
  });

  return updatedApplication;
};

const deleteApplication = async (userId: string, applicationId: string) => {
  const existingApplication = await prisma.application.findFirst({
    where: {
      id: applicationId,
      userId,
    },
  });

  if (!existingApplication) {
    throw new Error("Application not found");
  }

  const deletedApplication = await prisma.application.delete({
    where: {
      id: applicationId,
    },
  });

  return deletedApplication;
};

export const ApplicationService = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
