import requests
from bs4 import BeautifulSoup

"""
vj
contest:
    rank
totalsolved
"""


def getUserInfo(username):
    URL = "https://vjudge.net/user/" + username
    soup = BeautifulSoup(
        requests.get(URL).content,
        "html.parser",
    )

    totalSolved = (
        soup.find("table", class_="table table-reflow problem-solve")
        .find_all("tr")[3]
        .find("td")
        .find("a")
        .get_text()
    )

    return int(totalSolved)


# getUserInfo("_labib")
