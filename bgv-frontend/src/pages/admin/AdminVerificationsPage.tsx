import {
  useEffect,
  useState,
} from "react";
import "./CandidatesPage.css";



import VerificationDetailsDialog
from "../../components/admin/VerificationDetailsDialog";

import {
  getAllVerifications,
  getVerificationById,
} from "../../services/VerificationService";

import type {
  Verification,
} from "../../types/Verification";

export default function AdminVerificationsPage() {

  const [
    verifications,
    setVerifications,
  ] =
    useState<Verification[]>([]);

  const [

    selectedVerification,

    setSelectedVerification,

] =

useState<Verification | null>(
    null,
);

  const [
    openDialog,
    setOpenDialog,
  ] =
    useState(false);

  const [
    search,
    setSearch,
  ] =
    useState("");

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const result =
            await getAllVerifications();

          setVerifications(result);

        }

        catch (error) {

          console.error(error);

        }

      };

    void loadData();

  }, []);

  const handleView =
    async (
      id: number,
    ) => {

      try {

        const result =
          await getVerificationById(id);

        setSelectedVerification(
          result,
        );

        setOpenDialog(true);

      }

      catch (error) {

        console.error(error);

      }

    };

  const filtered =
    verifications.filter(
      (v) =>

        v.verificationType
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||

        v.status
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||

        v.candidateId
          .toString()
          .includes(search),
    );

  return (

    <>

      <div style={{ padding: "30px" }}>

        <div className="page-header">
          <h1 className="page-title">
            Verifications
          </h1>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value,
                )
              }
            />
          </div>
        </div>

        <div className="table-container">

          <table className="candidate-table">

            <thead>
              <tr>

                <th>
                  ID
                </th>

                <th>
                  Candidate
                </th>

                <th>
                  Verification
                </th>

                <th>
                  Status
                </th>

                <th>
                  Remarks
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(
                (v) => (

                  <tr
                    key={v.id}
                  >

                    <td>
                      {v.id}
                    </td>

                    <td>
                      {v.candidateId}
                    </td>

                    <td>
                      {v.verificationType}
                    </td>

                    <td>

                      <span className={`status-${v.status.toLowerCase()}`}>
                        {v.status}
                      </span>

                    </td>

                    <td>

                      {v.reviewerRemarks}

                    </td>

                    <td>

                      <button
                        className="btn-view"
                        onClick={() =>
                          void handleView(
                            v.id,
                          )
                        }
                      >
                        VIEW
                      </button>

                    </td>

                  </tr>

                ),
              )}

            </tbody>

          </table>

        </div>

      </div>

      <VerificationDetailsDialog

        open={openDialog}

        onClose={() =>
          setOpenDialog(false)
        }

        verification={
          selectedVerification
        }

      />

    </>

  );

}