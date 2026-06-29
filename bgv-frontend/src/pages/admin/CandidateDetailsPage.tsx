import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  getCandidateById,
  deleteCandidate
}
from "../../services/CandidateManagementService";

export default function CandidateDetailsPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [candidate,
    setCandidate] =
      useState<any>(null);

  useEffect(() => {

    const loadCandidate =
      async () => {

        const result =
          await getCandidateById(
            Number(id)
          );

        setCandidate(
          result
        );
      };

    loadCandidate();

  }, [id]);

  if (!candidate)
    return <h3>Loading...</h3>;

  const handleDelete =
    async () => {

      if (
        !window.confirm(
          "Delete Candidate?"
        )
      )
        return;

      await deleteCandidate(
        candidate.id
      );

      alert(
        "Candidate Deleted"
      );

      navigate(
        "/admin/candidates"
      );
    };

  return (

    <AdminLayout>

      <div
        style={{
          padding: "30px",
        }}
      >

        <h1>
          Candidate Details
        </h1>

        <hr />

        <p>
          <b>Name:</b>
          {" "}
          {candidate.fullName}
        </p>

        <p>
          <b>Email:</b>
          {" "}
          {candidate.email}
        </p>

        <p>
          <b>Phone:</b>
          {" "}
          {candidate.phoneNumber}
        </p>

        <p>
          <b>Address:</b>
          {" "}
          {candidate.address}
        </p>

        <p>
          <b>DOB:</b>
          {" "}
          {candidate.dateOfBirth}
        </p>

        <p>
          <b>Gender:</b>
          {" "}
          {candidate.gender}
        </p>

        <p>
          <b>PAN:</b>
          {" "}
          {candidate.panNumber}
        </p>

        <p>
          <b>Aadhaar:</b>
          {" "}
          {candidate.aadhaarNumber}
        </p>

        <p>
          <b>Applied Role:</b>
          {" "}
          {candidate.appliedRole}
        </p>

        <p>
          <b>Status:</b>
          {" "}
          {candidate.status}
        </p>

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <button
  onClick={() =>
    navigate(
      `/admin/candidates/edit/${candidate.id}`
    )
  }
>
  Edit Candidate
</button>

          <button
            onClick={
              handleDelete
            }
            style={{
              marginLeft: "10px",
            }}
          >
            Delete Candidate
          </button>

        </div>

      </div>

    </AdminLayout>

  );
}