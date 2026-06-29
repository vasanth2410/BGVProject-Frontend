import { useState } from "react";

import "./AddCandidateModal.css";

import {
  createCandidate,
} from "../services/CandidateManagementService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCandidateModal({
  onClose,
  onSuccess,
}: Props) {

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      panNumber: "",
      aadhaarNumber: "",
      appliedRole: "",
      dateOfJoining: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async () => {

      try {

        await createCandidate(
          formData
        );

        alert(
          "Candidate Created Successfully"
        );

        onSuccess();

        onClose();

      }
     catch (error: any) {

  console.error(error);

  console.log(error.response);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    "Failed to create candidate"
  );
}

    };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Add Candidate
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
        />

        <input
          name="panNumber"
          placeholder="PAN Number"
          onChange={handleChange}
        />

        <input
          name="aadhaarNumber"
          placeholder="Aadhaar Number"
          onChange={handleChange}
        />

        <input
          name="appliedRole"
          placeholder="Applied Role"
          onChange={handleChange}
        />

        <input
          type="date"
          name="dateOfJoining"
          onChange={handleChange}
        />

        <div
          className="modal-actions"
        >

          <button
            onClick={handleSubmit}
          >
            Save
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