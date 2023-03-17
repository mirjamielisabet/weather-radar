import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DropDownMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(0);
  const [location, setLocation] = React.useState("All cities");
  const options = ["All cities", "Espoo", "Jyväskylä", "Kuopio", "Tampere"];
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setSelected(index);
    setLocation(options[index]);
    props.setCurrentLocation(options[index]);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        onClick={openMenu}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {location}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(event) => onMenuItemClick(event, index)}
            selected={index === selected}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
