import { apiClient } from "@shared/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const scrapFormMutationKey = ["scrap-form"] as const;
export const useScrapRequestMutation = () => {
	return useMutation({
		mutationKey: scrapFormMutationKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.scrap.$post>["json"],
		) => {
			const response = await apiClient.scrap.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit scrap/sell request.");
			}

			return await response.json(); // return data if needed
		},
	});
};

export const scrapQueryKey = ["scrap"] as const;
export const useScrapQuery = () => {
	return useQuery({
		queryKey: scrapQueryKey,
		queryFn: async () => {
			const response = await apiClient.scrap.$get();

			if (!response.ok) {
				throw new Error("Failed to fetch scrap/sell requests.");
			}

			return await response.json();
		},
	});
};
