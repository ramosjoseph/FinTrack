export interface AttendanceLog {
  id: string;

  user_id: string;

  work_date: string;

  status:
    | "present"
    | "absent"
    | "leave";

  hours_worked: number;

  overtime_hours: number;

  remarks: string | null;

  created_at: string;

  updated_at: string;
}