import { apiClient } from "@shared/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const courierFormMutationKey = ["courier-form"] as const;
export const useCourierRequestMutation = () => {
	return useMutation({
		mutationKey: courierFormMutationKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.courier.$post>["json"],
		) => {
			const response = await apiClient.courier.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit courier request.");
			}

			return await response.json(); // return data if needed
		},
	});
};

export const courierQueryKey = ["courier"] as const;
export const useCourierQuery = () => {
	return useQuery({
		queryKey: courierQueryKey,
		queryFn: async () => {
			const response = await apiClient.courier.$get();

			if (!response.ok) {
				throw new Error("Failed to fetch courier requests.");
			}

			return await response.json();
		},
	});
};
