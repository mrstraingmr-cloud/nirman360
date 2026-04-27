import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CostCalculatorInput,
  DesignFilter,
  SubmitInquiryInput,
  UpdateProfileInput,
} from "../backend.d.ts";

function useBackend() {
  return useActor(createActor);
}

export function useDesigns(filter: DesignFilter = {}) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["designs", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDesigns(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDesign(id: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["design", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getDesign(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useSavedDesigns() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["savedDesigns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedDesigns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProfile() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyInquiries() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["myInquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveDesign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (designId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveDesign(designId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["savedDesigns"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useRemoveSavedDesign() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (designId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeSavedDesign(designId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["savedDesigns"] });
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useCalculateCost() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: async (input: CostCalculatorInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.calculateCost(input);
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubmitInquiryInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myInquiries"] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateMyProfile(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
