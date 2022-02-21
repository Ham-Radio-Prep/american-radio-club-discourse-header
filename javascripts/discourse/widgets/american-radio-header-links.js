import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { userPath } from "discourse/lib/url";

export function headerMenuItems(data, currentUser) {
  return data.split("|").map((menuItem) => {
    const menuItemData = menuItem.split(",");

    if (currentUser && menuItemData[0].trim() === "Start Here!") {
      return {
        text: "My Dashboard",
        url: userPath(currentUser.username),
        target: menuItemData[2].trim() === "blank" ? "_blank" : "_self",
      };
    }

    return {
      text: menuItemData[0].trim(),
      url: menuItemData[1].trim(),
      target: menuItemData[2].trim() === "blank" ? "_blank" : "_self",
    };
  });
}

export default createWidget("american-radio-header-links", {
  tagName: "div.header-links",

  html() {
    const menu_items = headerMenuItems(settings.menu_items, this.currentUser);

    const links = [];
    menu_items.forEach((menuItem) => {
      links.push(
        h(
          "span",
          h(
            `a.${menuItem.text.dasherize()}.link`,
            {
              attributes: { href: menuItem.url, target: menuItem.target },
            },
            menuItem.text
          )
        )
      );
    });

    return links;
  },
});
