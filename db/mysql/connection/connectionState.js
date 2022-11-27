let state;

function set(value) {
  state = value;
}

function get() {
  return state;
}

function clear() {
  state = null;
}

export default { set, get, clear };
