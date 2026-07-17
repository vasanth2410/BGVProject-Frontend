import {
  useEffect,
  useState,
} from "react";

import {
  getAllNotifications,
} from "../../services/AdminNotificationService";

export default function AdminNotificationsPage() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const result =
          await getAllNotifications();

        setNotifications(result);

      }
      catch (error) {

        console.error(error);

      }

    };

    void loadData();

  }, []);

  return (

    <>
      <div style={{ padding: "30px" }}>
        <div className="page-header">
          <h1 className="page-title">
            Notifications
          </h1>
        </div>

        <div className="table-container">
          <table className="candidate-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {notifications.map((n) => (
                <tr key={n.id}>
                  <td>
                    {n.id}
                  </td>
                  <td>
                    {n.toEmail}
                  </td>
                  <td>
                    {n.subject}
                  </td>
                  <td>
                    <span className={`status-${n.status === "Sent" ? "approved" : "rejected"}`}>
                      {n.status}
                    </span>
                  </td>
                  <td>
                    {new Date(
                      n.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );

}