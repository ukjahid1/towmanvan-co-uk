import { apiClient } from "@shared/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const drivingFormMutatuionKey = ["driving-form"] as const;
export const useDrivingRequestMutation = () => {
	return useMutation({
		mutationKey: drivingFormMutatuionKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.driving.$post>["json"],
		) => {
			const response = await apiClient.driving.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit driving learning request.");
			}

			return await response.json(); // return data if needed
		},
	});
};

export const drivingQueryKey = ["driving"] as const;
export const useDrivingQuery = () => {
	return useQuery({
		queryKey: drivingQueryKey,
		queryFn: async () => {
			const response = await apiClient.driving.$get();

			if (!response.ok) {
				throw new Error("Failed to fetch driving learning requests.");
			}

			return await response.json();
		},
	});
};
