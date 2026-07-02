import { useEffect, useState } from "react";

import {
  getCandidates,
} from "../services/CandidateManagementService";

import type {
  Candidate,
}
from "../types/CandidateManagement";

import type {
  Reviewer,
}
from "../types/Assignment";

import {
  getReviewers,
  createAssignment,
} from "../services/AssignmentService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignCandidateModal({
  onClose,
  onSuccess,
}: Props) {

  const [candidates,
  setCandidates] =
useState<
Candidate[]
>([]);

const [reviewers,
  setReviewers] =
useState<
Reviewer[]
>([]);

  const [candidateId,
    setCandidateId] =
      useState("");

  const [reviewerId,
    setReviewerId] =
      useState("");

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

     const candidateResult =
  await getCandidates();

const pendingCandidates =
  candidateResult.filter(
    (candidate: any) =>
      candidate.status ===
      "Pending"
  );

      const reviewerResult =
        await getReviewers();

      console.log(
        "Candidates:",
        candidateResult
      );

      console.log(
        "Reviewers:",
        reviewerResult
      );

     setCandidates(
  pendingCandidates
);

      setReviewers(
        reviewerResult
      );

    }
    catch (error) {

      console.error(
        "Load Data Error:",
        error
      );

    }

  };

  const handleSubmit =
    async () => {

      if (
        !candidateId ||
        !reviewerId
      ) {

        alert(
          "Please select Candidate and Reviewer"
        );

        return;
      }

      try {

        await createAssignment(
          Number(candidateId),
          Number(reviewerId)
        );

        alert(
          "Assignment Created Successfully"
        );

        onSuccess();

        onClose();

      }
      catch (error) {

        console.error(error);

        alert(
          "Assignment Failed"
        );

      }

    };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Assign Candidate
        </h2>

        <select
          value={candidateId}
          onChange={(e) =>
            setCandidateId(
              e.target.value
            )
          }
        >

          <option value="">
            Select Candidate
          </option>

          {candidates.map(
            (candidate) => (

              <option
                key={candidate.id}
                value={candidate.id}
              >
                {candidate.fullName}
              </option>

            )
          )}

        </select>

        <select
          value={reviewerId}
          onChange={(e) =>
            setReviewerId(
              e.target.value
            )
          }
        >

          <option value="">
            Select Reviewer
          </option>

          {reviewers.map(
            (reviewer) => (

              <option
                key={reviewer.id}
                value={reviewer.id}
              >
                {reviewer.fullName}
              </option>

            )
          )}

        </select>

        <div className="modal-actions">

          <button
            onClick={handleSubmit}
          >
            Assign
          </button>

          <button
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );
}