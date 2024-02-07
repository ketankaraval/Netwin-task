import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={handleBack}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;
