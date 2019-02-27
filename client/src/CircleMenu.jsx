/*

Adopted from the great work originally done by Matthew Vincent 
(https://codepen.io/matthewvincent)


*/

import React from "react";
import { IconContext } from "react-icons";
import "./CircleMenu.css";
import {
  FaBars,
  FaTimes,
  FaPaperPlane,
  FaPencilAlt,
  FaTrash,
  FaTags,
  FaSearch,
  FaUsers
} from "react-icons/fa";

// example click handler for menu items
const itemClick = e => {
  console.log("clicked");
};

// config for menu
const menuData = [
  {
    color: "#b3462f",
    icon: <FaPaperPlane />,
    click: itemClick
  },
  {
    color: "#e78b38",
    icon: <FaPencilAlt />,
    click: itemClick
  },
  {
    color: "#353535",
    icon: <FaTrash />,
    click: itemClick
  },
  {
    color: "#303c54",
    icon: <FaTags />,
    click: itemClick
  },
  {
    color: "#3a384e",
    icon: <FaSearch />,
    click: itemClick
  },
  {
    color: "#78332c",
    icon: <FaUsers />,
    click: itemClick
  }
];

class MenuWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  componentWillMount() {
    this.makeMenu(menuData);
  }

  // calculate angles and distance between menu items
  // then set position on menu-item objects
  makeMenu = menuConfig => {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    let menuItems = [];

    menuConfig.forEach(({ color, icon, click }) => {
      menuItems.push({
        color,
        icon,
        click,
        rotation,
        angle,
        show: false
      });
      rotation += angle;
    });

    this.setState({
      menuItems: menuItems
    });
  };

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  // staggerd fade menu items in
  animateButtons = () => {
    const length = this.state.menuItems.length;

    const stagger = i => {
      if (i < length) {
        setTimeout(() => {
          let items = this.state.menuItems;
          let showing = this.state.menuItems[i].show;

          this.setState({
            menuItems: [
              ...items.slice(0, i),
              Object.assign({}, items[i], {
                show: !showing
              }),
              ...items.slice(i + 1)
            ]
          });

          stagger(i + 1);
        }, 60);
      }
    };

    stagger(0);
  };

  render() {
    return (
      <div className="menucircle-container">
        <MenuToggle
          toggle={this.toggleMenu}
          open={this.state.menuOpen}
          animateButtons={this.animateButtons}
        />
        <Menu
          size={18}
          items={this.state.menuItems}
          open={this.state.menuOpen}
        />
      </div>
    );
  }
}

const Menu = ({ size, items, toggle, open }) => (
  <div className={open ? "menu-wrapper-open" : "menu-wrapper-closed"}>
    <div className="menu-background">
      <MenuItems size={size} items={items} open={open} />
    </div>
  </div>
);

const MenuItems = ({ size, items, open }) => {
  const buttons = items.map((item, index) => {
    const styling = {
      transform: `rotate(${item.rotation}deg) 
           translate(${size / 2}em) 
           rotate(${-item.rotation}deg)`,
      backgroundColor: item.color
    };

    return (
      <div
        key={index}
        className={item.show ? "menu-item item-show" : "menu-item item-hide"}
        style={styling}
        onClick={item.click}
      >
        <IconContext.Provider value={{ className: "menu-item-icon" }}>
          {item.icon}
        </IconContext.Provider>
      </div>
    );
  });

  return (
    <div
      key="3jsiijs"
      className={open ? "button-bg animate-menu" : "button-bg"}
    >
      {buttons}
    </div>
  );
};

const MenuToggle = ({ toggle, open, animateButtons }) => (
  <button
    className={open ? "menu-toggle toggle-open" : "menu-toggle toggle-closed"}
    onClick={() => {
      toggle();
      setTimeout(animateButtons, 120);
    }}
  >
    <IconContext.Provider value={{ className: "menu-toggle-icon" }}>
      {open ? <FaTimes /> : <FaBars />}
    </IconContext.Provider>
  </button>
);

export default MenuWrapper;
