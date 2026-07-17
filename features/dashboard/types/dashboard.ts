export interface DashboardData {
  user: {
    id: string;
    email?: string;
  };

  profile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}