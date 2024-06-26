import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function JobApplicationCard({ id, jobId, fullName }) {
  return (
    <Link to={`/admin/job/${jobId}/application/${id}`}>
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle>{fullName}</CardTitle>
          <Button>View</Button>
        </CardHeader>
      </Card>
    </Link>
  );
}

JobApplicationCard.propTypes = {
  id: PropTypes.string,
  jobId: PropTypes.string,
  fullName: PropTypes.string,
};

export default JobApplicationCard;
