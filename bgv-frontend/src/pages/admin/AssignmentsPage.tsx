import { useEffect, useState }
from "react";

import type {
  Assignment
}
from "../../types/Assignment";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getAssignments,
}
from "../../services/AssignmentService";

import AssignCandidateModal
from "../../components/AssignCandidateModal";

export default function AssignmentsPage() {

const [assignments,
  setAssignments] =
    useState<Assignment[]>([]);

  const [showModal,
    setShowModal] =
      useState(false);

  const loadAssignments =
    async () => {

      const result =
        await getAssignments();

      setAssignments(
        result
      );
    };

  useEffect(() => {

    loadAssignments();

  }, []);

  return (

    <AdminLayout>

      <div
        style={{
          padding: "30px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom:
              "20px",
          }}
        >

          <h1>
            Assignments
          </h1>

          <button
            onClick={() =>
              setShowModal(
                true
              )
            }
          >
            + Assign Candidate
          </button>

        </div>

        <table
          className="candidate-table"
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Candidate</th>

              <th>Reviewer</th>

              <th>Assigned Date</th>

            </tr>

          </thead>

          <tbody>

            {assignments.map(
              (assignment) => (

                <tr
                  key={assignment.id}
                >

                  <td>
                    {assignment.id}
                  </td>

                  <td>
                    {assignment.candidateName}
                  </td>

                  <td>
                    {assignment.reviewerName}
                  </td>

                 <td>
  {new Date(
    assignment.assignedDate
  ).toLocaleString()}
</td>

                </tr>

              )
            )}

          </tbody>

        </table>

        {showModal && (

          <AssignCandidateModal
            onClose={() =>
              setShowModal(
                false
              )
            }
            onSuccess={
              loadAssignments
            }
          />

        )}

      </div>

    </AdminLayout>

  );
}