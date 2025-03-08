import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { TOYS_MOCK_DATA } from "../model/toys.mockdata.js";

const TOY_KEY = "toyDB";
const labels = [
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
  getSpeedStats,
  getVendorStats,
  labels,
  // _createBooks,
};
// For Debug (easy access from console):
window.cs = toyService;

//TODO: change the filterBy and sortBy
function query(filterBy = {}, sortBy = {}) {
  return storageService.query(TOY_KEY).then((toys) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      toys = toys.filter((toy) => regExp.test(toy.vendor));
    }

    if (filterBy.minSpeed) {
      toys = toys.filter((toy) => toy.maxSpeed >= filterBy.minSpeed);
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
//TODO: change empty toy
function getEmptyToy(vendor = "", maxSpeed = "") {
  return { vendor, maxSpeed };
}
//TODO: change default filter
function getDefaultFilter() {
  return { txt: "", minSpeed: 0 };
}

//TODO: complete function
function getDefaultSort() {
  return {};
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || "";
  }
  return filterBy;
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
//TODO: change from cars to toys
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
//TODO: change function to create Toys
// function _createBooks() {
//   const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
//   const books = [];
//   for (let i = 0; i < 20; i++) {
//     const book = {
//       id: utilService.makeId(),
//       title: utilService.makeLorem(2),
//       subtitle: utilService.makeLorem(4),
//       authors: [utilService.makeLorem(1)],
//       publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//       description: utilService.makeLorem(20),
//       pageCount: utilService.getRandomIntInclusive(20, 600),
//       categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//       thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
//       language: "en",
//       listPrice: {
//         amount: utilService.getRandomIntInclusive(80, 500),
//         currencyCode: "EUR",
//         isOnSale: Math.random() > 0.7,
//       },
//     };
//     books.push(book);
//   }
//   console.log("books", books);
// }
