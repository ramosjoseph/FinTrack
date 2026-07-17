import DeleteAttendanceButton from "./DeleteAttendanceButton";

import type { AttendanceLog } from "../types/attendance";

interface Props {
  logs: AttendanceLog[];
}

export default function AttendanceTable({
  logs,
}: Props) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Attendance Records
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track attendance,
          overtime, and salary
          calculations.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40">
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Hours
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                OT
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Remarks
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  No attendance records.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    {new Date(
                      log.work_date
                    ).toLocaleDateString(
                      "en-PH",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        log.status ===
                        "present"
                          ? "bg-green-100 text-green-700"
                          : log.status ===
                            "leave"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {
                      log.hours_worked
                    }
                  </td>

                  <td className="px-6 py-4">
                    {Number(
                      log.overtime_hours
                    ) > 0 ? (
                      <span className="font-medium text-blue-600">
                        +
                        {
                          log.overtime_hours
                        }
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {log.remarks ??
                      "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <DeleteAttendanceButton
                        logId={log.id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}