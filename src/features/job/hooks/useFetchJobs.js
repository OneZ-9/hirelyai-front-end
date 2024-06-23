import { useEffect, useState } from "react";

import { URL } from "../../../lib/services/url";

export default function useFetchJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        setIsLoading(true);
        // setError("");
        const res = await fetch(`${URL}/jobs`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Jobs data fetching error");

        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getJobs();
  }, []);

  return { jobs, isLoading };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
