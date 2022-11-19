import codeforces
import atcoder
import mariadb
import sys


try:
    conn = mariadb.connect(
        user="labib",
        password="",
        host="localhost",
        database="test",
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

cur = conn.cursor()


try:
    conn2 = mariadb.connect(
        user="labib",
        password="iamgroot",
        host="localhost",
        database="test",
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

users = conn2.cursor()


def populateData():
    users.execute(
        "SELECT id, handle_codeforces, handle_atcoder, handle_vjudge FROM user_table"
    )

    for (id, handle_codeforces, handle_atcoder, handle_vjudge) in users:
        print(id, handle_codeforces, handle_atcoder, handle_vjudge)
        user = {
            "id": id,
            "handle_codeforces": handle_codeforces,
            "handle_atcoder": handle_atcoder,
            "handle_vjudge": handle_vjudge,
        }
        insertIntoTable(user)


def insertIntoTable(user):
    rank, rating, totalSolved = codeforces.getUserInfo(user["handle_codeforces"])

    cur.execute(
        "INSERT INTO table_codeforces VALUES(?,?,?,?,?)",
        (
            user["id"],
            user["handle_codeforces"],
            rating,
            rank,
            totalSolved,
        ),
    )

    try:

        rank, rating, totalSolved = atcoder.getUserInfo(user["handle_atcoder"])

        cur.execute(
            "INSERT INTO table_atcoder VALUES(?,?,?,?,?)",
            (
                user["id"],
                user["handle_atcoder"],
                rating,
                rank,
                totalSolved,
            ),
        )
    except:
        print("Error ", user)

    print("inserted")


populateData()
conn.commit()
