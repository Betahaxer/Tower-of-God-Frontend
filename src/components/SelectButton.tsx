import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
interface Props {
  onClick?: () => void;
}
const SelectButton = ({ onClick }: Props) => {
  return (
    <IconButton
      variant="ghost"
      aria-label="select"
      color="white"
      fontSize="40px"
      onClick={onClick}
      icon={<FaRegCircle />}
      _hover={{ background: "none" }}
      _active={{
        background: "none", // Prevents background from showing on click
      }}
      _focus={{
        boxShadow: "none", // Prevents focus outline
        background: "none", // Prevents background from showing on focus
      }}
    />
  );
};

export default SelectButton;
