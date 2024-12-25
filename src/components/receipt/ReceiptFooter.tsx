import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ReceiptFooterProps {
  calories: number;
  onSave: () => void;
  onShare: () => void;
}

export function ReceiptFooter({ calories, onSave, onShare }: ReceiptFooterProps) {
  return (
    <div className="mt-6 pt-4 border-t flex justify-between items-center">
      <div className="text-gray-600">
        <span className="font-semibold">{calories}</span> calories per serving
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave} icon={Download}>
          Save
        </Button>
        <Button onClick={onShare} icon={Share2}>
          Share
        </Button>
      </div>
    </div>
  );
}