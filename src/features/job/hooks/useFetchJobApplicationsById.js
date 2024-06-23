import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { URL } from "../../../lib/services/url";

export default function useFetchJobApplicationsById() {
  const [jobApplication, setJobApplication] = useState([]);
  const [isLoadingJobApplication, setIsLoadingJobApplication] = useState(false);
  // const [error, setError] = useState("");
  const { applicationId } = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!applicationId) return;

    async function getJobApplicationsForJob() {
      try {
        setIsLoadingJobApplication(true);
        // setError("");
        const res = await fetch(`${URL}/jobApplications/${applicationId}`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Job application fetching error");

        const data = await res.json();
        setJobApplication(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoadingJobApplication(false);
      }
    }
    getJobApplicationsForJob();
  }, [applicationId]);

  return { jobApplication, isLoadingJobApplication };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
