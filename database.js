import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");

const getTasks = (setUserFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("select * from tasks", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
    },
    (t, error) => {
      console.log("db error load tasks");
      console.log(error);
    },
    (_t, _success) => {
      console.log("loaded tasks");
    }
  );
};

const insertTask = (userName, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into tasks (name) values (?)", [userName]);
    },
    (t, error) => {
      console.log("db error insertTasks");
      console.log(error);
    },
    (t, success) => {
      successFunc();
    }
  );
};

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "drop table tasks",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log("error dropping users tasks");
          reject(error);
        }
      );
    });
  });
};

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists tasks (id integer primary key not null, name text);"
        );
      },
      (_, error) => {
        console.log("db error creating tasks");
        console.log(error);
        reject(error);
      },
      (_, success) => {
        resolve(success);
      }
    );
  });
};

const setupUsersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into tasks (id, name) values (?,?)", [1, "john"]);
      },
      (t, error) => {
        console.log("db error insertTasks");
        console.log(error);
        resolve();
      },
      (t, success) => {
        resolve(success);
      }
    );
  });
};

export const database = {
  getTasks,
  insertTask,
  setupDatabaseAsync,
  setupUsersAsync,
  dropDatabaseTablesAsync,
};
