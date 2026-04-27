import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
  } = useInternetIdentity();

  return {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    logout: clear,
    principalText: identity?.getPrincipal().toString() ?? null,
  };
}
