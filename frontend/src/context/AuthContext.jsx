import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authService from "@/services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | guest

  useEffect(() => {
    let active = true;
    authService.getSession().then((session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setStatus(session?.user ? "authenticated" : "guest");
    });
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (credentials) => {
    const session = await authService.signIn(credentials);
    setUser(session.user);
    setStatus("authenticated");
    return session.user;
  }, []);

  const requestSignUpOtp = useCallback(async (payload) => {
    return authService.requestSignUpOtp(payload);
  }, []);

  const verifySignUpOtp = useCallback(async (payload) => {
    const session = await authService.verifySignUpOtp(payload);
    setUser(session.user);
    setStatus("authenticated");
    return session.user;
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
    setStatus("guest");
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      signIn,
      requestSignUpOtp,
      verifySignUpOtp,
      signOut,
    }),
    [user, status, signIn, requestSignUpOtp, verifySignUpOtp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
