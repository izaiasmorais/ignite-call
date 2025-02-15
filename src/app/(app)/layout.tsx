export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-screen bg-gray-900 flex items-center justify-center text-white">
			<div className="w-[540px]">{children}</div>
		</div>
	);
}
