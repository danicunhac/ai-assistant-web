import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";

type UserMessageProps = {
  text: string;
  edited?: boolean;
  onDelete: () => void;
};

export const UserMessage = ({
  text,
  edited = true,
  onDelete,
}: UserMessageProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      asChild
      className="py-1 px-3 gap-2 rounded-lg rounded-tr-none text-white bg-purple-500 text-sm self-end"
    >
      <div className="flex flex-col gap-1">
        <p>{text}</p>
        {edited && <em className="text-xs text-gray-300 self-end">Edited</em>}
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem className="cursor-pointer">
        <span className="text-sm">Update</span>
        <DropdownMenuShortcut>
          <PencilIcon size={16} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
        <span className="text-sm">Delete</span>
        <DropdownMenuShortcut>
          <TrashIcon size={16} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
