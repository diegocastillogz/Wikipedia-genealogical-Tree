import { c as create_ssr_component, f as subscribe, d as escape } from './index-1d0ab795.js';
import { p as page } from './stores-0a5e3699.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-d551b9a3.js.map
