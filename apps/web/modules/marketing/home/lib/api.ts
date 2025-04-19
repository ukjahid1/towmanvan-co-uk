import { apiClient } from "@shared/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType } from "hono";

export const newsletterSignupMutationKey = ["newsletter-signup"] as const;
export const useNewsletterSignupMutation = () => {
	return useMutation({
		mutationKey: newsletterSignupMutationKey,
		mutationFn: async (
			form: InferRequestType<
				typeof apiClient.newsletter.signup.$post
			>["form"],
		) => {
			const response = await apiClient.newsletter.signup.$post({
				form,
			});

			if (!response.ok) {
				throw new Error("Failed to sign up to newsletter");
			}
		},
	});
};

export const contactFormMutationKey = ["contact-form"] as const;
export const useContactFormMutation = () => {
	return useMutation({
		mutationKey: contactFormMutationKey,
		mutationFn: async (
			form: InferRequestType<typeof apiClient.contact.$post>["form"],
		) => {
			const response = await apiClient.contact.$post({
				form,
			});

			if (!response.ok) {
				throw new Error("Failed to send contact form");
			}
		},
	});
};

export const recoveryFormMutationKey = ["recovery-form"] as const;

export const useRecoveryFormMutation = () => {
	return useMutation({
		mutationKey: recoveryFormMutationKey,
		mutationFn: async (
			data: InferRequestType<typeof apiClient.quote.$post>["json"],
		) => {
			const response = await apiClient.quote.$post({ json: data });

			if (!response.ok) {
				throw new Error("Failed to submit recovery quote");
			}

			return await response.json(); // return data if needed
		},
	});
};
