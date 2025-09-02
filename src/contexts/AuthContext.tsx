// src/contexts/AuthContext.tsx
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
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role") // only fetch necessary fields
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

  // Initialize auth session and listen for changes
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setProfileLoading(true);
          fetchUserProfile(session.user.id); // no await, fire-and-forget
        }
      } catch (err) {
        console.error("Error getting initial session:", err);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setProfileLoading(true);
        fetchUserProfile(session.user.id); // async, non-blocking
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign up + create profile + auto login
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        role: "student",
      });
      if (profileError) throw profileError;

      setProfileLoading(true);
      fetchUserProfile(data.user.id); // async
    }
  };

  // Sign in + auto set user
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (data.session?.user) {
      setProfileLoading(true);
      fetchUserProfile(data.session.user.id); // async
    }
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading: authLoading || profileLoading, signUp, signIn, signOut, setUser }),
    [user, authLoading, profileLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
