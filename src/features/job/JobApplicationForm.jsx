import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import useFetchJobById from "./hooks/useFetchJobById";

import FormFieldLabel from "@/components/ui/FormFieldLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import { createJobApplication } from "@/lib/services/api/jobApplications";

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
  const { user, isSignedIn, isLoaded } = useUser();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    createJobApplication({
      userId: user?.id,
      fullName: formData.fullName,
      answers: [formData.answer1, formData.answer2, formData.answer3],
      job: params.id,
    });
    setFormData(initialState);
    navigate("/");
  }

  if (isLoading || !isLoaded) return <Spinner />;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin /> <span>{job?.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 py-4">
        <p>{job?.description}</p>
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
