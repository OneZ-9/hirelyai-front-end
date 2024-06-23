import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { URL } from "../../../lib/services/url";

export default function useFetchJobApplicationsByJobId() {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoadingJobApplications, setIsLoadingJobApplications] =
    useState(false);
  // const [error, setError] = useState("");
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!params.id) return;

    async function getJobApplicationsForJob() {
      try {
        setIsLoadingJobApplications(true);
        // setError("");
        const res = await fetch(`${URL}/jobApplications?jobId=${params.id}`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Job applications data fetching error");

        const data = await res.json();
        setJobApplications(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoadingJobApplications(false);
      }
    }
    getJobApplicationsForJob();
  }, [params]);

  return { jobApplications, isLoadingJobApplications };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
