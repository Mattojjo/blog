import { fetchData } from "./utils/api.js";
import { load10 } from "./utils/pagination.js";

const loadingSpinner = document.getElementById("loadingSpinner");

(async () => {
  if (loadingSpinner) {
    loadingSpinner.classList.remove("hidden");
  }

  await fetchData();

  if (loadingSpinner) {
    loadingSpinner.classList.add("hidden");
  }

  load10();
})();

