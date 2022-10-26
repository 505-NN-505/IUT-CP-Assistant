import requests
from bs4 import BeautifulSoup


def getUserInfo(username):
    URL = "https://codeforces.com/profile/" + username
    soup = BeautifulSoup(
        requests.get(URL).content,
        "html.parser",
    )

    rank = soup.findAll(class_="user-rank")[0].get_text().strip()

    rating = (
        soup.find(class_="info").find("ul").find("li").find("span").get_text().strip()
    )

    totalSolved = (
        soup.find(class_="_UserActivityFrame_counterValue")
        .get_text()
        .split(" ")[0]
        .strip()
    )

    return rank, rating, int(totalSolved)
