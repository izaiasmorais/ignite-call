"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function GoogleErrorContent() {
	const searchParams = useSearchParams();
	const [hasAuthError, setHasAuthError] = useState(false);

	useEffect(() => {
		setHasAuthError(!!searchParams.get("error"));
	}, [searchParams]);

	if (hasAuthError) {
		return (
			<div className="bg-red-500 text-white p-4 rounded-md">
				<span>Erro ao conectar com o Google Calendário.</span>
			</div>
		);
	}

	return null;
}

export function GoogleError() {
	return (
		<Suspense fallback={null}>
			<GoogleErrorContent />
		</Suspense>
	);
}
