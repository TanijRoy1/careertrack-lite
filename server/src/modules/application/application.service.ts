import { prisma } from "../../config/db";
import {
  ApplicationQuery,
  CreateApplicationPayload,
} from "../../types/application.types";

const createApplication = async (
  userId: string,
  payload: CreateApplicationPayload,
) => {
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

const getApplications = async (userId: string, query: ApplicationQuery) => {
  const {
    search,
    status,
    source,
    sort = "newest",
    page = "1",
    limit = "5",
  } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const take = Number(limit);

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
      ...(source && {
        source,
      }),
    },
    orderBy: {
      createdAt: sort === "oldest" ? "asc" : "desc",
    },
    skip,

    take,
  });

  const total = await prisma.application.count({
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
  });

  return {
    data: applications,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
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
  payload: CreateApplicationPayload,
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
