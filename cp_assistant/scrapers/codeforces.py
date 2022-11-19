# import requests
# from bs4 import BeautifulSoup


# def getUserInfo(username):
#     URL = "https://codeforces.com/profile/" + username
#     soup = BeautifulSoup(
#         requests.get(URL).content,
#         "html.parser",
#     )
#     print(soup.findAll(class_="user-rank"))
#     rank = soup.findAll(class_="user-rank")[0].get_text().strip()

#     rating = (
#         soup.find(class_="info").find("ul").find("li").find("span").get_text().strip()
#     )

#     totalSolved = (
#         soup.find(class_="_UserActivityFrame_counterValue")
#         .get_text()
#         .split(" ")[0]
#         .strip()
#     )

#     return rank, rating, int(totalSolved)

# getUserInfo("tourist")

import time
import json
import requests
from bs4 import BeautifulSoup
import re
import sys
import json

_http_headers = {'Content-Type': 'application/json'}


username = sys.argv[1]

rs = requests.session()
url = f'http://codeforces.com/api/user.info?handles={username}'
#print(url)
info_list = rs.get(url=url, headers=_http_headers).json()["result"][0]

info_list = json.dumps(info_list)

print(info_list)