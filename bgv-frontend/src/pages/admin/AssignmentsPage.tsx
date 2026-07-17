import { useEffect, useState } from "react";
import "./CandidatesPage.css";

import type {
  Assignment,
} from "../../types/Assignment";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getAssignments,
}
from "../../services/AssignmentService";

import AssignCandidateModal
from "../../components/AssignCandidateModal";

export default function AssignmentsPage() {

  const [
    assignments,
    setAssignments,
  ] =
    useState<Assignment[]>([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    showModal,
    setShowModal,
  ] =
    useState(false);

  const loadAssignments =
    async () => {

      try {

        setLoading(true);

        const result =
          await getAssignments();

        setAssignments(result);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadAssignments();

  }, []);

  const filteredAssignments =
    assignments.filter(
      (assignment) => {

        const keyword =
          search.toLowerCase();

        return (

          assignment.id
            .toString()
            .includes(keyword)

          ||

          assignment.candidateName
            .toLowerCase()
            .includes(keyword)

          ||

          assignment.reviewerName
            .toLowerCase()
            .includes(keyword)

          ||

          new Date(
            assignment.assignedDate
          )
            .toLocaleDateString()
            .toLowerCase()
            .includes(keyword)

        );

      }
    );

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
            alignItems:
              "center",
            marginBottom:
              "20px",
          }}
        >

          <h1>
            Assignments
          </h1>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >

            <input
              type="text"
              placeholder="Search Assignments..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                width: "250px",
                padding: "10px",
                borderRadius: "8px",
                border:
                  "1px solid #ddd",
              }}
            />

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

        </div>

        {loading ? (

          <h3>
            Loading...
          </h3>

        ) : (

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

              {filteredAssignments.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "30px",
                    }}
                  >

                    No assignments found.

                  </td>

                </tr>

              ) : (

                filteredAssignments.map(
                  (assignment) => (

                    <tr
                      key={
                        assignment.id
                      }
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
                )

              )}

            </tbody>

          </table>

        )}

        {showModal && (

          <AssignCandidateModal
            onClose={() =>
              setShowModal(
                false
              )
            }
            onSuccess={() => {

              setShowModal(
                false
              );

              loadAssignments();

            }}
          />

        )}

      </div>

    </AdminLayout>

  );

}