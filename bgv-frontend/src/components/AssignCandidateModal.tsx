import { useEffect, useState } from "react";
import "./AssignCandidateModal.css";

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

  // Searchable dropdown states
  const [isOpenCandidate, setIsOpenCandidate] = useState(false);
  const [searchCandidate, setSearchCandidate] = useState("");
  const [isOpenReviewer, setIsOpenReviewer] = useState(false);
  const [searchReviewer, setSearchReviewer] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-dropdown-container")) {
        setIsOpenCandidate(false);
        setIsOpenReviewer(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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

  const selectedCandidate = candidates.find(
    (c) => c.id.toString() === candidateId
  );
  const selectedReviewer = reviewers.find(
    (r) => r.id.toString() === reviewerId
  );

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Assign Candidate
        </h2>

        {/* Searchable Candidate Dropdown */}
        <div className="custom-dropdown-container">
          <div
            className="custom-dropdown-trigger"
            onClick={() => {
              setIsOpenCandidate(!isOpenCandidate);
              setIsOpenReviewer(false);
              setSearchCandidate("");
            }}
          >
            <span>{selectedCandidate ? `${selectedCandidate.fullName} (ID: ${selectedCandidate.id})` : "Select Candidate"}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {isOpenCandidate && (
            <div className="custom-dropdown-menu">
              <input
                type="text"
                placeholder="Search candidate..."
                value={searchCandidate}
                onChange={(e) => setSearchCandidate(e.target.value)}
                className="dropdown-search-input"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <div className="custom-dropdown-options">
                <div
                  className="custom-dropdown-option default-option"
                  onClick={() => {
                    setCandidateId("");
                    setIsOpenCandidate(false);
                  }}
                >
                  Select Candidate
                </div>
                {candidates
                  .filter((c) =>
                    c.fullName.toLowerCase().includes(searchCandidate.toLowerCase())
                  )
                  .map((candidate) => (
                    <div
                      key={candidate.id}
                      className={`custom-dropdown-option ${candidate.id.toString() === candidateId ? "selected" : ""}`}
                      onClick={() => {
                        setCandidateId(candidate.id.toString());
                        setIsOpenCandidate(false);
                      }}
                    >
                      {candidate.fullName} (ID: {candidate.id})
                    </div>
                  ))}
                {candidates.filter((c) =>
                  c.fullName.toLowerCase().includes(searchCandidate.toLowerCase())
                ).length === 0 && (
                  <div className="dropdown-no-results">No candidates found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Searchable Reviewer Dropdown */}
        <div className="custom-dropdown-container">
          <div
            className="custom-dropdown-trigger"
            onClick={() => {
              setIsOpenReviewer(!isOpenReviewer);
              setIsOpenCandidate(false);
              setSearchReviewer("");
            }}
          >
            <span>{selectedReviewer ? selectedReviewer.fullName : "Select Reviewer"}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {isOpenReviewer && (
            <div className="custom-dropdown-menu">
              <input
                type="text"
                placeholder="Search reviewer..."
                value={searchReviewer}
                onChange={(e) => setSearchReviewer(e.target.value)}
                className="dropdown-search-input"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <div className="custom-dropdown-options">
                <div
                  className="custom-dropdown-option default-option"
                  onClick={() => {
                    setReviewerId("");
                    setIsOpenReviewer(false);
                  }}
                >
                  Select Reviewer
                </div>
                {reviewers
                  .filter((r) =>
                    r.fullName.toLowerCase().includes(searchReviewer.toLowerCase())
                  )
                  .map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className={`custom-dropdown-option ${reviewer.id.toString() === reviewerId ? "selected" : ""}`}
                      onClick={() => {
                        setReviewerId(reviewer.id.toString());
                        setIsOpenReviewer(false);
                      }}
                    >
                      {reviewer.fullName}
                    </div>
                  ))}
                {reviewers.filter((r) =>
                  r.fullName.toLowerCase().includes(searchReviewer.toLowerCase())
                ).length === 0 && (
                  <div className="dropdown-no-results">No reviewers found</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">

          <button
            onClick={handleSubmit}
            className="btn-assign"
          >
            Assign
          </button>

          <button
            onClick={onClose}
            className="btn-cancel"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );
}