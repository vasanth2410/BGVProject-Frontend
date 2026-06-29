import { useEffect, useState } from "react";

import AssignCandidateModal
from "../../components/AssignCandidateModal";

import { useNavigate }
  from "react-router-dom";

import AddCandidateModal
  from "../../components/AddCandidateModal";

import "./CandidatesPage.css";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  getCandidates,
  deleteCandidate,
}
from "../../services/CandidateManagementService";

import type {
  Candidate,
}
from "../../types/CandidateManagement";

export default function CandidatesPage() {

  const navigate =
    useNavigate();

  const [candidates,
    setCandidates]
      = useState<Candidate[]>([]);

  const [loading,
    setLoading]
      = useState(true);

      const [search,
  setSearch]
    = useState("");

  const [showModal,
    setShowModal]
      = useState(false);

      const [
  showAssignModal,
  setShowAssignModal
] = useState(false);

  const loadCandidates =
    async () => {

      try {

        const result =
          await getCandidates();

        setCandidates(result);

      }
      catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this candidate?"
        );

      if (!confirmed)
        return;

      try {

        await deleteCandidate(id);

        alert(
          "Candidate Deleted Successfully"
        );

        loadCandidates();

      }
      catch (error) {

        console.error(error);

        alert(
          "Delete Failed"
        );

      }

    };

  useEffect(() => {

    const fetchCandidates =
      async () => {

        try {

          const result =
            await getCandidates();

          setCandidates(result);

        }
        catch (error) {

          console.error(error);

        }
        finally {

          setLoading(false);

        }

      };

    fetchCandidates();

  }, []);

  const filteredCandidates =
  candidates.filter(
    (candidate) =>
      candidate.fullName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      candidate.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );
  console.log(candidates);
console.log(filteredCandidates);

  return (

    <AdminLayout>

      <div
        style={{
          padding: "30px",
        }}
      >

        <div className="page-header">

  <h1 className="page-title">
    Candidates
  </h1>

  <div
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >

    <input
      type="text"
      placeholder="Search by Name or Email"
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      style={{
        padding: "10px",
        width: "250px",
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    />

    <button
      className="add-button"
      onClick={() =>
        setShowModal(true)
      }
    >
      + Add Candidate
    </button>

  </div>

</div>

        {loading && (

          <h3>
            Loading...
          </h3>

        )}

        {!loading && (

          <table
            className="candidate-table"
          >

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredCandidates.map(
  (candidate) => (

                  <tr
                    key={candidate.id}
                    onClick={() =>
                      navigate(
                        `/admin/candidates/${candidate.id}`
                      )
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >

                    <td>
                      {candidate.id}
                    </td>

                    <td>
                      {candidate.fullName}
                    </td>

                    <td>
                      {candidate.email}
                    </td>

                    <td>
                      {candidate.phoneNumber}
                    </td>

                    <td>

                      <span
                        className={
                          candidate.status ===
                          "Pending"
                            ? "status-pending"
                            : candidate.status ===
                              "Completed"
                            ? "status-completed"
                            : "status-rejected"
                        }
                      >
                        {candidate.status}
                      </span>

                    </td>

                    <td>

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          navigate(
                            `/admin/candidates/${candidate.id}`
                          );

                        }}
                      >
                        View
                      </button>

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          navigate(
                            `/admin/candidates/edit/${candidate.id}`
                          );

                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          handleDelete(
                            candidate.id
                          );

                        }}
                      >
                        Delete
                      </button>

                      <button
  onClick={(e) => {

    e.stopPropagation();

    setShowAssignModal(
      true
    );

  }}
>
  Assign
</button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

        {showModal && (

          <AddCandidateModal
            onClose={() =>
              setShowModal(false)
            }
            onSuccess={
              loadCandidates
            }
          />

        )}

        {showAssignModal && (

  <AssignCandidateModal
    onClose={() =>
      setShowAssignModal(false)
    }
    onSuccess={() => {

      alert(
        "Assignment Created"
      );

    }}
  />

)}

      </div>

    </AdminLayout>

  );

}