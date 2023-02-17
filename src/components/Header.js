import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
} from "shards-react";

const Header = () => {

    const [open, setOpen] = useState(false)
  return (
    <Navbar type="dark" theme="primary" expand="md">
      <NavbarBrand href="#">Brave Compress</NavbarBrand>
      <NavbarToggler onClick={() => setOpen(!open)} />

      <Collapse open={open} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="#">
              Compress Image
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              Compress PDF
            </NavLink>
          </NavItem>
          
        </Nav>

        <Nav navbar className="ml-auto">
          <InputGroup size="sm" seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroupText>
            </InputGroupAddon>
            <FormInput className="border-0" placeholder="Search..." />
          </InputGroup>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
