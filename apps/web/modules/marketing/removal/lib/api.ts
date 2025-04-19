import { apiClient } from "@shared/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const removalFormMutationKey = ["removal-form"] as const;
export const useRemovalFormMutation = () => {
	return useMutation({
		mutationKey: removalFormMutationKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.removal.$post>["json"],
		) => {
			const response = await apiClient.removal.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit removal request.");
			}

			return await response.json(); // return data if needed
		},
	});
};

export const removalQueryKey = ["removal"] as const;
export const useRemovalQuery = () => {
	return useQuery({
		queryKey: removalQueryKey,
		queryFn: async () => {
			const response = await apiClient.removal.$get();

			if (!response.ok) {
				throw new Error("Failed to fetch removal requests.");
			}

			return await response.json();
		},
	});
};
