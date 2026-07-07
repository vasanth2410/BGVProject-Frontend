import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  getAssignedCandidates,
} from "../../services/ReviewerService";

import type {
  ReviewerAssignment,
} from "../../types/ReviewerAssignment";

export default function ReviewerAssignmentsPage() {

  const navigate = useNavigate();

  const [
    assignments,
    setAssignments,
  ] = useState<
    ReviewerAssignment[]
  >([]);

  const loadAssignments =
    async () => {

      try {

      const result =
  await getAssignedCandidates();

console.log("API RESULT");
console.log(result);

setAssignments(result);

       

      }
      catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    const fetchData =
      async () => {

        await loadAssignments();

      };

    void fetchData();

  }, []);

  return (

    <Paper
  sx={{
    p:3
  }}
>

      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        My Assignments
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Candidate
            </TableCell>

            <TableCell>
              Assigned Date
            </TableCell>

            <TableCell>
              Action
            </TableCell>

          </TableRow>

        </TableHead>

       <TableBody>

  {assignments.map(
    (assignment) => (

      <TableRow
        key={assignment.assignmentId}
      >

        <TableCell>
          {assignment.candidateName}
        </TableCell>

        <TableCell>
          {new Date(
            assignment.assignedDate
          ).toLocaleDateString("en-IN")}
        </TableCell>

        <TableCell>

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/reviewer/review/${assignment.candidateId}`
              )
            }
          >
            Review
          </Button>

        </TableCell>

      </TableRow>

    )
  )}

</TableBody>

      </Table>

    </Paper>

  );

}