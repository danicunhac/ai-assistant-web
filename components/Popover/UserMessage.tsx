import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatStore } from "@/hooks/chat";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type UserMessageProps = {
  id: string;
  text: string;
  edited?: boolean;
  onDelete: () => void;
};

export const UserMessage = ({
  id,
  text,
  edited = true,
  onDelete,
}: UserMessageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [dropdownOpen, toggleDropdown] = useState(false);

  const [updateMessage] = useChatStore((state) => [state.update]);

  const disableEditing = () => {
    if (inputRef.current) {
      setEditing(false);
      inputRef.current.value = "";
    }
  };

  const submitEdit = useCallback(() => {
    if (inputRef.current) {
      updateMessage(id, inputRef.current.value ?? "");
      setEditing(false);
      inputRef.current.value = "";
    }
  }, [id, updateMessage]);

  useEffect(() => {
    if (editing) {
      toggleDropdown(false);
      inputRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && editing) {
        disableEditing();
      }

      if (e.key === "Enter" && editing) {
        submitEdit();
      }

      if (e.key === "Escape") {
        if (dropdownOpen) {
          toggleDropdown((prev) => !prev);
        }
      }

      if (e.key === " " && editing && inputRef.current) {
        inputRef.current.value += " ";
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, [editing, dropdownOpen, submitEdit]);

  return (
    <DropdownMenu open={dropdownOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={() => !editing && toggleDropdown((prev) => !prev)}
        className="py-1 px-3 gap-2 rounded-lg rounded-tr-none text-white bg-purple-500 text-sm self-end"
      >
        {!editing ? (
          <div className="flex flex-col gap-1">
            <p>{text}</p>
            {edited && (
              <em className="text-xs text-gray-300 self-end">Edited</em>
            )}
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            defaultValue={text}
            className="w-full p-2 text-sm rounded-lg bg-gray-100"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setEditing(true)}
          className="cursor-pointer"
        >
          <span className="text-sm">Update</span>
          <DropdownMenuShortcut>
            <PencilIcon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
          <span className="text-sm">Delete</span>
          <DropdownMenuShortcut>
            <TrashIcon size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => toggleDropdown(false)}
          className="cursor-pointer"
        >
          <span className="text-sm">Cancel</span>
          <DropdownMenuShortcut>esc</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
