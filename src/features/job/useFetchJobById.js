import { useEffect, useState } from "react";
import { URL } from "../../lib/services/api/url";
import { useParams } from "react-router-dom";

export default function useFetchJobById() {
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!params.id) return;

    async function getJob() {
      try {
        setIsLoading(true);
        // setError("");
        const res = await fetch(`${URL}/jobs/${params.id}`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Jobs data fetching error");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getJob();
  }, [params]);

  return { job, isLoading };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
