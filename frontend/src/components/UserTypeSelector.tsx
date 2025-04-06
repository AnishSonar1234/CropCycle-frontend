
import React from 'react';
import { Sprout, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserTypeSelectorProps {
  selectedType: "farmer" | "buyer";
  onChange: (type: "farmer" | "buyer") => void;
}

const UserTypeSelector = ({ selectedType, onChange }: UserTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div
        onClick={() => onChange("farmer")}
        className={cn(
          "flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all",
          selectedType === "farmer" 
            ? "border-green-600 bg-green-50" 
            : "border-gray-200 hover:border-green-300"
        )}
      >
        <Sprout 
          className={cn(
            "h-10 w-10 mb-2",
            selectedType === "farmer" ? "text-green-600" : "text-gray-400"
          )} 
        />
        <span className={cn(
          "font-medium",
          selectedType === "farmer" ? "text-green-800" : "text-gray-500"
        )}>
          Farmer
        </span>
      </div>
      
      <div
        onClick={() => onChange("buyer")}
        className={cn(
          "flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all",
          selectedType === "buyer" 
            ? "border-green-600 bg-green-50" 
            : "border-gray-200 hover:border-green-300"
        )}
      >
        <ShoppingCart 
          className={cn(
            "h-10 w-10 mb-2",
            selectedType === "buyer" ? "text-green-600" : "text-gray-400"
          )} 
        />
        <span className={cn(
          "font-medium",
          selectedType === "buyer" ? "text-green-800" : "text-gray-500"
        )}>
          Buyer
        </span>
      </div>
    </div>
  );
};

export default UserTypeSelector;