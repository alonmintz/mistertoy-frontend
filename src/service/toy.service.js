import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { TOYS_MOCK_DATA } from "../model/toys.mockdata.js";

const TOY_KEY = "toyDB";
export const TOY_LABELS = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
];
_createToys();

export const toyService = {
  query,
  get,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getFilterFromSearchParams,
  getSortFromSearchParams,
  getSpeedStats,
  getVendorStats,
};
// For Debug (easy access from console):
window.cs = toyService;

function query(filterBy = {}, sortBy = {}) {
  return storageService.query(TOY_KEY).then((toys) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      toys = toys.filter((toy) => regExp.test(toy.name));
    }

    if (filterBy.inStock) {
      toys = toys.filter((toy) => toy.inStock === JSON.parse(filterBy.inStock));
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      toys = toys.filter((toy) => {
        const labels = toy.labels;
        if (!labels || !labels.length) return false;
        return labels.some((label) => filterBy.labels.includes(label));
      });
    }

    if (sortBy.name !== undefined) {
      toys = toys.sort(
        (toy1, toy2) => toy1.name.localeCompare(toy2.name) * sortBy.name
      );
    }

    if (sortBy.price !== undefined) {
      toys = toys.sort(
        (toy1, toy2) => (toy1.price - toy2.price) * sortBy.price
      );
    }

    if (sortBy.createdAt !== undefined) {
      toys = toys.sort(
        (toy1, toy2) => (toy1.createdAt - toy2.createdAt) * sortBy.createdAt
      );
    }

    return toys;
  });
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId).then((toy) => {
    toy = _setNextPrevToyId(toy);
    return toy;
  });
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId);
}

function save(toy) {
  if (toy.id) {
    return storageService.put(TOY_KEY, toy);
  } else {
    return storageService.post(TOY_KEY, toy);
  }
}

function getEmptyToy(name = "", labels = [], price = 0, inStock = false) {
  return { name, labels, price, inStock };
}
function getDefaultFilter() {
  return { txt: "", labels: [], inStock: null };
}

function getDefaultSort() {
  return { name: 1 };
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || "";
  }
  return filterBy;
}

function getSortFromSearchParams(searchParams) {
  const defaultSort = getDefaultSort();
  const sortBy = {};
  for (const field in defaultSort) {
    sortBy[field] = searchParams.get(field) || 1;
  }
  return sortBy;
}
//TODO: change to relevant stats
function getSpeedStats() {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyCountBySpeedMap = _getToyCountBySpeedMap(toys);
    const data = Object.keys(toyCountBySpeedMap).map((speedName) => ({
      title: speedName,
      value: toyCountBySpeedMap[speedName],
    }));
    return data;
  });
}
//TODO: change to relevant stats
function getVendorStats() {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyCountByVendorMap = _getToyCountByVendorMap(toys);
    const data = Object.keys(toyCountByVendorMap).map((vendor) => ({
      title: vendor,
      value: Math.round((toyCountByVendorMap[vendor] / toys.length) * 100),
    }));
    return data;
  });
}

function _createToys() {
  let toys = utilService.loadFromStorage(TOY_KEY);
  if (!toys || !toys.length) {
    utilService.saveToStorage(TOY_KEY, TOYS_MOCK_DATA);
  }
}

function _createToy(vendor, maxSpeed = 250) {
  const toy = getEmptyToy(vendor, maxSpeed);
  toy.id = utilService.makeId();
  return toy;
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy.id === toy.id);
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0];
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1];
    toy.nextToyId = nextToy.id;
    toy.prevToyId = prevToy.id;
    return toy;
  });
}

function _getToyCountBySpeedMap(toys) {
  const toyCountBySpeedMap = toys.reduce(
    (map, toy) => {
      if (toy.maxSpeed < 120) map.slow++;
      else if (toy.maxSpeed < 200) map.normal++;
      else map.fast++;
      return map;
    },
    { slow: 0, normal: 0, fast: 0 }
  );
  return toyCountBySpeedMap;
}

function _getToyCountByVendorMap(toys) {
  const toyCountByVendorMap = toys.reduce((map, toy) => {
    if (!map[toy.vendor]) map[toy.vendor] = 0;
    map[toy.vendor]++;
    return map;
  }, {});
  return toyCountByVendorMap;
}
