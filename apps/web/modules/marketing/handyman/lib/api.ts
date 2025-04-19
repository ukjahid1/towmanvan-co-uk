import { apiClient } from "@shared/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const handymanFormMutationKey = ["handyman-form"] as const;
export const useHandymanRequestMutation = () => {
	return useMutation({
		mutationKey: handymanFormMutationKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.handyman.$post>["json"],
		) => {
			const response = await apiClient.handyman.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit handyman request.");
			}

			return await response.json(); // return data if needed
		},
	});
};

export const handymanQueryKey = ["handyman"] as const;
export const useHandymanQuery = () => {
	return useQuery({
		queryKey: handymanQueryKey,
		queryFn: async () => {
			const response = await apiClient.handyman.$get();

			if (!response.ok) {
				throw new Error("Failed to fetch handyman requests.");
			}

			return await response.json();
		},
	});
};
