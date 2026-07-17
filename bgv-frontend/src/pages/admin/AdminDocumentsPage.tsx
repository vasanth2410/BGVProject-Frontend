import { useEffect, useState } from "react";
import "./CandidatesPage.css";

import DeleteDocumentDialog from "../../components/admin/DeleteDocumentDialog";

import {
  getAllDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/DocumentService";

import type { Document } from "../../types/Document";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const [search, setSearch] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDocumentId, setSelectedDocumentId] =
    useState<number | null>(null);

  const [selectedFileName, setSelectedFileName] =
    useState("");

  const loadDocuments = async () => {
    try {
      const result = await getAllDocuments();

      setDocuments(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadDocuments();
  }, []);

  const openDeleteDialog = (
    id: number,
    fileName: string
  ) => {
    setSelectedDocumentId(id);

    setSelectedFileName(fileName);

    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (selectedDocumentId == null) return;

    try {
      await deleteDocument(selectedDocumentId);

      setDocuments((previous) =>
        previous.filter(
          (doc) => doc.id !== selectedDocumentId
        )
      );

      alert("Document deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Unable to delete document.");
    }

    setDeleteOpen(false);

    setSelectedDocumentId(null);

    setSelectedFileName("");
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.fileName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.fileType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.status
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.candidateId
        .toString()
        .includes(search)
  );

  return (
    <>
      <div style={{ padding: "30px" }}>
        <div className="page-header">
          <h1 className="page-title">
            Documents
          </h1>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <div className="table-container">
          <table className="candidate-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    {doc.id}
                  </td>

                  <td>
                    {doc.candidateId}
                  </td>

                  <td>
                    {doc.fileName}
                  </td>

                  <td>
                    {doc.fileType}
                  </td>

                  <td>
                    {(doc.fileSize / 1024).toFixed(1)} KB
                  </td>

                  <td>
                    <span className={`status-${doc.status === "Uploaded" ? "approved" : "pending"}`}>
                      {doc.status}
                    </span>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-view"
                      style={{ marginRight: '8px' }}
                      onClick={() =>
                        downloadDocument(doc.id)
                      }
                    >
                      Download
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() =>
                        openDeleteDialog(
                          doc.id,
                          doc.fileName
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteDocumentDialog
        open={deleteOpen}
        fileName={selectedFileName}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}