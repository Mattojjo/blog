import { fetchData } from "./utils/api.js";
import { load10 } from "./utils/pagination.js";

// Initialize the blog
(async () => {
  await fetchData();
  load10();
})();

