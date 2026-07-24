import { useState, useEffect } from "react";

function getColumnCount(filtersShown) {
  if (window.matchMedia("(max-width: 950px)").matches) return 2;
  if (window.matchMedia("(max-width: 1254px)").matches) return 3;
  return filtersShown ? 3 : 4;
}

export function distributeIntoColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}

export function useGalleryColumnCount(filtersShown) {
  const [columnCount, setColumnCount] = useState(() => getColumnCount(filtersShown));

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 950px)");
    const mqMedium = window.matchMedia("(max-width: 1254px)");

    const update = () => setColumnCount(getColumnCount(filtersShown));

    update();
    mqNarrow.addEventListener("change", update);
    mqMedium.addEventListener("change", update);
    return () => {
      mqNarrow.removeEventListener("change", update);
      mqMedium.removeEventListener("change", update);
    };
  }, [filtersShown]);

  return columnCount;
}
