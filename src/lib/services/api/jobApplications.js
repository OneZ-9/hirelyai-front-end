import { URL } from "../url";

export async function createJobApplication(jobApplication) {
  const token = await window.Clerk.session?.getToken();

  await fetch(`${URL}/jobApplications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobApplication),
  });
}

// export const createJobApplication = async ({
//   userId,
//   fullName,
//   job,
//   answers,
// }) => {
//   await fetch("http://localhost:8000/jobApplications", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: userId,
//       fullName: fullName,
//       job,
//       answers,
//     }),
//   });
// };

// export const getJobApllicationsForJob = async (id) => {
//   const res = await fetch(`http://localhost:8000/jobApplications?jobId=${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };

// export const getJobApplicationById = async (id) => {
//   const res = await fetch(`http://localhost:8000/jobApplications/${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };
