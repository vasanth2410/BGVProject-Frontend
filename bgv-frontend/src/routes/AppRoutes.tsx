import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminAuditLogsPage
from "../pages/admin/AdminAuditLogsPage";

import AdminReportsPage
from "../pages/admin/AdminReportsPage";

import AdminDocumentsPage
from "../pages/admin/AdminDocumentsPage";

import AdminVerificationsPage
from "../pages/admin/AdminVerificationsPage";

import AdminLayout
from "../layouts/AdminLayout";


import AdminDeadLettersPage
from "../pages/admin/AdminDeadLettersPage";

import AdminNotificationsPage
from "../pages/admin/AdminNotificationsPage";

import ReviewerLayout
from "../layouts/ReviewerLayout";

import LoginPage
from "../pages/auth/LoginPage";

import AdminDashboardPage
from "../pages/admin/AdminDashboardPage";

import CandidatesPage
from "../pages/admin/CandidatesPage";

import AssignmentsPage
from "../pages/admin/AssignmentsPage";

import CandidateDetailsPage
from "../pages/admin/CandidateDetailsPage";

import EditCandidatePage
from "../pages/admin/EditCandidatePage";

import ReviewerDashboardPage
from "../pages/reviewer/ReviewerDashboardPage";

import ReviewerCandidateReviewPage
from "../pages/reviewer/ReviewerCandidateReviewPage";

import ReviewerAssignmentsPage
from "../pages/reviewer/ReviewerAssignmentsPage";

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

import CandidateDashboardPage
from "../pages/candidate/CandidateDashboardPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
    path="/admin/auditlogs"
    element={
        <AdminLayout>
            <AdminAuditLogsPage />
        </AdminLayout>
    }
/>

        <Route
    path="/admin/reports"
    element={
        <AdminLayout>
            <AdminReportsPage />
        </AdminLayout>
    }
/>

        <Route
  path="/admin/documents"
  element={
    <AdminLayout>
      <AdminDocumentsPage />
    </AdminLayout>
  }
/>

        <Route
  path="/admin/verifications"
  element={
    <AdminLayout>
      <AdminVerificationsPage />
    </AdminLayout>
  }
/>

        <Route
  path="/admin/notifications"
  element={
    <AdminLayout>
      <AdminNotificationsPage />
    </AdminLayout>
  }
/>

<Route
  path="/admin/deadletters"
  element={
    <AdminLayout>
      <AdminDeadLettersPage />
    </AdminLayout>
  }
/>

        {/* Login */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* Admin */}

        <Route
          path="/admin"
          element={<AdminDashboardPage />}
        />

        <Route
          path="/admin/candidates"
          element={<CandidatesPage />}
        />

        <Route
          path="/admin/assignments"
          element={<AssignmentsPage />}
        />

        <Route
          path="/admin/candidates/:id"
          element={<CandidateDetailsPage />}
        />

        <Route
          path="/admin/candidates/edit/:id"
          element={<EditCandidatePage />}
        />

        {/* Reviewer */}

       <Route
  path="/reviewer"
  element={<ReviewerLayout />}
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

        {/* Candidate */}

        <Route
          path="/candidate"
          element={<CandidateDashboardPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}