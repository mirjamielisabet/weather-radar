import "../App.css";
import React from "react";
import { List, ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * A drop-down menu that allows the user to choose a specific city or all cities.
 *
 * @param {Object} props
 * @param {Function} props.setCurrentLocation - Function for saving the chosen location to the state
 * @returns the drop-down menu component
 */
const DropDownMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(0);
  const [location, setLocation] = React.useState("All cities");
  const options = ["All cities", "Espoo", "Jyväskylä", "Kuopio", "Tampere"];
  const open = Boolean(anchorEl);

  /**
   * Handles the click of the drop-down menu.
   * @param {Object} event
   */
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the menu.
   */
  const closeMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Handles the click of a menu item.
   * @param {Object} event
   * @param {number} index - the index of the clicked menu item
   */
  const onMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setSelected(index);
    setLocation(options[index]);
    props.setCurrentLocation(options[index]);
  };

  return (
    <div className="dropdown">
      <List className="menuButton">
        <ListItem
          aria-controls="lock-menu"
          aria-haspopup="listbox"
          aria-expanded={open ? "true" : undefined}
          onClick={openMenu}
        >
          <ListItemText primary={location} />
          <KeyboardArrowDownIcon />
        </ListItem>
      </List>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "#E6E6E6",
            },
          },
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
