import { useState } from "react";

import FormFieldLabel from "@/components/ui/FormFieldLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin } from "lucide-react";
import useFetchJobById from "./useFetchJobById";
import Spinner from "@/components/shared/Spinner";
import { useNavigate, useParams } from "react-router-dom";

/*
const job = {
  title: "Intern - Software Engineer",
  description:
    "We are seeking a motivated and enthusiastic Software Engineering Intern to join our dynamic team. As a Software Engineering Intern, you will have the opportunity to work closely with experienced developers and contribute to real-world projects. This internship is designed to provide valuable hands-on experience, foster professional growth, and enhance your technical skills.",
  type: "Full-time",
  location: "Remote",
  questions: [
    "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
    "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
    "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?",
  ],
};
*/

const initialState = {
  fullName: "",
  answer1: "",
  answer2: "",
  answer3: "",
};

function JobForm() {
  // const [fullName, setFullName] = useState("");
  // const [answer1, setAnswer1] = useState("");
  // const [answer2, setAnswer2] = useState("");
  // const [answer3, setAnswer3] = useState("");

  const [formData, setFormData] = useState(initialState);
  const { fullName, answer1, answer2, answer3 } = formData;
  const params = useParams();
  const { job, isLoading } = useFetchJobById();
  // console.log(job);
  const navigate = useNavigate();

  async function createJobApplication(jobApplication) {
    await fetch(`${URL}/jobApplication`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobApplication),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    createJobApplication({
      userId: `uid${Math.floor(Math.random().toFixed(5) * 100000)}`,
      fullName: formData.fullName,
      answers: [formData.answer1, formData.answer2, formData.answer3],
      job: params.id,
    });
    setFormData(initialState);
    navigate("/");
  }

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin /> <span>{job.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 py-4">
        <p>{job.description}</p>
      </div>
      <Separator />

      <form className="py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <FormFieldLabel label="Full Name">
          <Input
            required
            value={fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </FormFieldLabel>

        <FormFieldLabel label={job?.questions?.at(0)}>
          <Textarea
            required
            value={answer1}
            onChange={(e) =>
              setFormData({ ...formData, answer1: e.target.value })
            }
          />
        </FormFieldLabel>

        <FormFieldLabel label={job?.questions?.at(1)}>
          <Textarea
            required
            value={answer2}
            onChange={(e) =>
              setFormData({ ...formData, answer2: e.target.value })
            }
          />
        </FormFieldLabel>

        <FormFieldLabel label={job?.questions?.at(2)}>
          <Textarea
            required
            value={answer3}
            onChange={(e) =>
              setFormData({ ...formData, answer3: e.target.value })
            }
          />
        </FormFieldLabel>

        <div className="flex items-center gap-x-4">
          <Button
            type="submit"
            className="mt-8 bg-card text-card-foreground w-fit"
          >
            Submit
          </Button>
          <Button
            className="mt-8   w-fit "
            variant="outline"
            onClick={() => setFormData(initialState)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;
