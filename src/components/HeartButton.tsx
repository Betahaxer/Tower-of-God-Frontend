import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
interface Props {
  onClick: () => void;
  filled: boolean;
}
const HeartButton = ({ onClick, filled }: Props) => {
  const navigate = useNavigate();
  return (
    <Tooltip label='Add to wishlist' fontSize={'xs'}>
      <IconButton
        variant="ghost"
        aria-label="Heart"
        size="sm"
        onClick={onClick}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "red" : "white"}
            stroke={filled ? "red" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        }
        _hover={{
          svg: {
            fill: "red",
            stroke: "red",
          },
        }}
        _active={{
          background: "none", // Prevents background from showing on click
        }}
        _focus={{
          boxShadow: "none", // Prevents focus outline
          background: "none", // Prevents background from showing on focus
        }}
      />
    </Tooltip>
  );
};

export default HeartButton;
