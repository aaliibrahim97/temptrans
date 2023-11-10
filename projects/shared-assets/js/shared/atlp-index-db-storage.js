window.ATLPIndexDB; // For SPA's, browser environment.
var createIndexDB = function () {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    console.log(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
    );
  }

  var request = window.indexedDB.open("atlpindexdb", 1);

  request.onerror = function (event) {
    console.log("Error while creating atlpindexdb => " + event.target.result);
  };
  request.onsuccess = function (event) {
    window.ATLPIndexDB = request.result;
    console.log("successfully created => " + event.target.result.name);
  };

  request.onupgradeneeded = function (event) {
    window.ATLPIndexDB = event.target.result;
    window.ATLPIndexDB.createObjectStore("atlpindexdbobject");
    window.ATLPIndexDB.createObjectStore("iac-atlpindexdbobject");
    window.ATLPIndexDB.createObjectStore("lba-atlpindexdbobject");
    window.ATLPIndexDB.createObjectStore("atlp-demo-indexdbobject");
  };
};

var deleteIndexDB = function () {
  try {
    window.indexedDB.deleteDatabase("atlpindexdb");
  } catch (err) {
    console.log("Index DB not defined");
  }
};

createIndexDB();
