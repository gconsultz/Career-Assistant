import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch user profile from 'users' table
  const fetchUserProfile = async (userId: string) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUser(null);
    } finally {
      setProfileLoading(false);
    }
  };

  // Initialize auth session and listen for changes (including after /Verify)
  useEffect(() => {
    let ignore = false;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error getting initial session:", err);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  // Sign up + create profile (no auto login until email verified)
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Profile creation will be handled after email verification
    // Optionally, you can use a trigger in Supabase to auto-create profile
  };

  // Sign in + auto set user
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (data.session?.user) {
      await fetchUserProfile(data.session.user.id);
    }
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading: authLoading || profileLoading,
      signUp,
      signIn,
      signOut,
      setUser,
      fetchUserProfile,
    }),
    [user, authLoading, profileLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}