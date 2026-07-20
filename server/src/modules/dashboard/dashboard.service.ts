import { prisma } from "../../config/db";

const getStats = async (userId: string) => {
  const totalApplications = await prisma.application.count({
    where: {
      userId,
    },
  });

  const savedJobs = await prisma.application.count({
    where: {
      userId,
      status: "SAVED",
    },
  });

  const appliedJobs = await prisma.application.count({
    where: {
      userId,
      status: "APPLIED",
    },
  });

  const assessments = await prisma.application.count({
    where: {
      userId,
      status: "ASSESSMENT",
    },
  });

  const interviews = await prisma.application.count({
    where: {
      userId,
      status: "INTERVIEW",
    },
  });

  const rejections = await prisma.application.count({
    where: {
      userId,
      status: "REJECTED",
    },
  });

  const offers = await prisma.application.count({
    where: {
      userId,
      status: "OFFER",
    },
  });

  const recentApplications = await prisma.application.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    totalApplications,
    savedJobs,
    appliedJobs,
    assessments,
    interviews,
    rejections,
    offers,
    recentApplications,
  };
};

export const DashboardService = {
  getStats,
};
