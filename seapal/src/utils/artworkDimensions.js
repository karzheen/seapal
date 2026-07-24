export function getDimensions(pic) {
  if (pic.width != null && pic.height != null) {
    return { width: Number(pic.width), height: Number(pic.height) };
  }
  if (pic.size) {
    const [width, height] = pic.size.split(/\s*x\s*/i).map(Number);
    return { width, height };
  }
  return { width: null, height: null };
}

export function formatDimensions(pic) {
  const { width, height } = getDimensions(pic);
  if (width && height) {
    return `${width} W x ${height} H cm`;
  }
  return pic.size ? `${pic.size} cm` : "";
}

export function formatDimensionsShort(pic) {
  const { width, height } = getDimensions(pic);
  if (width && height) {
    return `${width} x ${height}`;
  }
  return pic.size ?? "";
}

export function getSizeBucket(pic) {
  const { width, height } = getDimensions(pic);
  const longest = Math.max(width, height);
  if (!longest) return null;
  if (longest < 50) return "Small (<50 cm)";
  if (longest <= 100) return "Medium (50 - 100 cm)";
  if (longest <= 150) return "Large (100 - 150 cm)";
  return "Oversized (>150 cm)";
}

const SQUARE_TOLERANCE = 0.05;

export function getOrientation(pic) {
  const { width, height } = getDimensions(pic);
  if (!width || !height) return null;

  const diffRatio = Math.abs(width - height) / Math.max(width, height);
  if (diffRatio <= SQUARE_TOLERANCE) return "Square";
  if (width > height) return "Horizontal";
  return "Vertical";
}
