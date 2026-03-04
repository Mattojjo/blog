import { fetchData } from "./utils/api.js";
import { load10 } from "./utils/pagination.js";

(async () => {
  await fetchData();
  load10();
})();

