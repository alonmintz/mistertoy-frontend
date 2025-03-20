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
  askChatBot,
  getRelatedToysByLabels,
};
// For Debug (easy access from console):
window.cs = toyService;

function query(filterBy = {}, sortBy = {}) {
  return storageService
    .query(TOY_KEY)
    .then((toys) => {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, "i");
        toys = toys.filter((toy) => regExp.test(toy.name));
      }

      if (filterBy.inStock) {
        toys = toys.filter(
          (toy) => toy.inStock === JSON.parse(filterBy.inStock)
        );
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
    })
    .catch((err) => {
      throw new Error(err);
    });
}
//TODO: add catchs to all relevant function
function get(toyId) {
  return storageService
    .get(TOY_KEY, toyId)
    .then((toy) => {
      toy = _setNextPrevToyId(toy);
      return toy;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId).catch((err) => {
    throw new Error(err);
  });
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy).catch((err) => {
      throw new Error(err);
    });
  } else {
    return storageService
      .post(TOY_KEY, { ...toy, createdAt: Date.now() })
      .catch((err) => {
        throw new Error(err);
      });
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
    if (field === "labels") {
      filterBy[field] = searchParams.getAll(field) || "";
    } else {
      filterBy[field] = searchParams.get(field) || "";
    }
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

function askChatBot(msg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ author: "bot", txt: "This is an automatic response 🤖" });
    }, 1000);
  });
}

function getRelatedToysByLabels(toyLabels, currentToyId, count = 3) {
  return query().then((toys) => {
    let toysByLabel = [];
    toyLabels.forEach((label) => {
      const filteredToys = toys
        .filter((toy) => toy.labels.includes(label))
        .filter((toy) => toy._id !== currentToyId);
      toysByLabel = [
        ...toysByLabel,
        {
          label,
          toys:
            filteredToys.length > count
              ? filteredToys.slice(0, count - 1)
              : filteredToys,
        },
      ];
    });

    return toysByLabel;
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
  toy._id = utilService.makeId();
  return toy;
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id);
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0];
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1];
    toy.nextToyId = nextToy._id;
    toy.prevToyId = prevToy._id;
    return toy;
  });
}
