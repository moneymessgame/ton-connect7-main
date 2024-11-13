'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCopy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface CopyToClipboardProps {
	text: string;
	currency: string;
}

export default function CopyToClipboard({
	text,
	currency,
}: CopyToClipboardProps) {
	const { toast } = useToast();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleCopy = () => {
		if (text) {
			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard
					.writeText(text)
					.then(() => showSuccessToast())
					.catch(() => fallbackCopyTextToClipboard());
			} else {
				fallbackCopyTextToClipboard();
			}
		}
	};

	const fallbackCopyTextToClipboard = () => {
		if (inputRef.current) {
			inputRef.current.select();
			try {
				document.execCommand('copy');
				showSuccessToast();
			} catch (err) {
				showErrorToast();
			}
			window.getSelection()?.removeAllRanges();
		}
	};

	const showSuccessToast = () => {
		toast({
			title: 'Copied to clipboard',
			description: 'The text has been copied to your clipboard.',
		});
	};

	const showErrorToast = () => {
		toast({
			title: 'Copy failed',
			description:
				'Failed to copy text to clipboard. Please try selecting and copying manually.',
			variant: 'destructive',
		});
	};

	return (
		<div className="w-full max-w-sm space-y-2 pt-5">
			<div className="flex space-x-2">
				<Input
					type="text"
					value={text}
					readOnly
					className="flex-grow"
					ref={inputRef}
					aria-label="Text to copy"
				/>
				<Button onClick={handleCopy} disabled={!text}>
					<ClipboardCopy className="mr-2 h-4 w-4" />
					Copy
				</Button>
			</div>
			<p className="text-sm text-muted-foreground">{currency}</p>
		</div>
	);
}
