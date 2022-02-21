import { apiInitializer } from "discourse/lib/api";
import hbs from "discourse/widgets/hbs-compiler";
import { headerMenuItems } from "../widgets/american-radio-header-links";

export default apiInitializer("0.11.1", (api) => {
  const site = api.container.lookup("site:main");
  const currentUser = api.getCurrentUser();

  if (!site.mobileView) {
    api.reopenWidget("header-contents", {
      tagName: "div.contents.clearfix",
      template: hbs`
        {{home-logo attrs=attrs}}
        <div class="header-right">
          <div class="panel clearfix" role="navigation">
            {{#if attrs.topic}}
              {{header-topic-info attrs=attrs}}
            {{else}}
              <div class="tag-line">
                <p>Hear you on the air soon!</p>
              </div>
            {{/if}}
            {{yield}}
          </div>
          {{american-radio-header-links attrs=attrs}}
        </div>
      `,
    });
  }

  if (site.mobileView) {
    const menu_items = headerMenuItems(settings.menu_items, currentUser);

    menu_items.forEach((menuItem) => {
      api.decorateWidget("hamburger-menu:footerLinks", () => {
        return {
          href: menuItem.url,
          rawLabel: menuItem.text,
          className: `${menuItem.text
            .replaceAll(/[^a-zA-Z ]/g, "")
            .dasherize()} link`,
          attributes: { target: menuItem.target },
        };
      });
    });
  }
});
