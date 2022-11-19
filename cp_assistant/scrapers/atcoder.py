import requests
from bs4 import BeautifulSoup


def getUserInfo(username):
    URL = "https://atcoder.jp/users/" + username
    soup = BeautifulSoup(
        requests.get(URL).content,
        "html.parser",
    )

    

    rank = (
        soup.find(class_="dl-table mt-2").find("tr").find("td").get_text().strip("th")
    )

    rating = (
        soup.find(class_="dl-table mt-2")
        .find_all("tr")[1]
        .find_all("td")[0]
        .get_text()
        .strip()
        .split()[0]
    )

    URL = (
        "https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user="
        + username.lower()
    )
    totalSolved = requests.get(URL).json()["count"]

    return rank, rating, int(totalSolved)


print(getUserInfo("chroot"))
