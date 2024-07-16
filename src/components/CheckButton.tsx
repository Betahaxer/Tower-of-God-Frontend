import { IconButton } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}
const CheckButton = ({ onClick }: Props) => {
  return (
    <IconButton
      variant="ghost"
      aria-label="check"
      fontSize="40px"
      onClick={onClick}
      isRound={true}
      background="green.400"
      _hover={{ background: "green.400" }}
      _active={{
        background: "green.400", // Prevents background from showing on click
      }}
      icon={
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
        >
          <title>check icon</title>
          <path
            d="M13.3332 4L5.99984 11.3333L2.6665 8"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: "white" }}
          />
        </svg>
      }
    />
  );
};

export default CheckButton;
