import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export function useUser() {
  const { isAuthenticated } = useAuthStore();
  const { user, fetchUser, clearUser } = useUserStore();

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUser();
    } else if (!isAuthenticated && user) {
      clearUser();
    }
  }, [isAuthenticated, user, fetchUser, clearUser]);

  return { user, isAuthenticated };
}
