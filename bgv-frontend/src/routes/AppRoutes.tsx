import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute
from "../components/ProtectedRoute";

import LoginPage
from "../pages/auth/LoginPage";

/* ===========================
   Admin
=========================== */

import AdminLayout
from "../layouts/AdminLayout";

import AdminDashboardPage
from "../pages/admin/AdminDashboardPage";

import AdminProfilePage
from "../pages/admin/AdminProfilePage";

import CandidatesPage
from "../pages/admin/CandidatesPage";

import AssignmentsPage
from "../pages/admin/AssignmentsPage";

import CandidateDetailsPage
from "../pages/admin/CandidateDetailsPage";

import EditCandidatePage
from "../pages/admin/EditCandidatePage";

import AdminDocumentsPage
from "../pages/admin/AdminDocumentsPage";

import AdminVerificationsPage
from "../pages/admin/AdminVerificationsPage";

import AdminNotificationsPage
from "../pages/admin/AdminNotificationsPage";

import AdminAuditLogsPage
from "../pages/admin/AdminAuditLogsPage";

import AdminReportsPage
from "../pages/admin/AdminReportsPage";

import AdminDeadLettersPage
from "../pages/admin/AdminDeadLettersPage";

/* ===========================
   Reviewer
=========================== */

import ReviewerLayout
from "../layouts/ReviewerLayout";

import ReviewerDashboardPage
from "../pages/reviewer/ReviewerDashboardPage";

import ReviewerAssignmentsPage
from "../pages/reviewer/ReviewerAssignmentsPage";

import ReviewerCandidateReviewPage
from "../pages/reviewer/ReviewerCandidateReviewPage";

import ReviewerVerificationsPage
from "../pages/reviewer/ReviewerVerificationsPage";

import VerificationDetailsPage
from "../pages/reviewer/VerificationDetailsPage";

import ReviewerDocumentsPage
from "../pages/reviewer/ReviewerDocumentsPage";

import ReviewerProfilePage
from "../pages/reviewer/ReviewerProfilePage";

import ReviewerNotificationsPage
from "../pages/reviewer/ReviewerNotificationsPage";

/* ===========================
   Candidate
=========================== */

import CandidateLayout
from "../layouts/CandidateLayout";

import CandidateProfilePage
from "../pages/candidate/CandidateProfilePage";

import CandidateVerificationPage
from "../pages/candidate/CandidateVerificationPage";


import CandidateDashboardPage
from "../pages/candidate/CandidateDashboardPage";

import CandidateDocumentsPage
from "../pages/candidate/CandidateDocumentsPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* ===========================
            ADMIN
        =========================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/candidates"
          element={
            <ProtectedRoute allowedRole="Admin">
              <CandidatesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/candidates/:id"
          element={
            <ProtectedRoute allowedRole="Admin">
              <CandidateDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/candidates/edit/:id"
          element={
            <ProtectedRoute allowedRole="Admin">
              <EditCandidatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assignments"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AssignmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminDocumentsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/verifications"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminVerificationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminNotificationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/auditlogs"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminAuditLogsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminReportsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/deadletters"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout>
                <AdminDeadLettersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ===========================
            REVIEWER
        =========================== */}

        <Route
          path="/reviewer"
          element={
            <ProtectedRoute allowedRole="Reviewer">
              <ReviewerLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<ReviewerDashboardPage />}
          />

          <Route
            path="assignments"
            element={<ReviewerAssignmentsPage />}
          />

          <Route
            path="review/:id"
            element={<ReviewerCandidateReviewPage />}
          />

          <Route
            path="verifications"
            element={<ReviewerVerificationsPage />}
          />

          <Route
            path="verifications/:id"
            element={<VerificationDetailsPage />}
          />

          <Route
            path="documents"
            element={<ReviewerDocumentsPage />}
          />

          <Route
            path="profile"
            element={<ReviewerProfilePage />}
          />

          <Route
            path="notifications"
            element={<ReviewerNotificationsPage />}
          />

        </Route>

        {/* ===========================
            CANDIDATE
        =========================== */}

        <Route
  path="/candidate"
  element={
    <ProtectedRoute allowedRole="Candidate">
      <CandidateLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={<CandidateDashboardPage />}
  />

  <Route
    path="profile"
    element={<CandidateProfilePage />}
  />

  <Route
  path="documents"
  element={<CandidateDocumentsPage />}
/>

  <Route
    path="verifications"
    element={<CandidateVerificationPage />}
  />

</Route>

      </Routes>

    </BrowserRouter>

  );

}