import JobCard from "../job/JobCard";
import Spinner from "@/components/shared/Spinner";
import useFetchJobs from "./useFetchJobs";

// const jobs = [
//   {
//     _id: "xyz",
//     title: "Intern - Software Engineer",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     _id: "abc",
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Colombo, Sri Lanka",
//   },
//   {
//     _id: "abc",
//     title: "Software Architect",
//     type: "Hybrid",
//     location: "Rajagiriya, Sri Lanka",
//   },
// ];

function JobSection() {
  const { jobs, isLoading } = useFetchJobs();

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4 flex flex-col gap-y-8">
          {jobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobSection;
