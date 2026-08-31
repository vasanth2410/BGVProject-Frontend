import { useEffect, useState } from "react";
import "./CandidatesPage.css";

import type {
  Assignment,
} from "../../types/Assignment";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getAssignments,
  deleteAssignment,
  cleanupDuplicateAssignments,
} from "../../services/AssignmentService";

import AssignCandidateModal from "../../components/AssignCandidateModal";


export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      await cleanupDuplicateAssignments().catch(() => {});
      const result: Assignment[] = await getAssignments();

      // Deduplicate assignments by candidateId (keeps latest assignment)
      const uniqueMap = new Map<number, Assignment>();
      result.forEach((item) => {
        uniqueMap.set(item.candidateId, item);
      });

      setAssignments(Array.from(uniqueMap.values()));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await deleteAssignment(id);
      } catch (error) {
        console.warn("Delete API notice:", error);
      }
      setAssignments((prev) => prev.filter((a) => a.id !== id));
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

      <div className="page-container">

        <div className="page-header">

          <h1 className="page-title">
            <span className="assignment-emoji-icon">🎯</span> Assignments
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
              className="search-input"
            />



            <button
              onClick={() =>
                setShowModal(
                  true
                )
              }
              className="add-button"
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

          <div className="table-container">

            <table
              className="candidate-table"
            >

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Candidate</th>
                  <th>Reviewer</th>
                  <th>Assigned Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No assignments found.
                    </td>
                  </tr>
                ) : (
                  filteredAssignments.map((assignment, index) => (
                    <tr key={assignment.id}>
                      <td>{index + 1}</td>
                      <td>{assignment.candidateName}</td>
                      <td>{assignment.reviewerName}</td>
                      <td>
                        {new Date(
                          assignment.assignedDate
                        ).toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.15)",
                            color: "#ef4444",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

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