"use client";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@ui/components/collapsible";
import { ArrowDown } from "lucide-react";
import { ArrowUp } from "lucide-react";
import React from "react";

interface FaqCardProps {
	isOpenByDefault?: boolean;
	question: string;
	answer: string;
}

const FaqCard = ({ isOpenByDefault, question, answer }: FaqCardProps) => {
	const [isOpen, setIsOpen] = React.useState(isOpenByDefault ?? false);
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="border-2 rounded-xl p-4 w-full duration-200"
		>
			<CollapsibleTrigger className="w-full">
				<div className="flex items-center justify-between">
					<h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
						{question}
					</h3>
					{isOpen ? (
						<div className="border-2 rounded-full p-2 bg-primary text-primary-foreground">
							<ArrowUp />
						</div>
					) : (
						<div className="border-2 rounded-full p-2">
							<ArrowDown />
						</div>
					)}
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className="text-muted-foreground p-2">
				{answer}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default FaqCard;
