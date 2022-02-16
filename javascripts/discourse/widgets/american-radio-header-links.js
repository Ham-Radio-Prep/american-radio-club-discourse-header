import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";

export function headerMenuItems(data) {
  return data.split("|").map((menuItem) => {
    const menuItemData = menuItem.split(",");

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
    const menu_items = headerMenuItems(settings.menu_items);

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
