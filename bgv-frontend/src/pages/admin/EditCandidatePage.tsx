import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  getCandidateById,
  updateCandidate
}
from "../../services/CandidateManagementService";

export default function EditCandidatePage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
      useState<any>(null);

  useEffect(() => {

    const loadCandidate =
      async () => {

        const result =
          await getCandidateById(
            Number(id)
          );

        setFormData(result);
      };

    loadCandidate();

  }, [id]);

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

  const handleUpdate =
    async () => {

      try {

        await updateCandidate(
          Number(id),
          formData
        );

        alert(
          "Candidate Updated Successfully"
        );

        navigate(
          `/admin/candidates/${id}`
        );

      }
      catch (error) {

        console.error(error);

        alert(
          "Update Failed"
        );

      }

    };

  if (!formData)
    return <h3>Loading...</h3>;

  return (

    <AdminLayout>

      <div
        style={{
          padding: "30px",
        }}
      >

        <h1>
          Edit Candidate
        </h1>

        <input
          name="fullName"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="phoneNumber"
          value={
            formData.phoneNumber
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          onClick={
            handleUpdate
          }
        >
          Update Candidate
        </button>

      </div>

    </AdminLayout>

  );
}