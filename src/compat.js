// compat.js

const PATH_MAX = 260;
const NAME_MAX = 260;

// Optional: Add platform check (though JavaScript runs in browsers)
const isWindows = navigator.platform.startsWith("Win");

export { PATH_MAX, NAME_MAX, isWindows };
