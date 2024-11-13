import { HyperText } from '@/components/ui';

export function HyperTextDemo({ title }: { title: string }) {
	return (
		<HyperText
			className="text-2xl font-bold text-white text-center dark:text-white"
			text={title}
		/>
	);
}
