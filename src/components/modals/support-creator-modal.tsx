import { Button } from '../ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { NumericFormat } from 'react-number-format';
import { useState, useEffect } from 'react';

const presetAmounts = [10000, 25000, 50000, 100000, 250000];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    creator: { id: number; name: string } | null;
    onSupport: (amount: number, creatorId: number) => void;
};

function CustomAmountInput({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <NumericFormat
            value={value}
            thousandSeparator=","
            decimalSeparator="."
            prefix="Rp "
            allowNegative={false}
            onValueChange={(vals) => onChange(vals.formattedValue)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Example: Rp 50,000"
        />
    );
}

export function SupportCreatorModal({
    open,
    onOpenChange,
    creator,
    onSupport,
}: Props) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isValid, setIsValid] = useState(false);

    // Update validity whenever amount changes
    useEffect(() => {
        const amt =
            selectedAmount || Number(customAmount.replace(/\D/g, '')) || 0;
        setIsValid(amt >= 1000 && creator !== null);
        if (selectedAmount && amt < 1000)
            setCustomAmount(selectedAmount.toLocaleString());
    }, [selectedAmount, customAmount, creator]);

    const handleConfirm = () => {
        const finalAmount =
            selectedAmount || Number(customAmount.replace(/\D/g, ''));
        if (!isValid || !creator) return;
        onSupport(finalAmount, creator.id);
        setSelectedAmount(null);
        setCustomAmount('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Support {creator ? creator.name : 'Creator'}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                    {/* Preset Amounts */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Quick Amount Selection
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {presetAmounts.map((amount) => (
                                <Badge
                                    key={amount}
                                    variant={
                                        selectedAmount === amount
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="cursor-pointer text-sm px-3 py-1"
                                    onClick={() => {
                                        setSelectedAmount(amount);
                                        setCustomAmount(
                                            amount.toLocaleString()
                                        );
                                    }}>
                                    Rp {amount.toLocaleString()}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                        <label className="text-sm font-medium mb-1 block">
                            Or enter a custom amount
                        </label>
                        <CustomAmountInput
                            value={customAmount}
                            onChange={(val) => {
                                setCustomAmount(val);
                                setSelectedAmount(null);
                            }}
                        />
                        {!isValid &&
                            customAmount &&
                            Number(customAmount.replace(/\D/g, '')) < 1000 && (
                                <p className="text-xs text-red-500 mt-1">
                                    Amount must be at least Rp 1,000
                                </p>
                            )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleConfirm} disabled={!isValid}>
                            Send Support
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
